import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session?.accessToken) {
    return res.status(401).json({ error: "Not authenticated" })
  }

  const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=50", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    return res.status(response.status).json({ error: data.error.message })
  }

  const genres = data.items.flatMap((artist: any) => artist.genres)
  const genreCounts = genres.reduce((acc: any, genre: string) => {
    acc[genre] = (acc[genre] || 0) + 1
    return acc
  }, {})

  const sortedGenres = Object.entries(genreCounts)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 10)
    .map(([genre, count]) => ({ genre, count }))

  res.status(200).json(sortedGenres)
}


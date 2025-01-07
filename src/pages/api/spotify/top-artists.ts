import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session?.accessToken) {
    return res.status(401).json({ error: "Not authenticated" })
  }

  const response = await fetch("https://api.spotify.com/v1/me/top/artists?limit=10", {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    return res.status(response.status).json({ error: data.error.message })
  }

  res.status(200).json(data)
}


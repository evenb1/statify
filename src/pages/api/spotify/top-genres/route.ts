import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/pages/api/auth/[...nextauth]"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const timeRange = searchParams.get('timeRange')

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const spotifyTimeRange = getSpotifyTimeRange(timeRange)

  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${spotifyTimeRange}&limit=50`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data.error.message }, { status: response.status })
  }

  const genres = data.items.flatMap((artist: any) => artist.genres)
  const genreCounts = genres.reduce((acc: any, genre: string) => {
    acc[genre] = (acc[genre] || 0) + 1
    return acc
  }, {})

  const sortedGenres = Object.entries(genreCounts)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 20)
    .map(([name, count]) => ({ name, count }))

  return NextResponse.json(sortedGenres)
}

function getSpotifyTimeRange(timeRange: string | null): string {
  switch (timeRange) {
    case '4weeks':
      return 'short_term'
    case '6months':
      return 'medium_term'
    case 'year':
    case 'allTime':
      return 'long_term'
    default:
      return 'medium_term'
  }
}


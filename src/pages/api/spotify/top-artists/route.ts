import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(request: Request) {const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const timeRange = searchParams.get('timeRange')

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const spotifyTimeRange = getSpotifyTimeRange(timeRange)

  const response = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${spotifyTimeRange}&limit=20`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data.error.message }, { status: response.status })
  }

  const artists = data.items.map((artist: any) => ({
    id: artist.id,
    name: artist.name,
    image: artist.images[0]?.url,
    genres: artist.genres,
  }))

  return NextResponse.json(artists)
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


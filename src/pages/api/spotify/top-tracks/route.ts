import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(request.url)
  const timeRange = searchParams.get('timeRange')

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
  }

  const spotifyTimeRange = getSpotifyTimeRange(timeRange)

  const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${spotifyTimeRange}&limit=20`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data.error.message }, { status: response.status })
  }

  const tracks = data.items.map((track: any) => ({
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist: any) => artist.name),
    album: track.album.name,
    image: track.album.images[0]?.url,
    duration: track.duration_ms,
  }))

  return NextResponse.json(tracks)
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


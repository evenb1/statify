'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Track = {
  id: string
  name: string
  artists: string[]
  album: string
  image: string
  duration: number
}

export default function TopTracks({ timeRange }: { timeRange: string }) {
  const [tracks, setTracks] = useState<Track[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/spotify/top-tracks?timeRange=${timeRange}`)
        const data = await res.json()
        setTracks(data)
      } catch (error) {
        console.error('Failed to fetch top tracks:', error)
      }
      setIsLoading(false)
    }

    fetchTracks()
  }, [timeRange])

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 gradient-text">Top Tracks</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {tracks.slice(0, 20).map((track, index) => (
            <motion.li
              key={track.id}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={track.image}
                alt={track.name}
                width={50}
                height={50}
                className="rounded-md"
              />
              <div>
                <p className="font-semibold">{track.name}</p>
                <p className="text-sm text-gray-400">{track.artists.join(', ')}</p>
                <p className="text-xs text-gray-500">{formatDuration(track.duration)}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000)
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`
}


'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type Artist = {
  id: string
  name: string
  image: string
  genres: string[]
}

export default function TopArtists({ timeRange }: { timeRange: string }) {
  const [artists, setArtists] = useState<Artist[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/spotify/top-artists?timeRange=${timeRange}`)
        const data = await res.json()
        setArtists(data)
      } catch (error) {
        console.error('Failed to fetch top artists:', error)
      }
      setIsLoading(false)
    }

    fetchArtists()
  }, [timeRange])

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 gradient-text">Top Artists</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {artists.slice(0, 20).map((artist, index) => (
            <motion.li
              key={artist.id}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={artist.image}
                alt={artist.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">{artist.name}</p>
                <p className="text-sm text-gray-400">{artist.genres.slice(0, 3).join(', ')}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}


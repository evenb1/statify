'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

type Genre = {
  name: string
  count: number
}

export default function TopGenres({ timeRange }: { timeRange: string }) {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGenres = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/spotify/top-genres?timeRange=${timeRange}`)
        const data = await res.json()
        setGenres(data)
      } catch (error) {
        console.error('Failed to fetch top genres:', error)
      }
      setIsLoading(false)
    }

    fetchGenres()
  }, [timeRange])

  const maxCount = Math.max(...genres.map(genre => genre.count))

  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 gradient-text">Top Genres</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {genres.slice(0, 20).map((genre, index) => (
            <motion.li
              key={genre.name}
              className="space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{genre.name}</span>
                <span className="text-sm text-gray-400">{genre.count} tracks</span>
              </div>
              <div className="bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-green-500 rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${(genre.count / maxCount) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}


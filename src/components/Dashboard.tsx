'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

type Artist = {
  name: string
  images: { url: string }[]
}

type Track = {
  name: string
  album: {
    images: { url: string }[]
  }
}

type Genre = {
  genre: string
  count: number
}

export default function Dashboard() {
  const { data: session } = useSession()
  const [topArtists, setTopArtists] = useState<Artist[]>([])
  const [topTracks, setTopTracks] = useState<Track[]>([])
  const [topGenres, setTopGenres] = useState<Genre[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [artistsRes, tracksRes, genresRes] = await Promise.all([
        fetch('/api/spotify/top-artists'),
        fetch('/api/spotify/top-tracks'),
        fetch('/api/spotify/top-genres'),
      ])

      const [artistsData, tracksData, genresData] = await Promise.all([
        artistsRes.json(),
        tracksRes.json(),
        genresRes.json(),
      ])

      setTopArtists(artistsData.items)
      setTopTracks(tracksData.items)
      setTopGenres(genresData)
    }

    if (session) {
      fetchData()
    }
  }, [session])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-circular-black mb-12 text-center gradient-text"
          variants={itemVariants}
        >
          Your Spotify Insights
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-circular-black mb-4 gradient-text">Top Artists</h2>
            <ul>
              {topArtists.slice(0, 5).map((artist, index) => (
                <motion.li 
                  key={artist.name} 
                  className="flex items-center mb-4"
                  variants={itemVariants}
                >
                  <Image
                    src={artist.images[0]?.url || '/placeholder.svg?height=40&width=40'}
                    alt={artist.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-4"
                  />
                  <span>{artist.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-circular-black mb-4 gradient-text">Top Tracks</h2>
            <ul>
              {topTracks.slice(0, 5).map((track, index) => (
                <motion.li 
                  key={track.name} 
                  className="flex items-center mb-4"
                  variants={itemVariants}
                >
                  <Image
                    src={track.album.images[0]?.url || '/placeholder.svg?height=40&width=40'}
                    alt={track.name}
                    width={40}
                    height={40}
                    className="rounded-sm mr-4"
                  />
                  <span>{track.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-circular-black mb-4 gradient-text">Top Genres</h2>
            <ul>
              {topGenres.slice(0, 5).map((genre, index) => (
                <motion.li 
                  key={genre.genre} 
                  className="flex justify-between items-center mb-4"
                  variants={itemVariants}
                >
                  <span>{genre.genre}</span>
                  <span className="text-sm text-gray-400">{genre.count} tracks</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}


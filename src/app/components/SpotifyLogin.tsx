'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AirplayIcon as Spotify } from 'lucide-react'
import { FaSpotify } from 'react-icons/fa6'

export default function SpotifyLogin() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-44 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          className="font-circular-black text-4xl md:text-5xl mb-6 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Ready to Explore Your Music Journey?
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Connect your Spotify account now and unlock a world of musical insights.
        </motion.p>
        <motion.button
          className="bg-[#1DB954] text-white font-circular-black py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto hover:bg-[#1ED760] transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaSpotify className="mr-2" /> Log in with Spotify
        </motion.button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}


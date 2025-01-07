'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2
          className="font-circular-black text-4xl md:text-5xl mb-6 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Explore Your Music Journey?
        </motion.h2>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Connect your Spotify account now and unlock a world of musical insights.
        </motion.p>
        <motion.button
          className="bg-green-500 text-black font-circular-black py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto hover:bg-green-400 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <ArrowRight className="ml-2" />
        </motion.button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import { ArrowRight, BarChart2 } from 'lucide-react'

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <BarChart2 className="w-20 h-20 mb-6 text-green-500" />
        <h1 className="font-circular-black text-5xl md:text-7xl mb-6">
          Discover Your Music DNA
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Uncover fascinating insights about your listening habits with our powerful Spotify stats analyzer.
        </p>
        <motion.button
          className="bg-green-500 text-black font-circular-black py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started <ArrowRight className="ml-2" />
        </motion.button>
      </motion.div>
    </section>
  )
}


'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, BarChart2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const images = [
  '/kendrick.jpg?height=1080&width=1920',
  '/sza.jpeg?height=1080&width=1920',
  '/tems.png?height=1080&width=1920'
]

interface HeroProps {
  loginSectionRef: React.RefObject<HTMLDivElement | null>
}

export default function Hero({ loginSectionRef }: HeroProps) {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 10000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <BarChart2 className="w-20 h-20 mb-6 text-green-500" />
        <h1 className="font-circular-black text-5xl md:text-7xl mb-6 gradient-text">
          Discover Your Music DNA
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
          Uncover fascinating insights about your listening habits with our powerful Spotify stats analyzer.
        </p>
        <motion.button
          className="bg-green-600 text-white font-circular-black py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto hover:bg-gray-700 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => loginSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get Started <ArrowRight className="ml-2" />
        </motion.button>
      </motion.div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={images[currentImage]}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

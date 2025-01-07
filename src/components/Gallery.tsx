'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const images = [
    '/one.png?height=600&width=800',
    '/two.png?height=600&width=800',
    '/three.png?height=600&width=800',
    '/four.png?height=600&width=800',
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    rotate: -5,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    filter: 'blur(0px)',
    transition: { 
      type: 'spring',
      damping: 15,
      stiffness: 100,
    },
  },
}

export default function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="pb-20 px-4 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="font-circular-black text-4xl md:text-5xl text-center mb-12 gradient-text"
      >
        Your Music Journey Visualized
      </motion.h2>
      <motion.div 
        className="grid grid-cols-2 gap-2 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="relative aspect-square overflow-hidden "
            variants={imageVariants}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-600 ease-in-out transform hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}


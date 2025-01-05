'use client'

import { motion } from 'framer-motion'

const stats = [
  { value: '10M+', label: 'Tracks Analyzed' },
  { value: '500K+', label: 'Happy Users' },
  { value: '50B+', label: 'Data Points' },
  { value: '200+', label: 'Countries' },
]

export default function Statistics() {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-circular-black text-4xl md:text-5xl text-center mb-12">By the Numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-circular-black text-4xl md:text-5xl text-green-500 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


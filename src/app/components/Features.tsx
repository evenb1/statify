'use client'

import { motion } from 'framer-motion'
import { Clock, Disc, Headphones, TrendingUp } from 'lucide-react'

const features = [
  { icon: Clock, title: 'Listening Time', description: 'Track your total listening time and see how it changes over time.' },
  { icon: TrendingUp, title: 'Top Artists & Tracks', description: 'Discover your most played artists and tracks across different time ranges.' },
  { icon: Disc, title: 'Genre Breakdown', description: 'Visualize your music taste with an interactive genre distribution chart.' },
  { icon: Headphones, title: 'Listening Habits', description: 'Analyze your listening patterns throughout the day and week.' },
]

export default function Features() {
  return (
    <section className="py-20 px-4">
      <h2 className="font-circular-black text-4xl md:text-5xl text-center mb-12">Powerful Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <feature.icon className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="font-circular-black text-2xl mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


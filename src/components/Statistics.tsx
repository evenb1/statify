'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const stats = [
  { value: 10, label: 'Tracks Analyzed', suffix: 'M+' },
  { value: 500, label: 'Happy Users', suffix: 'K+' },
  { value: 50, label: 'Data Points', suffix: 'B+' },
  { value: 200, label: 'Countries', suffix: '+' },
]

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
}

function CountUp({ end, duration = 2, suffix = '' }: CountUpProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export default function Statistics() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-28 px-4 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-circular-black text-4xl md:text-5xl text-center mb-12 gradient-text"
        >
          By the Numbers
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="font-circular-black text-4xl text-green-600 md:text-5xl gradient-text mb-2">
                {inView ? <CountUp end={stat.value} suffix={stat.suffix} /> : '0'}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

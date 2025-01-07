'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <motion.nav 
      className="bg-gray-800 p-4"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold gradient-text">Spotify Stats</h1>
        {session?.user && (
          <div className="flex items-center space-x-4">
            <span className="text-white">{session.user.name}</span>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
          </div>
        )}
      </div>
    </motion.nav>
  )
}


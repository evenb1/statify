'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { FaSpotify } from 'react-icons/fa'

export default function SpotifyLogin() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      await signIn('spotify', { callbackUrl: '/dashboard' })
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-circular-black text-4xl md:text-5xl mb-6 gradient-text">
          Ready to Explore Your Music Journey?
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Connect your Spotify account now and unlock a world of musical insights.
        </p>
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="bg-[#1DB954] text-white font-circular-black py-3 px-8 rounded-full text-lg flex items-center justify-center mx-auto hover:bg-[#1ED760] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaSpotify className="mr-2" />
          {isLoading ? 'Connecting...' : 'Log in with Spotify'}
        </button>
      </div>
    </section>
  )
}


import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Statistics from '@/components/Statistics'
import SpotifyLogin from '@/components/SpotifyLogin'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import { useRef } from 'react'

export default function Home() {
      const loginSectionRef = useRef<HTMLDivElement | null>(null);
    
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="bg-pattern-dots">
        <Hero loginSectionRef={loginSectionRef} />
        <Features />
      </div>
      <Gallery />
      <div className="bg-pattern-waves">
        <Statistics />
        <SpotifyLogin />
      </div>
      <Footer />
    </main>
  )
}


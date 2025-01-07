import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Statistics from '@/components/Statistics'
import SpotifyLogin from '@/components/SpotifyLogin'
import Footer from '@/components/Footer'
import Gallery from '@/components/Gallery'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="bg-pattern-dots">
        <Hero />
        <Features />
      </div>
      <Gallery />
      <div className="bg-pattern-waves">
        <Statistics />
        <Testimonials />
        <SpotifyLogin />
      </div>
      <Footer />
    </main>
  )
}


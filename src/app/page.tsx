import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Statistics from '@/components/Statistics'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Hero />
      <Features />
      <Statistics />
      <CTA />
      <Footer />
    </main>
  )
}


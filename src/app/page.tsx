import Hero from '@/app/components/Hero'
import Features from '@/app/components/Features'
import Statistics from '@/app/components/Statistics'
import CTA from '@/app/components/CTA'
import Footer from '@/app/components/Footer'

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


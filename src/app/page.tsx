"use client";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Statistics from "@/components/Statistics";
import Footer from "@/components/Footer";
import { useRef } from "react";
import Gallery from "../components/Gallery";
import SpotifyLogin from "../components/SpotifyLogin";
import { LampDemo } from "../components/ui/Lamp";

export default function Home() {
  const loginSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="bg-pattern-dots">
        <Hero loginSectionRef={loginSectionRef} />
        <Features />
      </div>
      <LampDemo />
      <div className="bg-pattern-waves">
        <Gallery />
        <Statistics />

      </div>
      <div ref={loginSectionRef}>
        <SpotifyLogin />
      </div>
      <Footer />
    </main>
  );
}

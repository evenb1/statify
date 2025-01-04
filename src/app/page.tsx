import { motion } from "framer-motion";
import Head from "next/head";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white font-circular">
      <Head>
        <title>Statify</title>
        <meta name="description" content="Your music stats, reimagined." />
      </Head>

      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4">
        <h1 className="text-3xl font-bold tracking-tight">Statify</h1>
        <nav className="space-x-6">
          <a href="#features" className="hover:underline">
            Features
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Your Music, <br /> <span className="text-green-500">Reimagined</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-400">
          Dive into your Spotify stats like never before. Explore your top tracks, artists, genres, and more in a modern, professional way.
        </p>
        <motion.a
          href="#get-started"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-8 px-6 py-3 bg-green-500 text-black font-medium text-lg rounded-full shadow-lg"
        >
          Get Started
        </motion.a>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="px-8 py-16"
      >
        <h2 className="text-4xl font-bold text-center mb-12">
          Features You'll Love
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg p-6 text-center"
          >
            <h3 className="text-xl font-semibold text-green-500">
              Top Tracks
            </h3>
            <p className="mt-4 text-gray-400">
              Discover your most played songs across different time ranges.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg p-6 text-center"
          >
            <h3 className="text-xl font-semibold text-green-500">
              Favorite Artists
            </h3>
            <p className="mt-4 text-gray-400">
              See which artists defined your music journey.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg p-6 text-center"
          >
            <h3 className="text-xl font-semibold text-green-500">
              Genre Trends
            </h3>
            <p className="mt-4 text-gray-400">
              Analyze your favorite genres and explore your listening habits.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-500">
        <p>© 2025 Statify. All rights reserved.</p>
      </footer>
    </div>
  );
}

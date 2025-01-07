import { Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-gray-400">&copy; 2023 Spotify Stats. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <Twitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}


import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

const inter = Inter({ subsets: ['latin'] })

const circularBlack = localFont({
  src: '../public/fonts/CircularStd-Black.otf',
  variable: '--font-circular-black',
})

export const metadata = {
  title: 'Spotify Stats - Discover Your Music DNA',
  description: 'Uncover insights about your listening habits with our Spotify stats app.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${circularBlack.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}


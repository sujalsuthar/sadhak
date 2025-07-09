import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from '../components/Footer'

export const metadata: Metadata = {
  title: 'Sadhak',
  description: 'Discover the timeless wisdom of Sanatana Dharma through spiritual teachings and practices',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

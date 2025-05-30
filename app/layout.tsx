import '../styles/globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CV Builder App',
  description: 'Build your professional CV with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  )
}

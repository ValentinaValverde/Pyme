import Header from '@/components/header/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pyme',
  description: 'E-commerce website for small and meduim sized businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
          <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <p>Copyright © 2023 - All rights reserved by Pyme</p>
          </footer>
        </div>
      </body>
    </html>
  )
}

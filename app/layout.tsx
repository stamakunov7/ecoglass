import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, Manrope } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ecoglass.us'),
  title: 'EcoGlass | Custom Windows & Doors in Florida',
  description:
    'Custom-built windows and doors manufactured in Central Florida and installed by EcoGlass across the state. Get a free in-home estimate.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png?v=3',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png?v=3',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg?v=3',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-512.png?v=3',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: '/apple-icon.png?v=3',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#123b32',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${manrope.variable} ${instrument.variable}`}>
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, Manrope } from 'next/font/google'
import './globals.css'
import { SITE_URL } from '@/lib/site'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'EcoGlass | Custom Windows & Doors in Florida',
  description:
    'Custom-built windows and doors manufactured in Central Florida and installed by EcoGlass across the state. Get a free in-home estimate.',
  openGraph: {
    type: 'website',
    siteName: 'EcoGlass Windows & Doors',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
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

/** Tells Google who the business is, where it is and when it's open. */
const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'EcoGlass Windows & Doors',
  description:
    'Manufacturer, supplier and installer of custom windows and doors, built in Longwood and installed across Florida.',
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  telephone: '+1-321-207-0507',
  email: 'info@vk-ecoglass.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '144 Hope Street',
    addressLocality: 'Longwood',
    addressRegion: 'FL',
    postalCode: '32750',
    addressCountry: 'US',
  },
  areaServed: { '@type': 'State', name: 'Florida' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '17:30',
  },
  hasMap: 'https://www.google.com/maps?cid=17354086777007301827',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${manrope.variable} ${instrument.variable}`}>
      <body className="bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, '\\u003c') }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

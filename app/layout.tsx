import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Inter, Instrument_Serif, Manrope } from 'next/font/google'
import './globals.css'
import { ConsentBanner } from '@/components/consent-banner'
import { TrackingRoot } from '@/components/tracking-root'
import { HAS_GOOGLE_TAG, PIXEL_IDS } from '@/lib/pixel-ids'
import { SITE, SITE_URL, canonicalMeta, localBusinessJsonLd } from '@/lib/site'

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
  description: SITE.description,
  ...canonicalMeta('/'),
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_US',
    url: '/',
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

const gtagId = PIXEL_IDS.ga || PIXEL_IDS.ads

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${inter.variable} ${manrope.variable} ${instrument.variable}`}>
      <body className="bg-background font-sans antialiased">
        {HAS_GOOGLE_TAG && gtagId ? (
          <Script id="gtag-consent-default" strategy="beforeInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`}
          </Script>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()).replace(/</g, '\\u003c') }}
        />
        {children}
        <TrackingRoot />
        <ConsentBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

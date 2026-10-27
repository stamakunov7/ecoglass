import type { Metadata } from "next"

/** The address the site is served from, used for absolute URLs in the sitemap, robots and structured data. */
export const SITE_URL = "https://www.ecoglass.us"

export type PhoneRegionId = "orlando" | "tampa-bay"

export type RegionalPhone = {
  id: PhoneRegionId
  /** Short label for compact chrome (header, buttons). */
  shortRegion: string
  /** Full label for contact, footer, JSON-LD. */
  region: string
  display: string
  tel: `tel:+${string}`
  e164: string
  /** Schema.org telephone, with country hyphens. */
  jsonLd: string
  area: string
}

export const PHONES = {
  orlando: {
    id: "orlando",
    shortRegion: "Orlando",
    region: "Orlando / Central Florida",
    display: "(321) 207-0507",
    tel: "tel:+13212070507",
    e164: "+13212070507",
    jsonLd: "+1-321-207-0507",
    area: "Orlando, Longwood and Central Florida",
  },
  tampa: {
    id: "tampa-bay",
    shortRegion: "Tampa Bay",
    region: "Tampa Bay",
    display: "(689) 777-8085",
    tel: "tel:+16897778085",
    e164: "+16897778085",
    jsonLd: "+1-689-777-8085",
    area: "Tampa, St. Petersburg, Clearwater, Brandon, Largo, Wesley Chapel and the west-coast Tampa Bay area",
  },
} as const satisfies Record<"orlando" | "tampa", RegionalPhone>

export const PHONE_LIST: RegionalPhone[] = [PHONES.orlando, PHONES.tampa]

export const SITE = {
  url: SITE_URL,
  name: "EcoGlass Windows & Doors",
  shortName: "EcoGlass",
  tagline: "Custom windows and doors manufactured in Central Florida and installed across the state.",
  description:
    "Custom-built windows and doors manufactured in Central Florida and installed by EcoGlass across the state. Get a free in-home estimate.",
  email: "info@vk-ecoglass.com",
  address: {
    street: "144 Hope Street",
    city: "Longwood",
    region: "FL",
    postal: "32750",
    country: "US",
    line: "144 Hope Street, Longwood, FL 32750",
  },
  hours: {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const,
    opens: "08:30",
    closes: "17:30",
    display: "Mon – Fri, 8:30 AM – 5:30 PM",
  },
  maps: {
    cid: "17354086777007301827",
    placeId: "ChIJ52NeRhRy54gRw-TSUPoZ1vA",
    listingUrl: "https://www.google.com/maps?cid=17354086777007301827",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=144+Hope+Street,+Longwood,+FL+32750",
    searchUrl: "https://www.google.com/maps/search/?api=1&query=144+Hope+Street,+Longwood,+FL+32750",
    embedUrl: "https://www.google.com/maps?q=144+Hope+Street,+Longwood,+FL+32750&z=15&output=embed",
  },
  reviews: {
    ratingValue: 4.7,
    reviewCount: 103,
  },
  phones: PHONE_LIST,
  primaryPhone: PHONES.orlando,
  /** Public profile URLs. Leave empty until the client provides them — empty links are hidden. */
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
} as const

export function digitsOf(tel: string) {
  const digits = tel.replace(/\D/g, "")
  return digits.length === 11 && digits.startsWith("1") ? digits : digits.length === 10 ? `1${digits}` : digits
}

export function phoneFromTel(href: string): RegionalPhone | undefined {
  const digits = digitsOf(href)
  return PHONE_LIST.find((p) => digitsOf(p.tel) === digits)
}

export function canonicalMeta(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  const canonical = path.startsWith("/") ? path : `/${path}`
  return {
    alternates: { canonical },
    openGraph: { url: canonical },
  }
}

/** Tells Google who the business is, where it is and when it's open. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: SITE.name,
    description:
      "Manufacturer, supplier and installer of custom windows and doors, built in Longwood and installed across Florida.",
    url: SITE.url,
    logo: `${SITE.url}/icon-512.png`,
    image: `${SITE.url}/opengraph-image.jpg`,
    telephone: SITE.primaryPhone.jsonLd,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postal,
      addressCountry: SITE.address.country,
    },
    areaServed: [
      { "@type": "State", name: "Florida" },
      { "@type": "City", name: "Orlando" },
      { "@type": "City", name: "Longwood" },
      { "@type": "City", name: "Tampa" },
      { "@type": "City", name: "St. Petersburg" },
      { "@type": "City", name: "Clearwater" },
      { "@type": "AdministrativeArea", name: "Tampa Bay" },
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...SITE.hours.dayOfWeek],
      opens: SITE.hours.opens,
      closes: SITE.hours.closes,
    },
    hasMap: SITE.maps.listingUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(SITE.reviews.ratingValue),
      reviewCount: String(SITE.reviews.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    contactPoint: PHONE_LIST.map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone.jsonLd,
      contactType: "sales",
      areaServed: phone.id === "tampa-bay" ? ["Tampa", "St. Petersburg", "Clearwater", "Brandon", "Largo", "Wesley Chapel", "Tampa Bay"] : ["Orlando", "Longwood", "Central Florida", "Florida"],
      availableLanguage: "English",
    })),
  }
}

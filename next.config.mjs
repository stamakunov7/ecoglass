/** Pages of the previous ecoglass.us (Wix) site, sent to their closest page here so old links and search results keep working. */
const legacyRedirects = [
  ["/about", "/why-ecoglass"],
  ["/windows", "/products?category=windows"],
  ["/doors", "/products/doors"],
  ["/nova-series", "/products?category=windows"],
  ["/prestige-series-1", "/products?category=windows"],
  ["/copy-of-prestige-series", "/products?category=windows"],
  ["/operation-function", "/products?category=windows"],
  ["/built-in-blinds", "/products"],
  ["/smart-glass", "/products"],
  ["/ig-units", "/products"],
  ["/other-products", "/products"],
  ["/documents", "/products"],
  ["/resources-1", "/products"],
  ["/maintainance-tips", "/why-ecoglass#support"],
  ["/warrantyregistration", "/contact"],
  ["/down-for-maintainance", "/"],
]

/** Door pages from before the door lineup was rebuilt, with or without a brand segment, sent to the matching door. */
const oldDoorPages = [
  ["sliding-doors", "/products/doors"],
  ["big-doors", "/products/doors/prestige-s-8375"],
  ["entry-doors", "/products/doors/entry"],
  ["french-hinged-patio-doors", "/products/doors/french-patio"],
  ["storm-screen-doors", "/products/doors/storm-screen"],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Vercel image optimization is compatible with this App Router site (local /public assets).
  async redirects() {
    return [
      ...legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...oldDoorPages.flatMap(([slug, destination]) => [
        { source: `/products/${slug}`, destination, permanent: true },
        { source: `/products/${slug}/:brand`, destination, permanent: true },
      ]),
    ]
  },
}

export default nextConfig

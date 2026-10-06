/** Pages of the previous ecoglass.us (Wix) site, sent to their closest page here so old links and search results keep working. */
const legacyRedirects = [
  ["/about", "/why-ecoglass"],
  ["/windows", "/products?category=windows"],
  ["/doors", "/products?category=doors"],
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }))
  },
}

export default nextConfig

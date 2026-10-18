import type { MetadataRoute } from "next"
import { products } from "@/components/products/product-catalog"
import { doorModels } from "@/components/products/door-catalog"
import { brandSlugs } from "@/lib/configurator/catalog"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  })

  return [
    page("", 1),
    page("/products", 0.9),
    page("/products/doors", 0.9),
    page("/products/series", 0.7),
    page("/products/specialty-glass", 0.7),
    page("/why-ecoglass", 0.7),
    page("/our-process", 0.7),
    page("/financing", 0.7),
    page("/commercial", 0.7),
    page("/gallery", 0.6),
    page("/contact", 0.8),
    ...products.map((p) => page(`/products/${p.slug}`, 0.8)),
    ...products.flatMap((p) => brandSlugs.map((brand) => page(`/products/${p.slug}/${brand}`, 0.6))),
    ...doorModels.map((d) => page(`/products/doors/${d.slug}`, 0.8)),
  ]
}

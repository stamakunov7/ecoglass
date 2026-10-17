import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { CatalogHero } from "@/components/products/catalog-hero"
import { CatalogBrands } from "@/components/products/catalog-brands"
import { CollectionClosing } from "@/components/products/collection-closing"
import { ProductsCatalog, type CatalogItem } from "@/components/products/products-catalog"
import { products, type ProductCategory } from "@/components/products/product-catalog"
import { brandProfiles } from "@/lib/configurator/catalog"

export const metadata: Metadata = {
  title: "All Windows & Doors | EcoGlass",
  description:
    "Browse the full EcoGlass catalog of windows and doors. Explore every style — from awning and casement windows to entry, sliding, and patio doors.",
}

const items: CatalogItem[] = products.map(({ slug, name, category, title, summary, heroImage, heroAlt, brands }) => ({
  slug,
  name,
  category,
  title,
  summary,
  heroImage,
  heroAlt,
  brandCount: brands.length,
}))

function toFilter(value?: string): "All" | ProductCategory {
  if (value === "windows") return "Windows"
  if (value === "doors") return "Doors"
  return "All"
}

export default async function ProductsCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  return (
    <SiteShell overlayHeader>
      <main>
        <CatalogHero items={items} brandCount={brandProfiles.length} />
        <ProductsCatalog items={items} initialFilter={toFilter(category)} />
        <CatalogBrands />
        <CollectionClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

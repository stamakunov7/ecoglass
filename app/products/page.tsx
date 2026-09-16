import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { ProductsCatalog, type CatalogItem } from "@/components/products/products-catalog"
import { products, type ProductCategory } from "@/components/products/product-catalog"

export const metadata: Metadata = {
  title: "All Windows & Doors | EcoGlass",
  description:
    "Browse the full EcoGlass catalog of windows and doors. Explore every style — from awning and casement windows to entry, sliding, and patio doors.",
}

const items: CatalogItem[] = products.map(({ slug, name, category, title, heroImage, heroAlt }) => ({
  slug,
  name,
  category,
  title,
  heroImage,
  heroAlt,
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
  const initialFilter = toFilter(category)

  return (
    <SiteShell>
      <main>
        {/* Catalog header */}
        <section className="bg-offwhite">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cta">Catalog</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-forest text-balance sm:text-5xl">
              Windows &amp; Doors
            </h1>
            <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Explore the full EcoGlass lineup. Every style is available from several trusted brands, so you can match
              your home&apos;s look, performance needs, and budget.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="bg-background">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8">
            <ProductsCatalog items={items} initialFilter={initialFilter} />
          </div>
        </section>

        {/* Editorial breathing space before the footer */}
        <div aria-hidden="true" className="h-10 bg-background sm:h-14 lg:h-16" />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

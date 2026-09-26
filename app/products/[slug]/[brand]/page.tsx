import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { ReviewsSection } from "@/components/reviews-section"
import { ProductBrandPage } from "@/components/configurator/product-brand-page"
import { getProduct, products, type Product } from "@/components/products/product-catalog"
import { brandSlugs, getBrandProfile, getWindowKind, getWindowOptions } from "@/lib/configurator/catalog"

// Only the known product × brand combinations exist; anything else is a 404.
export const dynamicParams = false

export function generateStaticParams() {
  return products.flatMap((product) => brandSlugs.map((brand) => ({ slug: product.slug, brand })))
}

/** "Awning" → "Awning Window", "Entry Doors" → "Entry Door" */
function singular(product: Product) {
  return product.category === "Windows" ? `${product.name} Window` : product.name.replace(/Doors$/, "Door")
}

type Params = { params: Promise<{ slug: string; brand: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug, brand } = await params
  const product = getProduct(slug)
  const profile = getBrandProfile(brand)
  if (!product || !profile) return { title: "Product Not Found | EcoGlass" }
  return {
    title: `${profile.name} ${singular(product)} | EcoGlass`,
    description: `${profile.tagline} ${profile.description} Design yours online and request a free quote from EcoGlass.`,
  }
}

export default async function ProductBrandRoute({ params }: Params) {
  const { slug, brand } = await params
  const product = getProduct(slug)
  const profile = getBrandProfile(brand)
  if (!product || !profile) notFound()

  const kind = getWindowKind(product.slug)
  const current = product.brands.find((b) => b.slug === profile.slug)
  const others = product.brands
    .filter((b) => b.slug !== profile.slug)
    .flatMap((b) => {
      const other = getBrandProfile(b.slug)
      return other ? [{ profile: other, image: b.image, alt: b.alt, href: b.href }] : []
    })

  return (
    <SiteShell>
      <main>
        <ProductBrandPage
          productLabel={singular(product)}
          productPlural={product.title}
          productHref={`/products/${product.slug}`}
          brand={profile}
          photo={{ src: current?.image ?? product.heroImage, alt: current?.alt ?? product.heroAlt }}
          kind={kind}
          options={kind ? getWindowOptions(kind, profile) : null}
          others={others}
          reviews={<ReviewsSection />}
        />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

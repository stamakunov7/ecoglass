import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { CollectionHero } from "@/components/products/collection-hero"
import { BrandCollection } from "@/components/products/brand-collection"
import { BrandCompare } from "@/components/products/brand-compare"
import { BrandQuiz } from "@/components/products/brand-quiz"
import { CollectionClosing } from "@/components/products/collection-closing"
import { getProduct, getProductSlugs } from "@/components/products/product-catalog"
import { FEATURED_BRAND, getBrandProfile, getWindowKind } from "@/lib/configurator/catalog"

export function generateStaticParams() {
  return getProductSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: "Product Not Found | EcoGlass" }
  return {
    title: `${product.title} | EcoGlass`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  // Products with the online designer link straight into it; the rest open the brand's detail page.
  const cta = getWindowKind(product.slug) ? "Design yours" : "View details"
  const brands = product.brands.flatMap((b) => {
    const profile = getBrandProfile(b.slug)
    if (!profile) return []
    return [
      {
        slug: profile.slug,
        name: profile.name,
        href: b.href,
        image: b.image,
        alt: b.alt,
        tagline: profile.tagline,
        highlights: profile.highlights,
        priceTier: profile.priceTier,
        bestFor: profile.bestFor,
        specs: profile.specs ?? {},
        featured: profile.slug === FEATURED_BRAND,
      },
    ]
  })
  const backdrop = brands.find((b) => b.featured)?.image ?? product.heroImage

  return (
    <SiteShell overlayHeader>
      <main>
        <CollectionHero
          category={product.category}
          name={product.name}
          title={product.title}
          image={product.heroImage}
          imageAlt={product.heroAlt}
          brandCount={brands.length}
        />
        <BrandCollection brands={brands} cta={cta} />
        <BrandCompare brands={brands} cta={cta} />
        <BrandQuiz brands={brands} backdrop={backdrop} cta={cta} />
        <CollectionClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

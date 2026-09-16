import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { ProductHero } from "@/components/products/product-hero"
import { BrandCatalogRow } from "@/components/products/brand-catalog-row"
import { getProduct, getProductSlugs } from "@/components/products/product-catalog"

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

  return (
    <SiteShell>
      <main>
        <ProductHero
          eyebrow={product.category}
          title={product.title}
          description={product.description}
          image={product.heroImage}
          imageAlt={product.heroAlt}
        />

        {/* Brand catalog */}
        <section id="brands" className="bg-background">
          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-8">
            {product.brands.map((brand, index) => (
              <BrandCatalogRow key={brand.name} brand={brand} index={index} />
            ))}
          </div>
        </section>

        {/* Editorial breathing space before the footer */}
        <div aria-hidden="true" className="h-10 bg-background sm:h-14 lg:h-16" />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

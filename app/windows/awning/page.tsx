import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { AwningHero } from "@/components/products/awning-hero"
import { BrandCatalogRow, type Brand } from "@/components/products/brand-catalog-row"
import { NovaLogo, PrestigeLogo, DuroPlastLogo, PrestigePlusLogo } from "@/components/products/brand-logos"

export const metadata: Metadata = {
  title: "Awning Windows | EcoGlass",
  description:
    "Explore awning windows from trusted brands — NOVA, PRESTIGE, DURO PLAST, and PRESTIGE+ — supplied and installed across Central Florida by EcoGlass.",
}

const brands: Brand[] = [
  {
    name: "NOVA",
    description:
      "Clean, modern windows with slim profiles and dependable ventilation. A great fit for contemporary spaces that need energy efficiency and fresh air.",
    image: "/images/awning-nova.png",
    alt: "NOVA awning window",
    href: "/windows/awning/nova",
    logo: <NovaLogo />,
  },
  {
    name: "PRESTIGE",
    description:
      "Elegant awning windows that combine designer aesthetics with advanced performance. Ideal for homeowners who want a premium finish.",
    image: "/images/awning-prestige.png",
    alt: "PRESTIGE awning window",
    href: "/windows/awning/prestige",
    logo: <PrestigeLogo />,
  },
  {
    name: "DURO PLAST",
    description:
      "Strong, practical windows built for long-lasting everyday performance. Designed to combine durability, low maintenance, and efficient airflow.",
    image: "/images/awning-duroplast.png",
    alt: "DURO PLAST awning window",
    href: "/windows/awning/duro-plast",
    logo: <DuroPlastLogo />,
  },
  {
    name: "PRESTIGE+",
    description:
      "Enhanced window systems with a sleek appearance and upgraded performance. Perfect for projects that need style, functionality, and premium details.",
    image: "/images/awning-prestige-plus.png",
    alt: "PRESTIGE+ awning window",
    href: "/windows/awning/prestige-plus",
    logo: <PrestigePlusLogo />,
  },
]

export default function AwningWindowsPage() {
  return (
    <SiteShell>
      <main>
        <AwningHero />

        {/* Brand catalog */}
        <section id="brands" className="bg-background">
          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-8">
            {brands.map((brand, index) => (
              <BrandCatalogRow key={brand.name} brand={brand} index={index} />
            ))}
          </div>
        </section>

        {/* Intentional editorial breathing space before the footer */}
        <div aria-hidden="true" className="h-20 bg-background sm:h-28 lg:h-44" />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { TrustRow } from "@/components/trust-row"
import { ProductsSection } from "@/components/products-section"
import { WhySection } from "@/components/why-section"
import { CtaFooter } from "@/components/cta-footer"
import { MobileMenu } from "@/components/mobile-menu"

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative mx-auto min-h-screen w-full max-w-[440px] overflow-hidden bg-background shadow-xl shadow-forest-deep/10">
      <SiteHeader onOpenMenu={() => setMenuOpen(true)} />
      <main>
        <HeroSection />
        <TrustRow />
        <ProductsSection />
        <WhySection />
        <CtaFooter />
      </main>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}

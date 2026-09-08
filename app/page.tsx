"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { TrustRow } from "@/components/trust-row"
import { ProductsSection } from "@/components/products-section"
import { WhySection } from "@/components/why-section"
import { ProcessSection } from "@/components/process-section"
import { FinancingSection } from "@/components/financing-section"
import { CtaFooter } from "@/components/cta-footer"
import { MobileMenu } from "@/components/mobile-menu"

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <SiteHeader onOpenMenu={() => setMenuOpen(true)} />
      <main>
        <HeroSection />
        <TrustRow />
        <ProductsSection />
        <WhySection />
        <ProcessSection />
        <FinancingSection />
        <CtaFooter />
      </main>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}

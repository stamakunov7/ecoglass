import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { CollectionClosing } from "@/components/products/collection-closing"
import { WhyHero } from "@/components/why/why-hero"
import { WhyManifesto } from "@/components/why/why-manifesto"
import { WhyPillars } from "@/components/why/why-pillars"
import { WhyReasons } from "@/components/why/why-reasons"
import { WhyCompare } from "@/components/why/why-compare"
import { WhyFlorida } from "@/components/why/why-florida"

export const metadata: Metadata = {
  title: "Why EcoGlass | Florida Window & Door Manufacturer",
  description:
    "EcoGlass manufactures custom energy-efficient, impact-rated windows and doors in Central Florida and installs them across the state. Learn why homeowners choose a local manufacturer.",
}

export default function WhyEcoGlassPage() {
  return (
    <SiteShell overlayHeader>
      <main>
        <WhyHero />
        <WhyManifesto />
        <WhyPillars />
        <WhyReasons />
        <WhyCompare />
        <WhyFlorida />
        <CollectionClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

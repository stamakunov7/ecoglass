import { SiteShell } from "@/components/site-shell"
import { HeroSection } from "@/components/hero-section"
import { TrustRow } from "@/components/trust-row"
import { ProductsSection } from "@/components/products-section"
import { WhySection } from "@/components/why-section"
import { ProcessSection } from "@/components/process-section"
import { FinancingSection } from "@/components/financing-section"
import { ReviewsSection } from "@/components/reviews-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <SiteShell>
      <main>
        <HeroSection />
        <TrustRow />
        <ProductsSection />
        <WhySection />
        <ProcessSection />
        <FinancingSection />
        <ReviewsSection />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { CollectionClosing } from "@/components/products/collection-closing"
import { DoorCarousel } from "@/components/products/door-carousel"
import { doorModels } from "@/components/products/door-catalog"
import { canonicalMeta } from "@/lib/site"

export const metadata: Metadata = {
  title: "Doors | EcoGlass Windows & Doors",
  description:
    "Sliding glass doors from NOVA, PRESTIGE and DURAPLUS, tilt & turn terrace doors, French patio doors, entry and storm doors. Made to measure and installed across Florida by EcoGlass.",
  ...canonicalMeta("/products/doors"),
}

/** What every EcoGlass glass door is built around, from the company's own door specifications. */
const BUILT_IN = [
  {
    title: "Energy efficient",
    body: "Multi-chamber profiles built to meet the latest energy standards.",
  },
  {
    title: "Less condensation",
    body: "The glass is kept apart from the steel reinforcement, which greatly reduces the risk of condensation.",
  },
  {
    title: "Quieter rooms",
    body: "Multi-chamber profiles and multiple weatherstripping keep most outside noise out.",
  },
]

export default function DoorsPage() {
  return (
    <SiteShell overlayHeader>
      <main>
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <div
            className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="absolute -top-40 left-1/3 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cta/20 blur-[120px]"
            aria-hidden="true"
          />

          <div className="flex min-h-svh flex-col justify-center pb-12 pt-[calc(var(--header-h)+2.5rem)] lg:pb-10">
            <DoorCarousel
              doors={doorModels}
              heading={
                <>
                  <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
                    <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
                    Doors
                  </p>
                  <h1
                    className="hero-reveal mt-5 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[68px]"
                    style={{ animationDelay: "150ms" }}
                  >
                    Doors made <span className="font-serif font-normal italic text-[#cfe8cf]">for Florida homes.</span>
                  </h1>
                  <p
                    className="hero-reveal mt-5 max-w-[560px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
                    style={{ animationDelay: "300ms" }}
                  >
                    Sliding, terrace, patio, entry and storm doors. Swipe through the lineup and open any door for the
                    details.
                  </p>
                </>
              }
            />
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div>
                <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
                  <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                  Built into every glass door
                </p>
                <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
                  Open wide. <span className="font-serif font-normal italic text-cta-dark">Seal tight.</span>
                </h2>
              </div>
              <p className="max-w-[420px] text-[16px] leading-relaxed text-muted-foreground">
                Every door is made to your exact opening and installed by our own crew, from the first measurement to
                the final walkthrough.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 border-t border-forest/15 sm:grid-cols-3 lg:mt-16">
              {BUILT_IN.map(({ title, body }, i) => (
                <Reveal
                  key={title}
                  delay={i * 100}
                  className={`py-8 sm:px-7 sm:first:pl-0 ${i > 0 ? "sm:border-l sm:border-forest/15" : ""}`}
                >
                  <span className="font-display text-sm font-bold tabular-nums text-cta-dark">0{i + 1}</span>
                  <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-forest">{title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CollectionClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

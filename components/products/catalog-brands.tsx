import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"
import { brandProfiles } from "@/lib/configurator/catalog"
import { PriceBars } from "./brand-collection"
import { NovaLogo, PrestigeLogo, DuroPlastLogo, PrestigePlusLogo } from "./brand-logos"

const LOGOS: Record<string, ReactNode> = {
  nova: <NovaLogo />,
  prestige: <PrestigeLogo />,
  "duro-plast": <DuroPlastLogo />,
  "prestige-plus": <PrestigePlusLogo />,
}

/** The four brands every product comes in, with their character and relative price. */
export function CatalogBrands() {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-white">
      <div
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-cta/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[760px]">
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              Four brands, every style
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
              Choose the style.{" "}
              <span className="whitespace-nowrap font-serif font-normal italic text-[#cfe8cf]">Then the brand.</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-[16px] leading-relaxed text-white/65">
            Every window and door in the catalog comes in the same four brands, from everyday value to signature finishes.
            Each product page compares them side by side.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {brandProfiles.map((brand, i) => (
            <Reveal key={brand.slug} delay={i * 90} className="h-full">
              <div className="flex h-full flex-col rounded-[24px] bg-card p-7 text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] transition-transform duration-500 hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:p-8">
                <div className="flex h-20 items-center">{LOGOS[brand.slug]}</div>
                <p className="mt-6 font-serif text-[22px] italic leading-snug text-forest">{brand.tagline}</p>
                <div className="mt-auto pt-8">
                  <div className="flex items-center justify-between border-t border-forest/10 pt-5">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Price
                    </span>
                    {brand.priceTier && <PriceBars tier={brand.priceTier} tone="light" />}
                  </div>
                  <div className="mt-4">
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Best for
                    </span>
                    <span className="mt-1 block text-[15px] font-semibold text-forest">{brand.bestFor}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

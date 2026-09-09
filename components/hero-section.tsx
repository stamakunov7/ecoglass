"use client"

import { ArrowRight } from "lucide-react"
import { useEstimate } from "./estimate-modal"

export function HeroSection() {
  const { open: openEstimate } = useEstimate()

  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/hero-home.png"
        alt="Modern Florida home at dusk with oversized glass windows and a reflecting pool"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/85 via-forest-deep/70 to-forest-deep/90 lg:bg-gradient-to-r lg:from-forest-deep/92 lg:via-forest-deep/75 lg:to-forest-deep/30" />

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col px-5 pb-9 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:min-h-[620px] lg:justify-center lg:px-8 lg:py-24 xl:min-h-[680px]">
        <div className="max-w-[680px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">
            Windows and doors, made for Florida
          </p>
          <h1 className="mt-3 text-pretty font-display text-[2.4rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
            Upgrade Your View. Improve Your Comfort.
          </h1>
          <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/80 sm:mt-5 sm:text-base lg:text-lg">
            Custom-built windows and doors manufactured, supplied, and installed by EcoGlass in Central Florida.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={openEstimate}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-6 text-[15px] font-semibold text-white shadow-lg shadow-forest-deep/40 transition-colors hover:bg-cta-dark active:bg-cta-dark sm:h-13"
            >
              Get a Free Estimate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href="#products"
              className="flex h-12 items-center justify-center rounded-xl border border-white/40 bg-white/5 px-6 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 active:bg-white/15 sm:h-13"
            >
              Explore Our Products
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

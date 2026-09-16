"use client"

import { ArrowRight, CalendarCheck } from "lucide-react"
import { useEstimate } from "../estimate-modal"

export function FinancingHero() {
  const { open: openEstimate } = useEstimate()

  return (
    <section className="relative overflow-hidden bg-forest-deep">
      <img
        src="/images/financing-hero.png"
        alt="A couple relaxing in a bright Florida living room with new EcoGlass windows and doors"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/30" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur-sm sm:text-xs">
            Financing in partnership with Synchrony
          </span>
          <h1 className="mt-5 font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            Upgrade Now, Pay Over Time
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-white/80 sm:text-lg">
            Don&apos;t let budget hold back your home upgrade. Through our partnership with Synchrony Bank, EcoGlass
            offers flexible financing so you can get the windows and doors you want, on terms that work for you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-6 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark"
            >
              Talk to us about financing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={openEstimate}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Get a Free Estimate
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

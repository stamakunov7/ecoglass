"use client"

import { ArrowRight } from "lucide-react"
import { useEstimate } from "./estimate-modal"
import { HeroVideo } from "./hero-video"

export function HeroSection() {
  const { open: openEstimate } = useEstimate()

  return (
    <section className="relative overflow-hidden bg-forest-deep">
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-forest-deep/45 to-forest-deep/85 lg:bg-gradient-to-r lg:from-forest-deep/85 lg:via-forest-deep/50 lg:to-forest-deep/10" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-h,140px))] w-full max-w-[1400px] flex-col justify-center px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="max-w-[680px]">
          <p className="hero-reveal text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs [animation-delay:150ms]">
            Windows and doors, made for Florida
          </p>
          <h1 className="hero-reveal mt-3 text-pretty font-display text-[2.4rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl xl:text-[4.25rem] [animation-delay:300ms]">
            Upgrade Your View. Improve Your Comfort.
          </h1>
          <p className="hero-reveal mt-4 max-w-[46ch] text-[15px] leading-relaxed text-white/85 sm:mt-5 sm:text-base lg:text-lg [animation-delay:480ms]">
            Custom-built windows and doors manufactured, supplied, and installed by EcoGlass in Central Florida.
          </p>

          <div className="hero-reveal mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4 [animation-delay:640ms]">
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

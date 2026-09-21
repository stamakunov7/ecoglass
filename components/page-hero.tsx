"use client"

import { ArrowRight, CalendarCheck } from "lucide-react"
import { useEstimate } from "./estimate-modal"

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  primaryHref?: string
  primaryLabel?: string
  compact?: boolean
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  primaryHref,
  primaryLabel,
  compact = false,
}: PageHeroProps) {
  const { open: openEstimate } = useEstimate()

  return (
    <section className="relative overflow-hidden bg-forest-deep">
      <img src={image} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-deep via-forest-deep/85 to-forest-deep/30" />

      <div
        className={`relative mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-8 ${
          compact ? "py-16 sm:py-20 lg:py-24" : "py-20 sm:py-24 lg:py-32"
        }`}
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white ring-1 ring-white/20 backdrop-blur-sm sm:text-xs">
            {eyebrow}
          </span>
          <h1 className="mt-5 font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-white/80 sm:text-lg">{description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            {primaryHref && primaryLabel ? (
              <a
                href={primaryHref}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-6 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark"
              >
                {primaryLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : (
              <button
                type="button"
                onClick={openEstimate}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-6 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark"
              >
                Get a Free Estimate
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            {primaryHref ? (
              <button
                type="button"
                onClick={openEstimate}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Get a Free Estimate
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import {
  ArrowRight,
  Blocks,
  Hammer,
  Headset,
  Palette,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react"
import { formatInches } from "@/lib/configurator/format"
import type { BrandProfile, StepId, WindowOptions } from "@/lib/configurator/types"
import { Swatch } from "./primitives"

type Feature = { icon: LucideIcon; title: string; body: string }

function featuresFor(brand: BrandProfile, options: WindowOptions | null): Feature[] {
  const material = { icon: Blocks, title: "Material", body: brand.material }
  if (!options) {
    return [
      material,
      { icon: Ruler, title: "Custom sizes", body: "Every unit is made to your exact opening instead of settling for stock sizes." },
      { icon: Hammer, title: "Professional installation", body: "Our in-house team installs everything and leaves your home spotless." },
      { icon: Headset, title: "Local support", body: "Adjustments, maintenance questions, and warranty support are a phone call away." },
    ]
  }
  const { sizes, interiorColors, exteriorColors, glass, grilles, hardware } = options
  const hasImpact = glass.some((g) => g.id.includes("impact"))
  const extras = [
    grilles.length > 1 ? `${grilles.length - 1} grille patterns` : "",
    hardware ? `${hardware.finishes.length} hardware finishes` : "",
  ].filter(Boolean)
  return [
    material,
    {
      icon: Palette,
      title: "Colors",
      body: `${exteriorColors.length} exterior and ${interiorColors.length} interior colors, so you can match your home inside and out.`,
    },
    {
      icon: Ruler,
      title: "Sizes",
      body: `Standard sizes from ${formatInches(Math.min(...sizes.widths))} to ${formatInches(
        Math.max(...sizes.widths),
      )} wide, or custom-built to your exact opening in 1/8" increments.`,
    },
    {
      icon: Sparkles,
      title: "Glass & accessories",
      body: `${glass.length} glass options${hasImpact ? " including impact-rated laminated glass" : ""}${
        extras.length ? `, plus ${extras.join(" and ")} to personalize the final look` : ""
      }.`,
    },
  ]
}

export function LearnTab({
  brand,
  eyebrow,
  logo,
  preview,
  photo,
  options,
  interior,
  onPickInterior,
  onDesign,
  onQuote,
  reviews,
}: {
  brand: BrandProfile
  eyebrow: string
  logo: ReactNode
  /** Live preview (with its interior/exterior toggle), or null for products without a designer. */
  preview: ReactNode | null
  photo: { src: string; alt: string }
  options: WindowOptions | null
  interior: string
  onPickInterior: (id: string) => void
  onDesign: (step?: StepId) => void
  onQuote: () => void
  reviews?: ReactNode
}) {
  const features = featuresFor(brand, options)
  // The hero already shows the brand photo when there's no live preview, so use the in-home visit photo here instead.
  const bandImage = preview
    ? photo
    : { src: "/images/estimate.png", alt: "EcoGlass professional measuring a window during an in-home estimate" }

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:px-8">
        <div>
          {preview ?? (
            <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
              <Image src={photo.src} alt={photo.alt} width={900} height={640} loading="eager" className="aspect-[4/3] w-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-4">
            <div className="shrink-0 scale-90">{logo}</div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cta">{eyebrow}</p>
              <h1 className="mt-1 font-display text-4xl font-extrabold leading-none tracking-tight text-forest sm:text-5xl">
                {brand.name}
              </h1>
            </div>
          </div>
          <p className="mt-6 font-display text-xl font-bold text-forest sm:text-2xl">{brand.tagline}</p>
          <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base">{brand.description}</p>

          <a href="#reviews" className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-forest">
            <span className="flex text-[#FBBC05]" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </span>
            <span>
              <span className="font-bold text-forest">4.7</span> · 103 Google reviews for EcoGlass
            </span>
          </a>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {options && (
              <button
                type="button"
                onClick={() => onDesign("size")}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cta px-7 text-[15px] font-semibold text-white shadow-lg shadow-cta/25 transition-all hover:bg-cta-dark hover:shadow-cta/40"
              >
                Design yours
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={onQuote}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-semibold transition-all ${
                options
                  ? "border-2 border-cta text-forest hover:bg-cta hover:text-white"
                  : "bg-cta text-white shadow-lg shadow-cta/25 hover:bg-cta-dark"
              }`}
            >
              Request a quote
            </button>
          </div>

          {options && (
            <div className="mt-9 border-t border-border pt-7">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-forest">Most popular interior options</p>
              <div className="mt-4 flex flex-wrap gap-x-2 gap-y-4">
                {options.interiorColors.slice(0, 4).map((c) => (
                  <Swatch key={c.id} name={c.name} hex={c.hex} selected={interior === c.id} onClick={() => onPickInterior(c.id)} />
                ))}
              </div>
              <button
                type="button"
                onClick={() => onDesign("interior")}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-cta"
              >
                View all options
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Is it right for you? */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <h2 className="font-display text-[1.75rem] font-extrabold leading-tight text-forest sm:text-4xl">Is it right for you?</h2>
        <div className="mt-7 overflow-hidden rounded-2xl border border-border">
          <div className="h-1.5 bg-gradient-to-r from-cta via-cta to-forest" aria-hidden="true" />
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4 bg-card p-6 sm:p-8">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-forest-deep text-white shadow-sm shadow-forest/20">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[16px] font-bold text-forest">{title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local support band */}
      <section className="bg-background">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pb-16 sm:px-6 sm:pb-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="order-2 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta">Built, supplied &amp; installed locally</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest sm:text-4xl">
              One accountable team, start to finish
            </h2>
            <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              EcoGlass handles your estimate, measurement, manufacturing, and installation under one roof in Central
              Florida. And because we&apos;re local, adjustments, maintenance questions, and warranty support are always a
              phone call away.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-forest">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-cta" aria-hidden="true" />
                Free in-home estimate
              </span>
              <span className="inline-flex items-center gap-2">
                <Hammer className="h-4 w-4 text-cta" aria-hidden="true" />
                In-house installation
              </span>
            </div>
            <button
              type="button"
              onClick={onQuote}
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-cta px-7 text-[15px] font-semibold text-forest transition-colors hover:bg-cta hover:text-white"
            >
              Request a quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
          <div className="order-1 overflow-hidden rounded-2xl border border-border shadow-sm lg:order-2">
            <Image src={bandImage.src} alt={bandImage.alt} width={900} height={640} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      {reviews}
    </>
  )
}

"use client"

import type { MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

export type CollectionBrand = {
  slug: string
  name: string
  href: string
  image: string
  alt: string
  tagline: string
  highlights: string[]
  priceTier?: number
  featured: boolean
}

const NUMBER_WORDS: Record<number, string> = { 2: "Two", 3: "Three", 4: "Four", 5: "Five" }

/** Four-segment bar showing a brand's relative price level. */
export function PriceBars({ tier, tone = "dark" }: { tier: number; tone?: "dark" | "light" }) {
  const on = tone === "dark" ? "bg-[#9fd3a2]" : "bg-cta-dark"
  const off = tone === "dark" ? "bg-white/25" : "bg-[#dfe5e1]"
  return (
    <span className="flex items-center gap-1" role="img" aria-label={`Price level ${tier} of 4`}>
      {[1, 2, 3, 4].map((n) => (
        <span key={n} className={`h-1 w-3.5 rounded-full ${n <= tier ? on : off}`} />
      ))}
    </span>
  )
}

/** Tracks the pointer so the card can paint a soft spotlight under it. */
function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
}

function BrandCard({ brand, index, cta }: { brand: CollectionBrand; index: number; cta: string }) {
  const card = (
    <article
      onMouseMove={trackSpotlight}
      className={`group relative overflow-hidden rounded-3xl bg-forest shadow-2xl shadow-black/30 transition-[transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-2.5 hover:shadow-[0_50px_90px_-30px_rgb(0_0_0/0.7),0_0_0_1px_rgb(159_211_162/0.45),0_0_60px_-10px_rgb(95_180_110/0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        // The featured card sits inside a 2px animated border, so it is 4px shorter to keep the row aligned.
        brand.featured ? "h-[516px] lg:h-[596px]" : "h-[520px] lg:h-[600px]"
      }`}
    >
      <Image
        src={brand.image}
        alt={brand.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_26_21/0.15)_0%,rgb(8_26_21/0)_25%,rgb(8_26_21/0.7)_52%,rgb(8_26_21/0.97)_100%)]"
        aria-hidden="true"
      />
      {/* Pointer spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(255 255 255 / 0.13), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-x-[18px] top-[18px] flex items-center justify-between">
        {brand.featured ? (
          <span className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-forest-deep backdrop-blur-xl">
            <span className="soft-pulse h-[7px] w-[7px] rounded-full bg-cta" aria-hidden="true" />
            MOST POPULAR
          </span>
        ) : (
          <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[11px] font-bold tracking-[0.16em] text-white backdrop-blur-xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {brand.priceTier && (
          <span className="rounded-full border border-white/20 bg-[rgb(8_26_21/0.35)] px-3 py-2.5 backdrop-blur-xl">
            <PriceBars tier={brand.priceTier} />
          </span>
        )}
      </div>

      <div className="absolute inset-x-6 bottom-6 flex flex-col gap-3">
        <h3 className="font-display text-[28px] font-extrabold tracking-[-0.01em] text-white lg:text-[32px]">{brand.name}</h3>
        <p className="font-serif text-[21px] italic leading-tight text-[#cfe8cf]">{brand.tagline}</p>
        <ul className="mt-1 flex flex-col gap-1.5 text-[14px] text-[#dbe5e0]">
          {brand.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2.5">
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-[#9fd3a2]" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <Link
          href={brand.href}
          className={`shine mt-2.5 flex h-[50px] items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-colors ${
            brand.featured
              ? "bg-white font-bold text-forest"
              : "border border-white/35 bg-white/15 text-white backdrop-blur-xl hover:bg-white/25"
          }`}
        >
          {cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only"> — {brand.name}</span>
        </Link>
      </div>
    </article>
  )

  return brand.featured ? <div className="spin-border rounded-[26px] p-[2px]">{card}</div> : card
}

export function BrandCollection({ brands, cta }: { brands: CollectionBrand[]; cta: string }) {
  const count = NUMBER_WORDS[brands.length] ?? String(brands.length)
  return (
    <section
      id="brands"
      className="scroll-mt-24 bg-forest-deep bg-[radial-gradient(1100px_520px_at_50%_0%,rgb(62_142_65/0.22),rgb(62_142_65/0)_70%)]"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <Reveal className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              The collection
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {count} brands. <span className="font-serif font-normal italic text-[#cfe8cf]">One</span> local team.
            </h2>
          </div>
          <p className="text-[16px] leading-relaxed text-[#b9c8c2] sm:text-[17px]">
            Every brand is built to your exact opening and installed by our in-house crew. What changes is the style, the
            performance, and the budget — pick the one that fits your home.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-[22px]">
          {brands.map((brand, i) => (
            <Reveal key={brand.slug} delay={i * 90}>
              <BrandCard brand={brand} index={i} cta={cta} />
            </Reveal>
          ))}
        </div>

        {brands.some((b) => b.priceTier) && (
          <p className="mt-7 flex items-center gap-2.5 text-[13px] text-[#9fb3ab]">
            <span className="flex gap-[3px]" aria-hidden="true">
              <span className="h-[3px] w-3 rounded-full bg-[#9fd3a2]" />
              <span className="h-[3px] w-3 rounded-full bg-white/25" />
            </span>
            Bars show relative price level, from everyday to signature.
          </p>
        )}
      </div>
    </section>
  )
}

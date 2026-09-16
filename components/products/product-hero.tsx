"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ArrowDown } from "lucide-react"

function scrollToBrands() {
  const el = document.getElementById("brands")
  if (!el) return
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
}

type ProductHeroProps = {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
}

export function ProductHero({ eyebrow, title, description, image, imageAlt }: ProductHeroProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Staggered reveal helper: opacity + translateY.
  const reveal = () =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`

  return (
    <section className="relative flex min-h-[32rem] items-center overflow-hidden bg-offwhite sm:min-h-[36rem]">
      {/* Background image */}
      <Image src={image || "/placeholder.svg"} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/80" aria-hidden="true" />

      {/* Centered content */}
      <div className="relative mx-auto w-full max-w-[760px] px-5 py-14 text-center sm:px-6 sm:py-16">
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-cta ${reveal()}`}>{eyebrow}</p>
        <h1
          className={`mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-forest text-balance sm:text-6xl ${reveal()}`}
          style={{ transitionDelay: mounted ? "120ms" : "0ms" }}
        >
          {title}
        </h1>
        <p
          className={`mx-auto mt-5 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground sm:text-lg ${reveal()}`}
          style={{ transitionDelay: mounted ? "240ms" : "0ms" }}
        >
          {description}
        </p>
        <div className={reveal()} style={{ transitionDelay: mounted ? "360ms" : "0ms" }}>
          <button
            type="button"
            onClick={scrollToBrands}
            className="group mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-7 text-[15px] font-semibold text-white shadow-lg shadow-forest-deep/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-dark hover:shadow-xl hover:shadow-forest-deep/30"
          >
            Explore Brands
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Scroll cue */}
        <button
          type="button"
          onClick={scrollToBrands}
          aria-label="Scroll to explore brands"
          className={`mx-auto mt-8 flex flex-col items-center gap-2 text-muted-foreground transition-all duration-700 ease-out motion-reduce:transition-none ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: mounted ? "520ms" : "0ms" }}
        >
          <ArrowDown className="h-5 w-5 animate-bounce text-forest motion-reduce:animate-none" aria-hidden="true" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">Scroll to Explore</span>
        </button>
      </div>
    </section>
  )
}

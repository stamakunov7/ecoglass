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

export function AwningHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  // Staggered reveal helper: opacity + translateY, offset per element.
  const reveal = (order: number) =>
    `transition-all duration-700 ease-out motion-reduce:transition-none ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`

  return (
    <section className="relative flex min-h-[calc(100vh-8.25rem)] items-center overflow-hidden bg-offwhite">
      {/* Background image */}
      <Image
        src="/images/awning-hero.png"
        alt="Modern black-framed awning window open on a premium Florida home"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Readability overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white/80"
        aria-hidden="true"
      />

      {/* Centered content */}
      <div className="relative mx-auto w-full max-w-[760px] px-5 py-20 text-center sm:px-6 sm:py-24">
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-cta ${reveal(0)}`}>Windows</p>
        <h1
          className={`mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-forest text-balance sm:text-6xl ${reveal(1)}`}
          style={{ transitionDelay: mounted ? "120ms" : "0ms" }}
        >
          Awning Windows
        </h1>
        <p
          className={`mx-auto mt-5 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground sm:text-lg ${reveal(2)}`}
          style={{ transitionDelay: mounted ? "240ms" : "0ms" }}
        >
          EcoGlass offers awning windows from several trusted brands, giving you options to match your style,
          performance needs, and budget. Find the perfect awning window for your home.
        </p>
        <div
          className={reveal(3)}
          style={{ transitionDelay: mounted ? "360ms" : "0ms" }}
        >
          <button
            type="button"
            onClick={scrollToBrands}
            className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-7 text-[15px] font-semibold text-white shadow-lg shadow-forest-deep/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-dark hover:shadow-xl hover:shadow-forest-deep/30"
          >
            Explore Brands
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>

        {/* Scroll cue */}
        <button
          type="button"
          onClick={scrollToBrands}
          aria-label="Scroll to explore brands"
          className={`mx-auto mt-12 flex flex-col items-center gap-2 text-muted-foreground transition-all duration-700 ease-out motion-reduce:transition-none ${
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

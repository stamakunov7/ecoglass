"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"
import { glideTo } from "@/lib/smooth-scroll"
import type { CatalogItem } from "./products-catalog"

const SLIDE_MS = 5000

const pad = (n: number) => String(n).padStart(2, "0")

const NUMBER_WORDS: Record<number, string> = { 2: "two", 3: "three", 4: "four", 5: "five" }

function scrollToCatalog() {
  const catalog = document.getElementById("catalog")
  if (catalog) glideTo(catalog, 1.6)
}

/** Full-screen hero that slowly cycles through every product, with a "now showing" ticker along the bottom. */
export function CatalogHero({ items, brandCount }: { items: CatalogItem[]; brandCount: number }) {
  const windowCount = items.filter((i) => i.category === "Windows").length
  const doorCount = items.length - windowCount
  const { open: openEstimate } = useEstimate()
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(true)
  // Only photos that have been shown (plus the next one) are mounted, so the page doesn't load all of them up front.
  const [mounted, setMounted] = useState(() => new Set([0, 1]))

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false)
  }, [])

  useEffect(() => {
    setMounted((prev) => {
      const next = (index + 1) % items.length
      if (prev.has(index) && prev.has(next)) return prev
      return new Set(prev).add(index).add(next)
    })
    if (!auto) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % items.length), SLIDE_MS)
    return () => window.clearTimeout(timer)
  }, [index, auto, items.length])

  const current = items[index]

  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-white">
      {items.map((item, i) =>
        mounted.has(i) ? (
          <Image
            key={item.slug}
            src={item.heroImage}
            alt={i === index ? item.heroAlt : ""}
            fill
            preload={i === 0}
            sizes="100vw"
            className={`-z-20 object-cover transition-[opacity,transform] ease-out motion-reduce:transition-none ${
              i === index
                ? "scale-100 opacity-100 [transition-duration:1400ms,7000ms]"
                : "scale-[1.08] opacity-0 [transition-duration:1400ms,0ms] [transition-delay:0ms,1400ms]"
            }`}
          />
        ) : null,
      )}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.9)_0%,rgb(8_26_21/0.62)_45%,rgb(8_26_21/0.2)_78%,rgb(8_26_21/0.12)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.55)_0%,rgb(8_26_21/0.88)_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-[rgb(8_26_21/0.85)] to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-svh w-full max-w-[1400px] flex-col justify-end px-5 pb-8 pt-[calc(var(--header-h)+3rem)] sm:px-6 lg:px-8 lg:pb-10">
        <div className="max-w-[760px]">
          <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
            The EcoGlass catalog
          </p>
          <h1
            className="hero-reveal mt-6 font-display text-5xl font-extrabold leading-[0.96] tracking-[-0.04em] sm:text-7xl lg:text-[96px]"
            style={{ animationDelay: "150ms" }}
          >
            Every window.
            <br />
            <span className="font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]">Every door.</span>
          </h1>
          <p
            className="hero-reveal mt-6 max-w-[540px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            {windowCount} window styles in {NUMBER_WORDS[brandCount] ?? brandCount} brands and {doorCount} door models, all made
            to measure in our Longwood factory.
          </p>
          <div className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "450ms" }}>
            <button
              type="button"
              onClick={scrollToCatalog}
              className="shine group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
            >
              Explore the catalog
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={openEstimate}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
            >
              Get a free estimate
            </button>
          </div>
        </div>

        {/* Now showing */}
        <div
          className="hero-reveal mt-14 flex flex-col gap-4 border-t border-white/15 pt-5 lg:mt-20 lg:flex-row lg:items-center lg:justify-between"
          style={{ animationDelay: "650ms" }}
        >
          <Link href={current.href} className="group flex min-w-0 items-baseline gap-4">
            <span className="shrink-0 font-display text-[13px] font-bold tabular-nums tracking-[0.08em] text-[#9fd3a2]">
              {pad(index + 1)} / {pad(items.length)}
            </span>
            <span key={current.slug} className="hero-reveal truncate font-display text-lg font-bold sm:text-xl">
              {current.title}
            </span>
            <ArrowUpRight
              className="h-4 w-4 shrink-0 self-center text-white/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
              aria-hidden="true"
            />
          </Link>
          <div className="flex items-center gap-1.5" role="group" aria-label="Choose a product to show">
            {items.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${item.title}`}
                aria-current={i === index}
                className="group flex h-6 items-center"
              >
                <span className="relative block h-[3px] w-4 overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/40 sm:w-6">
                  {i === index && (
                    <span
                      key={`${index}-${auto}`}
                      className="absolute inset-0 origin-left rounded-full bg-[#9fd3a2]"
                      style={auto ? { animation: `fill-x ${SLIDE_MS}ms linear forwards` } : undefined}
                    />
                  )}
                  {i < index && <span className="absolute inset-0 rounded-full bg-white/55" />}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

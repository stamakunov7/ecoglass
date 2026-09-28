"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"

const NUMBER_WORDS: Record<number, string> = { 2: "two", 3: "three", 4: "four", 5: "five" }

function scrollToBrands() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.getElementById("brands")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
}

/** Counts from 0 up to `value` once, after `delay` ms. Renders the final value on the server. */
function useCountUp(value: number, delay: number, decimals = 0) {
  const [current, setCurrent] = useState(value)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    setCurrent(0)
    const timeout = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400)
        const eased = 1 - Math.pow(1 - t, 3)
        setCurrent(value * eased)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [value, delay])
  return current.toFixed(decimals)
}

export function CollectionHero({
  category,
  name,
  title,
  image,
  imageAlt,
  brandCount,
}: {
  category: string
  name: string
  title: string
  image: string
  imageAlt: string
  brandCount: number
}) {
  const { open: openEstimate } = useEstimate()
  const photoRef = useRef<HTMLDivElement>(null)
  const rating = useCountUp(4.7, 900, 1)
  const reviews = useCountUp(103, 900)
  const count = NUMBER_WORDS[brandCount] ?? String(brandCount)

  // Gentle parallax: the photo drifts slower than the page while the hero is on screen.
  useEffect(() => {
    const node = photoRef.current
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        if (y < window.innerHeight * 1.2) node.style.transform = `translate3d(0, ${y * 0.25}px, 0)`
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  const stats = [
    { value: `${brandCount} brands`, label: "Compared side by side" },
    { value: "Made to measure", label: "Built to your exact opening" },
    { value: "Made locally", label: "Built in Central Florida" },
    { value: `${rating} ★`, label: `${reviews} Google reviews` },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-white">
      <div ref={photoRef} className="absolute inset-0 -z-20 will-change-transform">
        <Image src={image} alt={imageAlt} fill preload sizes="100vw" className="ken-burns object-cover" />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.94)_0%,rgb(8_26_21/0.8)_40%,rgb(8_26_21/0.2)_78%,rgb(8_26_21/0)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.55)_0%,rgb(8_26_21/0.9)_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-b from-transparent to-[rgb(8_26_21/0.75)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-[640px] w-full max-w-[1400px] flex-col justify-between gap-14 px-5 pb-8 pt-16 sm:px-6 sm:pt-24 lg:min-h-[max(680px,calc(100svh-var(--header-h,140px)))] lg:px-8 lg:pb-10">
        <div className="max-w-[720px]">
          <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
            {category} · The {name} collection
          </p>
          <h1
            className="hero-reveal mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.035em] text-balance sm:text-7xl lg:text-[88px]"
            style={{ animationDelay: "150ms" }}
          >
            {title},{" "}
            <span className="font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]">made to measure.</span>
          </h1>
          <p
            className="hero-reveal mt-6 max-w-[560px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            {count.charAt(0).toUpperCase() + count.slice(1)} trusted brands, each built to your exact opening and installed
            by our own crew in Central Florida.
          </p>
          <div
            className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "450ms" }}
          >
            <button
              type="button"
              onClick={scrollToBrands}
              className="shine group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
            >
              Explore the {count} brands
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={openEstimate}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
            >
              Book a free in-home visit
            </button>
          </div>
        </div>

        <dl
          className="hero-reveal grid grid-cols-2 overflow-hidden rounded-[22px] border border-white/20 bg-white/10 backdrop-blur-xl backdrop-saturate-150 lg:grid-cols-4"
          style={{ animationDelay: "650ms" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col gap-1 px-5 py-4 sm:px-8 sm:py-6 ${i % 2 === 0 ? "border-r border-white/15" : ""} ${
                i < 2 ? "border-b border-white/15 lg:border-b-0" : ""
              } ${i === 1 ? "lg:border-r" : ""}`}
            >
              <dt className="order-2 text-[12px] text-[#c3d0ca] sm:text-[13px]">{s.label}</dt>
              <dd className="order-1 font-display text-lg font-extrabold tabular-nums sm:text-2xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

"use client"

import { ArrowRight } from "lucide-react"
import { useEstimate } from "./estimate-modal"
import { HeroVideo } from "./hero-video"
import { useCountUp } from "@/lib/use-count-up"
import { glideTo } from "@/lib/smooth-scroll"

function scrollToProducts() {
  const products = document.getElementById("products")
  if (products) glideTo(products, 1.4)
}

export function HeroSection() {
  const { open: openEstimate } = useEstimate()
  const rating = useCountUp(4.7, 1300, 1)
  const reviews = useCountUp(103, 1300)

  const facts = [
    { key: "measure", value: "Made to measure", label: "Built to your exact opening" },
    { key: "local", value: "Made in Longwood", label: "Local manufacturing" },
    { key: "crews", value: "In-house crews", label: "Never subcontracted" },
    { key: "reviews", value: `${rating} ★`, label: `${reviews} Google reviews` },
  ]

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-forest-deep text-white">
      <div className="absolute inset-0 -z-20">
        <HeroVideo />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.85)_0%,rgb(8_26_21/0.55)_45%,rgb(8_26_21/0.12)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.6)_0%,rgb(8_26_21/0.45)_45%,rgb(8_26_21/0.88)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-b from-transparent to-[rgb(8_26_21/0.8)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between gap-14 px-5 pb-6 pt-[calc(var(--header-h)+3.5rem)] sm:px-6 sm:pt-[calc(var(--header-h)+5rem)] lg:px-8 lg:pb-8">
        <div className="my-auto max-w-[860px]">
          <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
            Windows and doors, made for Florida
          </p>
          <h1 className="mt-6 font-display text-[2.9rem] font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[92px]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="mask-reveal inline-block" style={{ animationDelay: "250ms" }}>
                Upgrade your view.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="mask-reveal inline-block" style={{ animationDelay: "420ms" }}>
                Improve your{" "}
                <span className="font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]">comfort.</span>
              </span>
            </span>
          </h1>
          <p
            className="hero-reveal mt-5 max-w-[540px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
            style={{ animationDelay: "650ms" }}
          >
            Custom-built windows and doors, manufactured in Central Florida and installed by EcoGlass across the state.
          </p>
          <div
            className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "800ms" }}
          >
            <button
              type="button"
              onClick={openEstimate}
              className="shine group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
            >
              Get a free estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollToProducts}
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
            >
              Explore our products
            </button>
          </div>
        </div>

        <div
          className="hero-reveal grid grid-cols-2 gap-y-5 border-t border-white/15 pt-6 lg:grid-cols-4 lg:gap-y-0"
          style={{ animationDelay: "950ms" }}
        >
          {facts.map(({ key, value, label }, i) => (
            <div key={key} className={`pr-3 lg:px-6 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-white/15" : ""}`}>
              <p className="font-display text-lg font-extrabold tabular-nums tracking-[-0.01em] sm:text-xl">{value}</p>
              <p className="mt-0.5 text-[13px] text-white/65">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

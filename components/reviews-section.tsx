"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import { ArrowUpRight, PenLine } from "lucide-react"
import { Reveal } from "./reveal"

const PLACE_ID = "ChIJ52NeRhRy54gRw-TSUPoZ1vA"
const REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`
const LISTING_URL = "https://www.google.com/maps?cid=17354086777007301827"
const RATING = 4.7
const COUNT = 103
const TURN_MS = 8000

type Review = {
  name: string
  stars: number
  tag?: string
  text: string
}

const reviews: Review[] = [
  {
    name: "Tami Cinquemani",
    stars: 5,
    tag: "Local Guide",
    text: "I had replaced my home windows with ECO Glass several years ago and was so impressed with the high quality and the energy savings.",
  },
  {
    name: "Keri Troyano",
    stars: 5,
    text: "The buying process was extremely simple. The windows arrived in excellent condition and appear to be a high-end quality product.",
  },
  {
    name: "Jeff Cokeroft",
    stars: 4,
    tag: "Local Guide",
    text: "We had 8 windows installed by this company. We picked them because the price was the best for our budget, and the salesman was friendly, prompt and very sharp.",
  },
]

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100))
  const star = (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8L10 1.5z"
      />
    </svg>
  )
  return (
    <span className="relative inline-flex" role="img" aria-label={`${value} out of 5 stars`}>
      <span className="inline-flex text-border">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i}>{star}</span>
        ))}
      </span>
      <span className="absolute inset-0 inline-flex overflow-hidden text-[#FBBC05]" style={{ width: `${pct}%` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i}>{star}</span>
        ))}
      </span>
    </span>
  )
}

export function ReviewsSection() {
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  // Bumps on every change so the new quote replays its word-by-word entrance.
  const [turn, setTurn] = useState(0)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false)
    const node = stageRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const running = auto && inView && !paused

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => show((active + 1) % reviews.length), TURN_MS)
    return () => window.clearTimeout(timer)
  }, [running, active, turn])

  function show(index: number) {
    setActive(index)
    setTurn((t) => t + 1)
  }

  return (
    <section id="reviews" className="bg-offwhite">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-start gap-14 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-8 lg:py-32">
        {/* Heading + rating */}
        <Reveal>
          <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
            <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
            Reviews
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest text-balance sm:text-5xl lg:text-[64px]">
            Trusted by <span className="font-serif font-normal italic text-cta-dark">Florida homeowners.</span>
          </h2>

          <div className="relative isolate mt-10 overflow-hidden rounded-[28px] bg-forest-deep p-7 text-white shadow-[0_40px_80px_-40px_rgb(13_44_37/0.6)] sm:p-9">
            <div
              className="absolute -right-24 -top-24 -z-10 h-64 w-64 rounded-full bg-cta/25 blur-[80px]"
              aria-hidden="true"
            />
            <div className="flex items-end gap-5">
              <span className="font-display text-[88px] font-extrabold leading-[0.8] tracking-[-0.05em] sm:text-[112px]">
                {RATING.toFixed(1)}
              </span>
              <div className="pb-1.5">
                <Stars value={RATING} className="h-[22px] w-[22px]" />
                <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-white/70">
                  <GoogleG className="h-4 w-4" />
                  {COUNT} Google reviews
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/15 pt-6">
              <a
                href={REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shine inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-6 text-[15px] font-bold text-forest transition-transform hover:-translate-y-0.5"
              >
                <PenLine className="h-4 w-4" aria-hidden="true" />
                Leave a review
              </a>
              <a
                href={LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-semibold text-white/85 transition-colors hover:text-white"
              >
                Read all reviews
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Reveal>

        {/* One quote at a time */}
        <Reveal delay={120}>
          <div
            ref={stageRef}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative lg:pt-6"
          >
            <span
              className="pointer-events-none absolute -left-1 -top-14 select-none font-serif text-[180px] leading-none text-cta/15 sm:-top-16 sm:text-[220px]"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            {/* Every quote sits in the same cell, so the stage is as tall as the longest one and never jumps. */}
            <div className="relative grid">
              {reviews.map(({ name, stars, tag, text }, i) => {
                const current = i === active
                return (
                  <figure
                    key={name}
                    aria-hidden={!current}
                    className={`[grid-area:1/1] transition-opacity duration-500 ${
                      current ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Stars value={stars} className="h-[18px] w-[18px]" />
                      <GoogleG className="h-[18px] w-[18px]" />
                    </div>
                    <blockquote className="mt-7 font-serif text-[28px] leading-[1.22] tracking-[-0.01em] text-forest sm:text-[36px] lg:text-[42px]">
                      {current && auto
                        ? text.split(" ").map((word, w) => (
                            <Fragment key={`${turn}-${w}`}>
                              <span className="word-in inline-block" style={{ animationDelay: `${w * 28}ms` }}>
                                {word}
                              </span>{" "}
                            </Fragment>
                          ))
                        : text}
                    </blockquote>
                    <figcaption className="mt-9 flex items-center gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-forest to-forest-deep text-[15px] font-bold text-white">
                        {name.charAt(0)}
                      </span>
                      <span>
                        <span className="block text-[16px] font-bold leading-tight text-forest">{name}</span>
                        <span className="text-[13px] text-muted-foreground">
                          {tag ? `${tag} · ` : ""}Google review
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                )
              })}
            </div>

            {/* Reviewer tabs with a progress line on the active one */}
            <div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6" role="group" aria-label="Choose a review">
              {reviews.map(({ name }, i) => {
                const current = i === active
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => show(i)}
                    aria-pressed={current}
                    className="group text-left"
                  >
                    <span className="relative block h-[2px] overflow-hidden rounded-full bg-forest/15">
                      {current && (
                        <span
                          key={turn}
                          className="absolute inset-0 origin-left bg-forest"
                          style={
                            auto
                              ? {
                                  animation: `fill-x ${TURN_MS}ms linear forwards`,
                                  animationPlayState: running ? "running" : "paused",
                                }
                              : undefined
                          }
                        />
                      )}
                    </span>
                    <span
                      className={`mt-3 block truncate text-[13px] font-semibold transition-colors sm:text-[14px] ${
                        current ? "text-forest" : "text-muted-foreground group-hover:text-forest"
                      }`}
                    >
                      <span className="sm:hidden">{name.split(" ")[0]}</span>
                      <span className="hidden sm:inline">{name}</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

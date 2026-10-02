"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"
import { PROCESS_STEPS } from "./process-steps-data"

const VIDEO = {
  desktop: "/videos/process-hero.mp4",
  mobile: "/videos/process-hero-720.mp4",
  poster: "/images/process-hero-poster.webp",
}

const WORDS = [
  { text: "Simple.", accent: false },
  { text: "Clear.", accent: false },
  { text: "Efficient.", accent: true },
]

function scrollToId(id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
}

export function ProcessHero() {
  const { open: openEstimate } = useEstimate()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // A cached video can fire canplay before hydration attaches onCanPlay.
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) setReady(true)
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => (reduceMotion.matches ? video.pause() : video.play().catch(() => {}))
    sync()
    reduceMotion.addEventListener("change", sync)
    return () => reduceMotion.removeEventListener("change", sync)
  }, [])

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-forest-deep text-white">
      <img src={VIDEO.poster} alt="" aria-hidden="true" className="absolute inset-0 -z-30 h-full w-full object-cover" />
      <video
        ref={videoRef}
        poster={VIDEO.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 -z-20 h-full w-full scale-[1.03] object-cover transition-opacity duration-[1400ms] ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={VIDEO.mobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={VIDEO.desktop} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.9)_0%,rgb(8_26_21/0.66)_45%,rgb(8_26_21/0.3)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.55)_0%,rgb(8_26_21/0.85)_75%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-b from-transparent to-[rgb(8_26_21/0.85)]"
        aria-hidden="true"
      />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-between gap-16 px-5 pb-6 pt-[calc(var(--header-h)+4rem)] sm:px-6 sm:pt-[calc(var(--header-h)+6rem)] lg:px-8 lg:pb-8">
        <div className="max-w-[820px]">
          <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
            Our process
          </p>
          <h1 className="mt-6 font-display text-[3.4rem] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[104px]">
            {WORDS.map(({ text, accent }, i) => (
              <span key={text} className="inline-block overflow-hidden pb-[0.12em] pr-[0.22em] align-bottom">
                <span
                  className={`mask-reveal inline-block ${
                    accent ? "font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]" : ""
                  }`}
                  style={{ animationDelay: `${200 + i * 140}ms` }}
                >
                  {text}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="hero-reveal mt-5 max-w-[560px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
            style={{ animationDelay: "650ms" }}
          >
            Replacing windows and doors should not be stressful. Here is exactly what happens from your first call to
            the final walkthrough, with EcoGlass handling every step in between.
          </p>
          <div
            className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "800ms" }}
          >
            <button
              type="button"
              onClick={() => scrollToId("steps")}
              className="shine group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
            >
              See how it works
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

        <nav
          aria-label="The four steps"
          className="hero-reveal grid grid-cols-2 border-t border-white/15 lg:grid-cols-4"
          style={{ animationDelay: "950ms" }}
        >
          {PROCESS_STEPS.map((step, i) => (
            <a
              key={step.title}
              href={`#step-${i + 1}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToId(`step-${i + 1}`)
              }}
              className="group relative flex items-center gap-3 py-5 pr-3 lg:border-l lg:border-white/15 lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              {/* A line that draws across the top edge on hover */}
              <span
                className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[#9fd3a2] transition-transform duration-500 group-hover:scale-x-100 lg:left-6 lg:group-first:left-0"
                aria-hidden="true"
              />
              <span className="font-display text-sm font-bold tabular-nums text-[#9fd3a2]">0{i + 1}</span>
              <span className="text-[14px] font-semibold text-white/80 transition-colors group-hover:text-white sm:text-[15px]">
                {step.short}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}

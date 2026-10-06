"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, Check, Phone } from "lucide-react"
import { glideTo } from "@/lib/smooth-scroll"

/** Frames of the construction time-lapse: a full-width set and a building-centered set for portrait screens. */
const FRAME_COUNT = 81
const frameSrc = (set: "d" | "m", i: number) => `/commercial/build/${set}/${String(i).padStart(3, "0")}.webp`

/** Each stage owns a slice of the film's progress, matching what happens on screen. */
const PHASES = [
  {
    from: 0,
    to: 0.27,
    label: "Plans, takeoff & bid",
    body: "While the structure goes up, we take off every opening from your drawings and send a clear, itemized bid.",
  },
  {
    from: 0.27,
    to: 0.47,
    label: "Submittals & production",
    body: "Product documentation and permits are handled while your units are built in our Longwood factory.",
  },
  {
    from: 0.47,
    to: 0.76,
    label: "Phased delivery & install",
    body: "Windows and doors arrive and go in floor by floor, as each phase of the building is ready.",
  },
  {
    from: 0.76,
    to: 1.01,
    label: "Closeout",
    body: "Final walkthrough, punch list and warranty paperwork. Lights on, ready for residents.",
  },
]

const FLOORS = 7
const FACTS = [
  { value: "Factory-direct", label: "Built in Longwood, FL" },
  { value: "Licensed GC", label: "We can run the whole scope" },
  { value: "Phased deliveries", label: "Scheduled around your build" },
  { value: "In-house crews", label: "Supply, or supply & install" },
]

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * The commercial hero: a pinned construction time-lapse that the visitor scrubs by scrolling, with the
 * project's stages and a small project tracker riding on top.
 */
export function BuildSequence() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [film, setFilm] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!section || !canvas || !ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let set: "d" | "m" = window.innerWidth / window.innerHeight < 0.9 ? "m" : "d"
    let images: HTMLImageElement[] = []
    let frame = 0
    let lastDrawn = -1

    // Load the first frame right away, then fill in the rest coarse-to-fine so scrubbing works early.
    const load = () => {
      images = Array.from({ length: FRAME_COUNT }, () => new Image())
      const order: number[] = []
      for (const step of [FRAME_COUNT - 1, 16, 8, 4, 2, 1]) {
        for (let i = 0; i < FRAME_COUNT; i += step) if (!order.includes(i)) order.push(i)
      }
      if (!order.includes(FRAME_COUNT - 1)) order.push(FRAME_COUNT - 1)
      order.forEach((i) => {
        const img = images[i]
        img.decoding = "async"
        img.onload = () => {
          lastDrawn = -1
          schedule()
        }
        img.src = frameSrc(set, i)
      })
    }

    const nearestLoaded = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        if (images[i - d]?.complete && images[i - d].naturalWidth) return images[i - d]
        if (images[i + d]?.complete && images[i + d].naturalWidth) return images[i + d]
      }
      return null
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      lastDrawn = -1
    }

    // Wide screens fill the frame edge to edge; portrait screens fit the building to the width.
    const paint = (img: HTMLImageElement, alpha: number) => {
      const cw = canvas.width
      const ch = canvas.height
      const portrait = cw / ch < 0.9
      const scale = portrait ? cw / img.naturalWidth : Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
      const w = img.naturalWidth * scale
      const h = img.naturalHeight * scale
      ctx.globalAlpha = alpha
      ctx.drawImage(img, (cw - w) / 2, portrait ? ch * 0.54 - h * 0.45 : (ch - h) / 2, w, h)
      ctx.globalAlpha = 1
    }

    const update = () => {
      const rect = section.getBoundingClientRect()
      const p = reduce ? 1 : clamp(-rect.top / (rect.height - window.innerHeight))
      const filmProgress = reduce ? 1 : clamp((p - 0.05) / 0.9)

      if (heroRef.current) {
        const t = reduce ? 0 : clamp((p - 0.015) / 0.07)
        heroRef.current.style.opacity = String(1 - t)
        heroRef.current.style.transform = `translateY(${t * -40}px)`
        heroRef.current.style.pointerEvents = t > 0.5 ? "none" : ""
      }
      setFilm((prev) => (Math.abs(prev - filmProgress) > 0.002 || filmProgress === 1 ? filmProgress : prev))

      // Blend neighbouring frames so the scrub stays smooth between the 81 stills.
      const exact = filmProgress * (FRAME_COUNT - 1)
      const key = Math.round(exact * 20)
      if (key === lastDrawn) return
      lastDrawn = key
      const base = Math.floor(exact)
      const a = nearestLoaded(base)
      if (!a) return
      ctx.fillStyle = "#0d2c25"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      paint(a, 1)
      const b = images[base + 1]
      const mix = exact - base
      if (mix > 0.02 && b?.complete && b.naturalWidth) paint(b, mix)
    }

    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const onResize = () => {
      const next = window.innerWidth / window.innerHeight < 0.9 ? "m" : "d"
      resize()
      if (next !== set) {
        set = next
        load()
      }
      schedule()
    }

    resize()
    load()
    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const phaseIndex = PHASES.findIndex((ph) => film >= ph.from && film < ph.to)
  const active = phaseIndex === -1 ? PHASES.length - 1 : phaseIndex
  const installed = Math.round(clamp((film - PHASES[2].from) / (PHASES[2].to - PHASES[2].from)) * FLOORS)
  const complete = film >= 0.995
  const status = (i: number) => (film >= PHASES[i].to || complete ? "done" : i === active ? "active" : "next")
  const showStory = film > 0.01

  return (
    <section
      ref={sectionRef}
      className="relative h-[380svh] bg-forest-deep text-white sm:h-[460svh] motion-reduce:h-svh"
      aria-label="How an EcoGlass commercial project comes together"
      data-header-clear
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(8_26_21/0.88)_0%,rgb(8_26_21/0.55)_38%,rgb(8_26_21/0.05)_70%)] max-sm:bg-[linear-gradient(180deg,rgb(8_26_21/0.9)_0%,rgb(8_26_21/0.2)_35%,rgb(8_26_21/0.2)_62%,rgb(8_26_21/0.95)_85%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-[rgb(8_26_21/0.85)]"
          aria-hidden="true"
        />

        {/* Opening copy, which steps aside as the film starts */}
        <div
          ref={heroRef}
          className="absolute inset-0 mx-auto flex w-full max-w-[1400px] flex-col justify-between px-5 pb-6 pt-[calc(var(--header-h)+2.5rem)] sm:px-6 sm:pt-[calc(var(--header-h)+5rem)] lg:px-8 lg:pb-8"
        >
          <div className="max-w-[820px] max-sm:mb-auto">
            <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              Commercial
            </p>
            <h1 className="mt-5 font-display text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.04em] sm:mt-6 sm:text-7xl lg:text-[84px]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="mask-reveal inline-block" style={{ animationDelay: "200ms" }}>
                  Windows &amp; doors
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.14em]">
                <span
                  className="mask-reveal inline-block font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]"
                  style={{ animationDelay: "360ms" }}
                >
                  for builders &amp; condos.
                </span>
              </span>
            </h1>
            <p
              className="hero-reveal mt-5 max-w-[520px] text-[15px] leading-relaxed text-[#d4ded9] sm:mt-6 sm:text-lg max-sm:hidden"
              style={{ animationDelay: "520ms" }}
            >
              Factory-direct supply and installation for developers, general contractors and condo associations across
              Florida, from a single building to a full community.
            </p>
            <div
              className="hero-reveal mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center max-sm:hidden"
              style={{ animationDelay: "680ms" }}
            >
              <button
                type="button"
                onClick={() => {
                  const bid = document.getElementById("bid")
                  if (bid) glideTo(bid, 2.4)
                }}
                className="shine group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
              >
                Request a bid
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </button>
              <a
                href="tel:+13212070507"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                (321) 207-0507
              </a>
            </div>
          </div>

          <div>
            <div className="hero-reveal mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60" style={{ animationDelay: "900ms" }}>
              <span className="h-10 w-px overflow-hidden bg-white/15">
                <span className="scroll-cue block h-full w-full bg-[#9fd3a2]" />
              </span>
              Scroll to build
            </div>
            <div
              className="hero-reveal grid grid-cols-2 gap-y-4 border-t border-white/15 pt-5 lg:grid-cols-4 lg:gap-y-0"
              style={{ animationDelay: "850ms" }}
            >
              {FACTS.map(({ value, label }, i) => (
                <div key={value} className={`pr-3 lg:px-6 lg:first:pl-0 ${i > 0 ? "lg:border-l lg:border-white/15" : ""}`}>
                  <p className="font-display text-base font-extrabold tracking-[-0.01em] sm:text-xl">{value}</p>
                  <p className="mt-0.5 text-[12px] text-white/65 sm:text-[13px]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The project story over the film */}
        <div
          className={`absolute inset-0 mx-auto flex w-full max-w-[1400px] items-end px-5 pb-10 transition-opacity duration-500 sm:px-6 lg:px-8 lg:pb-16 ${
            showStory ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-live="polite"
        >
          <div className="grid w-full grid-cols-1 items-end gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
            <div className="max-w-[620px]">
              <p className="font-display text-sm font-bold tabular-nums text-[#9fd3a2]">
                0{active + 1} <span className="text-white/40">/ 0{PHASES.length}</span>
              </p>
              <div className="relative mt-3 min-h-[150px] sm:min-h-[170px]">
                {PHASES.map((ph, i) => (
                  <div
                    key={ph.label}
                    className={`absolute inset-x-0 bottom-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-6 opacity-0" : "translate-y-6 opacity-0"
                    }`}
                    aria-hidden={i !== active}
                  >
                    <h2 className="font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[56px]">
                      {ph.label}
                    </h2>
                    <p className="mt-3 max-w-[520px] text-[15px] leading-relaxed text-white/80 sm:mt-4 sm:text-lg">{ph.body}</p>
                  </div>
                ))}
              </div>
              {/* Stage progress */}
              <div className="mt-6 grid grid-cols-4 gap-2" aria-hidden="true">
                {PHASES.map((ph) => (
                  <span key={ph.label} className="h-1 overflow-hidden rounded-full bg-white/20">
                    <span
                      className="block h-full origin-left rounded-full bg-[#9fd3a2]"
                      style={{ transform: `scaleX(${clamp((film - ph.from) / (ph.to - ph.from))})` }}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Project tracker */}
            <div className="hidden rounded-[24px] border border-white/15 bg-[rgb(8_26_21/0.55)] p-6 backdrop-blur-xl lg:block">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Project tracker</p>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#9fd3a2]">
                  <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-[#9fd3a2]" />
                  {complete ? "Complete" : "In progress"}
                </span>
              </div>
              <p className="mt-3 font-display text-lg font-bold">7-story condominium</p>
              <ul className="mt-5 space-y-3">
                {PHASES.map((ph, i) => {
                  const s = status(i)
                  return (
                    <li key={ph.label} className="flex items-center gap-3 text-[14px]">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                          s === "done"
                            ? "border-[#9fd3a2] bg-[#9fd3a2] text-forest-deep"
                            : s === "active"
                              ? "border-[#9fd3a2] text-[#9fd3a2]"
                              : "border-white/25 text-white/30"
                        }`}
                      >
                        {s === "done" ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <span className="text-[10px] font-bold">{i + 1}</span>}
                      </span>
                      <span className={s === "next" ? "text-white/45" : "text-white"}>{ph.label}</span>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-5 border-t border-white/10 pt-4">
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-white/55">Floors installed</span>
                  <span className="font-display text-base font-bold tabular-nums">
                    {installed} <span className="text-white/40">/ {FLOORS}</span>
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-7 gap-1">
                  {Array.from({ length: FLOORS }, (_, f) => (
                    <span
                      key={f}
                      className={`h-1.5 rounded-full transition-colors duration-300 ${f < installed ? "bg-[#9fd3a2]" : "bg-white/15"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

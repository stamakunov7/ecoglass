"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Mode = "typical" | "eco"

const ROWS = [
  { label: "Where it's built", typical: "Hundreds of miles away", eco: "Our Longwood, FL factory" },
  { label: "Lead time", typical: "National backlogs and freight", eco: "A timeline we control" },
  { label: "Sizing", typical: "Stock sizes", eco: "Made to your exact opening" },
  { label: "Installation", typical: "Often subcontracted", eco: "Our own trained crews" },
  { label: "Who you deal with", typical: "A rotating cast of vendors", eco: "One accountable team" },
  { label: "After the job", typical: "Support from far away", eco: "Local, a phone call away" },
]

/**
 * A departure-board comparison: flip between "the typical way" and EcoGlass, and every row turns
 * over in sequence. It flips to EcoGlass on its own the first time it comes into view.
 */
export function WhyCompare() {
  const [mode, setMode] = useState<Mode>("typical")
  const boardRef = useRef<HTMLDivElement>(null)
  const touched = useRef(false)

  useEffect(() => {
    const board = boardRef.current
    if (!board) return
    let timer = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        timer = window.setTimeout(() => {
          if (!touched.current) setMode("eco")
        }, 900)
      },
      { threshold: 0.5 },
    )
    observer.observe(board)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  function choose(next: Mode) {
    touched.current = true
    setMode(next)
  }

  const eco = mode === "eco"

  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-white">
      <div
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className={`absolute left-1/2 top-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-colors duration-1000 ${
          eco ? "bg-cta/25" : "bg-white/5"
        }`}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1100px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <Reveal className="text-center">
          <p className="flex items-center justify-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
            Compare
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
            The typical way, <span className="font-serif font-normal italic text-[#cfe8cf]">or ours.</span>
          </h2>

          {/* Switch */}
          <div className="relative mx-auto mt-10 grid w-full max-w-[420px] grid-cols-2 rounded-full border border-white/15 bg-white/[0.06] p-1.5">
            <span
              className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                eco ? "translate-x-full bg-[#9fd3a2] shadow-[0_0_40px_rgb(159_211_162/0.45)]" : "bg-white/15"
              }`}
              aria-hidden="true"
            />
            {(
              [
                { id: "typical", label: "Typical company" },
                { id: "eco", label: "EcoGlass" },
              ] as const
            ).map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => choose(id)}
                aria-pressed={mode === id}
                className={`relative z-10 h-12 rounded-full text-[14px] font-bold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fd3a2] sm:text-[15px] ${
                  mode === id ? (id === "eco" ? "text-forest-deep" : "text-white") : "text-white/55 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Board */}
        <div
          ref={boardRef}
          className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] lg:mt-14"
          aria-live="polite"
        >
          {ROWS.map(({ label, typical, eco: ours }, i) => (
            <div
              key={label}
              className="grid grid-cols-1 items-center gap-2 border-b border-white/10 px-6 py-5 last:border-b-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] sm:gap-6 sm:px-10 sm:py-6"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 sm:text-xs">{label}</span>
              <div className="[perspective:800px]">
                <div key={mode} className="flip-in flex items-center gap-4" style={{ animationDelay: `${i * 80}ms` }}>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      eco ? "bg-[#9fd3a2] text-forest-deep" : "bg-white/10 text-white/45"
                    }`}
                  >
                    {eco ? (
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <X className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
                    )}
                  </span>
                  <span
                    className={`font-display text-lg font-bold leading-snug sm:text-[22px] ${
                      eco ? "text-white" : "text-white/50"
                    }`}
                  >
                    {eco ? ours : typical}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between px-2 text-[13px] text-white/50">
          <span>{eco ? "EcoGlass" : "Typical company"}</span>
          <span className="[perspective:600px]">
            <span key={mode} className="flip-in inline-block font-display text-lg font-extrabold tabular-nums text-white">
              {eco ? "6" : "0"}
              <span className="text-white/40">/6</span>
            </span>
          </span>
        </div>
      </div>
    </section>
  )
}

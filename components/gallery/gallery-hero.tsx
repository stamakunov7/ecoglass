"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"
import { glideTo } from "@/lib/smooth-scroll"
import { GALLERY, smallSrc } from "./gallery-data"

const COLUMNS = 6
// Seconds per loop for each column; neighbours run in opposite directions.
const DURATIONS = [70, 54, 80, 60, 74, 64]

function scrollToWork() {
  const work = document.getElementById("work")
  if (work) glideTo(work, 3)
}

/** Full-screen hero over a tilted, endlessly drifting wall of photos that leans toward the cursor. */
export function GalleryHero() {
  const { open: openEstimate } = useEstimate()
  const wallRef = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  function onPointerMove(e: React.PointerEvent) {
    const wall = wallRef.current
    if (!wall || e.pointerType !== "mouse") return
    const x = e.clientX / window.innerWidth - 0.5
    const y = e.clientY / window.innerHeight - 0.5
    wall.style.setProperty("--tx", x.toFixed(3))
    wall.style.setProperty("--ty", y.toFixed(3))
  }

  const columns = Array.from({ length: COLUMNS }, (_, c) => GALLERY.filter((_, i) => i % COLUMNS === c))

  return (
    <section
      onPointerMove={onPointerMove}
      className="relative isolate flex min-h-[640px] items-center justify-center overflow-hidden bg-forest-deep text-white h-svh"
    >
      {/* Photo wall */}
      <div className="absolute inset-0 -z-20 [perspective:1400px]" aria-hidden="true">
        <div
          ref={wallRef}
          className={`absolute left-1/2 top-1/2 grid w-[180vw] grid-cols-6 gap-3 transition-[transform,opacity] duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:w-[160vw] sm:gap-5 ${
            shown ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transform: shown
              ? "translate(-50%, -50%) rotateX(calc(42deg - var(--ty, 0) * 6deg)) rotateZ(calc(-24deg + var(--tx, 0) * 6deg))"
              : "translate(-50%, -46%) rotateX(52deg) rotateZ(-30deg) scale(1.08)",
          }}
        >
          {columns.map((items, c) => (
            <div key={c} className="overflow-visible">
              <div
                className="marquee-y flex flex-col gap-3 sm:gap-5"
                style={{ animationDuration: `${DURATIONS[c]}s`, animationDirection: c % 2 ? "reverse" : "normal" }}
              >
                {[...items, ...items].map((item, i) => (
                  <img
                    key={`${item.slug}-${i}`}
                    src={smallSrc(item.slug)}
                    alt=""
                    width={360}
                    height={450}
                    decoding="async"
                    className="aspect-[4/5] w-full rounded-xl object-cover shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] sm:rounded-2xl"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shade: darkest at the edges and behind the type */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgb(8_26_21/0.88)_0%,rgb(8_26_21/0.55)_55%,rgb(8_26_21/0.9)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-b from-transparent to-forest-deep"
        aria-hidden="true"
      />

      <div className="mx-auto flex max-w-[980px] flex-col items-center px-5 pt-[var(--header-h)] text-center sm:px-6">
        <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
          <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
          Gallery
          <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
        </p>
        <h1 className="mt-6 font-display text-[3.3rem] font-extrabold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-[112px]">
          <span className="block overflow-hidden pb-[0.06em]">
            <span className="mask-reveal inline-block" style={{ animationDelay: "250ms" }}>
              Made for
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.14em]">
            <span
              className="mask-reveal inline-block font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]"
              style={{ animationDelay: "420ms" }}
            >
              Florida light.
            </span>
          </span>
        </h1>
        <p
          className="hero-reveal mt-5 max-w-[520px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
          style={{ animationDelay: "650ms" }}
        >
          A look at the windows and doors we build in Longwood and install across the state.
        </p>
        <div
          className="hero-reveal mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          style={{ animationDelay: "800ms" }}
        >
          <button
            type="button"
            onClick={scrollToWork}
            className="shine group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/25 transition-transform hover:-translate-y-0.5"
          >
            Explore the gallery
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

      {/* Scroll cue */}
      <div
        className="hero-reveal absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
        style={{ animationDelay: "1100ms" }}
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <span className="h-12 w-px overflow-hidden bg-white/15">
          <span className="scroll-cue block h-full w-full bg-[#9fd3a2]" />
        </span>
      </div>
    </section>
  )
}

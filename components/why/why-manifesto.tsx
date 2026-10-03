"use client"

import { useEffect, useRef } from "react"

/** The statement, in runs; accented runs are set in the italic serif. */
const STATEMENT: { text: string; accent?: boolean }[] = [
  { text: "Most window companies resell products built hundreds of miles away. We build ours right here in" },
  { text: "Longwood,", accent: true },
  { text: "move them straight from our floor to your home, and install them with" },
  { text: "our own crews.", accent: true },
  { text: "One team," },
  { text: "start to finish.", accent: true },
]

const WORDS = STATEMENT.flatMap(({ text, accent }) => text.split(" ").map((word) => ({ word, accent: !!accent })))

/** A pinned statement whose words light up one after another as the page scrolls. */
export function WhyManifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const words = wordRefs.current
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w && (w.style.opacity = "1"))
      return
    }
    let frame = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)))
      // A soft edge about two words wide sweeps across the text.
      const head = p * (words.length + 2) - 1
      words.forEach((w, i) => {
        if (w) w.style.opacity = String(0.14 + 0.86 * Math.min(1, Math.max(0, head - i)))
      })
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[220svh] bg-offwhite motion-reduce:h-auto">
      <div className="sticky top-0 flex h-svh items-center motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-5 pt-[var(--header-h)] sm:px-6 lg:px-8">
          <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
            <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
            The difference
          </p>
          <p className="mt-8 max-w-[1150px] font-display text-[2rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-forest sm:text-5xl lg:text-[64px]">
            {WORDS.map(({ word, accent }, i) => (
              <span
                key={i}
                ref={(el) => {
                  wordRefs.current[i] = el
                }}
                className={`transition-opacity duration-200 ${
                  accent ? "font-serif font-normal italic tracking-[-0.01em] text-cta-dark" : ""
                }`}
                style={{ opacity: 0.14 }}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}

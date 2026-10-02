"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"
import { PROCESS_STEPS } from "./process-steps-data"

/**
 * Scrollytelling steps: on large screens the photo column stays pinned while each new step's photo
 * wipes up over the last one, and a progress line tracks the reader through the list.
 */
export function ProcessSteps() {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLOListElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)

  // On scroll: the active step is the last one whose top has passed the middle of the viewport, and the
  // progress line is written straight to the DOM so scrolling never re-renders React needlessly.
  useEffect(() => {
    const list = listRef.current
    const fill = fillRef.current
    if (!list || !fill) return
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-step]"))
    let frame = 0
    const update = () => {
      const middle = window.innerHeight / 2
      const rect = list.getBoundingClientRect()
      fill.style.transform = `scaleY(${Math.min(1, Math.max(0, (middle - rect.top) / rect.height))})`
      let next = 0
      items.forEach((item, i) => {
        if (item.getBoundingClientRect().top <= middle) next = i
      })
      setActive(next)
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

  const current = PROCESS_STEPS[active]

  return (
    <section id="steps" className="scroll-mt-[var(--header-h)] bg-offwhite">
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="max-w-[760px]">
          <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
            <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
            Step by step
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest text-balance sm:text-5xl lg:text-[64px]">
            Four steps from first call to{" "}
            <span className="font-serif font-normal italic text-cta-dark">finished home.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 pb-20 pt-12 sm:pb-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20 lg:pb-12 lg:pt-4">
          {/* Pinned photo stack (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky py-10" style={{ top: "var(--header-h)" }}>
              <div className="relative h-[min(680px,calc(100svh-var(--header-h)-5rem))] overflow-hidden rounded-[28px] bg-forest-deep shadow-[0_40px_80px_-40px_rgb(13_44_37/0.55)]">
                {PROCESS_STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    className="absolute inset-0 transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(0.77,0,0.18,1)] motion-reduce:transition-none"
                    style={{ clipPath: i <= active ? "inset(0 0 0 0)" : "inset(100% 0 0 0)" }}
                  >
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                        i === active ? "scale-100" : "scale-110"
                      }`}
                    />
                  </div>
                ))}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-[rgb(8_26_21/0.75)]"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-7 text-white">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9fd3a2]">
                      Step {active + 1} of {PROCESS_STEPS.length}
                    </p>
                    <p key={current.title} className="mask-reveal mt-1.5 font-display text-2xl font-extrabold">
                      {current.title}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1.5" aria-hidden="true">
                    {PROCESS_STEPS.map((step, i) => (
                      <span key={step.title} className="h-1 w-8 overflow-hidden rounded-full bg-white/25">
                        <span
                          className="block h-full origin-left rounded-full bg-[#9fd3a2] transition-transform duration-700"
                          style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Progress track */}
            <span className="absolute bottom-0 left-[27px] top-0 hidden w-px bg-forest/15 lg:block" aria-hidden="true">
              <span
                ref={fillRef}
                className="block h-full w-full origin-top scale-y-0 bg-gradient-to-b from-cta to-forest"
              />
            </span>

            <ol ref={listRef}>
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon
                const isActive = i === active
                return (
                  <li
                    key={step.title}
                    id={`step-${i + 1}`}
                    data-step={i}
                    className="scroll-mt-[calc(var(--header-h)+2rem)] py-8 lg:flex lg:min-h-[78svh] lg:items-center lg:py-0"
                  >
                    <div
                      className={`w-full transition-opacity duration-500 lg:pl-20 ${
                        isActive ? "opacity-100" : "opacity-100 lg:opacity-30"
                      }`}
                    >
                      {/* Photo inline on small screens */}
                      <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[24px] bg-muted lg:hidden">
                        <Image src={step.image} alt={step.alt} fill sizes="100vw" className="object-cover" />
                      </div>

                      <div className="relative flex items-center gap-5">
                        <span
                          className={`absolute -left-20 hidden h-14 w-14 items-center justify-center rounded-full border transition-all duration-500 lg:flex ${
                            isActive
                              ? "border-cta bg-cta text-white shadow-lg shadow-cta/30"
                              : "border-forest/15 bg-offwhite text-forest/50"
                          }`}
                        >
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span
                          className={`font-display text-[88px] font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums transition-colors duration-700 [-webkit-text-stroke:1.5px_var(--color-forest)] sm:text-[112px] ${
                            isActive ? "text-forest" : "text-forest lg:text-transparent"
                          }`}
                          aria-hidden="true"
                        >
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className="mt-6 font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] text-forest sm:text-4xl">
                        {step.title}
                      </h3>
                      <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
                        {step.summary}
                      </p>
                      <ul className="mt-7 flex flex-col gap-3.5 border-t border-forest/10 pt-7">
                        {step.details.map((d, j) => (
                          <li
                            key={d}
                            className={`flex items-start gap-3.5 text-[15px] text-ink transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                              isActive ? "translate-x-0 opacity-100" : "opacity-100 lg:translate-x-3 lg:opacity-0"
                            }`}
                            style={{ transitionDelay: isActive ? `${150 + j * 90}ms` : "0ms" }}
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cta/15 text-cta-dark">
                              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

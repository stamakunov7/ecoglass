"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Phone } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"
import { Reveal } from "@/components/reveal"

/** Closing call to action over a finished home, with the photo drifting slower than the page. */
export function ProcessClosing() {
  const { open: openEstimate } = useEstimate()
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const photo = photoRef.current
    if (!section || !photo || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      // -1 when the section enters from below, 1 when it leaves at the top.
      const t = (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight / 2 + rect.height / 2)
      photo.style.transform = `translate3d(0, ${t * 12}%, 0) scale(1.25)`
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden bg-forest-deep text-white">
      <div ref={photoRef} className="absolute inset-0 -z-20 will-change-transform" style={{ transform: "scale(1.25)" }}>
        <Image
          src="/images/hero-home.png"
          alt="A finished Florida home at dusk with new floor-to-ceiling windows and doors"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(8_26_21/0.55)_0%,rgb(8_26_21/0.85)_75%)]"
        aria-hidden="true"
      />

      <Reveal className="mx-auto flex min-h-[78svh] w-full max-w-[1400px] flex-col items-center justify-center px-5 py-24 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">Step one</p>
        <h2 className="mt-5 max-w-[900px] font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[88px]">
          Your new view starts with{" "}
          <span className="font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]">one call.</span>
        </h2>
        <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-[#d4ded9] sm:text-lg">
          Book a free, no-obligation in-home estimate. We&apos;ll take it from there.
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            type="button"
            onClick={openEstimate}
            className="shine inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/25 transition-transform hover:-translate-y-0.5"
          >
            Get a free estimate
          </button>
          <a
            href="tel:+13212070507"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call (321) 207-0507
          </a>
        </div>
      </Reveal>
    </section>
  )
}

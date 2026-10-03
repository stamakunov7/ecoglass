"use client"

import { useEffect, useRef } from "react"

const PHOTO = "/images/gallery/dusk-home.webp"

const clamp = (v: number) => Math.min(1, Math.max(0, v))

/**
 * A giant "LOCAL." with a photo showing through the letters. Scrolling zooms into the stroke of
 * the C until the photo fills the screen, then a caption settles in.
 */
export function WhyHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const letterRef = useRef<HTMLSpanElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const word = wordRef.current
    const letter = letterRef.current
    if (!section || !word || !letter) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Zoom from inside the left stroke of the C so the letter swallows the screen.
    const measure = () => {
      const transform = word.style.transform
      word.style.transform = "none"
      const w = word.getBoundingClientRect()
      const l = letter.getBoundingClientRect()
      word.style.transform = transform
      word.style.transformOrigin = `${l.left - w.left + l.width * 0.2}px ${l.top - w.top + l.height * 0.5}px`
    }

    let frame = 0
    const update = () => {
      const rect = section.getBoundingClientRect()
      const p = clamp(-rect.top / (rect.height - window.innerHeight))
      const zoom = clamp(p / 0.72)
      word.style.transform = `scale(${1 + zoom ** 3 * 90})`
      if (introRef.current) {
        const t = clamp(p / 0.14)
        introRef.current.style.opacity = String(1 - t)
        introRef.current.style.transform = `translateY(${t * -30}px)`
      }
      if (maskRef.current) maskRef.current.style.opacity = String(1 - clamp((p - 0.6) / 0.14))
      if (captionRef.current) {
        const t = clamp((p - 0.74) / 0.16)
        captionRef.current.style.opacity = String(t)
        captionRef.current.style.transform = `translateY(${(1 - t) * 28}px)`
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    update()
    // Fonts can swap in after first paint and shift the letters.
    document.fonts?.ready.then(onResize)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const giant =
    "block whitespace-nowrap font-display text-[24vw] font-extrabold leading-[0.82] tracking-[-0.06em] lg:text-[22vw]"
  const column = "absolute inset-0 flex flex-col items-center justify-center px-5 pt-[var(--header-h)] text-center"

  // Both layers share one column so the masked word lines up exactly with the copy around it.
  const copy = (visible: boolean) => {
    const hide = visible ? "" : "invisible"
    return {
      eyebrow: (
        <p
          className={`${visible ? "hero-reveal" : hide} flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs`}
        >
          <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
          Why EcoGlass
          <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
        </p>
      ),
      built: (
        <p
          className={`${visible ? "hero-reveal" : hide} mt-3 font-serif text-3xl italic text-[#cfe8cf] sm:text-5xl`}
          style={visible ? { animationDelay: "150ms" } : undefined}
        >
          Built
        </p>
      ),
      tagline: (
        <p
          className={`${visible ? "hero-reveal" : hide} mt-6 max-w-[520px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg`}
          style={visible ? { animationDelay: "450ms" } : undefined}
        >
          Built for you: made in our Longwood factory and installed by our own crews.
        </p>
      ),
    }
  }
  const masked = copy(false)
  const shown = copy(true)

  return (
    <section ref={sectionRef} className="relative h-[260svh] bg-forest-deep motion-reduce:h-svh">
      <h1 className="sr-only">Built local. Built for you.</h1>

      <div className="sticky top-0 isolate h-svh overflow-hidden">
        <img src={PHOTO} alt="" className="absolute inset-0 h-full w-full object-cover" />

        {/* Brand-green sheet; multiply turns the white letters into windows onto the photo */}
        <div ref={maskRef} className={`${column} bg-forest-deep mix-blend-multiply`} aria-hidden="true">
          {masked.eyebrow}
          {masked.built}
          <span ref={wordRef} className={`${giant} text-white will-change-transform`}>
            LO<span ref={letterRef}>C</span>AL.
          </span>
          {masked.tagline}
        </div>

        {/* The readable copy around the word */}
        <div ref={introRef} className={`${column} pointer-events-none text-white`}>
          {shown.eyebrow}
          {shown.built}
          <span className={`${giant} invisible`} aria-hidden="true">
            LOCAL.
          </span>
          {shown.tagline}
          <div
            className="hero-reveal absolute bottom-7 flex flex-col items-center gap-3 motion-reduce:hidden"
            style={{ animationDelay: "800ms" }}
            aria-hidden="true"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">Scroll</span>
            <span className="h-12 w-px overflow-hidden bg-white/15">
              <span className="scroll-cue block h-full w-full bg-[#9fd3a2]" />
            </span>
          </div>
        </div>

        {/* Payoff once the photo fills the screen */}
        <div
          ref={captionRef}
          className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent via-transparent to-[rgb(8_26_21/0.8)] px-5 pb-20 text-center text-white opacity-0 sm:pb-24"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              Manufacturer · Supplier · Installer
            </p>
            <p className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[76px]">
              Made in Florida, <span className="font-serif font-normal italic text-[#cfe8cf]">for Florida homes.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

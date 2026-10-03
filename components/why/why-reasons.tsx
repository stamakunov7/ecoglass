"use client"

import { Fragment, useEffect, useRef } from "react"
import { Factory, Timer, Ruler, ShieldCheck, Sparkles, Headset } from "lucide-react"
import { Reveal } from "@/components/reveal"

const REASONS = [
  {
    id: "manufacturing",
    icon: Factory,
    title: "Direct local manufacturing",
    body: "Most window companies resell products built hundreds of miles away. We manufacture right here in Central Florida, which means tighter quality control, faster turnaround, and a team that actually knows the product inside and out.",
    image: "/images/gallery/factory-floor.webp",
    alt: "Window units on racks on the EcoGlass factory floor",
  },
  {
    id: "lead-times",
    icon: Timer,
    title: "Shorter lead times",
    body: "Because we build locally, you are not waiting on national backlogs or cross-country shipping. Custom orders move from measurement to installation on a timeline we control.",
    image: "/images/gallery/pool-sliders.webp",
    alt: "Floor-to-ceiling sliding doors open to a pool deck",
  },
  {
    id: "custom",
    icon: Ruler,
    title: "Custom sizes & options",
    body: "Every unit is made to your exact opening. Choose frame colors, glass packages, grid patterns, hardware, and operating styles that fit your home instead of settling for stock sizes.",
    image: "/images/gallery/measuring.webp",
    alt: "Measuring a window opening with a tape and laser level",
  },
  {
    id: "one-stop",
    icon: ShieldCheck,
    title: "One-stop-shop service",
    body: "Estimate, measurement, manufacturing, permitting, installation, and follow-up all happen under one roof. One point of contact, one accountable team, zero finger-pointing.",
    image: "/images/why/consultation.webp",
    alt: "An EcoGlass specialist reviewing windows with a homeowner",
  },
  {
    id: "installation",
    icon: Sparkles,
    title: "Professional installation",
    body: "Our in-house installers are trained on our products specifically. Precise fitting, proper sealing, and a clean job site are part of every installation, not an upsell.",
    image: "/images/gallery/casement-windows.webp",
    alt: "Black casement windows fitted in a bright room",
  },
  {
    id: "support",
    icon: Headset,
    title: "Long-term support",
    body: "We are local, so we are still here after the job is done. Adjustments, maintenance questions, and warranty support are a phone call away, from people who did the work.",
    image: "/images/gallery/family-room.webp",
    alt: "A couple relaxing at home by large black-framed windows",
  },
]

/**
 * The six reasons as a deck: on large screens each card pins below the header while the next
 * slides over it, and the cards beneath sink back a little.
 */
export function WhyReasons() {
  const deckRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLElement | null)[]>([])
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const deck = deckRef.current
    if (!deck || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const large = window.matchMedia("(min-width: 1024px)")
    const n = REASONS.length
    let frame = 0

    const update = () => {
      const cards = cardRefs.current
      const shades = shadeRefs.current
      if (!large.matches) {
        cards.forEach((c) => c && (c.style.transform = ""))
        shades.forEach((s) => s && (s.style.opacity = "0"))
        return
      }
      const rect = deck.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)))
      cards.forEach((card, i) => {
        if (!card) return
        const start = i / n
        const sink = Math.min(1, Math.max(0, (p - start) / (1 - start)))
        const depth = (n - 1 - i) / (n - 1)
        card.style.transform = `scale(${1 - sink * depth * 0.12})`
        const shade = shades[i]
        if (shade) shade.style.opacity = String(sink * depth * 0.3)
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
    <section id="benefits" className="scroll-mt-[var(--header-h)] bg-offwhite">
      <div className="mx-auto w-full max-w-[1400px] px-5 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
        <Reveal className="max-w-[760px]">
          <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
            <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
            Six reasons
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
            Why homeowners <span className="font-serif font-normal italic text-cta-dark">choose local.</span>
          </h2>
        </Reveal>

        {/* Cards are direct children of the deck so each one can stay pinned until the deck ends */}
        <div ref={deckRef} className="mt-12 pb-20 sm:pb-24 lg:mt-6 lg:pb-16">
          {REASONS.map(({ id, icon: Icon, title, body, image, alt }, i) => {
            const dark = i % 2 === 1
            return (
              <Fragment key={id}>
                {/* Anchor target that never sticks, so menu links always land on the right card */}
                <span id={id} className="block scroll-mt-[var(--header-h)] lg:scroll-mt-0" aria-hidden="true" />
                {/* Each card pins a little lower than the last so the deck's edges show */}
                <div
                  className="mb-5 last:mb-0 lg:sticky lg:top-0 lg:mb-0 lg:h-svh lg:pt-[calc(var(--header-h)+1.5rem+var(--offset))]"
                  style={{ "--offset": `${i * 18}px` } as React.CSSProperties}
                >
                  <article
                    ref={(el) => {
                      cardRefs.current[i] = el
                    }}
                    className={`relative grid origin-top overflow-hidden rounded-[28px] border shadow-[0_30px_80px_-40px_rgb(13_44_37/0.45)] lg:h-[min(640px,calc(100svh-var(--header-h)-4.5rem-90px))] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:rounded-[36px] ${
                      dark ? "border-white/10 bg-forest-deep text-white" : "border-forest/10 bg-card text-forest"
                    }`}
                  >
                    {/* Title first: the next card covers this one from the bottom up */}
                    <div className="flex flex-col justify-between gap-8 p-7 sm:p-10 lg:p-14">
                      <div>
                        <h3 className="font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-4xl lg:text-[52px]">
                          {title}
                        </h3>
                        <p
                          className={`mt-5 max-w-[52ch] text-[15px] leading-relaxed sm:text-[17px] ${
                            dark ? "text-white/70" : "text-muted-foreground"
                          }`}
                        >
                          {body}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-display text-sm font-bold tabular-nums ${dark ? "text-[#9fd3a2]" : "text-cta-dark"}`}
                        >
                          0{i + 1} <span className={dark ? "text-white/35" : "text-forest/35"}>/ 0{REASONS.length}</span>
                        </span>
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            dark ? "bg-white/10 text-[#9fd3a2]" : "bg-sage text-forest"
                          }`}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                    <div className="relative min-h-[260px] lg:min-h-0">
                      <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
                    </div>
                    {/* Darkens the card as newer cards stack over it */}
                    <div
                      ref={(el) => {
                        shadeRefs.current[i] = el
                      }}
                      className="pointer-events-none absolute inset-0 bg-[rgb(8_26_21)] opacity-0"
                      aria-hidden="true"
                    />
                  </article>
                </div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}

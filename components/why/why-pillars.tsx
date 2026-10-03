"use client"

import { useState } from "react"
import { Reveal } from "@/components/reveal"

const PILLARS = [
  {
    label: "Manufacturer",
    body: "We build every window and door in our Longwood, FL facility, so quality is controlled at the source.",
    image: "/images/why/lineup.webp",
    alt: "A lineup of finished EcoGlass windows and doors",
  },
  {
    label: "Supplier",
    body: "No middlemen or long freight delays. Your order moves straight from our floor to your home.",
    image: "/images/gallery/showroom.webp",
    alt: "The EcoGlass showroom and factory in Longwood, Florida",
  },
  {
    label: "Installer",
    body: "Our own trained crews handle installation, so accountability never leaves the EcoGlass team.",
    image: "/images/gallery/installation.webp",
    alt: "An EcoGlass installer fitting a black-framed window",
  },
]

/** Three tall photo panels; the one under the pointer opens wide and tells its part. */
export function WhyPillars() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-card">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
              <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
              Three roles, one team
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
              Manufacturer. Supplier. <span className="font-serif font-normal italic text-cta-dark">Installer.</span>
            </h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-relaxed text-muted-foreground">
            Because we control every step, you get better quality, faster timelines, and one accountable team from first
            call to final walkthrough.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col gap-3 lg:mt-16 lg:h-[620px] lg:flex-row lg:gap-4">
            {PILLARS.map(({ label, body, image, alt }, i) => {
              const open = active === i
              return (
                <article
                  key={label}
                  tabIndex={0}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative h-[440px] shrink-0 overflow-hidden rounded-[28px] bg-forest-deep text-white outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 lg:h-auto lg:shrink lg:basis-0 lg:cursor-pointer ${
                    open ? "lg:grow-[2.6]" : "lg:grow"
                  }`}
                >
                  <img
                    src={image}
                    alt={alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      open ? "scale-100" : "scale-110"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-[rgb(8_26_21/0.92)] via-[rgb(8_26_21/0.35)] to-[rgb(8_26_21/0.15)] transition-opacity duration-700 ${
                      open ? "opacity-100" : "opacity-90 lg:opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="absolute left-6 top-6 font-display text-sm font-bold tabular-nums text-[#9fd3a2] sm:left-8 sm:top-8">
                    0{i + 1}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                    <h3 className="font-display text-3xl font-extrabold leading-none tracking-[-0.03em] sm:text-4xl lg:text-[44px]">
                      {label}
                    </h3>
                    <p
                      className={`mt-4 max-w-[440px] text-[15px] leading-relaxed text-white/80 transition-all duration-700 sm:text-base lg:min-w-[300px] ${
                        open ? "translate-y-0 opacity-100" : "lg:translate-y-3 lg:opacity-0"
                      }`}
                    >
                      {body}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { Factory, Timer, Ruler, ShieldCheck, Sparkles, Headset, ArrowRight } from "lucide-react"
import { useEstimate } from "./estimate-modal"
import { Reveal } from "./reveal"

const benefits = [
  {
    icon: Factory,
    title: "Direct local manufacturing",
    body: "We build our products right here in Central Florida.",
  },
  {
    icon: Timer,
    title: "Shorter lead times",
    body: "Faster turnaround from your local facility to your home or job site.",
  },
  {
    icon: Ruler,
    title: "Custom measurements",
    body: "Every window and door is custom-built to fit your space perfectly.",
  },
  {
    icon: ShieldCheck,
    title: "One-stop-shop service",
    body: "From product to installation, we handle the entire project for you.",
  },
  {
    icon: Sparkles,
    title: "Professional installation",
    body: "Our in-house team ensures precise, high-quality workmanship.",
  },
  {
    icon: Headset,
    title: "Long-term support",
    body: "We're here for maintenance and support when you need us.",
  },
]

export function WhySection() {
  const { open: openEstimate } = useEstimate()

  return (
    <section id="why" className="bg-offwhite">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:px-8 lg:py-32">
        <div className="lg:sticky lg:self-start" style={{ top: "calc(var(--header-h) + 2.5rem)" }}>
          <Reveal>
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
              <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
              Why EcoGlass
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
              Built local.
              <br />
              <span className="font-serif font-normal italic text-cta-dark">Built for you.</span>
            </h2>
            <p className="mt-6 max-w-[460px] text-[17px] leading-relaxed text-muted-foreground">
              As a local manufacturer, we control the process so you get better quality, faster timelines, and
              personalized service from start to finish.
            </p>
            <button
              type="button"
              onClick={openEstimate}
              className="shine group mt-8 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-forest px-8 text-[15px] font-bold text-white shadow-lg shadow-forest/20 transition-transform hover:-translate-y-0.5"
            >
              Get a free estimate
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </Reveal>
          <Reveal delay={150} className="relative mt-10 hidden aspect-[16/10] overflow-hidden rounded-[24px] lg:block">
            <Image
              src="/images/why-hero.png"
              alt="Window units on racks inside the EcoGlass factory in Longwood"
              fill
              sizes="40vw"
              className="ken-burns object-cover"
            />
          </Reveal>
        </div>

        <ol className="border-t border-forest/15">
          {benefits.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="border-b border-forest/15">
              <Reveal delay={i * 60}>
                <div className="group relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-5 overflow-hidden py-7 sm:gap-8 sm:py-9">
                  {/* Soft fill that sweeps in from the left on hover */}
                  <span
                    className="absolute inset-0 -z-0 origin-left scale-x-0 bg-sage/50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="relative pl-1 pt-1.5 font-display text-sm font-bold tabular-nums text-cta-dark sm:pl-3">
                    0{i + 1}
                  </span>
                  <div className="relative transition-transform duration-500 group-hover:translate-x-1.5">
                    <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-forest sm:text-[28px]">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                      {body}
                    </p>
                  </div>
                  <span className="relative mr-1 flex h-12 w-12 items-center justify-center rounded-full border border-forest/15 text-forest transition-all duration-500 group-hover:border-cta group-hover:bg-cta group-hover:text-white sm:mr-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

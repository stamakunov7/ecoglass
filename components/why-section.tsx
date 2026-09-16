"use client"

import { Factory, Timer, Ruler, ShieldCheck, Sparkles, Headset, ArrowRight } from "lucide-react"
import { useEstimate } from "./estimate-modal"

const benefits = [
  {
    icon: Factory,
    title: "Direct Local Manufacturing",
    body: "We build our products right here in Central Florida.",
  },
  {
    icon: Timer,
    title: "Shorter Lead Times",
    body: "Faster turnaround from your local facility to your home or job site.",
  },
  {
    icon: Ruler,
    title: "Custom Measurements",
    body: "Every window and door is custom-built to fit your space perfectly.",
  },
  {
    icon: ShieldCheck,
    title: "One-Stop-Shop Service",
    body: "From product to installation, we handle the entire project for you.",
  },
  {
    icon: Sparkles,
    title: "Professional Installation",
    body: "Our in-house team ensures precise, high-quality workmanship.",
  },
  {
    icon: Headset,
    title: "Long-Term Support",
    body: "We're here for maintenance and support when you need us.",
  },
]

export function WhySection() {
  const { open: openEstimate } = useEstimate()

  return (
    <section id="why" className="bg-offwhite">
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,38%)_minmax(0,62%)] lg:gap-14 lg:px-8 lg:py-24">
        {/* Left intro */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Why Choose EcoGlass</p>
          <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl lg:text-5xl">
            Built Local. Built for You.
          </h2>
          <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            As a local manufacturer, we control the process so you get better quality, faster timelines, and
            personalized service from start to finish.
          </p>
          <button
            type="button"
            onClick={openEstimate}
            className="mt-6 hidden h-12 w-fit items-center justify-center gap-2 rounded-xl bg-cta px-6 text-sm font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark lg:inline-flex"
          >
            Get a Free Estimate
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Benefit grid */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm shadow-forest/5 sm:flex-col sm:gap-3 sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage text-forest">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[15px] font-bold leading-tight text-forest sm:text-base">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

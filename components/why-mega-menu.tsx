"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Factory, Timer, Ruler, ShieldCheck, Sparkles, Headset } from "lucide-react"

type Reason = {
  icon: typeof Factory
  title: string
  body: string
  href: string
}

const reasons: Reason[] = [
  {
    icon: Factory,
    title: "Direct Local Manufacturing",
    body: "Built here in Central Florida — not resold from out of state.",
    href: "/why-ecoglass#manufacturing",
  },
  {
    icon: Timer,
    title: "Shorter Lead Times",
    body: "No national backlogs. Timelines we control end to end.",
    href: "/why-ecoglass#lead-times",
  },
  {
    icon: Ruler,
    title: "Custom Sizes & Options",
    body: "Made to your exact opening, colors, glass, and hardware.",
    href: "/why-ecoglass#custom",
  },
  {
    icon: ShieldCheck,
    title: "One-Stop-Shop Service",
    body: "Estimate to install under one accountable roof.",
    href: "/why-ecoglass#one-stop",
  },
  {
    icon: Sparkles,
    title: "Professional Installation",
    body: "In-house installers trained on our own products.",
    href: "/why-ecoglass#installation",
  },
  {
    icon: Headset,
    title: "Long-Term Support",
    body: "A local team that's here long after the job is done.",
    href: "/why-ecoglass#support",
  },
]

export function WhyMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
      {/* Left: reasons */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-display text-lg font-bold tracking-tight text-forest">Why choose EcoGlass</h3>
          <Link
            href="/why-ecoglass"
            onClick={onNavigate}
            className="inline-flex items-center gap-1 text-[15px] font-bold text-cta transition-colors hover:text-cta-dark"
          >
            Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-3 grid gap-x-8 sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, body, href }) => (
            <Link
              key={title}
              href={href}
              onClick={onNavigate}
              className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-muted"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-forest-deep text-white shadow-sm shadow-forest/20 ring-1 ring-inset ring-white/10">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-bold leading-tight text-forest transition-colors group-hover:text-cta">
                  {title}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{body}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Right: featured card */}
      <Link
        href="/why-ecoglass"
        onClick={onNavigate}
        className="group relative flex min-h-[240px] items-end overflow-hidden rounded-2xl border border-border bg-muted"
      >
        <Image
          src="/images/why-hero.png"
          alt="Inside the EcoGlass window and door manufacturing facility in Central Florida"
          fill
          sizes="(min-width: 1024px) 360px, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/35 to-transparent"
          aria-hidden="true"
        />
        <span className="relative p-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Local manufacturer
          </span>
          <span className="mt-1 block font-display text-xl font-extrabold tracking-tight text-white">
            Built Local. Built for You.
          </span>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-white">
            See what sets us apart <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </span>
      </Link>
    </div>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Phone } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"
import { Reveal } from "@/components/reveal"
import { PanelDiagram } from "./door-carousel"
import type { DoorModel } from "./door-catalog"

/** One door: a large photo with the essentials beside it, then everything built into it. */
export function DoorDetail({ door }: { door: DoorModel }) {
  const { open: openEstimate } = useEstimate()

  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-deep text-white">
        <div
          className="absolute -top-40 right-0 -z-10 h-[520px] w-[800px] rounded-full bg-cta/20 blur-[120px]"
          aria-hidden="true"
        />
        <div className="mx-auto grid min-h-svh w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-[calc(var(--header-h)+2rem)] sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:px-8 lg:pb-20">
          <div className="hero-reveal relative overflow-hidden rounded-[32px] bg-forest shadow-[0_50px_100px_-40px_rgb(0_0_0/0.7)] ring-1 ring-white/10">
            <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-auto lg:h-[min(74svh,700px)]">
              <Image
                src={door.image}
                alt={door.alt}
                fill
                preload
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <nav
              aria-label="Breadcrumb"
              className="hero-reveal flex flex-wrap items-center gap-2 text-[13px] text-white/55"
            >
              <Link href="/products" className="transition-colors hover:text-white">
                Products
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/products/doors" className="transition-colors hover:text-white">
                Doors
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-white/85">{door.name}</span>
            </nav>

            <p
              className="hero-reveal mt-8 flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs"
              style={{ animationDelay: "100ms" }}
            >
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              {door.series ?? door.kind}
            </p>
            <h1
              className="hero-reveal mt-5 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[68px]"
              style={{ animationDelay: "200ms" }}
            >
              {door.name}
            </h1>
            <p
              className="hero-reveal mt-6 max-w-[520px] text-[17px] leading-relaxed text-[#d4ded9]"
              style={{ animationDelay: "300ms" }}
            >
              {door.summary}
            </p>

            {(door.panels || door.layouts) && (
              <div
                className="hero-reveal mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 border-y border-white/15 py-5"
                style={{ animationDelay: "400ms" }}
              >
                {door.panels && <PanelDiagram panels={door.panels} />}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    {door.panels ? "Layouts" : "Configurations"}
                  </p>
                  <p className="mt-1 font-display text-[17px] font-bold tracking-[0.02em]">{door.layouts}</p>
                  {door.panels && <p className="mt-0.5 text-[13px] text-white/55">X slides · O stays fixed</p>}
                </div>
              </div>
            )}

            <div className="hero-reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "500ms" }}>
              <button
                type="button"
                onClick={openEstimate}
                className="shine group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
              >
                Get a free estimate
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
              <a
                href="tel:+13212070507"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 text-[15px] font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                (321) 207-0507
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-offwhite">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-8 lg:py-28">
          <Reveal>
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
              <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
              {door.series ? "Built in" : "Every EcoGlass door"}
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl">
              The <span className="font-serif font-normal italic text-cta-dark">details.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-forest/10 border-y border-forest/10">
              {door.features.map((feature) => (
                <li key={feature} className="flex items-start gap-4 py-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-[16px] leading-relaxed text-ink sm:text-[17px]">{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  )
}

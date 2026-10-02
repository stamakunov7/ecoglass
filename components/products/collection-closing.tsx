"use client"

import { Phone } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"
import { Reveal } from "@/components/reveal"

export function CollectionClosing() {
  const { open: openEstimate } = useEstimate()
  return (
    <section className="bg-[#f5f4ef]">
      <Reveal className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-5 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
          EcoGlass · Longwood, Florida
        </p>
        <h2 className="mt-5 max-w-[980px] font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
          Built here. <span className="font-serif font-normal italic text-cta-dark">Installed by us.</span>
        </h2>
        <p className="mt-6 max-w-[600px] text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
          Manufactured in Central Florida and installed across the state — with one team from your first call to the final
          walkthrough.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={openEstimate}
            className="shine inline-flex h-14 items-center justify-center rounded-full bg-forest px-8 text-[15px] font-bold text-white shadow-lg shadow-forest/20 transition-transform hover:-translate-y-0.5"
          >
            Get a free estimate
          </button>
          <a
            href="tel:+13212070507"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-forest px-7 text-[15px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call (321) 207-0507
          </a>
        </div>
      </Reveal>
    </section>
  )
}

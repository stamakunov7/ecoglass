"use client"

import { useEstimate } from "@/components/estimate-modal"
import { Reveal } from "@/components/reveal"
import { CallButtons } from "@/components/call-links"

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
        <div className="mt-10 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={openEstimate}
            className="shine inline-flex h-14 items-center justify-center rounded-full bg-forest px-8 text-[15px] font-bold text-white shadow-lg shadow-forest/20 transition-transform hover:-translate-y-0.5"
          >
            Get a free estimate
          </button>
          <CallButtons tone="onLight" className="justify-center" />
        </div>
      </Reveal>
    </section>
  )
}

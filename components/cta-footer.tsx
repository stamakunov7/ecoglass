"use client"

import { ArrowRight, Phone } from "lucide-react"
import { useEstimate } from "./estimate-modal"
import { SiteFooter } from "./site-footer"

export function CtaFooter() {
  const { open: openEstimate } = useEstimate()

  return (
    <>
      {/* Final CTA */}
      <section id="estimate" className="bg-gradient-to-b from-forest-deep to-forest">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-14 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <h2 className="mx-auto max-w-[20ch] font-display text-[1.75rem] font-extrabold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Ready to Upgrade Your Home?
          </h2>
          <p className="mx-auto mt-3 max-w-[42ch] text-[14px] leading-relaxed text-white/75 sm:mt-4 sm:text-base lg:text-lg">
            Schedule your free, no-obligation in-home estimate today with your local window and door experts.
          </p>
          <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <button
              type="button"
              onClick={openEstimate}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-7 text-[15px] font-semibold text-white shadow-lg shadow-forest-deep/40 transition-colors hover:bg-cta-dark active:bg-cta-dark"
            >
              Get a Free Estimate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href="tel:+13212070507"
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/5 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/15 active:bg-white/15"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call (321) 207-0507
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </>
  )
}

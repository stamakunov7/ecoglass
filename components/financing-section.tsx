import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

export function FinancingSection() {
  return (
    <section id="financing" className="bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[32px] border border-forest/10 bg-[#eef3ee] px-7 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
            {/* Soft glow in the corner for depth */}
            <div
              className="absolute -right-32 -top-40 -z-10 h-[420px] w-[520px] rounded-full bg-cta/15 blur-[100px]"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
                  <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                  Financing
                </p>
                <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[60px]">
                  Financing that
                  <br />
                  <span className="font-serif font-normal italic text-cta-dark">fits your budget.</span>
                </h2>
              </div>

              <div className="lg:pb-1">
                <p className="max-w-[440px] text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
                  Don&apos;t let budget hold back your home upgrade. Flexible plans so your project can start now.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-5">
                  <Link
                    href="/financing"
                    className="shine group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-forest px-8 text-[15px] font-bold text-white shadow-lg shadow-forest/20 transition-transform hover:-translate-y-0.5"
                  >
                    Explore financing
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                  <span className="flex items-center gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      With
                    </span>
                    <img
                      src="/images/synchrony-logo.webp"
                      alt="Synchrony"
                      width={2000}
                      height={426}
                      className="h-5 w-auto"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

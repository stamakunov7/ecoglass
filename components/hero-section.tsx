import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/hero-home.png"
        alt="Modern Florida home at dusk with oversized glass windows and a reflecting pool"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/85 via-forest-deep/70 to-forest-deep/90" />

      <div className="relative mx-auto flex max-w-[440px] flex-col px-5 pb-9 pt-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta">
          Windows and doors, made for Florida
        </p>
        <h1 className="mt-3 text-pretty font-display text-[2.4rem] font-extrabold leading-[1.08] text-white">
          Upgrade Your View. Improve Your Comfort.
        </h1>
        <p className="mt-4 max-w-[30ch] text-[15px] leading-relaxed text-white/80">
          Custom-built windows and doors manufactured, supplied, and installed by EcoGlass in Central Florida.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <a
            href="#estimate"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta text-[15px] font-semibold text-white shadow-lg shadow-forest-deep/40 transition-colors active:bg-cta-dark"
          >
            Get a Free Estimate
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="#products"
            className="flex h-12 items-center justify-center rounded-xl border border-white/40 bg-white/5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors active:bg-white/15"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { ArrowRight, BadgeCheck, Leaf, Sun, Volume2, Wind } from "lucide-react"
import { Reveal } from "@/components/reveal"

const FEATURES = [
  {
    key: "impact",
    title: "Impact rated for Florida",
    body: "Laminated impact glass and reinforced frames engineered to meet Florida building code for hurricane-prone regions.",
  },
  {
    key: "energy",
    title: "Energy efficient glass",
    body: "Low-E coatings and insulated units reduce solar heat gain, keeping interiors cooler and lowering cooling costs.",
  },
  {
    key: "quiet",
    title: "Quieter interiors",
    body: "Multi-layer glass and tight seals cut outside noise noticeably compared to standard single-pane windows.",
  },
  {
    key: "lasting",
    title: "Built to last",
    body: "Corrosion-resistant hardware and UV-stable finishes designed for Florida sun, humidity, and salt air.",
  },
] as const

/** Each feature's icon gets a small motion of its own. */
function FeatureIcon({ kind }: { kind: (typeof FEATURES)[number]["key"] }) {
  const ring = "relative flex h-14 w-14 items-center justify-center rounded-full bg-forest text-[#9fd3a2]"
  if (kind === "impact")
    return (
      <span className={`${ring} overflow-hidden`}>
        <Wind className="relative h-6 w-6" aria-hidden="true" />
        {[0, 0.8, 1.6].map((delay, i) => (
          <span
            key={delay}
            className="gust absolute h-px w-8 rounded-full bg-[#9fd3a2]/70"
            style={{ top: `${32 + i * 14}%`, animationDelay: `${delay}s` }}
            aria-hidden="true"
          />
        ))}
      </span>
    )
  if (kind === "energy")
    return (
      <span className={ring}>
        <span className="soft-pulse absolute inset-2 rounded-full" aria-hidden="true" />
        <Sun className="h-6 w-6 animate-spin [animation-duration:14s] motion-reduce:animate-none" aria-hidden="true" />
      </span>
    )
  if (kind === "quiet")
    return (
      <span className={ring}>
        {[0, 1.2].map((delay) => (
          <span
            key={delay}
            className="ripple absolute inset-0 rounded-full border border-[#9fd3a2]/60"
            style={{ animationDelay: `${delay}s` }}
            aria-hidden="true"
          />
        ))}
        <Volume2 className="relative h-6 w-6" aria-hidden="true" />
      </span>
    )
  return (
    <span className={ring}>
      <Leaf className="sway h-6 w-6" aria-hidden="true" />
    </span>
  )
}

export function WhyFlorida() {
  return (
    <section id="energy" className="scroll-mt-[var(--header-h)] bg-card">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-[760px]">
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
              <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
              Engineered for Florida
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
              Heat, storms, sun. <span className="font-serif font-normal italic text-cta-dark">Handled.</span>
            </h2>
          </div>
          <div className="max-w-[420px]">
            <p className="text-[16px] leading-relaxed text-muted-foreground">
              Florida homes face conditions most windows were never designed for. Ours are.
            </p>
            <Link
              href="/products"
              className="group mt-5 inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-[15px] font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white"
            >
              Browse windows and doors
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
          <Reveal className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-forest-deep sm:col-span-2 lg:row-span-2 lg:min-h-0">
            <img
              src="/images/gallery/frame-detail.webp"
              alt="Close-up of an impact-rated window corner showing laminated glass and frame detail"
              className="ken-burns absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[rgb(8_26_21/0.85)] via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-forest shadow-md">
                <BadgeCheck className="h-4 w-4 text-cta" aria-hidden="true" />
                Florida Building Code compliant
              </span>
              <p className="mt-4 max-w-[420px] font-display text-2xl font-bold leading-snug sm:text-3xl">
                Impact-rated glass with energy-efficient coatings, year after year.
              </p>
            </div>
          </Reveal>

          {FEATURES.map(({ key, title, body }, i) => (
            <Reveal key={key} delay={i * 90} className="h-full">
              <div className="group flex h-full flex-col rounded-[28px] border border-forest/10 bg-offwhite p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(13_44_37/0.35)]">
                <FeatureIcon kind={key} />
                <h3 className="mt-8 font-display text-xl font-bold leading-tight text-forest">{title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

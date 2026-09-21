import type { Metadata } from "next"
import Link from "next/link"
import {
  Factory,
  Timer,
  Ruler,
  ShieldCheck,
  Sparkles,
  Headset,
  Leaf,
  Wind,
  Sun,
  Volume2,
  BadgeCheck,
  ArrowRight,
} from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { CtaFooter } from "@/components/cta-footer"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Why EcoGlass | Local Window & Door Manufacturer in Central Florida",
  description:
    "EcoGlass manufactures, supplies, and installs custom energy-efficient, impact-rated windows and doors in Central Florida. Learn why homeowners choose a local manufacturer.",
}

const pillars = [
  {
    label: "Manufacturer",
    body: "We build every window and door in our Longwood, FL facility, so quality is controlled at the source.",
  },
  {
    label: "Supplier",
    body: "No middlemen or long freight delays. Your order moves straight from our floor to your home.",
  },
  {
    label: "Installer",
    body: "Our own trained crews handle installation, so accountability never leaves the EcoGlass team.",
  },
]

const benefits = [
  {
    id: "manufacturing",
    icon: Factory,
    title: "Direct Local Manufacturing",
    body: "Most window companies resell products built hundreds of miles away. We manufacture right here in Central Florida, which means tighter quality control, faster turnaround, and a team that actually knows the product inside and out.",
  },
  {
    id: "lead-times",
    icon: Timer,
    title: "Shorter Lead Times",
    body: "Because we build locally, you are not waiting on national backlogs or cross-country shipping. Custom orders move from measurement to installation on a timeline we control.",
  },
  {
    id: "custom",
    icon: Ruler,
    title: "Custom Sizes & Options",
    body: "Every unit is made to your exact opening. Choose frame colors, glass packages, grid patterns, hardware, and operating styles that fit your home instead of settling for stock sizes.",
  },
  {
    id: "one-stop",
    icon: ShieldCheck,
    title: "One-Stop-Shop Service",
    body: "Estimate, measurement, manufacturing, permitting, installation, and follow-up all happen under one roof. One point of contact, one accountable team, zero finger-pointing.",
  },
  {
    id: "installation",
    icon: Sparkles,
    title: "Professional Installation",
    body: "Our in-house installers are trained on our products specifically. Precise fitting, proper sealing, and a clean job site are part of every installation, not an upsell.",
  },
  {
    id: "support",
    icon: Headset,
    title: "Long-Term Support",
    body: "We are local, so we are still here after the job is done. Adjustments, maintenance questions, and warranty support are a phone call away, from people who did the work.",
  },
]

const performance = [
  {
    icon: Wind,
    title: "Impact rated for Florida",
    body: "Laminated impact glass and reinforced frames engineered to meet Florida building code for hurricane-prone regions.",
  },
  {
    icon: Sun,
    title: "Energy efficient glass",
    body: "Low-E coatings and insulated units reduce solar heat gain, keeping interiors cooler and lowering cooling costs.",
  },
  {
    icon: Volume2,
    title: "Quieter interiors",
    body: "Multi-layer glass and tight seals cut outside noise noticeably compared to standard single-pane windows.",
  },
  {
    icon: Leaf,
    title: "Built to last",
    body: "Corrosion-resistant hardware and UV-stable finishes designed for Florida sun, humidity, and salt air.",
  },
]

export default function WhyEcoGlassPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Why choose EcoGlass"
          title="Built Local. Built for You."
          description="EcoGlass is a Central Florida manufacturer, supplier, and installer of custom windows and doors. Because we control every step, you get better quality, faster timelines, and one accountable team from first call to final walkthrough."
          image="/images/why-hero.png"
          imageAlt="Inside the EcoGlass window and door manufacturing facility in Central Florida"
          primaryHref="#benefits"
          primaryLabel="See what sets us apart"
        />

        {/* Three pillars */}
        <section className="bg-card">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              {pillars.map(({ label, body }, i) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-offwhite p-6 md:flex-col md:gap-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest font-display text-lg font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-extrabold text-forest">{label}</h2>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="scroll-mt-24 bg-offwhite">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">The EcoGlass difference</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl lg:text-5xl">
                Six reasons homeowners choose a local manufacturer
              </h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map(({ id, icon: Icon, title, body }) => (
                <article
                  key={id}
                  id={id}
                  className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm shadow-forest/5"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage text-forest">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold leading-tight text-forest">{title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Performance / quality */}
        <section id="energy" className="scroll-mt-24 bg-background">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
            <div className="relative overflow-hidden rounded-3xl bg-muted">
              <img
                src="/images/why-quality.png"
                alt="Close-up of an impact-rated EcoGlass window corner showing laminated glass and frame detail"
                className="aspect-[4/3] h-full w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-card/95 px-3.5 py-1.5 text-xs font-semibold text-forest shadow-md backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4 text-cta" aria-hidden="true" />
                Florida Building Code compliant
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Energy-efficient solutions</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
                Engineered for Florida heat, storms, and sun
              </h2>
              <p className="mt-3 max-w-[56ch] text-[14px] leading-relaxed text-muted-foreground sm:text-base">
                Florida homes face conditions most windows were never designed for. Ours are. Every EcoGlass unit pairs
                impact-rated glass with energy-efficient coatings and frames that stand up to the climate year after year.
              </p>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {performance.map(({ icon: Icon, title, body }) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage text-forest">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold leading-tight text-forest">{title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-forest/20 bg-card px-6 text-[15px] font-semibold text-forest transition-colors hover:border-cta hover:text-cta"
              >
                Browse windows and doors
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <CtaFooter />
    </SiteShell>
  )
}

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, X } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { PHONES, canonicalMeta } from "@/lib/site"

export const metadata: Metadata = {
  title: "Window & Door Care | EcoGlass Windows & Doors",
  description:
    "How to clean and care for your EcoGlass windows and doors: glass, vinyl frames, screens, hardware, hung and casement windows, and sliding patio door tracks.",
  ...canonicalMeta("/care"),
}

const dos = [
  "Mild soap, or white vinegar in water (half a cup per gallon)",
  "A cloudy, dry day, working from the top down",
  "Silicone-based lubricant on moving parts once a year",
  "Weep holes kept clear so rain can drain",
]

const donts = [
  "Ammonia, bleach, solvents, acetone or acids",
  "High-pressure spray on windows and doors",
  "Razor blades or metal scrapers on glass or frames",
  "Oil on tracks or anywhere near the glass",
]

type Topic = { id: string; title: string; intro?: string; tips: string[] }

const topics: Topic[] = [
  {
    id: "general",
    title: "General cleaning",
    tips: [
      "Skip direct sunlight: cleaner dries too fast and streaks. A cloudy but dry day works best.",
      "Wash from the top down so drips land on parts you haven't cleaned yet.",
      "Use gentle soap or white vinegar diluted in water (half a cup per gallon) instead of commercial window cleaners, which often contain ammonia.",
      "Never use chlorine bleach, organic solvents, acetone, or muriatic, hydrofluoric or phosphoric acid. They can attack the frame and seals and permanently damage the glass.",
      "Change your wash and rinse water often.",
    ],
  },
  {
    id: "glass",
    title: "Glass",
    tips: [
      "Avoid detergents and abrasive cleaners: they streak the glass and can damage the seal between the glass and the frame.",
      "Soapy water or diluted white vinegar is the safest choice. Glass cleaning products aren't needed and often leave a residue.",
      "Don't worry about scratching the Low-E coating. It sits on the inner surface of the insulated glass unit, out of reach.",
      "Wash one side with horizontal strokes and the other with vertical strokes. If a streak is left, you'll know which side it's on.",
      "Wait two minutes, then wipe with a clean damp cloth or a squeegee. Dry the squeegee blade after every pass, and finish with newspaper to remove water spots.",
    ],
  },
  {
    id: "frames",
    title: "Vinyl frames",
    tips: [
      "Vinyl (PVC) cleans easily: no aggressive solvents needed. Don't dry-wipe, which can scratch the surface.",
      "Wash the outside frame with a wet sponge and clean water. If it's very dirty, rinse it first with a garden hose at low pressure. Never use a high-pressure spray.",
      "Don't scrub dirt or use razor blades or metal scrapers on bird droppings or stubborn stains. A plastic spatula lifts them without scratching.",
      "A soft toothbrush gets dirt out of the corners. Then wipe with soapy water and rinse with warm water and a soft cloth.",
      "Keep the weep holes clear. These small openings on the outside of the frame drain rainwater; clear dust with a dry paint brush or a vacuum brush attachment.",
      "Look over the seals now and then. They're built for a long life, but a quick visual check catches damage early.",
    ],
  },
  {
    id: "screens",
    title: "Screens",
    tips: [
      "Remove dust with a vacuum brush attachment.",
      "For a deeper clean, take the screen out and wash it on a clean, flat surface with warm water and a soft brush. Rinse and let it air-dry completely.",
      "Clean the upper and lower tracks before you put the screen back.",
    ],
  },
  {
    id: "hardware",
    title: "Hardware",
    tips: [
      "Clean locks, handles and hinges with the same non-abrasive cleaner and a soft cloth. Rinse off any residue and let them dry completely.",
      "Lightly lubricate all moving parts once a year so they keep operating smoothly.",
      "Use a silicone-based lubricant that is safe for vinyl. Avoid lubricants with oil or acid: if they touch the glass, they can leave permanent marks.",
    ],
  },
  {
    id: "hung",
    title: "Hung windows",
    intro: "Cleaning the outside from indoors.",
    tips: [
      "Open the bottom sash about three inches.",
      "With both hands, release the tilt latches on both sides at the same time and tilt the sash in. The outside of the glass is now within reach.",
    ],
  },
  {
    id: "casement",
    title: "Casement windows",
    intro: "Cleaning the outside from indoors.",
    tips: [
      "A casement sash swings open like a door. Open it to 90 degrees and there's enough room between the frame and the sash to reach the outside of the glass.",
    ],
  },
  {
    id: "sliding",
    title: "Sliding patio doors",
    tips: [
      "Keep the roller tracks free of dirt and debris so the door glides: vacuum them first, then finish with a sponge and soapy water.",
      "Never put oil on the tracks. It makes them slippery and collects grit.",
    ],
  },
]

export default function CarePage() {
  return (
    <SiteShell overlayHeader>
      <main>
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <Image
            src="/images/gallery/living-windows.webp"
            alt="A bright living room with large black-framed windows"
            fill
            preload
            sizes="100vw"
            className="ken-burns -z-20 object-cover object-[50%_45%]"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.92)_0%,rgb(8_26_21/0.7)_45%,rgb(8_26_21/0.3)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.7)_0%,rgb(8_26_21/0.9)_70%)]"
            aria-hidden="true"
          />
          <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 pt-[calc(var(--header-h)+4rem)] sm:px-6 sm:pb-24 lg:px-8 lg:pb-28 lg:pt-[calc(var(--header-h)+6rem)]">
            <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              Care &amp; maintenance
            </p>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[80px]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="mask-reveal inline-block" style={{ animationDelay: "200ms" }}>
                  Keep them
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.14em]">
                <span
                  className="mask-reveal inline-block font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]"
                  style={{ animationDelay: "360ms" }}
                >
                  like new.
                </span>
              </span>
            </h1>
            <p
              className="hero-reveal mt-6 max-w-[540px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
              style={{ animationDelay: "520ms" }}
            >
              A few minutes of the right care keeps your windows and doors clear, smooth and sealed for years. Here&apos;s
              how to clean each part without damaging it.
            </p>
            <nav
              aria-label="Care topics"
              className="hero-reveal mt-10 flex flex-wrap gap-2.5"
              style={{ animationDelay: "660ms" }}
            >
              {topics.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-xl transition-colors hover:border-white hover:bg-white hover:text-forest"
                >
                  {t.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* The short version */}
        <section className="bg-card">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-5 px-5 py-16 sm:px-6 sm:py-20 md:grid-cols-2 lg:px-8">
            <Reveal className="rounded-[24px] bg-sage/60 p-7 sm:p-9">
              <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-forest sm:text-3xl">Do</h2>
              <ul className="mt-5 space-y-3.5">
                {dos.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cta text-white">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100} className="rounded-[24px] bg-forest p-7 text-white sm:p-9">
              <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">Don&apos;t</h2>
              <ul className="mt-5 space-y-3.5">
                {donts.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/85">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-[#ffb4a8]">
                      <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Topic by topic */}
        <section className="bg-offwhite">
          <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
            {topics.map((t, i) => (
              <Reveal key={t.id}>
                <article
                  id={t.id}
                  className="grid scroll-mt-[calc(var(--header-h)+1rem)] grid-cols-1 gap-6 border-b border-forest/15 py-12 last:border-b-0 sm:py-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16"
                >
                  <div>
                    <span className="font-display text-sm font-bold tabular-nums text-cta-dark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-0.03em] text-forest sm:text-4xl">
                      {t.title}
                    </h2>
                    {t.intro && <p className="mt-2 font-serif text-xl italic text-cta-dark">{t.intro}</p>}
                  </div>
                  <ul className="space-y-4">
                    {t.tips.map((tip) => (
                      <li key={tip} className="flex gap-4 text-[16px] leading-relaxed text-muted-foreground">
                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-cta" aria-hidden="true" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}

            <Reveal>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Link
                  href="/warranty"
                  className="group flex items-center justify-between gap-6 rounded-[24px] bg-forest p-7 text-white transition-colors hover:bg-forest-deep sm:p-8"
                >
                  <span>
                    <span className="block font-display text-xl font-bold sm:text-2xl">Register your warranty</span>
                    <span className="mt-1 block text-[15px] text-white/70">For installations by EcoGlass.</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <a
                  href={PHONES.orlando.tel}
                  className="group flex items-center justify-between gap-6 rounded-[24px] bg-card p-7 ring-1 ring-forest/10 transition-shadow hover:shadow-[0_20px_40px_-25px_rgb(13_44_37/0.45)] sm:p-8"
                >
                  <span>
                    <span className="block font-display text-xl font-bold text-forest sm:text-2xl">Need an adjustment?</span>
                    <span className="mt-1 block text-[15px] text-muted-foreground">Call our Longwood team: {PHONES.orlando.display}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-forest transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

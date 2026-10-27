import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Minus } from "lucide-react"
import { CallButtons } from "@/components/call-links"
import { canonicalMeta } from "@/lib/site"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { CollectionClosing } from "@/components/products/collection-closing"
import { glasses, type LayerKind } from "@/components/glass/glass-data"
import { GlassExplorer } from "@/components/glass/glass-explorer"
import { ShowIn3D } from "@/components/glass/show-in-3d"

export const metadata: Metadata = {
  title: "Specialty Glass | EcoGlass Windows & Doors",
  description:
    "Clear insulated, Low-E, impact laminated and impact Low-E glass for your EcoGlass windows and doors. See how each glass works and where it fits best.",
  ...canonicalMeta("/products/specialty-glass"),
}

const COMPARE = [
  { label: "Heat-reflecting Low-E coating", has: ["low-e", "impact-low-e"] },
  { label: "Impact-resistant laminated layer", has: ["impact", "impact-low-e"] },
  { label: "Holds together in the frame if broken", has: ["impact", "impact-low-e"] },
]

/** The flat diagram draws the spacer as part of the air space. */
type Layer = Exclude<LayerKind, "spacer">
const flat = (layers: { kind: LayerKind }[]) => layers.map((l) => l.kind).filter((k): k is Layer => k !== "spacer")

const LAYER_LABEL: Record<Layer, string> = {
  pane: "Glass",
  gap: "Sealed air space",
  coating: "Low-E coating",
  interlayer: "Laminated interlayer",
}

/** The glass drawn in cross-section, outside on the left. */
function GlassSection({ layers }: { layers: Layer[] }) {
  return (
    <div className="flex h-60 items-stretch justify-center gap-[3px] sm:h-72" aria-hidden="true">
      {layers.map((layer, i) => {
        if (layer === "pane")
          return (
            <span
              key={i}
              className="w-9 rounded-[3px] border border-white/50 bg-[linear-gradient(180deg,rgb(226_242_244/0.9),rgb(176_212_218/0.75))] shadow-[inset_2px_0_0_rgb(255_255_255/0.7),0_20px_40px_-20px_rgb(0_0_0/0.6)]"
            />
          )
        if (layer === "gap")
          return (
            <span key={i} className="relative w-20 sm:w-24">
              {/* Spacer bars that seal the gap at the edges */}
              <span className="absolute inset-x-0 top-0 h-3 rounded-sm bg-white/25" />
              <span className="absolute inset-x-0 bottom-0 h-3 rounded-sm bg-white/25" />
              <span className="absolute inset-x-2 inset-y-6 rounded-sm bg-[repeating-linear-gradient(180deg,rgb(255_255_255/0.08)_0_2px,transparent_2px_10px)]" />
            </span>
          )
        if (layer === "coating")
          return <span key={i} className="w-[3px] rounded-full bg-[#9fd3a2] shadow-[0_0_14px_2px_rgb(159_211_162/0.7)]" />
        return <span key={i} className="w-3 rounded-[2px] bg-[#f1e6c6]/85" />
      })}
    </div>
  )
}

function LayerLegend({ layers }: { layers: Layer[] }) {
  const unique = layers.filter((l, i) => layers.indexOf(l) === i)
  const dot: Record<Layer, string> = {
    pane: "bg-[#cfe7ea]",
    gap: "border border-white/40 bg-transparent",
    coating: "bg-[#9fd3a2]",
    interlayer: "bg-[#f1e6c6]",
  }
  return (
    <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[12px] font-medium text-white/65">
      {unique.map((layer) => (
        <li key={layer} className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${dot[layer]}`} aria-hidden="true" />
          {LAYER_LABEL[layer]}
        </li>
      ))}
    </ul>
  )
}

export default function SpecialtyGlassPage() {
  return (
    <SiteShell overlayHeader>
      <main>
        {/* Hero: frosted panes over a room full of glass */}
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <Image
            src="/images/gallery/window-walls.webp"
            alt="Living room with floor-to-ceiling black-framed windows looking onto a garden"
            fill
            preload
            sizes="100vw"
            className="ken-burns -z-20 object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.92)_0%,rgb(8_26_21/0.7)_45%,rgb(8_26_21/0.35)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.6)_0%,rgb(8_26_21/0.9)_60%)]"
            aria-hidden="true"
          />

          <div className="mx-auto grid min-h-svh w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:px-8">
            <div>
              <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
                <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
                Specialty glass
              </p>
              <h1
                className="hero-reveal mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[88px]"
                style={{ animationDelay: "150ms" }}
              >
                The glass makes <span className="font-serif font-normal italic text-[#cfe8cf]">the window.</span>
              </h1>
              <p
                className="hero-reveal mt-6 max-w-[540px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
                style={{ animationDelay: "300ms" }}
              >
                Every EcoGlass window and door is glazed to order. These are the glass packages you can choose in our
                online designer, and what each one does for your home.
              </p>
              <div className="hero-reveal mt-9 flex flex-col gap-3" style={{ animationDelay: "450ms" }}>
                <Link
                  href="/products?category=windows"
                  className="shine group inline-flex h-14 w-fit items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
                >
                  Design your window
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <CallButtons tone="onDark" />
              </div>
            </div>

            {/* Four frosted panes, one per glass */}
            <div className="hero-reveal relative mx-auto hidden h-[440px] w-full max-w-[460px] lg:block" style={{ animationDelay: "500ms" }} aria-hidden="true">
              {/* Each pane sits a step lower and further right, so the label along its top edge stays visible */}
              {glasses.map((g, i) => (
                <div
                  key={g.id}
                  className="absolute h-[300px] w-[220px] overflow-hidden rounded-[22px] border border-white/35 bg-[linear-gradient(140deg,rgb(255_255_255/0.22),rgb(255_255_255/0.06)_45%,rgb(159_211_162/0.1))] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.75),inset_1px_1px_0_rgb(255_255_255/0.4)] backdrop-blur-md"
                  style={{ left: `${i * 72}px`, top: `${i * 46}px`, zIndex: i }}
                >
                  <span className="flex items-baseline gap-2.5 px-5 pt-3.5">
                    <span className="font-display text-[12px] font-bold tabular-nums tracking-[0.12em] text-[#9fd3a2]">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[15px] font-bold">{g.short}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <GlassExplorer />

        {/* One glass at a time */}
        <section className="bg-offwhite">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div>
                <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
                  <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                  {glasses.length} glass packages
                </p>
                <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
                  Choose your <span className="font-serif font-normal italic text-cta-dark">glass.</span>
                </h2>
              </div>
              <p className="max-w-[420px] text-[16px] leading-relaxed text-muted-foreground">
                Each one is drawn in section below, outside on the left. Not sure which fits? We&apos;ll help you choose
                at your free in-home estimate.
              </p>
            </Reveal>

            <div className="mt-14 space-y-6 lg:mt-16 lg:space-y-8">
              {glasses.map((g, i) => (
                <Reveal key={g.id}>
                  <article
                    id={g.id}
                    className="grid scroll-mt-[calc(var(--header-h)+1.5rem)] grid-cols-1 overflow-hidden rounded-[28px] border border-forest/10 bg-card shadow-[0_30px_60px_-40px_rgb(13_44_37/0.45)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
                  >
                    <div
                      className={`relative isolate flex flex-col justify-center overflow-hidden bg-forest-deep px-6 py-12 sm:px-10 ${
                        i % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    >
                      <div
                        className="absolute -left-20 -top-20 -z-10 h-64 w-64 rounded-full bg-cta/25 blur-[90px]"
                        aria-hidden="true"
                      />
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
                        <span>Outside</span>
                        <span>Inside</span>
                      </div>
                      <div className="mt-4">
                        <GlassSection layers={flat(g.layers)} />
                      </div>
                      <LayerLegend layers={flat(g.layers)} />
                      <ShowIn3D id={g.id} />
                    </div>

                    <div className="p-7 sm:p-10 lg:p-12">
                      <span className="font-display text-sm font-bold tabular-nums text-cta-dark">0{i + 1}</span>
                      <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-forest sm:text-4xl">
                        {g.name}
                      </h3>
                      <p className="mt-2 font-serif text-[22px] italic text-cta-dark">{g.tagline}</p>
                      <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-muted-foreground">{g.body}</p>
                      <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.2em] text-forest">Best for</p>
                      <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                        {g.bestFor.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-forest">
                              <Check className="h-3 w-3" aria-hidden="true" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Side by side */}
        <section className="bg-card">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <Reveal>
              <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
                <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                At a glance
              </p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl">
                Side by <span className="font-serif font-normal italic text-cta-dark">side.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-10 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-forest/15">
                      <th scope="col" className="py-4 pr-6 text-[13px] font-semibold text-muted-foreground">
                        <span className="sr-only">Feature</span>
                      </th>
                      {glasses.map((g) => (
                        <th key={g.id} scope="col" className="px-4 py-4 text-center">
                          <a href={`#${g.id}`} className="font-display text-[15px] font-bold text-forest hover:text-cta-dark">
                            {g.short}
                          </a>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE.map((row) => (
                      <tr key={row.label} className="border-b border-forest/10">
                        <th scope="row" className="py-5 pr-6 text-[15px] font-medium text-ink">
                          {row.label}
                        </th>
                        {glasses.map((g) => {
                          const has = row.has.includes(g.id)
                          return (
                            <td key={g.id} className="px-4 py-5 text-center">
                              {has ? (
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-forest text-white">
                                  <Check className="h-4 w-4" aria-label="Yes" />
                                </span>
                              ) : (
                                <Minus className="mx-auto h-4 w-4 text-forest/25" aria-label="No" />
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        <CollectionClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

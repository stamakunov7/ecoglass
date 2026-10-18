import type { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { CollectionClosing } from "@/components/products/collection-closing"
import { PriceBars } from "@/components/products/brand-collection"
import { NovaLogo, PrestigeLogo, DuroPlastLogo, PrestigePlusLogo } from "@/components/products/brand-logos"
import { products } from "@/components/products/product-catalog"
import { doorModels, type DoorModel } from "@/components/products/door-catalog"
import { getBrandProfile } from "@/lib/configurator/catalog"

export const metadata: Metadata = {
  title: "Browse by Series | EcoGlass Windows & Doors",
  description:
    "NOVA, DURO PLAST, PRESTIGE, PRESTIGE+ and DURAPLUS: every EcoGlass window and door series, with the styles each one comes in.",
}

type Series = {
  slug: string
  name: string
  logo?: ReactNode
  tagline: string
  description: string
  priceTier?: number
  bestFor?: string
  /** Window brand pages exist for the four window series */
  windows: boolean
  doors: DoorModel[]
}

function windowSeries(slug: string, logo: ReactNode, doors: DoorModel[]): Series[] {
  const profile = getBrandProfile(slug)
  if (!profile) return []
  return [
    {
      slug,
      name: profile.name,
      logo,
      tagline: profile.tagline,
      description: profile.description,
      priceTier: profile.priceTier,
      bestFor: profile.bestFor,
      windows: true,
      doors,
    },
  ]
}

const SERIES: Series[] = [
  ...windowSeries("nova", <NovaLogo />, doorModels.filter((d) => d.series === "NOVA")),
  ...windowSeries("duro-plast", <DuroPlastLogo />, []),
  ...windowSeries("prestige", <PrestigeLogo />, doorModels.filter((d) => d.series?.startsWith("PRESTIGE "))),
  ...windowSeries("prestige-plus", <PrestigePlusLogo />, []),
  {
    slug: "duraplus",
    name: "DURAPLUS",
    tagline: "Impact sliding doors.",
    description:
      "Impact sliding patio doors in two- and three-panel layouts, with stainless-steel rollers, a two-point locking handle and a heavy-duty aluminum rail.",
    windows: false,
    doors: doorModels.filter((d) => d.series?.startsWith("DURAPLUS")),
  },
]

function StyleLink({ href, image, alt, title, note }: { href: string; image: string; alt: string; title: string; note?: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-forest/10 bg-card p-2.5 pr-4 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-forest/25 hover:shadow-[0_20px_40px_-25px_rgb(13_44_37/0.45)]"
    >
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sage">
        <Image src={image} alt={alt} fill sizes="56px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-semibold text-forest">{title}</span>
        {note && <span className="block truncate text-[12.5px] text-muted-foreground">{note}</span>}
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-forest/35 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cta-dark"
        aria-hidden="true"
      />
    </Link>
  )
}

export default function SeriesPage() {
  return (
    <SiteShell overlayHeader>
      <main>
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <div
            className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="absolute -top-40 left-1/3 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-cta/20 blur-[120px]"
            aria-hidden="true"
          />
          <div className="mx-auto w-full max-w-[1400px] px-5 pb-16 pt-[calc(var(--header-h)+4rem)] sm:px-6 lg:px-8 lg:pb-20 lg:pt-[calc(var(--header-h)+6rem)]">
            <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              Browse by series
            </p>
            <h1
              className="hero-reveal mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[88px]"
              style={{ animationDelay: "150ms" }}
            >
              Every series, <span className="font-serif font-normal italic text-[#cfe8cf]">side by side.</span>
            </h1>
            <p
              className="hero-reveal mt-6 max-w-[560px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
              style={{ animationDelay: "300ms" }}
            >
              Four window series and a line of impact sliding doors. Pick a series to see every window and door it comes
              in.
            </p>
            <nav
              aria-label="Series"
              className="hero-reveal mt-10 flex flex-wrap gap-2.5"
              style={{ animationDelay: "450ms" }}
            >
              {SERIES.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-[13px] font-bold tracking-[0.14em] text-white backdrop-blur-xl transition-colors hover:border-white hover:bg-white hover:text-forest"
                >
                  {s.name}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="bg-offwhite">
          <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
            {SERIES.map((s, i) => (
              <Reveal key={s.slug}>
                <article
                  id={s.slug}
                  className="grid scroll-mt-[var(--header-h)] grid-cols-1 gap-10 border-b border-forest/15 py-14 last:border-b-0 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-20"
                >
                  <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-display text-sm font-bold tabular-nums text-cta-dark">0{i + 1}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                        {[s.windows && "Windows", s.doors.length > 0 && "Doors"].filter(Boolean).join(" & ")}
                      </span>
                    </div>
                    {s.logo && <div className="mt-6 flex h-16 items-center">{s.logo}</div>}
                    <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl">
                      {s.name}
                    </h2>
                    <p className="mt-2 font-serif text-[24px] italic text-cta-dark">{s.tagline}</p>
                    <p className="mt-5 max-w-[48ch] text-[16px] leading-relaxed text-muted-foreground">{s.description}</p>
                    {(s.priceTier || s.bestFor) && (
                      <dl className="mt-8 grid max-w-[420px] grid-cols-2 gap-6 border-t border-forest/15 pt-6">
                        {s.priceTier && (
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                              Price
                            </dt>
                            <dd className="mt-2.5">
                              <PriceBars tier={s.priceTier} tone="light" />
                            </dd>
                          </div>
                        )}
                        {s.bestFor && (
                          <div>
                            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                              Best for
                            </dt>
                            <dd className="mt-1.5 text-[14px] font-semibold text-forest">{s.bestFor}</dd>
                          </div>
                        )}
                      </dl>
                    )}
                  </div>

                  <div className="space-y-10">
                    {s.windows && (
                      <div>
                        <h3 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">
                          Windows <span className="text-muted-foreground">· {products.length}</span>
                        </h3>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {products.map((p) => (
                            <StyleLink
                              key={p.slug}
                              href={`/products/${p.slug}/${s.slug}`}
                              image={p.heroImage}
                              alt=""
                              title={`${s.name} ${p.name}`}
                              note={p.title}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {s.doors.length > 0 && (
                      <div>
                        <h3 className="text-[12px] font-semibold uppercase tracking-[0.22em] text-forest">
                          Doors <span className="text-muted-foreground">· {s.doors.length}</span>
                        </h3>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {s.doors.map((d) => (
                            <StyleLink
                              key={d.slug}
                              href={`/products/doors/${d.slug}`}
                              image={d.image}
                              alt=""
                              title={d.name}
                              note={[d.series, d.layouts].filter(Boolean).join(" · ")}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <CollectionClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

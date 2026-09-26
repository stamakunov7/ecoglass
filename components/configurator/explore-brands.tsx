import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import type { BrandProfile } from "@/lib/configurator/types"

export type ExploreBrand = {
  profile: BrandProfile
  image: string
  alt: string
  href: string
}

function PriceTier({ tier }: { tier: number }) {
  return (
    <span className="text-[15px] font-bold tracking-[0.12em]" aria-label={`Price level ${tier} of 4`}>
      {[1, 2, 3, 4].map((n) => (
        <span key={n} className={n <= tier ? "text-forest" : "text-border"}>
          $
        </span>
      ))}
    </span>
  )
}

export function ExploreBrands({ heading, eyebrow, brands }: { heading: string; eyebrow: string; brands: ExploreBrand[] }) {
  if (brands.length === 0) return null
  return (
    <section className="border-t border-border bg-offwhite print:hidden">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="font-display text-[1.75rem] font-extrabold leading-tight text-forest sm:text-4xl">{heading}</h2>
        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {brands.map(({ profile, image, alt, href }) => (
            <article
              key={profile.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg hover:shadow-forest/10"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  width={640}
                  height={440}
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta">{eyebrow}</p>
                  {profile.priceTier && <PriceTier tier={profile.priceTier} />}
                </div>
                <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-forest">{profile.name}</h3>
                <ul className="mt-4 flex-1 space-y-2">
                  {profile.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[14px] text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className="mt-6 inline-flex h-11 items-center justify-center gap-2 self-start rounded-full border-2 border-cta px-6 text-sm font-semibold text-forest transition-colors hover:bg-cta hover:text-white"
                >
                  View product
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

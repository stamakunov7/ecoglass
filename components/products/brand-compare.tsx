import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import type { BrandSpecKey } from "@/lib/configurator/types"
import { PriceBars } from "./brand-collection"

export type CompareBrand = {
  slug: string
  name: string
  href: string
  image: string
  bestFor: string
  highlights: string[]
  priceTier?: number
  featured: boolean
  specs: Partial<Record<BrandSpecKey, string>>
}

const SPEC_ROWS: { key: BrandSpecKey; label: string }[] = [
  { key: "material", label: "Frame material" },
  { key: "impactGlass", label: "Impact-rated glass" },
  { key: "colors", label: "Colors" },
  { key: "warranty", label: "Warranty" },
]

export function BrandCompare({ brands, cta }: { brands: CompareBrand[]; cta: string }) {
  const cell = (featured: boolean, extra = "") =>
    `border-t border-[#eceee9] px-6 py-5 align-top ${featured ? "bg-cta/[0.07]" : ""} ${extra}`

  const rows: { label: string; render: (b: CompareBrand) => ReactNode }[] = [
    { label: "Best for", render: (b) => <span className="font-semibold text-forest">{b.bestFor}</span> },
  ]
  if (brands.some((b) => b.priceTier)) {
    rows.push({ label: "Price level", render: (b) => (b.priceTier ? <PriceBars tier={b.priceTier} tone="light" /> : "—") })
  }
  rows.push({
    label: "Highlights",
    render: (b) => (
      <ul className="flex flex-col gap-1.5 text-[14px] text-ink">
        {b.highlights.map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full bg-cta" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>
    ),
  })
  for (const spec of SPEC_ROWS) {
    if (brands.some((b) => b.specs[spec.key])) {
      rows.push({ label: spec.label, render: (b) => <span className="text-ink">{b.specs[spec.key] ?? "—"}</span> })
    }
  }

  return (
    <section className="bg-[#f5f4ef]">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
              <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
              Side by side
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-forest sm:text-5xl lg:text-[56px]">
              Compare the <span className="font-serif font-normal italic text-cta-dark">details.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-forest transition-colors hover:text-cta-dark"
          >
            See them in our Longwood showroom
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="overflow-x-auto rounded-[28px] bg-card shadow-[0_40px_80px_-40px_rgb(13_44_37/0.25),0_0_0_1px_rgb(13_44_37/0.06)]">
            <table className="w-full min-w-[820px] table-fixed border-collapse text-[15px]">
              <caption className="sr-only">Brand comparison</caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[20%] px-8 py-7 text-left align-bottom text-[11px] font-semibold tracking-[0.2em] text-[#6b7a74]">
                    BRAND
                  </th>
                  {brands.map((b) => (
                    <th
                      key={b.slug}
                      scope="col"
                      className={`relative px-6 py-7 text-left ${b.featured ? "bg-cta/[0.07]" : ""}`}
                    >
                      {b.featured && (
                        <span className="absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-cta" aria-hidden="true" />
                      )}
                      <span className="flex items-center gap-3">
                        <Image src={b.image} alt="" width={46} height={46} className="h-[46px] w-[46px] rounded-full object-cover" />
                        <span className="flex flex-col gap-0.5">
                          <span className="font-display text-[18px] font-extrabold text-forest">{b.name}</span>
                          {b.featured && (
                            <span className="text-[10.5px] font-bold tracking-[0.14em] text-cta-dark">MOST POPULAR</span>
                          )}
                        </span>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="transition-colors hover:bg-forest/[0.035]">
                    <th
                      scope="row"
                      className="border-t border-[#eceee9] px-8 py-5 text-left align-top text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b7a74]"
                    >
                      {row.label}
                    </th>
                    {brands.map((b) => (
                      <td key={b.slug} className={cell(b.featured)}>
                        {row.render(b)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="border-t border-[#eceee9] px-8 py-6" />
                  {brands.map((b) => (
                    <td key={b.slug} className={cell(b.featured, "py-6")}>
                      {b.featured ? (
                        <Link
                          href={b.href}
                          className="shine inline-flex h-[42px] items-center gap-1.5 rounded-full bg-forest px-5 text-[14px] font-semibold text-white transition-colors hover:bg-forest-deep"
                        >
                          {cta}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only"> — {b.name}</span>
                        </Link>
                      ) : (
                        <Link
                          href={b.href}
                          className="border-b border-forest pb-0.5 text-[14px] font-semibold text-forest transition-colors hover:border-cta-dark hover:text-cta-dark"
                        >
                          {cta}
                          <span className="sr-only"> — {b.name}</span>
                        </Link>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

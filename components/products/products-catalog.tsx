"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { ProductCategory } from "./product-catalog"

export type CatalogItem = {
  slug: string
  name: string
  category: ProductCategory
  title: string
  heroImage: string
  heroAlt: string
}

type Filter = "All" | ProductCategory

const filters: Filter[] = ["All", "Windows", "Doors"]

export function ProductsCatalog({
  items,
  initialFilter = "All",
}: {
  items: CatalogItem[]
  initialFilter?: Filter
}) {
  const [active, setActive] = useState<Filter>(initialFilter)

  const windowsCount = items.filter((i) => i.category === "Windows").length
  const doorsCount = items.filter((i) => i.category === "Doors").length
  const counts: Record<Filter, number> = {
    All: items.length,
    Windows: windowsCount,
    Doors: doorsCount,
  }

  const visible = active === "All" ? items : items.filter((i) => i.category === active)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-6">
        {filters.map((f) => {
          const selected = active === f
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={selected}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                selected
                  ? "bg-forest text-white"
                  : "border border-border bg-card text-ink/70 hover:border-cta/40 hover:text-cta"
              }`}
            >
              {f}
              <span
                className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                  selected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                }`}
              >
                {counts[f]}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <Link
            key={item.slug}
            href={`/products/${item.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-forest/5 transition-all duration-200 hover:-translate-y-1 hover:border-cta/30 hover:shadow-md hover:shadow-forest/10"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={item.heroImage || "/placeholder.svg"}
                alt={item.heroAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-card/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-forest backdrop-blur-sm">
                {item.category}
              </span>
            </div>
            <div className="flex flex-1 items-center justify-between gap-3 px-5 py-4">
              <h3 className="font-display text-lg font-bold tracking-tight text-forest text-balance">
                {item.title}
              </h3>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-forest transition-colors group-hover:border-cta group-hover:bg-cta group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

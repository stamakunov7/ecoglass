"use client"

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { glideTo } from "@/lib/smooth-scroll"
import type { ProductCategory } from "./product-catalog"

export type CatalogItem = {
  slug: string
  name: string
  category: ProductCategory
  title: string
  summary: string
  heroImage: string
  heroAlt: string
  href: string
  /** Corner label, e.g. "4 brands" or a door's series */
  badge?: string
}

type Filter = "All" | ProductCategory

const FILTERS: Filter[] = ["All", "Windows", "Doors"]

const GROUPS: { category: ProductCategory; id: string; note: string }[] = [
  {
    category: "Windows",
    id: "windows",
    note: "Made to measure for every opening, from classic hung windows to arches and custom shapes.",
  },
  {
    category: "Doors",
    id: "doors",
    note: "Sliding doors from NOVA, PRESTIGE and DURAPLUS, plus terrace, patio, entry and storm doors.",
  },
]

const pad = (n: number) => String(n).padStart(2, "0")

/** Tracks the pointer so the card can paint a soft spotlight under it. */
function trackSpotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
}

function CatalogCard({ item, number }: { item: CatalogItem; number: number }) {
  return (
    <Link
      href={item.href}
      onMouseMove={trackSpotlight}
      className="group relative isolate block h-[440px] overflow-hidden rounded-[28px] bg-forest-deep shadow-[0_30px_60px_-35px_rgb(13_44_37/0.6)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_50px_90px_-40px_rgb(13_44_37/0.75),0_0_0_1px_rgb(159_211_162/0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:h-[480px]"
    >
      <Image
        src={item.heroImage}
        alt={item.heroAlt}
        fill
        sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(8_26_21/0.3)_0%,rgb(8_26_21/0)_26%,rgb(8_26_21/0.5)_58%,rgb(8_26_21/0.96)_100%)]"
        aria-hidden="true"
      />
      {/* Pointer spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(255 255 255 / 0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 font-display text-[11px] font-bold tabular-nums tracking-[0.16em] text-white backdrop-blur-xl">
          {pad(number)}
        </span>
        {item.badge && (
          <span className="truncate rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-xl">
            {item.badge}
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9fd3a2]">{item.category}</p>
        <h3 className="mt-2 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.025em] lg:text-[32px]">
          {item.name}
        </h3>
        <p className="mt-2.5 max-w-[40ch] text-[14.5px] leading-relaxed text-white/70">{item.summary}</p>
        <span className="mt-5 inline-flex items-center gap-3 text-[14px] font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-forest">
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
          {item.category === "Windows" ? "Compare brands" : "View door"}
        </span>
      </div>
    </Link>
  )
}

export function ProductsCatalog({ items, initialFilter = "All" }: { items: CatalogItem[]; initialFilter?: Filter }) {
  const [active, setActive] = useState<Filter>(initialFilter)
  const sectionRef = useRef<HTMLElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)

  const counts: Record<Filter, number> = {
    All: items.length,
    Windows: items.filter((i) => i.category === "Windows").length,
    Doors: items.filter((i) => i.category === "Doors").length,
  }
  const groups = GROUPS.filter((g) => active === "All" || g.category === active)

  // The highlight slides under whichever filter is selected.
  useLayoutEffect(() => {
    const place = () => {
      const tab = tabRefs.current[FILTERS.indexOf(active)]
      if (tab) setPill({ left: tab.offsetLeft, width: tab.offsetWidth })
    }
    place()
    document.fonts?.ready.then(place)
    window.addEventListener("resize", place)
    return () => window.removeEventListener("resize", place)
  }, [active])

  // Links like "See all windows" arrive with a category: skip the hero and land on the list.
  useEffect(() => {
    if (initialFilter !== "All") sectionRef.current?.scrollIntoView()
  }, [initialFilter])

  function choose(filter: Filter) {
    setActive(filter)
    window.history.replaceState(null, "", filter === "All" ? "/products" : `/products?category=${filter.toLowerCase()}`)
    const section = sectionRef.current
    if (section && section.getBoundingClientRect().top < 0) glideTo(section, 1)
  }

  return (
    <section ref={sectionRef} id="catalog" className="scroll-mt-[var(--header-h)] bg-offwhite">
      {/* Filter bar stays under the header while the list scrolls */}
      <div className="sticky top-[var(--header-h)] z-20 border-b border-forest/10 bg-offwhite/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] w-full max-w-[1400px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <div className="relative inline-flex rounded-full bg-card p-1 shadow-[0_8px_24px_-14px_rgb(13_44_37/0.35)] ring-1 ring-forest/10">
            {pill && (
              <span
                className="absolute inset-y-1 rounded-full bg-forest transition-[left,width] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
                style={{ left: pill.left, width: pill.width }}
                aria-hidden="true"
              />
            )}
            {FILTERS.map((f, i) => {
              const selected = active === f
              return (
                <button
                  key={f}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  type="button"
                  onClick={() => choose(f)}
                  aria-pressed={selected}
                  className={`relative inline-flex h-10 items-center gap-2 rounded-full px-4 text-[14px] font-semibold transition-colors duration-300 sm:px-5 ${
                    selected ? "text-white" : "text-ink/70 hover:text-forest"
                  } ${!pill && selected ? "bg-forest" : ""}`}
                >
                  {f}
                  <span
                    className={`text-[12px] font-bold tabular-nums transition-colors duration-300 ${
                      selected ? "text-[#9fd3a2]" : "text-muted-foreground"
                    }`}
                  >
                    {pad(counts[f])}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="hidden text-[14px] text-muted-foreground md:block">
            Every window style comes in <span className="font-semibold text-forest">four brands</span>, compared side by side.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        {groups.map((group) => {
          const list = items.filter((i) => i.category === group.category)
          // The lead card spans two columns; on two-column screens only when the rest still pair up evenly.
          const leadSpansOnTablet = (list.length - 1) % 2 === 0
          return (
            <div
              key={group.id}
              id={group.id}
              className="scroll-mt-[calc(var(--header-h)+76px)] pt-14 sm:pt-16 lg:pt-20"
            >
              <Reveal className="flex flex-col gap-4 border-b border-forest/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-[-0.04em] text-forest sm:text-6xl lg:text-[80px]">
                  {group.category}
                  <sup className="ml-2 align-top font-serif text-2xl font-normal italic tracking-normal text-cta-dark sm:text-3xl">
                    {pad(list.length)}
                  </sup>
                </h2>
                <p className="max-w-[420px] text-[16px] leading-relaxed text-muted-foreground">{group.note}</p>
              </Reveal>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
                {list.map((item, i) => (
                  <Reveal
                    key={item.slug}
                    delay={(i % 3) * 90}
                    className={i === 0 ? `lg:col-span-2 ${leadSpansOnTablet ? "sm:col-span-2" : ""}` : ""}
                  >
                    <CatalogCard item={item} number={items.indexOf(item) + 1} />
                  </Reveal>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

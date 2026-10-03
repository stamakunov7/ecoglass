"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/reveal"
import { CATEGORY_LABEL, GALLERY, GALLERY_CATEGORIES, smallSrc, type GalleryCategory } from "./gallery-data"
import { GalleryLightbox } from "./gallery-lightbox"

type Filter = "all" | GalleryCategory

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  const filterRefs = useRef<Partial<Record<Filter, HTMLButtonElement | null>>>({})
  const tileRefs = useRef(new Map<string, HTMLElement>())
  const gridRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const items = filter === "all" ? GALLERY : GALLERY.filter((item) => item.category === filter)
  const count = (id: Filter) => (id === "all" ? GALLERY.length : GALLERY.filter((item) => item.category === id).length)

  // Slide the dark pill under the active filter.
  useEffect(() => {
    const measure = () => {
      const button = filterRefs.current[filter]
      if (button) setPill({ left: button.offsetLeft, width: button.offsetWidth })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [filter])

  // Tiles rise in as they scroll into view (re-run whenever the filter swaps the set).
  useEffect(() => {
    const tiles = gridRef.current?.querySelectorAll<HTMLElement>("[data-tile]")
    if (!tiles) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).style.animationPlayState = "running"
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -6% 0px" },
    )
    tiles.forEach((tile) => observer.observe(tile))
    return () => observer.disconnect()
  }, [filter])

  // A round "View" cursor trails the mouse over the photos.
  function onPointerMove(e: React.PointerEvent) {
    const cursor = cursorRef.current
    if (!cursor || e.pointerType !== "mouse") return
    const overTile = openIndex === null && !!(e.target as Element).closest("[data-tile]")
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${overTile ? 1 : 0})`
  }

  function hideCursor() {
    const cursor = cursorRef.current
    if (cursor) cursor.style.transform = cursor.style.transform.replace(/scale\([^)]*\)/, "scale(0)")
  }

  const tileRect = useCallback((slug: string) => tileRefs.current.get(slug)?.getBoundingClientRect() ?? null, [])

  function closeLightbox() {
    const last = openIndex === null ? null : items[openIndex]
    setOpenIndex(null)
    if (last) tileRefs.current.get(last.slug)?.focus({ preventScroll: true })
  }

  return (
    <section id="work" className="scroll-mt-[var(--header-h)] bg-offwhite">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
              <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
              Browse
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest text-balance sm:text-5xl lg:text-[64px]">
              A closer look <span className="font-serif font-normal italic text-cta-dark">at the work.</span>
            </h2>
            <p className="mt-5 max-w-[460px] text-[16px] leading-relaxed text-muted-foreground">
              Filter by product, then open any photo to see it full screen.
            </p>
          </div>

          {/* Filters: scrolls sideways on small screens */}
          <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div className="relative inline-flex rounded-full border border-forest/15 bg-card p-1 shadow-sm">
              <span
                className={`absolute inset-y-1 rounded-full bg-forest shadow-md shadow-forest/25 transition-[left,width,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  pill ? "opacity-100" : "opacity-0"
                }`}
                style={{ left: pill?.left ?? 0, width: pill?.width ?? 0 }}
                aria-hidden="true"
              />
              {GALLERY_CATEGORIES.map(({ id, label }) => (
                <button
                  key={id}
                  ref={(el) => {
                    filterRefs.current[id] = el
                  }}
                  type="button"
                  onClick={() => setFilter(id)}
                  aria-pressed={filter === id}
                  className={`relative z-10 flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[14px] font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta sm:px-5 ${
                    filter === id ? "text-white" : "text-forest/70 hover:text-forest"
                  }`}
                >
                  {label}
                  <sup className={`text-[10px] tabular-nums ${filter === id ? "text-[#9fd3a2]" : "text-forest/40"}`}>
                    {count(id)}
                  </sup>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Masonry */}
        <div
          ref={gridRef}
          key={filter}
          onPointerMove={onPointerMove}
          onPointerLeave={hideCursor}
          className="mt-10 columns-2 gap-3 sm:gap-5 lg:mt-16 lg:columns-3 xl:columns-4"
        >
          {items.map((item, i) => (
            <button
              key={item.slug}
              ref={(el) => {
                if (el) tileRefs.current.set(item.slug, el)
                else tileRefs.current.delete(item.slug)
              }}
              data-tile
              type="button"
              onClick={() => {
                hideCursor()
                setOpenIndex(i)
              }}
              aria-label={`Open photo: ${item.title}`}
              className="gallery-in group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-forest/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 sm:mb-5 sm:rounded-[20px] [@media(pointer:fine)]:cursor-none"
              style={{ animationPlayState: "paused", animationDelay: `${(i % 4) * 90}ms` }}
            >
              <img
                src={smallSrc(item.slug)}
                alt={item.title}
                loading="lazy"
                decoding="async"
                width={720}
                height={Math.round((720 * item.height) / item.width)}
                className="w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                style={{ aspectRatio: item.ratio }}
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-[rgb(8_26_21/0.85)] via-[rgb(8_26_21/0.15)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 text-left text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9fd3a2]">
                  {CATEGORY_LABEL[item.category]}
                </span>
                <span className="mt-1 block font-display text-lg font-bold leading-snug">{item.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Trailing cursor (mouse only) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden h-[84px] w-[84px] items-center justify-center rounded-full bg-white/90 text-[12px] font-bold uppercase tracking-[0.2em] text-forest shadow-xl shadow-black/20 backdrop-blur-md transition-transform duration-300 ease-out [@media(pointer:fine)]:flex"
        style={{ transform: "translate3d(-200px, -200px, 0) scale(0)" }}
        aria-hidden="true"
      >
        View
      </div>

      {openIndex !== null && (
        <GalleryLightbox
          items={items}
          index={openIndex}
          onIndexChange={setOpenIndex}
          onClose={closeLightbox}
          tileRect={tileRect}
        />
      )}
    </section>
  )
}

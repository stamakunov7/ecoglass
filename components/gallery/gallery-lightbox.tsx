"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, X } from "lucide-react"
import { CATEGORY_LABEL, fullSrc, smallSrc, type GalleryItem } from "./gallery-data"

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)"

/** Transform and clip that make the full photo sit exactly over a cropped grid tile. */
function morphFrom(tile: DOMRect, box: DOMRect) {
  const scale = Math.max(tile.width / box.width, tile.height / box.height)
  const insetX = (box.width - tile.width / scale) / 2
  const insetY = (box.height - tile.height / scale) / 2
  const dx = tile.left + tile.width / 2 - (box.left + box.width / 2)
  const dy = tile.top + tile.height / 2 - (box.top + box.height / 2)
  return {
    transform: `translate(${dx}px, ${dy}px) scale(${scale})`,
    clipPath: `inset(${insetY}px ${insetX}px round ${20 / scale}px)`,
  }
}

function isOnScreen(rect: DOMRect) {
  return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0
}

export function GalleryLightbox({
  items,
  index,
  onIndexChange,
  onClose,
  tileRect,
}: {
  items: GalleryItem[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
  /** Where a photo's tile currently sits in the grid, if it is rendered. */
  tileRect: (slug: string) => DOMRect | null
}) {
  const item = items[index]
  const dialogRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const direction = useRef(0)
  const opened = useRef(false)
  const closing = useRef(false)
  const swipeStart = useRef<number | null>(null)
  const [fullLoaded, setFullLoaded] = useState<string | null>(null)
  const [backdropIn, setBackdropIn] = useState(false)

  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // Open: fly the photo out of its tile. Later changes: slide the next photo in.
  useLayoutEffect(() => {
    const box = boxRef.current
    if (!box) return
    if (!opened.current) {
      opened.current = true
      requestAnimationFrame(() => setBackdropIn(true))
      const tile = tileRect(item.slug)
      if (tile && !reduce) {
        const from = morphFrom(tile, box.getBoundingClientRect())
        box.animate([from, { transform: "none", clipPath: "inset(0px 0px round 12px)" }], {
          duration: 700,
          easing: EASE,
        })
      }
      return
    }
    if (reduce) return
    box.animate(
      [
        { opacity: 0, transform: `translateX(${direction.current * 70}px) scale(0.97)` },
        { opacity: 1, transform: "none" },
      ],
      { duration: 500, easing: EASE },
    )
    // Only the slug matters here; the callbacks are stable for the life of the dialog.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.slug])

  function close() {
    if (closing.current) return
    closing.current = true
    setBackdropIn(false)
    const box = boxRef.current
    const tile = tileRect(item.slug)
    if (!box || reduce) {
      onClose()
      return
    }
    const animation =
      tile && isOnScreen(tile)
        ? box.animate([{ transform: "none", clipPath: "inset(0px 0px round 12px)" }, morphFrom(tile, box.getBoundingClientRect())], {
            duration: 600,
            easing: EASE,
            fill: "forwards",
          })
        : box.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "scale(0.94)" }], {
            duration: 300,
            easing: EASE,
            fill: "forwards",
          })
    animation.onfinish = onClose
  }

  function go(step: number) {
    if (closing.current) return
    direction.current = step
    onIndexChange((index + step + items.length) % items.length)
  }

  // Keep the page still underneath.
  useEffect(() => {
    const root = document.documentElement
    const previous = root.style.overflow
    root.style.overflow = "hidden"
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = previous
    }
  }, [])

  // Keyboard: arrows, Escape, and Tab kept inside the dialog.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close()
      else if (e.key === "ArrowRight") go(1)
      else if (e.key === "ArrowLeft") go(-1)
      else if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button")
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  // Warm up the neighbours and keep the active thumbnail in view.
  useEffect(() => {
    for (const step of [1, -1]) {
      const neighbour = items[(index + step + items.length) % items.length]
      new window.Image().src = fullSrc(neighbour.slug)
    }
    thumbsRef.current
      ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", inline: "center", block: "nearest" })
  }, [index, items, reduce])

  const aspect = item.width / item.height

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${items.length}: ${item.title}`}
      className="fixed inset-0 z-50 flex flex-col text-white"
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-[rgb(6_20_16/0.94)] backdrop-blur-xl transition-opacity duration-500 ${
          backdropIn ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Top bar */}
      <div
        className={`relative flex items-start justify-between gap-6 px-5 pt-5 transition-opacity duration-500 sm:px-8 sm:pt-7 ${
          backdropIn ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="min-w-0">
          <p className="font-display text-sm font-bold tabular-nums text-[#9fd3a2]">
            {String(index + 1).padStart(2, "0")} <span className="text-white/35">/ {String(items.length).padStart(2, "0")}</span>
          </p>
          <p className="mt-1 line-clamp-2 font-display text-lg font-bold leading-snug sm:text-xl">{item.title}</p>
          <p className="text-[13px] text-white/55">{CATEGORY_LABEL[item.category]}</p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fd3a2]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Photo */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-5 sm:px-24"
        onPointerDown={(e) => {
          swipeStart.current = e.clientX
        }}
        onPointerUp={(e) => {
          if (swipeStart.current === null) return
          const dx = e.clientX - swipeStart.current
          swipeStart.current = null
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        <div
          ref={boxRef}
          className="relative overflow-hidden rounded-xl bg-white/5 shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)]"
          style={{
            aspectRatio: `${item.width} / ${item.height}`,
            width: `min(100%, calc((100svh - 240px) * ${aspect}))`,
          }}
        >
          {/* The small file is already cached from the grid, so the photo shows instantly */}
          <img
            src={smallSrc(item.slug)}
            alt=""
            draggable={false}
            className="absolute inset-0 h-full w-full select-none object-cover"
          />
          <img
            key={item.slug}
            src={fullSrc(item.slug)}
            alt={item.title}
            draggable={false}
            onLoad={() => setFullLoaded(item.slug)}
            className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-500 ${
              fullLoaded === item.slug ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className={`absolute left-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:-translate-x-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fd3a2] sm:left-6 sm:flex ${
            backdropIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className={`absolute right-3 top-1/2 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all hover:translate-x-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fd3a2] sm:right-6 sm:flex ${
            backdropIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Thumbnails */}
      <div
        ref={thumbsRef}
        className={`relative overflow-x-auto px-5 pb-5 [scrollbar-width:none] transition-opacity duration-500 sm:px-8 sm:pb-7 [&::-webkit-scrollbar]:hidden ${
          backdropIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* w-max + mx-auto: centered while it fits, scrollable once it doesn't */}
        <div className="mx-auto flex w-max gap-2 p-1">
        {items.map((thumb, i) => (
          <button
            key={thumb.slug}
            type="button"
            data-index={i}
            onClick={() => {
              direction.current = i > index ? 1 : -1
              onIndexChange(i)
            }}
            aria-label={`Show photo ${i + 1}: ${thumb.title}`}
            aria-current={i === index || undefined}
            className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9fd3a2] sm:h-16 sm:w-16 ${
              i === index ? "opacity-100 ring-2 ring-[#9fd3a2] ring-offset-2 ring-offset-[rgb(6_20_16)]" : "opacity-40 hover:opacity-80"
            }`}
          >
            <img src={smallSrc(thumb.slug)} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
        </div>
      </div>
    </div>
  )
}

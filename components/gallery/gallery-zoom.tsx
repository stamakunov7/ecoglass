"use client"

import { useEffect, useRef } from "react"
import { glideTo, hasSmoothScroll, isGliding } from "@/lib/smooth-scroll"
import { fullSrc } from "./gallery-data"

/**
 * Seven photos around a center one. While the section is pinned, every frame scales up from the
 * middle of the screen, so the center photo grows to fill it and the others fly outward.
 * Sizes and offsets are in viewport units; `scale` is how large each one ends up.
 *
 * Mouse and keyboard users don't have to scroll the whole way: once they start into the zoom, the
 * page glides slowly to its end (or back to its start when scrolling up).
 */
const TILES = [
  { slug: "multi-slide", scale: 4, box: "h-[25vh] w-[25vw]" },
  { slug: "dusk-home", scale: 5, box: "-top-[30vh] left-[5vw] h-[30vh] w-[35vw]" },
  { slug: "window-walls", scale: 6, box: "-left-[25vw] -top-[10vh] h-[45vh] w-[20vw]" },
  { slug: "entry-dusk", scale: 5, box: "left-[27.5vw] h-[25vh] w-[25vw]" },
  { slug: "bay-window", scale: 6, box: "left-[5vw] top-[27.5vh] h-[25vh] w-[20vw]" },
  { slug: "french-doors", scale: 8, box: "-left-[22.5vw] top-[27.5vh] h-[25vh] w-[30vw]" },
  { slug: "frame-detail", scale: 9, box: "left-[25vw] top-[22.5vh] h-[15vh] w-[15vw]" },
]

export function GalleryZoom() {
  const sectionRef = useRef<HTMLElement>(null)
  const layerRefs = useRef<(HTMLDivElement | null)[]>([])
  const captionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    // Touch scrolling keeps its own momentum, so the glide is only for wheel and keyboard.
    const assist = !reduce && !window.matchMedia("(pointer: coarse)").matches
    let frame = 0
    let lastY = window.scrollY

    const update = () => {
      const rect = section.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      const p = reduce ? 1 : Math.min(1, Math.max(0, -rect.top / travel))
      // Ease out so the zoom slows as the center photo settles full screen.
      const eased = 1 - Math.pow(1 - p, 2)
      TILES.forEach((tile, i) => {
        const layer = layerRefs.current[i]
        if (layer) layer.style.transform = `scale(${1 + eased * (tile.scale - 1)})`
      })
      const caption = captionRef.current
      if (caption) {
        const t = Math.min(1, Math.max(0, (p - 0.72) / 0.2))
        caption.style.opacity = String(t)
        caption.style.transform = `translateY(${(1 - t) * 24}px)`
      }

      const y = window.scrollY
      const direction = Math.sign(y - lastY)
      lastY = y
      if (assist && direction !== 0 && hasSmoothScroll() && !isGliding()) {
        const start = rect.top + y
        if (direction > 0 && p > 0.003 && p < 0.9) glideTo(start + travel, 2.6)
        else if (direction < 0 && p < 0.997 && p > 0.1) glideTo(start, 2.6)
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[240svh] bg-forest-deep sm:h-[300svh]" aria-label="Featured photos">
      <div className="sticky top-0 h-svh overflow-hidden">
        {TILES.map((tile, i) => (
          <div
            key={tile.slug}
            ref={(el) => {
              layerRefs.current[i] = el
            }}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
          >
            <div className={`relative overflow-hidden rounded-[2px] ${tile.box}`}>
              <img
                src={fullSrc(tile.slug)}
                alt=""
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        ))}

        {/* Caption over the center photo once it fills the screen */}
        <div
          ref={captionRef}
          className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-b from-transparent via-transparent to-[rgb(8_26_21/0.75)] px-5 pb-20 text-center text-white opacity-0 sm:pb-24"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              Made to measure
            </p>
            <p className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[76px]">
              Every opening, <span className="font-serif font-normal italic text-[#cfe8cf]">its own design.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

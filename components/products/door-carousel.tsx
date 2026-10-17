"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { type DoorModel } from "./door-catalog"

const pad = (n: number) => String(n).padStart(2, "0")

/** Panel layout drawn as glass panes: X slides (with an arrow), O stays fixed. */
export function PanelDiagram({ panels, tone = "dark", size = "md" }: { panels: string; tone?: "dark" | "light"; size?: "sm" | "md" }) {
  const frame = tone === "dark" ? "border-white/45" : "border-forest/40"
  const moving = tone === "dark" ? "bg-[#9fd3a2]/25 text-[#cfe8cf]" : "bg-cta/15 text-cta-dark"
  const fixed = tone === "dark" ? "text-white/45" : "text-forest/45"
  const box = size === "sm" ? "h-7 w-[18px] text-[9px]" : "h-12 w-8 text-[11px]"
  return (
    <span className="inline-flex gap-[3px]" role="img" aria-label={`Panel layout ${panels}: X slides, O is fixed`}>
      {panels.split("").map((p, i) => (
        <span
          key={i}
          className={`flex items-center justify-center rounded-[3px] border font-display font-bold ${frame} ${box} ${
            p === "X" ? moving : fixed
          }`}
          aria-hidden="true"
        >
          {p}
        </span>
      ))}
    </span>
  )
}

function DoorCard({ door, number, tone }: { door: DoorModel; number: number; tone: "dark" | "light" }) {
  return (
    <Link
      href={`/products/doors/${door.slug}`}
      draggable={false}
      className={`group relative isolate block h-[500px] w-[80vw] max-w-[440px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-forest-deep sm:w-[400px] lg:w-[420px] ${
        tone === "dark"
          ? // Full-screen showcase: the cards shrink on short screens so the whole row stays in view.
            "ring-1 ring-white/10 lg:h-[clamp(440px,calc(100svh-470px),600px)]"
          : "shadow-[0_30px_60px_-35px_rgb(13_44_37/0.6)] lg:h-[560px]"
      }`}
    >
      <Image
        src={door.image}
        alt={door.alt}
        fill
        draggable={false}
        sizes="(min-width: 640px) 420px, 80vw"
        className="-z-10 select-none object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(8_26_21/0.35)_0%,rgb(8_26_21/0)_26%,rgb(8_26_21/0.55)_58%,rgb(8_26_21/0.96)_100%)]"
        aria-hidden="true"
      />

      <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3">
        <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 font-display text-[11px] font-bold tabular-nums tracking-[0.16em] text-white backdrop-blur-xl">
          {pad(number)}
        </span>
        {door.series && (
          <span className="truncate rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-forest-deep backdrop-blur-xl">
            {door.series}
          </span>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#9fd3a2]">{door.kind}</p>
        <h3 className="mt-2 font-display text-[28px] font-extrabold leading-[1.05] tracking-[-0.025em]">{door.name}</h3>
        <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/70">{door.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-3 text-[14px] font-semibold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-forest">
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
            View door
          </span>
          {door.panels && <PanelDiagram panels={door.panels} size="sm" />}
        </div>
      </div>
    </Link>
  )
}

/**
 * A row of door cards you can swipe, drag with the mouse, or step through with the arrows.
 * The row starts in line with the page content and runs off the right edge of the screen.
 */
export function DoorCarousel({
  doors,
  heading,
  tone = "dark",
  numberFrom,
}: {
  doors: DoorModel[]
  heading: ReactNode
  tone?: "dark" | "light"
  /** Card numbers follow the full lineup, so pass the lineup when showing part of it. */
  numberFrom?: DoorModel[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false })
  const [progress, setProgress] = useState(0)
  const [index, setIndex] = useState(0)
  const [edges, setEdges] = useState({ start: true, end: false })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const update = () => {
      const max = track.scrollWidth - track.clientWidth
      const card = track.firstElementChild as HTMLElement | null
      const step = card ? card.offsetWidth + 20 : 1
      setProgress(max > 0 ? track.scrollLeft / max : 1)
      setIndex(Math.min(doors.length - 1, Math.round(track.scrollLeft / step)))
      setEdges({ start: track.scrollLeft < 4, end: track.scrollLeft > max - 4 })
    }
    update()
    track.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      track.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [doors.length])

  // Card the arrows last aimed at, so quick repeated clicks keep stepping while the row is still gliding.
  const target = useRef({ index: 0, at: 0 })

  function step(direction: 1 | -1) {
    const track = trackRef.current
    const card = track?.firstElementChild as HTMLElement | null
    if (!track || !card) return
    const width = card.offsetWidth + 20
    const now = performance.now()
    const from = now - target.current.at < 700 ? target.current.index : Math.round(track.scrollLeft / width)
    const index = Math.max(0, Math.min(doors.length - 1, from + direction))
    target.current = { index, at: now }
    track.scrollTo({ left: index * width, behavior: "smooth" })
  }

  // Mouse drag; touch keeps the browser's own swipe and momentum.
  function onPointerDown(e: React.PointerEvent) {
    const track = trackRef.current
    if (!track || e.pointerType !== "mouse" || e.button !== 0) return
    drag.current = { active: true, startX: e.clientX, startLeft: track.scrollLeft, moved: false }
    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - drag.current.startX
      if (!drag.current.moved && Math.abs(dx) > 6) {
        drag.current.moved = true
        track.style.scrollSnapType = "none"
        track.style.cursor = "grabbing"
      }
      if (drag.current.moved) track.scrollLeft = drag.current.startLeft - dx
    }
    const onUp = () => {
      drag.current.active = false
      track.style.cursor = ""
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      if (!drag.current.moved) return
      // Settle on the nearest card, then hand snapping back to the browser.
      const card = track.firstElementChild as HTMLElement | null
      const stepWidth = card ? card.offsetWidth + 20 : 1
      track.scrollTo({ left: Math.round(track.scrollLeft / stepWidth) * stepWidth, behavior: "smooth" })
      window.setTimeout(() => (track.style.scrollSnapType = ""), 450)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  // A drag shouldn't count as a click on the card it ended over.
  function onClickCapture(e: React.MouseEvent) {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }

  const lineup = numberFrom ?? doors
  const arrow =
    tone === "dark"
      ? "border-white/25 text-white hover:border-white hover:bg-white hover:text-forest"
      : "border-forest/20 text-forest hover:border-forest hover:bg-forest hover:text-white"
  const muted = tone === "dark" ? "text-white/55" : "text-muted-foreground"
  const rail = tone === "dark" ? "bg-white/15" : "bg-forest/15"
  const fill = tone === "dark" ? "bg-[#9fd3a2]" : "bg-forest"

  return (
    <div>
      <div className="mx-auto flex w-full max-w-[1400px] items-end justify-between gap-6 px-5 sm:px-6 lg:px-8">
        <div className="min-w-0">{heading}</div>
        <div className="hidden shrink-0 items-center gap-3 sm:flex">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={edges.start}
            aria-label="Previous doors"
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-30 ${arrow}`}
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={edges.end}
            aria-label="Next doors"
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors disabled:pointer-events-none disabled:opacity-30 ${arrow}`}
          >
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onClickCapture={onClickCapture}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [scroll-padding-inline:max(1.25rem,calc((100vw-1400px)/2+2rem))] [padding-inline:max(1.25rem,calc((100vw-1400px)/2+2rem))] sm:cursor-grab lg:mt-12 [&::-webkit-scrollbar]:hidden"
      >
        {doors.map((door) => (
          <DoorCard key={door.slug} door={door} number={lineup.indexOf(door) + 1} tone={tone} />
        ))}
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-[1400px] items-center gap-5 px-5 sm:px-6 lg:px-8">
        <span className={`font-display text-[13px] font-bold tabular-nums tracking-[0.08em] ${muted}`}>
          {pad(index + 1)} / {pad(doors.length)}
        </span>
        <span className={`relative h-[2px] flex-1 overflow-hidden rounded-full ${rail}`}>
          <span
            className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-200 ${fill}`}
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </span>
      </div>
    </div>
  )
}

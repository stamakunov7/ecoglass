"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { Layers, Minus, Plus, RotateCcw } from "lucide-react"
import { glideTo } from "@/lib/smooth-scroll"
import { glasses } from "./glass-data"
import type { SceneApi, SideLabels } from "./glass-scene"

// three.js only loads on this page, and only once the viewer is near the screen.
const GlassScene = dynamic(() => import("./glass-scene"), {
  ssr: false,
  loading: () => <SceneLoading />,
})

function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="flex items-center gap-3 text-[13px] font-medium text-white/55">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-[#9fd3a2]" aria-hidden="true" />
        Loading 3D view…
      </span>
    </div>
  )
}

export const SHOW_GLASS_EVENT = "glass:show"

/** Interactive 3D cutaway of each glass: turn it, zoom in, take it apart and point at any layer. */
export function GlassExplorer() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<SceneApi | null>(null)
  const labelsRef = useRef<SideLabels>({ outside: null, inside: null })
  const [activeId, setActiveId] = useState(glasses[0]?.id)
  const [hovered, setHovered] = useState<number | null>(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [exploded, setExploded] = useState(false)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [interacted, setInteracted] = useState(false)
  const [reduce, setReduce] = useState(false)

  const active = glasses.find((g) => g.id === activeId) ?? glasses[0]

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const node = stageRef.current
    if (!node) return
    // Load the scene a little before it scrolls in; only render frames while it's on screen.
    const loader = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" })
    const watcher = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    loader.observe(node)
    watcher.observe(node)
    return () => {
      loader.disconnect()
      watcher.disconnect()
    }
  }, [])

  // "See it in 3D" buttons on the glass cards below pick a glass and bring the viewer up.
  useEffect(() => {
    const onShow = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      if (!glasses.some((g) => g.id === id)) return
      setActiveId(id)
      setHovered(null)
      if (sectionRef.current) glideTo(sectionRef.current, 1.4)
    }
    window.addEventListener(SHOW_GLASS_EVENT, onShow)
    return () => window.removeEventListener(SHOW_GLASS_EVENT, onShow)
  }, [])

  // The mouse wheel keeps scrolling the page; a trackpad pinch (sent as ctrl + wheel) zooms the model.
  useEffect(() => {
    const node = stageRef.current
    if (!node) return
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return
      e.preventDefault()
      apiRef.current?.zoom(Math.exp(e.deltaY * 0.01))
      setInteracted(true)
    }
    node.addEventListener("wheel", onWheel, { passive: false })
    return () => node.removeEventListener("wheel", onWheel)
  }, [])

  function choose(id: string) {
    setActiveId(id)
    setHovered(null)
  }

  if (!active) return null
  const hoveredLayer = hovered !== null ? active.layers[hovered] : null
  const button =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-colors hover:border-white/60 hover:bg-white/20"

  return (
    <section ref={sectionRef} id="explore" className="scroll-mt-[var(--header-h)] bg-forest-deep text-white">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              Interactive
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
              Take the glass <span className="font-serif font-normal italic text-[#cfe8cf]">apart.</span>
            </h2>
          </div>
          <p className="max-w-[420px] text-[16px] leading-relaxed text-white/65">
            Drag to turn it, pinch to zoom, and point at any layer to see what it does. Press{" "}
            <span className="font-semibold text-white">Take apart</span> to separate the layers.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)] lg:gap-8">
          {/* Stage */}
          <div
            ref={stageRef}
            onPointerMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              setPointer({ x: e.clientX - r.left, y: e.clientY - r.top })
            }}
            className={`relative h-[62svh] min-h-[420px] overflow-hidden rounded-[32px] bg-[#0f3229] ring-1 ring-white/10 lg:h-[640px] ${
              hovered !== null ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
            }`}
          >
            {near && (
              <GlassScene
                layers={active.layers}
                exploded={exploded}
                hovered={hovered}
                onHover={(index) => setHovered(index)}
                running={visible}
                autoRotate={!reduce && !interacted}
                apiRef={apiRef}
                labels={labelsRef}
                onInteract={() => setInteracted(true)}
              />
            )}
            {!near && <SceneLoading />}

            {/* Placed every frame by the scene, under the outside and inside faces */}
            {(["outside", "inside"] as const).map((side) => (
              <span
                key={side}
                ref={(el) => {
                  labelsRef.current[side] = el
                }}
                className="pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 opacity-0 backdrop-blur-sm transition-opacity"
                aria-hidden="true"
              >
                {side}
              </span>
            ))}

            {/* Soft vignette so the stage blends into the section */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(8_26_21/0.55)_100%)]"
              aria-hidden="true"
            />

            {/* Glass tabs */}
            <div className="absolute inset-x-4 top-4 flex gap-2 overflow-x-auto [scrollbar-width:none] sm:inset-x-5 sm:top-5 [&::-webkit-scrollbar]:hidden">
              {glasses.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => choose(g.id)}
                  aria-pressed={g.id === active.id}
                  className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold backdrop-blur-xl transition-colors ${
                    g.id === active.id
                      ? "bg-white text-forest"
                      : "border border-white/20 bg-white/10 text-white/85 hover:border-white/50 hover:text-white"
                  }`}
                >
                  {g.short}
                </button>
              ))}
            </div>

            {/* Tooltip that follows the pointer */}
            {hoveredLayer && (
              <div
                className="pointer-events-none absolute z-10 w-[240px] rounded-2xl border border-white/15 bg-[rgb(8_26_21/0.85)] p-4 shadow-2xl backdrop-blur-xl"
                style={{
                  left: Math.min(pointer.x + 18, (stageRef.current?.clientWidth ?? 600) - 256),
                  top: Math.max(pointer.y - 20, 64),
                }}
                role="status"
              >
                <p className="font-display text-[15px] font-bold text-[#cfe8cf]">{hoveredLayer.name}</p>
                <p className="mt-1 text-[13px] leading-snug text-white/75">{hoveredLayer.note}</p>
              </div>
            )}

            {/* Controls */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 sm:inset-x-5 sm:bottom-5">
              <p className="hidden text-[12px] text-white/50 sm:block">Drag to rotate · Pinch to zoom</p>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    apiRef.current?.zoom(1.25)
                    setInteracted(true)
                  }}
                  aria-label="Zoom out"
                  className={button}
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    apiRef.current?.zoom(0.8)
                    setInteracted(true)
                  }}
                  aria-label="Zoom in"
                  className={button}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    apiRef.current?.reset()
                    setExploded(false)
                  }}
                  aria-label="Reset view"
                  className={button}
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setExploded((v) => !v)
                    setInteracted(true)
                  }}
                  aria-pressed={exploded}
                  className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-bold transition-colors ${
                    exploded ? "bg-[#9fd3a2] text-forest-deep" : "bg-white text-forest hover:bg-[#e8f3e8]"
                  }`}
                >
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  {exploded ? "Put together" : "Take apart"}
                </button>
              </div>
            </div>
          </div>

          {/* Layer list, outside to inside */}
          <div className="flex flex-col rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9fd3a2]">{active.short}</p>
            <h3 className="mt-3 font-display text-2xl font-bold leading-tight">{active.name}</h3>
            <p className="mt-2 font-serif text-[19px] italic text-[#cfe8cf]">{active.tagline}</p>

            <p className="mt-8 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">
              <span>Outside</span>
              <span aria-hidden="true">↓</span>
            </p>
            <ol className="mt-3 divide-y divide-white/10 border-y border-white/10">
              {active.layers.map((layer, i) => (
                <li key={`${layer.name}-${i}`}>
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(i)}
                    onBlur={() => setHovered(null)}
                    className={`flex w-full items-start gap-3 py-3.5 text-left transition-colors ${
                      hovered === i ? "text-white" : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span
                      className={`mt-0.5 font-display text-[12px] font-bold tabular-nums ${
                        hovered === i ? "text-[#9fd3a2]" : "text-white/40"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold">{layer.name}</span>
                      {hovered === i && <span className="mt-1 block text-[13px] leading-snug text-white/60">{layer.note}</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Inside</p>

            <a
              href={`#${active.id}`}
              className="mt-auto pt-8 text-[14px] font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Read more about {active.short} glass ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

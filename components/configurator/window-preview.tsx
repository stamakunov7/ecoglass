"use client"

import { useId, type ReactNode } from "react"
import { isDark, shade } from "@/lib/configurator/format"
import type { GrillePattern, WindowKind } from "@/lib/configurator/types"

type Line = { x1: number; y1: number; x2: number; y2: number }

/** Grille bars for one pane, as center lines inside the glass rectangle. */
export function grilleLines(pattern: GrillePattern, x: number, y: number, w: number, h: number): Line[] {
  const lines: Line[] = []
  const v = (px: number, top = y, bottom = y + h) => lines.push({ x1: px, y1: top, x2: px, y2: bottom })
  const hz = (py: number) => lines.push({ x1: x, y1: py, x2: x + w, y2: py })

  if (pattern === "colonial") {
    const rows = h > w * 1.3 ? 3 : 2
    const cols = Math.max(1, Math.round((w / h) * rows))
    for (let i = 1; i < cols; i++) v(x + (w * i) / cols)
    for (let j = 1; j < rows; j++) hz(y + (h * j) / rows)
  } else if (pattern === "prairie") {
    const d = Math.min(w, h) * 0.16
    v(x + d)
    v(x + w - d)
    hz(y + d)
    hz(y + h - d)
  } else if (pattern === "fractional") {
    const band = h * 0.3
    const cols = Math.min(5, Math.max(2, Math.round(w / (band * 1.6))))
    hz(y + band)
    for (let i = 1; i < cols; i++) v(x + (w * i) / cols, y, y + band)
  }
  return lines
}

type Finish = { hex: string; metallic?: boolean }

type WindowPreviewProps = {
  kind: WindowKind
  /** Unit size in inches — the drawing keeps these proportions. */
  width: number
  height: number
  /** Frame color for the side being viewed. */
  frame: string
  view: "interior" | "exterior"
  grille: GrillePattern
  /** Hardware finish; only drawn on the interior view. */
  finish?: Finish | null
  className?: string
  title?: string
}

const VB_W = 640
const VB_H = 480

export function WindowPreview({
  kind,
  width,
  height,
  frame,
  view,
  grille,
  finish,
  className = "",
  title,
}: WindowPreviewProps) {
  const uid = useId().replace(/:/g, "")
  const ids = {
    glass: `${uid}-glass`,
    shine: `${uid}-shine`,
    shadow: `${uid}-shadow`,
    metal: `${uid}-metal`,
    arch: `${uid}-arch`,
  }

  // Fit the unit into the drawing area while keeping its real proportions.
  const scale = Math.min(500 / width, 370 / height)
  const W = width * scale
  const H = height * scale
  const x0 = (VB_W - W) / 2
  const y0 = (VB_H - H) / 2 - 4
  const f = Math.min(22, Math.max(10, Math.min(W, H) * 0.075)) // frame depth

  const dark = isDark(frame)
  const edge = shade(frame, dark ? 0.22 : -0.24)
  const face = shade(frame, dark ? 0.07 : -0.06)
  const bar = Math.min(6, Math.max(2.5, Math.min(W, H) * 0.02))
  const interior = view === "interior"
  const fill = (color: string) => ({ fill: color })
  const hw = interior && finish ? finish : null
  const hwFill = hw ? (hw.metallic ? `url(#${ids.metal})` : hw.hex) : ""
  const hwEdge = hw ? shade(hw.hex, -0.35) : ""

  /* ---------- building blocks ---------- */

  const glassPane = ({ x, y, w, h, clip }: { x: number; y: number; w: number; h: number; clip?: string }) => (
    <g clipPath={clip}>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${ids.glass})`} />
      <polygon
        points={`${x},${y + h * 0.55} ${x + w * 0.42},${y} ${x + w * 0.62},${y} ${x},${y + h * 0.95}`}
        fill={`url(#${ids.shine})`}
      />
      {grilleLines(grille, x, y, w, h).map((l, i) => (
        <rect
          key={i}
          x={Math.min(l.x1, l.x2) - (l.x1 === l.x2 ? bar / 2 : 0)}
          y={Math.min(l.y1, l.y2) - (l.y1 === l.y2 ? bar / 2 : 0)}
          width={l.x1 === l.x2 ? bar : Math.abs(l.x2 - l.x1)}
          height={l.y1 === l.y2 ? bar : Math.abs(l.y2 - l.y1)}
          style={fill(frame)}
          stroke={edge}
          strokeWidth={0.6}
          className="transition-[fill] duration-300"
        />
      ))}
    </g>
  )

  /** An operable sash: a colored frame with glass inset by `t`. */
  const sash = ({ x, y, w, h, t }: { x: number; y: number; w: number; h: number; t: number }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={1.5} style={fill(face)} stroke={edge} strokeWidth={1} className="transition-[fill] duration-300" />
      {glassPane({ x: x + t, y: y + t, w: w - 2 * t, h: h - 2 * t })}
      <rect x={x + t} y={y + t} width={w - 2 * t} height={h - 2 * t} fill="none" stroke={edge} strokeWidth={0.8} />
    </g>
  )

  const frameBox = ({ x, y, w, h }: { x: number; y: number; w: number; h: number }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={2} style={fill(frame)} stroke={edge} strokeWidth={1.2} className="transition-[fill] duration-300" />
      <rect x={x + f * 0.45} y={y + f * 0.45} width={w - f * 0.9} height={h - f * 0.9} fill="none" stroke={edge} strokeOpacity={0.35} strokeWidth={0.8} />
    </g>
  )

  const crank = ({ cx, y }: { cx: number; y: number }) =>
    hw && (
      <g>
        <rect x={cx - 17} y={y} width={34} height={Math.max(6, f * 0.42)} rx={3} fill={hwFill} stroke={hwEdge} strokeWidth={0.6} />
        <rect x={cx - 2} y={y - 3} width={22} height={5} rx={2.5} fill={hwFill} stroke={hwEdge} strokeWidth={0.6} />
        <circle cx={cx + 19} cy={y - 0.5} r={3.2} fill={hwFill} stroke={hwEdge} strokeWidth={0.6} />
      </g>
    )

  const lever = ({ x, cy }: { x: number; cy: number }) =>
    hw && (
      <g>
        <rect x={x - 3.5} y={cy - 16} width={7} height={32} rx={3.5} fill={hwFill} stroke={hwEdge} strokeWidth={0.6} />
        <rect x={x - 12} y={cy - 3} width={12} height={6} rx={3} fill={hwFill} stroke={hwEdge} strokeWidth={0.6} />
      </g>
    )

  const sashLock = ({ cx, cy }: { cx: number; cy: number }) =>
    hw && (
      <g>
        <ellipse cx={cx} cy={cy} rx={13} ry={5} fill={hwFill} stroke={hwEdge} strokeWidth={0.6} />
        <rect x={cx + 6} y={cy - 2.5} width={14} height={5} rx={2.5} fill={hwFill} stroke={hwEdge} strokeWidth={0.6} />
      </g>
    )

  /* ---------- kinds ---------- */

  const ox = x0 + f
  const oy = y0 + f
  const ow = W - 2 * f
  const oh = H - 2 * f
  const t = f * 0.85

  let body: ReactNode
  switch (kind) {
    case "awning":
    case "casement":
      body = (
        <>
          {frameBox({ x: x0, y: y0, w: W, h: H })}
          {sash({ x: ox, y: oy, w: ow, h: oh, t: t })}
          {kind === "awning"
            ? crank({ cx: x0 + W / 2, y: y0 + H - f * 0.72 })
            : lever({ x: ox + ow - t / 2, cy: oy + oh / 2 })}
        </>
      )
      break
    case "hung": {
      const half = oh / 2
      body = (
        <>
          {frameBox({ x: x0, y: y0, w: W, h: H })}
          {sash({ x: ox, y: oy, w: ow, h: half + t * 0.3, t: t })}
          {sash({ x: ox, y: oy + half - t * 0.3, w: ow, h: half + t * 0.3, t: t })}
          {sashLock({ cx: ox + ow / 2, cy: oy + half })}
        </>
      )
      break
    }
    case "slider": {
      const half = ow / 2
      body = (
        <>
          {frameBox({ x: x0, y: y0, w: W, h: H })}
          {sash({ x: ox, y: oy, w: half + t * 0.3, h: oh, t: t })}
          {sash({ x: ox + half - t * 0.3, y: oy, w: half + t * 0.3, h: oh, t: t })}
          {hw && <rect x={ox + half - 3} y={oy + oh / 2 - 14} width={6} height={28} rx={3} fill={hwFill} stroke={hwEdge} strokeWidth={0.6} />}
        </>
      )
      break
    }
    case "picture":
      body = (
        <>
          {frameBox({ x: x0, y: y0, w: W, h: H })}
          {glassPane({ x: ox, y: oy, w: ow, h: oh })}
          <rect x={ox} y={oy} width={ow} height={oh} fill="none" stroke={edge} strokeWidth={1} />
        </>
      )
      break
    case "bay": {
      const side = W * 0.28
      const center = W - 2 * side
      const units = [
        { x: x0, w: side, vent: true },
        { x: x0 + side, w: center, vent: false },
        { x: x0 + side + center, w: side, vent: true },
      ]
      const uf = f * 0.8
      body = (
        <>
          {units.map((u, i) => (
            <g key={i} opacity={u.vent ? 0.94 : 1}>
              {frameBox({ x: u.x, y: y0, w: u.w, h: H })}
              {u.vent ? (
                <>
                  {sash({ x: u.x + uf, y: y0 + uf, w: u.w - 2 * uf, h: H - 2 * uf, t: uf * 0.85 })}
                  {lever({ x: i === 0 ? u.x + u.w - uf * 1.4 : u.x + uf * 1.4, cy: y0 + H / 2 })}
                </>
              ) : (
                <>
                  {glassPane({ x: u.x + uf, y: y0 + uf, w: u.w - 2 * uf, h: H - 2 * uf })}
                  <rect x={u.x + uf} y={y0 + uf} width={u.w - 2 * uf} height={H - 2 * uf} fill="none" stroke={edge} strokeWidth={1} />
                </>
              )}
            </g>
          ))}
        </>
      )
      break
    }
    case "arch": {
      const rise = Math.min(W / 2, H * 0.42)
      const outer = `M${x0},${y0 + H} L${x0},${y0 + rise} A${W / 2},${rise} 0 0 1 ${x0 + W},${y0 + rise} L${x0 + W},${y0 + H} Z`
      const inner = `M${ox},${oy + oh} L${ox},${y0 + rise} A${W / 2 - f},${rise - f} 0 0 1 ${ox + ow},${y0 + rise} L${ox + ow},${oy + oh} Z`
      body = (
        <>
          <defs>
            <clipPath id={ids.arch}>
              <path d={inner} />
            </clipPath>
          </defs>
          <path d={outer} style={fill(frame)} stroke={edge} strokeWidth={1.2} className="transition-[fill] duration-300" />
          {glassPane({ x: ox, y: oy, w: ow, h: oh, clip: `url(#${ids.arch})` })}
          <path d={inner} fill="none" stroke={edge} strokeWidth={1} />
        </>
      )
      break
    }
  }

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role="img"
      aria-label={title ?? `${kind} window preview, ${view} view`}
      className={className}
    >
      <defs>
        <linearGradient id={ids.glass} x1="0" y1="0" x2="1" y2="1">
          {interior ? (
            <>
              <stop offset="0%" stopColor="#EEF4F6" />
              <stop offset="100%" stopColor="#C4D3DB" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#D6E1E8" />
              <stop offset="100%" stopColor="#8EA5B3" />
            </>
          )}
        </linearGradient>
        <linearGradient id={ids.shine} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={interior ? 0.28 : 0.45} />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
        </linearGradient>
        <linearGradient id={ids.metal} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={finish ? shade(finish.hex, 0.45) : "#fff"} />
          <stop offset="55%" stopColor={finish?.hex ?? "#ccc"} />
          <stop offset="100%" stopColor={finish ? shade(finish.hex, -0.25) : "#999"} />
        </linearGradient>
        <filter id={ids.shadow} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0d2c25" floodOpacity="0.16" />
        </filter>
      </defs>

      <g
        key={`${kind}-${width}x${height}`}
        filter={`url(#${ids.shadow})`}
        className="animate-in fade-in zoom-in-95 duration-300"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        {body}
      </g>
    </svg>
  )
}

/** Small pane-only drawing used for the grille pattern tiles. */
export function GrilleThumb({ pattern, className = "" }: { pattern: GrillePattern; className?: string }) {
  const lines = grilleLines(pattern, 8, 8, 64, 44)
  return (
    <svg viewBox="0 0 80 60" className={className} aria-hidden="true">
      <rect x="2" y="2" width="76" height="56" rx="2" fill="#F4F4F0" stroke="#9AA3A0" strokeWidth="1" />
      <rect x="8" y="8" width="64" height="44" fill="#DCE6EB" stroke="#9AA3A0" strokeWidth="0.8" />
      {lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#F4F4F0" strokeWidth="2.6" />
      ))}
      {lines.map((l, i) => (
        <line key={`o${i}`} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#9AA3A0" strokeWidth="0.5" strokeDasharray="0" opacity="0.5" />
      ))}
    </svg>
  )
}

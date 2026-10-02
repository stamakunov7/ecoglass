"use client"

import { useEffect, useRef, useState } from "react"

type LonLat = [number, number]

/** Simplified Florida outline (lon, lat), clockwise from the northwest corner. */
const OUTLINE: LonLat[] = [
  [-87.6, 31.0], [-85.0, 31.0], [-84.93, 30.76], [-84.86, 30.7], [-83.5, 30.64], [-82.22, 30.57],
  [-82.08, 30.36], [-82.0, 30.6], [-81.94, 30.79], [-81.7, 30.75], [-81.45, 30.71],
  // Atlantic coast
  [-81.4, 30.4], [-81.3, 30.05], [-81.25, 29.8], [-81.1, 29.45], [-80.95, 29.1], [-80.75, 28.75],
  [-80.55, 28.45], [-80.6, 28.25], [-80.55, 28.05], [-80.38, 27.72], [-80.22, 27.3], [-80.08, 26.95],
  [-80.03, 26.7], [-80.07, 26.35], [-80.1, 26.05], [-80.13, 25.8], [-80.2, 25.6], [-80.33, 25.38],
  [-80.43, 25.24],
  // Florida Bay and the southwest Gulf coast
  [-80.7, 25.16], [-80.95, 25.14], [-81.15, 25.14], [-81.15, 25.35], [-81.3, 25.62], [-81.4, 25.85],
  [-81.72, 25.95], [-81.81, 26.15], [-81.88, 26.4], [-81.98, 26.5], [-82.12, 26.72], [-82.3, 26.92],
  [-82.45, 27.1], [-82.56, 27.3], [-82.72, 27.53],
  // Tampa Bay and Pinellas
  [-82.6, 27.64], [-82.48, 27.8], [-82.45, 27.95], [-82.58, 27.92], [-82.63, 27.8], [-82.74, 27.67],
  [-82.79, 27.82], [-82.84, 27.98], [-82.8, 28.17],
  // Nature Coast and the Big Bend
  [-82.7, 28.45], [-82.68, 28.72], [-82.72, 28.95], [-82.88, 29.1], [-83.05, 29.15], [-83.17, 29.32],
  [-83.4, 29.65], [-83.62, 29.88], [-83.9, 30.05], [-84.15, 30.08], [-84.35, 29.96], [-84.6, 29.86],
  [-84.95, 29.71], [-85.3, 29.68], [-85.37, 29.8], [-85.42, 29.95],
  // Panhandle
  [-85.68, 30.11], [-85.95, 30.25], [-86.25, 30.35], [-86.5, 30.39], [-86.85, 30.38], [-87.15, 30.33],
  [-87.35, 30.3], [-87.52, 30.28], [-87.43, 30.45], [-87.5, 30.7],
]

const KEYS: LonLat[] = [
  [-80.42, 25.17], [-80.56, 25.02], [-80.8, 24.86], [-81.06, 24.73], [-81.4, 24.66], [-81.78, 24.56],
]

type City = { name: string; at: LonLat; label?: "left" | "right" }

const CITIES: City[] = [
  { name: "Pensacola", at: [-87.22, 30.42], label: "right" },
  { name: "Panama City", at: [-85.66, 30.16] },
  { name: "Tallahassee", at: [-84.28, 30.44], label: "right" },
  { name: "Jacksonville", at: [-81.66, 30.33], label: "left" },
  { name: "Gainesville", at: [-82.32, 29.65], label: "left" },
  { name: "Ocala", at: [-82.14, 29.19] },
  { name: "Daytona Beach", at: [-81.02, 29.21] },
  { name: "Orlando", at: [-81.38, 28.54] },
  { name: "Melbourne", at: [-80.61, 28.08] },
  { name: "Tampa", at: [-82.46, 27.95], label: "left" },
  { name: "Sarasota", at: [-82.53, 27.34] },
  { name: "Fort Myers", at: [-81.87, 26.64], label: "left" },
  { name: "Naples", at: [-81.79, 26.14] },
  { name: "West Palm Beach", at: [-80.05, 26.71], label: "left" },
  { name: "Fort Lauderdale", at: [-80.14, 26.12] },
  { name: "Miami", at: [-80.19, 25.76], label: "left" },
  { name: "Key West", at: [-81.78, 24.56], label: "right" },
]

const HQ: LonLat = [-81.35, 28.7]

// Equirectangular projection, corrected for Florida's latitude.
const SCALE = 70
const COS = Math.cos((28 * Math.PI) / 180)
const project = ([lon, lat]: LonLat): [number, number] => [
  +((lon + 87.85) * SCALE * COS).toFixed(1),
  +((31.2 - lat) * SCALE).toFixed(1),
]

const outlinePath = `M${OUTLINE.map((p) => project(p).join(" ")).join(" L")} Z`
const [hqX, hqY] = project(HQ)

/** A gentle curve from the Longwood factory out to a city. */
function routePath(to: LonLat) {
  const [x, y] = project(to)
  const mx = (hqX + x) / 2
  const my = (hqY + y) / 2
  const bend = 0.18
  return `M${hqX} ${hqY} Q${mx - (y - hqY) * bend} ${my + (x - hqX) * bend} ${x} ${y}`
}

export function FloridaMap() {
  const ref = useRef<SVGSVGElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const draw = "transition-[stroke-dashoffset] duration-[1800ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none"

  return (
    <svg
      ref={ref}
      viewBox="0 0 584 480"
      role="img"
      aria-label="Map of Florida showing EcoGlass in Longwood serving cities across the whole state, from Pensacola to Key West"
      className="h-auto w-full overflow-visible"
    >
      <path
        d={outlinePath}
        pathLength={1}
        strokeDasharray="1"
        strokeDashoffset={drawn ? 0 : 1}
        className={`fill-white stroke-forest/35 [stroke-linejoin:round] [stroke-width:1.5] drop-shadow-[0_24px_40px_rgb(18_59_50/0.12)] ${draw}`}
        style={{ fillOpacity: drawn ? 1 : 0, transitionProperty: "stroke-dashoffset, fill-opacity" }}
      />
      {/* Lake Okeechobee */}
      <ellipse
        cx={project([-80.83, 26.95])[0]}
        cy={project([-80.83, 26.95])[1]}
        rx={13}
        ry={14}
        className={`fill-sage transition-opacity delay-700 duration-700 ${drawn ? "opacity-100" : "opacity-0"}`}
      />
      {/* Florida Keys */}
      {KEYS.map((k, i) => {
        const [x, y] = project(k)
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2.4}
            className={`fill-white stroke-forest/35 transition-opacity duration-500 ${drawn ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: `${900 + i * 80}ms` }}
          />
        )
      })}

      {/* Routes from the factory */}
      {CITIES.map((c, i) => (
        <path
          key={c.name}
          d={routePath(c.at)}
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={drawn ? 0 : 1}
          className={`fill-none stroke-cta/45 [stroke-width:1.1] ${draw}`}
          style={{ transitionDelay: `${700 + i * 60}ms` }}
        />
      ))}

      {/* Cities */}
      {CITIES.map((c, i) => {
        const [x, y] = project(c.at)
        return (
          <g
            key={c.name}
            className={`transition-opacity duration-500 ${drawn ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: `${1300 + i * 60}ms` }}
          >
            <circle cx={x} cy={y} r={3.2} className="fill-forest" />
            {c.label && (
              <text
                x={c.label === "left" ? x - 8 : x + 8}
                y={y + 3.5}
                textAnchor={c.label === "left" ? "end" : "start"}
                className="fill-forest/80 font-sans text-[12px] font-semibold [paint-order:stroke] max-sm:hidden [stroke-linejoin:round] [stroke-width:4px] stroke-white"
              >
                {c.name}
              </text>
            )}
          </g>
        )
      })}

      {/* EcoGlass headquarters */}
      <g className={`transition-opacity delay-500 duration-700 ${drawn ? "opacity-100" : "opacity-0"}`}>
        <circle cx={hqX} cy={hqY} r={7} className="map-ping fill-cta/40" />
        <circle cx={hqX} cy={hqY} r={7} className="map-ping fill-cta/40 [animation-delay:1.2s]" />
        <circle cx={hqX} cy={hqY} r={7.5} className="fill-forest stroke-white [stroke-width:2.5]" />
        <text
          x={hqX + 13}
          y={hqY - 5}
          className="fill-forest font-display text-[16px] font-extrabold [paint-order:stroke] [stroke-linejoin:round] [stroke-width:5px] stroke-white"
        >
          EcoGlass · Longwood
        </text>
        <text
          x={hqX + 13}
          y={hqY + 12}
          className="fill-cta-dark font-sans text-[11px] font-semibold uppercase tracking-[0.12em] [paint-order:stroke] [stroke-linejoin:round] [stroke-width:4px] stroke-white"
        >
          Factory &amp; showroom
        </text>
      </g>
    </svg>
  )
}

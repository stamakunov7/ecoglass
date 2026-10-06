"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"

/**
 * The header's estimate button: it leans toward the cursor, a soft light follows the pointer across it,
 * a shine sweeps over on hover, and an arrow slides in beside the label.
 */
export function EstimateCta({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null)

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const x = (e.clientX - (r.left + r.width / 2)) / r.width
    const y = (e.clientY - (r.top + r.height / 2)) / r.height
    el.style.transform = `translate(${x * 10}px, ${y * 6}px)`
  }

  function onPointerLeave() {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`shine group h-11 items-center justify-center rounded-xl bg-cta px-6 text-sm font-semibold text-white shadow-sm shadow-cta/30 transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_0_0_4px_rgb(62_142_65/0.18),0_14px_30px_-10px_rgb(62_142_65/0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 ${className}`}
    >
      {/* Light that follows the pointer */}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [background:radial-gradient(110px_circle_at_var(--mx,50%)_var(--my,50%),rgb(255_255_255/0.3),transparent_65%)] group-hover:opacity-100"
        aria-hidden="true"
      />
      <span className="relative block transition-transform duration-300 ease-out group-hover:-translate-x-2">
        Get a Free Estimate
      </span>
      <ArrowRight
        className="absolute right-3 top-1/2 h-4 w-4 -translate-x-1.5 -translate-y-1/2 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
        aria-hidden="true"
      />
    </button>
  )
}

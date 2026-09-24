"use client"

import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { isDark, shade, splitInches } from "@/lib/configurator/format"

/** 41.5 → 41 ¹/₂" with a small raised fraction. */
export function InchesLabel({ value }: { value: number }) {
  const { whole, fraction } = splitInches(value)
  return (
    <span className="tabular-nums">
      {whole}
      {fraction && <sup className="ml-0.5 text-[0.62em] font-semibold">{fraction}</sup>}
      &quot;
    </span>
  )
}

/** Section heading with the small corner flag used throughout the designer. */
export function OptionHeading({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="flex items-center gap-2 font-display text-lg font-extrabold text-forest">
        <span className="h-3 w-3 bg-cta [clip-path:polygon(0_0,100%_0,0_100%)]" aria-hidden="true" />
        {children}
      </h3>
      {aside}
    </div>
  )
}

export function Swatch({
  name,
  hex,
  metallic,
  selected,
  onClick,
}: {
  name: string
  hex: string
  metallic?: boolean
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={name}
      className="group flex w-[76px] flex-col items-center gap-2 text-center"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ring-offset-2 ring-offset-card transition-all duration-200 ${
          selected ? "scale-105 ring-2 ring-cta" : "ring-1 ring-border group-hover:ring-forest/40"
        }`}
        style={{
          background: metallic ? `linear-gradient(135deg, ${shade(hex, 0.5)}, ${hex} 55%, ${shade(hex, -0.25)})` : hex,
        }}
      >
        {selected && (
          <Check className={`h-5 w-5 ${isDark(hex) ? "text-white" : "text-forest"}`} strokeWidth={2.5} aria-hidden="true" />
        )}
      </span>
      <span className={`text-[12px] leading-tight ${selected ? "font-bold text-forest" : "text-muted-foreground"}`}>
        {name}
      </span>
    </button>
  )
}

export function Chip({
  selected,
  onClick,
  children,
  label,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      className={`flex h-11 min-w-[88px] items-center justify-center rounded-full border px-4 text-[15px] font-semibold transition-all duration-200 ${
        selected
          ? "border-cta bg-sage/50 text-forest shadow-sm shadow-cta/10 ring-1 ring-cta"
          : "border-border bg-card text-ink hover:border-forest/40 hover:bg-offwhite"
      }`}
    >
      {children}
    </button>
  )
}

/** Card-style option (glass, hardware style, grille tile). */
export function OptionCard({
  selected,
  onClick,
  children,
  className = "",
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-xl border-2 bg-card text-left transition-all duration-200 ${
        selected ? "border-cta bg-sage/30 shadow-sm shadow-cta/10" : "border-border hover:border-forest/30 hover:bg-offwhite"
      } ${className}`}
    >
      {children}
    </button>
  )
}

"use client"

import { useEffect, useState } from "react"
import {
  Check,
  Hand,
  KeyRound,
  Link2,
  Lock,
  Minus,
  Plus,
  Printer,
  Ruler,
  RotateCw,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { EIGHTH_OPTIONS, formatInches, splitInches } from "@/lib/configurator/format"
import type { ColorOption, Selection, Spec, WindowOptions } from "@/lib/configurator/types"
import { GrilleThumb } from "./window-preview"
import { Chip, InchesLabel, OptionCard, OptionHeading, Swatch } from "./primitives"

type Patch = (patch: Partial<Selection>) => void

/* ---------------- Sizing ---------------- */

type Draft = { w: string; we: number; h: string; he: number }

function toDraft(selection: Selection): Draft {
  const w = splitInches(selection.width)
  const h = splitInches(selection.height)
  return { w: String(w.whole), we: w.eighths, h: String(h.whole), he: h.eighths }
}

function nearest(list: number[], value: number) {
  return list.reduce((best, n) => (Math.abs(n - value) < Math.abs(best - value) ? n : best), list[0])
}

export function SizeStep({ options, selection, onChange }: { options: WindowOptions; selection: Selection; onChange: Patch }) {
  const { sizes } = options
  const custom = selection.sizeMode === "custom"
  const [draft, setDraft] = useState<Draft>(() => toDraft(selection))

  // Follow outside changes (e.g. "Clear my choices") while the shopper isn't typing a custom size.
  useEffect(() => {
    if (!custom) setDraft(toDraft(selection))
  }, [custom, selection])

  const draftW = Number(draft.w) + draft.we / 8
  const draftH = Number(draft.h) + draft.he / 8
  const widthError =
    !draft.w || draftW < sizes.min.width || draftW > sizes.max.width
      ? `Width must be ${formatInches(sizes.min.width)} – ${formatInches(sizes.max.width)}`
      : ""
  const heightError =
    !draft.h || draftH < sizes.min.height || draftH > sizes.max.height
      ? `Height must be ${formatInches(sizes.min.height)} – ${formatInches(sizes.max.height)}`
      : ""

  function updateDraft(patch: Partial<Draft>) {
    const next = { ...draft, ...patch }
    setDraft(next)
    const w = Number(next.w) + next.we / 8
    const h = Number(next.h) + next.he / 8
    if (
      next.w &&
      next.h &&
      w >= sizes.min.width &&
      w <= sizes.max.width &&
      h >= sizes.min.height &&
      h <= sizes.max.height
    ) {
      onChange({ sizeMode: "custom", width: w, height: h })
    }
  }

  function setMode(mode: Selection["sizeMode"]) {
    if (mode === "custom") {
      setDraft(toDraft(selection))
      onChange({ sizeMode: "custom" })
    } else {
      onChange({
        sizeMode: "standard",
        width: nearest(sizes.widths, selection.width),
        height: nearest(sizes.heights, selection.height),
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Mode switch */}
      <div className="inline-flex rounded-full border border-border bg-offwhite p-1" role="radiogroup" aria-label="Size type">
        {(["standard", "custom"] as const).map((mode) => (
          <button
            key={mode}
            type="button"
            role="radio"
            aria-checked={selection.sizeMode === mode}
            onClick={() => setMode(mode)}
            className={`h-9 rounded-full px-5 text-[13px] font-semibold transition-all ${
              selection.sizeMode === mode ? "bg-card text-forest shadow-sm" : "text-muted-foreground hover:text-forest"
            }`}
          >
            {mode === "standard" ? "Standard sizes" : "Custom size"}
          </button>
        ))}
      </div>

      {custom ? (
        <div className="space-y-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            We build to your exact opening in 1/8&quot; increments — from {formatInches(sizes.min.width)} to{" "}
            {formatInches(sizes.max.width)} wide and {formatInches(sizes.min.height)} to {formatInches(sizes.max.height)}{" "}
            high.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <InchesInput
              label="Width"
              whole={draft.w}
              eighths={draft.we}
              error={widthError}
              onWhole={(w) => updateDraft({ w })}
              onEighths={(we) => updateDraft({ we })}
            />
            <InchesInput
              label="Height"
              whole={draft.h}
              eighths={draft.he}
              error={heightError}
              onWhole={(h) => updateDraft({ h })}
              onEighths={(he) => updateDraft({ he })}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <OptionHeading>Width</OptionHeading>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {sizes.widths.map((w) => (
                <Chip
                  key={w}
                  selected={selection.width === w}
                  onClick={() => onChange({ sizeMode: "standard", width: w })}
                  label={`Width ${formatInches(w)}`}
                >
                  <InchesLabel value={w} />
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <OptionHeading>Height</OptionHeading>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {sizes.heights.map((h) => (
                <Chip
                  key={h}
                  selected={selection.height === h}
                  onClick={() => onChange({ sizeMode: "standard", height: h })}
                  label={`Height ${formatInches(h)}`}
                >
                  <InchesLabel value={h} />
                </Chip>
              ))}
            </div>
          </div>
        </>
      )}

      <p className="flex items-start gap-2.5 rounded-xl bg-offwhite px-4 py-3 text-[13px] leading-relaxed text-muted-foreground">
        <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
        Not sure of your size? Pick the closest one — we measure every opening during your free in-home visit before
        anything is built.
      </p>
    </div>
  )
}

function InchesInput({
  label,
  whole,
  eighths,
  error,
  onWhole,
  onEighths,
}: {
  label: string
  whole: string
  eighths: number
  error: string
  onWhole: (value: string) => void
  onEighths: (value: number) => void
}) {
  return (
    <div>
      <OptionHeading>{label}</OptionHeading>
      <div className="mt-3 flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={whole}
            onChange={(e) => onWhole(e.target.value.replace(/[^\d]/g, "").slice(0, 3))}
            aria-label={`${label} in inches`}
            aria-invalid={!!error}
            className={`h-12 w-full rounded-xl border bg-card pl-4 pr-10 text-base font-semibold text-forest outline-none transition-colors focus:border-cta focus:ring-2 focus:ring-cta/20 ${
              error ? "border-destructive" : "border-input"
            }`}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            in
          </span>
        </div>
        <select
          value={eighths}
          onChange={(e) => onEighths(Number(e.target.value))}
          aria-label={`${label} fraction`}
          className="h-12 rounded-xl border border-input bg-card px-3 text-base font-semibold text-forest outline-none focus:border-cta focus:ring-2 focus:ring-cta/20"
        >
          {EIGHTH_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  )
}

/* ---------------- Colors ---------------- */

export function ColorStep({
  heading,
  colors,
  value,
  onSelect,
}: {
  heading: string
  colors: ColorOption[]
  value: string
  onSelect: (id: string) => void
}) {
  return (
    <div>
      <OptionHeading aside={<span className="text-sm text-muted-foreground">{colors.find((c) => c.id === value)?.name}</span>}>
        {heading}
      </OptionHeading>
      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-5">
        {colors.map((c) => (
          <Swatch key={c.id} name={c.name} hex={c.hex} selected={value === c.id} onClick={() => onSelect(c.id)} />
        ))}
      </div>
    </div>
  )
}

/* ---------------- Glass ---------------- */

export function GlassStep({ options, value, onSelect }: { options: WindowOptions; value: string; onSelect: (id: string) => void }) {
  return (
    <div>
      <OptionHeading>Glass</OptionHeading>
      <div className="mt-4 grid gap-3" role="radiogroup" aria-label="Glass">
        {options.glass.map((g) => {
          const selected = value === g.id
          return (
            <OptionCard key={g.id} selected={selected} onClick={() => onSelect(g.id)} className="flex items-start gap-4 px-5 py-4">
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? "border-cta bg-cta text-white" : "border-border"
                }`}
                aria-hidden="true"
              >
                {selected && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              <span>
                <span className="block text-[15px] font-bold text-forest">{g.name}</span>
                <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">{g.description}</span>
              </span>
            </OptionCard>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------- Grilles ---------------- */

export function GrilleStep({ options, value, onSelect }: { options: WindowOptions; value: string; onSelect: (id: string) => void }) {
  return (
    <div>
      <OptionHeading>Grilles</OptionHeading>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {options.grilles.map((g) => (
          <OptionCard
            key={g.id}
            selected={value === g.id}
            onClick={() => onSelect(g.id)}
            className="flex flex-col items-center gap-2.5 px-3 pb-3 pt-4"
          >
            <GrilleThumb pattern={g.pattern} className="h-14 w-[74px]" />
            <span className={`text-[13px] ${value === g.id ? "font-bold text-forest" : "font-medium text-ink"}`}>{g.name}</span>
          </OptionCard>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Hardware ---------------- */

function hardwareIcon(id: string): LucideIcon {
  if (id.includes("crank")) return RotateCw
  if (id.includes("push")) return Hand
  if (id.includes("key")) return KeyRound
  return Lock
}

export function HardwareStep({
  options,
  selection,
  onChange,
}: {
  options: WindowOptions
  selection: Selection
  onChange: Patch
}) {
  if (!options.hardware) return null
  const { styles, finishes } = options.hardware
  return (
    <div className="space-y-8">
      <div>
        <OptionHeading>Hardware style</OptionHeading>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {styles.map((s) => {
            const Icon = hardwareIcon(s.id)
            const selected = selection.hardware === s.id
            return (
              <OptionCard key={s.id} selected={selected} onClick={() => onChange({ hardware: s.id })} className="flex items-start gap-3.5 px-4 py-4">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    selected ? "bg-cta text-white" : "bg-sage text-forest"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[14px] font-bold text-forest">{s.name}</span>
                  <span className="mt-0.5 block text-[12.5px] leading-relaxed text-muted-foreground">{s.description}</span>
                </span>
              </OptionCard>
            )
          })}
        </div>
      </div>
      <div>
        <OptionHeading
          aside={<span className="text-sm text-muted-foreground">{finishes.find((f) => f.id === selection.finish)?.name}</span>}
        >
          Finish
        </OptionHeading>
        <div className="mt-5 flex flex-wrap gap-x-3 gap-y-5">
          {finishes.map((f) => (
            <Swatch
              key={f.id}
              name={f.name}
              hex={f.hex}
              metallic={f.metallic}
              selected={selection.finish === f.id}
              onClick={() => onChange({ finish: f.id })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---------------- Summary ---------------- */

export function SummaryStep({
  specs,
  quantity,
  onQuantity,
  onShare,
  shared,
  onPrint,
  onQuote,
  canQuote,
}: {
  specs: Spec[]
  quantity: number
  onQuantity: (value: number) => void
  onShare: () => void
  shared: boolean
  onPrint: () => void
  onQuote: () => void
  canQuote: boolean
}) {
  return (
    <div>
      <OptionHeading
        aside={
          <div className="flex items-center gap-4 print:hidden">
            <button
              type="button"
              onClick={onShare}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-cta"
            >
              {shared ? <Check className="h-4 w-4 text-cta" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
              {shared ? "Link copied" : "Share design"}
            </button>
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition-colors hover:text-cta"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Print
            </button>
          </div>
        }
      >
        All of your window details
      </OptionHeading>

      <dl className="mt-5 divide-y divide-border overflow-hidden rounded-xl border border-border">
        {specs.map((s, i) => (
          <div key={s.label} className={`grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 px-4 py-3 text-[14px] ${i % 2 ? "bg-card" : "bg-offwhite/60"}`}>
            <dt className="text-muted-foreground">{s.label}</dt>
            <dd className="font-semibold text-forest">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-offwhite/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <p className="text-[14px] font-bold text-forest">How many of these do you need?</p>
          <p className="text-[12.5px] text-muted-foreground">Helps us prepare an accurate quote.</p>
        </div>
        <div className="inline-flex items-center rounded-full border border-border bg-card">
          <button
            type="button"
            onClick={() => onQuantity(Math.max(1, quantity - 1))}
            aria-label="Decrease quantity"
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest transition-colors hover:bg-muted disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" aria-hidden="true" />
          </button>
          <span className="w-10 text-center text-[15px] font-bold tabular-nums text-forest" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => onQuantity(Math.min(99, quantity + 1))}
            aria-label="Increase quantity"
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest transition-colors hover:bg-muted"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onQuote}
        disabled={!canQuote}
        className="group mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-cta px-8 py-3.5 text-[16px] font-semibold text-white shadow-lg shadow-cta/25 transition-all hover:bg-cta-dark hover:shadow-cta/40 disabled:cursor-not-allowed disabled:bg-muted-foreground/40 disabled:shadow-none print:hidden"
      >
        Request a quote for this design
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </button>
    </div>
  )
}

"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ChevronRight, Info, X } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"
import { DuroPlastLogo, NovaLogo, PrestigeLogo, PrestigePlusLogo } from "@/components/products/brand-logos"
import { SAMPLE_DATA } from "@/lib/configurator/catalog"
import { formatSize } from "@/lib/configurator/format"
import {
  defaultSelection,
  describeSelection,
  getSteps,
  isSizeValid,
  selectionFromParams,
  selectionToParams,
} from "@/lib/configurator/selection"
import type { BrandProfile, BrandSlug, Selection, Spec, StepId, WindowKind, WindowOptions } from "@/lib/configurator/types"
import { ExploreBrands, type ExploreBrand } from "./explore-brands"
import { LearnTab } from "./learn-tab"
import { Stepper } from "./stepper"
import { ColorStep, GlassStep, GrilleStep, HardwareStep, SizeStep, SummaryStep } from "./steps"
import { WindowPreview } from "./window-preview"

const logos: Record<BrandSlug, () => ReactNode> = {
  nova: () => <NovaLogo />,
  prestige: () => <PrestigeLogo />,
  "duro-plast": () => <DuroPlastLogo />,
  "prestige-plus": () => <PrestigePlusLogo />,
}

type Tab = "learn" | "design"
type View = "interior" | "exterior"

export type ProductBrandPageProps = {
  productLabel: string
  productPlural: string
  productHref: string
  brand: BrandProfile
  photo: { src: string; alt: string }
  kind: WindowKind | null
  options: WindowOptions | null
  others: ExploreBrand[]
  /** Server-rendered social proof, shown on the Learn tab. */
  reviews?: ReactNode
}

export function ProductBrandPage(props: ProductBrandPageProps) {
  const { kind, options } = props
  // Products without an online designer (doors) get the Learn tab and a quote button only.
  if (!kind || !options) return <PageFrame {...props} designer={null} />
  return <PageFrame {...props} designer={{ kind, options }} />
}

function PageFrame({
  productLabel,
  productPlural,
  productHref,
  brand,
  photo,
  others,
  reviews,
  designer,
}: ProductBrandPageProps & { designer: { kind: WindowKind; options: WindowOptions } | null }) {
  const { openQuote } = useEstimate()
  const options = designer?.options ?? null
  const steps = useMemo(() => (options ? getSteps(options) : []), [options])
  const title = `${brand.name} ${productLabel}`

  const [tab, setTab] = useState<Tab>("learn")
  const [selection, setSelection] = useState<Selection | null>(() => (options ? defaultSelection(options) : null))
  const [touched, setTouched] = useState<Set<StepId>>(() => new Set())
  const [current, setCurrent] = useState<StepId>("size")
  const [view, setView] = useState<View>("interior")
  const [quantity, setQuantity] = useState(1)
  const [shared, setShared] = useState(false)
  const hydrated = useRef(false)
  const contentRef = useRef<HTMLDivElement>(null)

  /* ---------- URL: restore a shared design, then keep the address bar in sync ---------- */

  useEffect(() => {
    const url = new URL(window.location.href)
    if (options && url.searchParams.has("w")) {
      const parsed = selectionFromParams(url.searchParams, options)
      setSelection(parsed.selection)
      setTouched(new Set(parsed.touched))
      setQuantity(parsed.quantity)
      if (steps.filter((s) => s.required).every((s) => parsed.touched.includes(s.id))) setCurrent("summary")
    }
    if (options && url.hash === "#design") setTab("design")
    hydrated.current = true
    // Runs once on mount; options/steps come from props and never change for a page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const designUrl = useCallback(() => {
    const url = new URL(window.location.href)
    url.search = options && selection ? selectionToParams(selection, quantity, options).toString() : ""
    url.hash = "design"
    return url.toString()
  }, [options, selection, quantity])

  useEffect(() => {
    if (!hydrated.current) return
    const url = new URL(window.location.href)
    url.search = options && selection && touched.size > 0 ? selectionToParams(selection, quantity, options).toString() : ""
    url.hash = tab === "design" ? "design" : ""
    window.history.replaceState(window.history.state, "", url.toString())
  }, [options, selection, touched, quantity, tab])

  /* ---------- Steps ---------- */

  const isComplete = useCallback(
    (id: StepId) => {
      if (!options || !selection) return false
      if (id === "summary") return steps.filter((s) => s.required).every((s) => touched.has(s.id))
      if (id === "size") return touched.has("size") && isSizeValid(selection, options)
      return touched.has(id)
    },
    [options, selection, steps, touched],
  )
  const canQuote = steps.filter((s) => s.required).every((s) => isComplete(s.id))
  const index = Math.max(0, steps.findIndex((s) => s.id === current))
  const step = steps[index]

  function scrollToContent() {
    const node = contentRef.current
    if (!node) return
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0
    if (node.getBoundingClientRect().top < headerH + 40) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    }
  }

  function goTo(id: StepId) {
    setCurrent(id)
    // Show the side the shopper is choosing for; hardware only exists on the interior.
    if (id === "interior" || id === "hardware") setView("interior")
    if (id === "exterior") setView("exterior")
    scrollToContent()
  }

  function update(patch: Partial<Selection>, id: StepId) {
    setSelection((s) => (s ? { ...s, ...patch } : s))
    setTouched((t) => new Set(t).add(id))
  }

  function next() {
    const cur = steps[index]
    if (cur.id !== "summary") setTouched((t) => new Set(t).add(cur.id))
    if (index < steps.length - 1) goTo(steps[index + 1].id)
  }

  function clearChoices() {
    if (!options) return
    setSelection(defaultSelection(options))
    setTouched(new Set())
    setQuantity(1)
    setView("interior")
    goTo("size")
  }

  function openTab(next: Tab, stepId?: StepId) {
    setTab(next)
    if (stepId) {
      setCurrent(stepId)
      if (stepId === "interior") setView("interior")
    }
    requestAnimationFrame(scrollToContent)
  }

  /* ---------- Quote, share, print ---------- */

  const previewFor = (sel: Selection, v: View, className = "w-full") => {
    if (!designer || !options) return null
    const colors = v === "interior" ? options.interiorColors : options.exteriorColors
    return (
      <WindowPreview
        kind={designer.kind}
        width={sel.width}
        height={sel.height}
        frame={colors.find((c) => c.id === (v === "interior" ? sel.interior : sel.exterior))?.hex ?? "#F4F4F0"}
        view={v}
        grille={options.grilles.find((g) => g.id === sel.grille)?.pattern ?? "none"}
        finish={options.hardware?.finishes.find((f) => f.id === sel.finish) ?? null}
        className={className}
        title={`${title} preview, ${v} view`}
      />
    )
  }

  function requestQuote(full: boolean) {
    const specs: Spec[] = [{ label: "Brand", value: brand.name }]
    if (options && selection) {
      specs.push(...describeSelection(selection, options, full ? () => true : (id) => touched.has(id)))
    }
    openQuote({
      title,
      specs,
      quantity: full ? quantity : undefined,
      link: options && touched.size > 0 ? designUrl() : window.location.origin + window.location.pathname,
      preview: selection ? previewFor(selection, "interior") : undefined,
    })
  }

  async function share() {
    const link = designUrl()
    try {
      await navigator.clipboard.writeText(link)
    } catch {
      window.prompt("Copy this link to share your design:", link)
    }
    setShared(true)
    setTimeout(() => setShared(false), 2200)
  }

  /* ---------- Render ---------- */

  const preview =
    designer && options && selection ? (
      <PreviewPanel
        view={view}
        onView={setView}
        caption={formatSize(selection.width, selection.height)}
        render={(v) => previewFor(selection, v, "aspect-[4/3] w-full")}
      />
    ) : null

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-[1400px] px-5 pt-6 sm:px-6 lg:px-8 print:hidden">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-forest">
              Home
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <li>
            <Link href="/products" className="transition-colors hover:text-forest">
              Products
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <li>
            <Link href={productHref} className="transition-colors hover:text-forest">
              {productPlural}
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <li aria-current="page" className="font-semibold text-forest">
            {brand.name}
          </li>
        </ol>
      </nav>

      {/* Sticky title + tabs */}
      <div
        className="sticky z-20 mt-4 border-b border-border bg-card/95 backdrop-blur-md print:static print:border-0"
        style={{ top: "var(--header-h, 0px)" }}
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-1 px-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-6 lg:px-8">
          <p className="truncate pt-3 font-display text-lg font-extrabold uppercase tracking-tight text-forest sm:py-4 sm:text-xl">
            {title}
          </p>
          <div role="tablist" aria-label="Product sections" className="flex gap-7 print:hidden">
            {(["learn", "design"] as const)
              .filter((t) => t === "learn" || designer)
              .map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => openTab(t)}
                  className={`relative py-3 text-[14px] font-bold uppercase tracking-[0.08em] transition-colors sm:py-4 sm:text-[15px] ${
                    tab === t ? "text-forest" : "text-muted-foreground hover:text-forest"
                  }`}
                >
                  {t === "learn" ? "Learn" : "Design it"}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-cta transition-transform duration-300 ${
                      tab === t ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              ))}
          </div>
        </div>
      </div>

      <div ref={contentRef} style={{ scrollMarginTop: "calc(var(--header-h, 140px) + 64px)" }}>
        {tab === "learn" || !designer || !options || !selection || !step ? (
          <div className="print:hidden">
            <LearnTab
              brand={brand}
              eyebrow={productLabel}
              logo={logos[brand.slug]()}
              preview={preview}
              photo={photo}
              options={options}
              interior={selection?.interior ?? ""}
              onPickInterior={(id) => {
                update({ interior: id }, "interior")
                setView("interior")
              }}
              onDesign={(id) => openTab("design", id)}
              onQuote={() => requestQuote(canQuote)}
              reviews={reviews}
            />
          </div>
        ) : (
          <section className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-5 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:px-8">
            {/* Preview */}
            <div className="min-w-0 lg:sticky lg:self-start" style={{ top: "calc(var(--header-h, 140px) + 88px)" }}>
              <p className="mb-3 hidden font-display text-xl font-extrabold text-forest print:block">{title}</p>
              {preview}
              {SAMPLE_DATA && (
                <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-300/70 bg-amber-50 px-4 py-3 text-[12.5px] leading-relaxed text-amber-900 print:hidden">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  Preview build — the options shown are placeholders until the supplier catalogs are added.
                </p>
              )}
            </div>

            {/* Configurator */}
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-4 print:hidden">
                <div>
                  <h2 className="font-display text-2xl font-extrabold leading-tight text-forest sm:text-[1.75rem]">{step.title}</h2>
                  <p className="mt-1 text-[14px] text-muted-foreground">{step.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={clearChoices}
                  className="mt-1 inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-muted-foreground transition-colors hover:text-forest"
                >
                  Clear my choices
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 print:hidden">
                <Stepper steps={steps} current={current} isComplete={isComplete} onSelect={goTo} />
              </div>

              {current !== "summary" && (
                <div className="mt-5 flex flex-col items-center gap-2 print:hidden">
                  <button
                    type="button"
                    onClick={() => requestQuote(true)}
                    disabled={!canQuote}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-cta px-7 text-[14px] font-semibold text-white shadow-md shadow-cta/25 transition-all hover:bg-cta-dark disabled:cursor-not-allowed disabled:bg-muted-foreground/35 disabled:shadow-none"
                  >
                    Request a quote
                  </button>
                  {!canQuote && (
                    <p className="text-[12px] text-muted-foreground">Complete the required steps to request your quote.</p>
                  )}
                </div>
              )}

              <div key={current} className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {current === "size" && <SizeStep options={options} selection={selection} onChange={(p) => update(p, "size")} />}
                {current === "interior" && (
                  <ColorStep
                    heading="Interior color"
                    colors={options.interiorColors}
                    value={selection.interior}
                    onSelect={(id) => update({ interior: id }, "interior")}
                  />
                )}
                {current === "exterior" && (
                  <ColorStep
                    heading="Exterior color"
                    colors={options.exteriorColors}
                    value={selection.exterior}
                    onSelect={(id) => update({ exterior: id }, "exterior")}
                  />
                )}
                {current === "glass" && (
                  <GlassStep options={options} value={selection.glass} onSelect={(id) => update({ glass: id }, "glass")} />
                )}
                {current === "grilles" && (
                  <GrilleStep options={options} value={selection.grille} onSelect={(id) => update({ grille: id }, "grilles")} />
                )}
                {current === "hardware" && (
                  <HardwareStep options={options} selection={selection} onChange={(p) => update(p, "hardware")} />
                )}
                {current === "summary" && (
                  <SummaryStep
                    specs={[{ label: "Product", value: title }, ...describeSelection(selection, options)]}
                    quantity={quantity}
                    onQuantity={setQuantity}
                    onShare={share}
                    shared={shared}
                    onPrint={() => window.print()}
                    onQuote={() => requestQuote(true)}
                    canQuote={canQuote}
                  />
                )}
              </div>

              <p className="mt-8 text-[11.5px] leading-relaxed text-muted-foreground">
                *Designs are for visualization only and may not exactly match the finished product. Colors, glass, and
                hardware are confirmed with samples during your free in-home visit.
              </p>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-6 print:hidden">
                <button
                  type="button"
                  onClick={() => index > 0 && goTo(steps[index - 1].id)}
                  disabled={index === 0}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-card px-5 text-[14px] font-semibold text-forest transition-colors hover:bg-muted disabled:invisible"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Previous
                </button>
                {current !== "summary" && (
                  <button
                    type="button"
                    onClick={next}
                    className="group inline-flex h-11 items-center gap-2 rounded-full bg-forest px-6 text-[14px] font-semibold text-white transition-colors hover:bg-forest-deep"
                  >
                    {steps[index + 1]?.id === "summary" ? "See summary" : "Next"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      <ExploreBrands heading={`Explore other ${productPlural.toLowerCase()}`} eyebrow={productLabel} brands={others} />
    </>
  )
}

function PreviewPanel({
  view,
  onView,
  caption,
  render,
}: {
  view: View
  onView: (view: View) => void
  caption: string
  render: (view: View) => ReactNode
}) {
  return (
    <div>
      <div
        className={`relative overflow-hidden rounded-2xl border border-border transition-colors duration-500 ${
          view === "interior" ? "bg-[#F3F1EC]" : "bg-[#E4EAED]"
        }`}
      >
        {render(view)}
        <span className="absolute left-4 top-4 rounded-full bg-card/85 px-3 py-1 text-[12px] font-semibold text-forest shadow-sm backdrop-blur">
          {caption}
        </span>
      </div>
      <div className="mt-4 flex justify-center print:hidden">
        <div className="inline-flex rounded-full border border-border bg-card p-1 shadow-sm" role="radiogroup" aria-label="Preview side">
          {(["interior", "exterior"] as const).map((v) => (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={view === v}
              onClick={() => onView(v)}
              className={`h-9 rounded-full px-6 text-[12px] font-bold uppercase tracking-[0.12em] transition-all ${
                view === v ? "bg-forest text-white shadow-sm" : "text-muted-foreground hover:text-forest"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

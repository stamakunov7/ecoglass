import { formatSize } from "./format"
import type { Selection, Spec, StepId, WindowOptions } from "./types"

export type StepDef = {
  id: StepId
  label: string
  required: boolean
  title: string
  subtitle: string
}

/** The designer steps for a set of options. Grilles/hardware drop out when a product has none. */
export function getSteps(options: WindowOptions): StepDef[] {
  const steps: StepDef[] = [
    { id: "size", label: "Sizing", required: true, title: "Let's get started", subtitle: "Start by choosing your size" },
    {
      id: "interior",
      label: "Interior",
      required: true,
      title: "Start adding design touches",
      subtitle: "Choose the color you'll see from inside",
    },
    {
      id: "exterior",
      label: "Exterior",
      required: true,
      title: "Almost there",
      subtitle: "Choose the color that faces the street",
    },
    { id: "glass", label: "Glass", required: true, title: "Final required step", subtitle: "Select a glass option" },
  ]
  if (options.grilles.length > 1) {
    steps.push({
      id: "grilles",
      label: "Grilles",
      required: false,
      title: "Next, grilles",
      subtitle: "Choose a grille pattern or no grilles at all",
    })
  }
  if (options.hardware) {
    steps.push({
      id: "hardware",
      label: "Hardware",
      required: false,
      title: "Up next: hardware",
      subtitle: "Choose your hardware style and finish",
    })
  }
  steps.push({
    id: "summary",
    label: "Summary",
    required: false,
    title: "Excellent choice",
    subtitle: "Here's everything in your design",
  })
  return steps
}

export function defaultSelection(options: WindowOptions): Selection {
  return {
    sizeMode: "standard",
    width: options.sizes.default.width,
    height: options.sizes.default.height,
    interior: options.interiorColors[0]?.id ?? "",
    exterior: options.exteriorColors[0]?.id ?? "",
    glass: options.glass[0]?.id ?? "",
    grille: options.grilles[0]?.id ?? "none",
    hardware: options.hardware?.styles[0]?.id ?? "",
    finish: options.hardware?.finishes[0]?.id ?? "",
  }
}

export function isSizeValid(selection: Selection, options: WindowOptions) {
  const { min, max } = options.sizes
  const { width, height } = selection
  return (
    Number.isFinite(width) &&
    Number.isFinite(height) &&
    width >= min.width &&
    width <= max.width &&
    height >= min.height &&
    height <= max.height
  )
}

/* ---------------- Share links: selection <-> URL query ---------------- */

export function selectionToParams(selection: Selection, quantity: number, options: WindowOptions) {
  const params = new URLSearchParams()
  params.set("w", String(selection.width))
  params.set("h", String(selection.height))
  if (selection.sizeMode === "custom") params.set("custom", "1")
  params.set("int", selection.interior)
  params.set("ext", selection.exterior)
  params.set("glass", selection.glass)
  if (options.grilles.length > 1) params.set("grille", selection.grille)
  if (options.hardware) {
    params.set("hw", selection.hardware)
    params.set("fin", selection.finish)
  }
  if (quantity > 1) params.set("qty", String(quantity))
  return params
}

/** Reads a shared design back from the URL, ignoring anything that isn't a valid option. */
export function selectionFromParams(params: URLSearchParams, options: WindowOptions) {
  const selection = defaultSelection(options)
  const touched: StepId[] = []
  const has = (list: { id: string }[], id: string | null) => !!id && list.some((o) => o.id === id)

  const w = Number(params.get("w"))
  const h = Number(params.get("h"))
  if (params.has("w") && params.has("h")) {
    const custom = params.get("custom") === "1" || !options.sizes.widths.includes(w) || !options.sizes.heights.includes(h)
    const candidate: Selection = { ...selection, width: w, height: h, sizeMode: custom ? "custom" : "standard" }
    if (isSizeValid(candidate, options)) {
      Object.assign(selection, candidate)
      touched.push("size")
    }
  }
  const int = params.get("int")
  if (has(options.interiorColors, int)) {
    selection.interior = int!
    touched.push("interior")
  }
  const ext = params.get("ext")
  if (has(options.exteriorColors, ext)) {
    selection.exterior = ext!
    touched.push("exterior")
  }
  const glass = params.get("glass")
  if (has(options.glass, glass)) {
    selection.glass = glass!
    touched.push("glass")
  }
  const grille = params.get("grille")
  if (has(options.grilles, grille)) {
    selection.grille = grille!
    touched.push("grilles")
  }
  if (options.hardware) {
    const hw = params.get("hw")
    const fin = params.get("fin")
    if (has(options.hardware.styles, hw) && has(options.hardware.finishes, fin)) {
      selection.hardware = hw!
      selection.finish = fin!
      touched.push("hardware")
    }
  }
  const qty = Math.min(99, Math.max(1, Math.round(Number(params.get("qty")) || 1)))
  return { selection, touched, quantity: qty }
}

/* ---------------- Human-readable summary (summary table, quote email) ---------------- */

export function describeSelection(
  selection: Selection,
  options: WindowOptions,
  include: (step: StepId) => boolean = () => true,
): Spec[] {
  const name = (list: { id: string; name: string }[], id: string) => list.find((o) => o.id === id)?.name ?? "—"
  const specs: Spec[] = []
  if (include("size")) {
    specs.push({
      label: "Size",
      value: `${formatSize(selection.width, selection.height)}${selection.sizeMode === "custom" ? " (custom)" : ""}`,
    })
  }
  if (include("interior")) specs.push({ label: "Interior color", value: name(options.interiorColors, selection.interior) })
  if (include("exterior")) specs.push({ label: "Exterior color", value: name(options.exteriorColors, selection.exterior) })
  if (include("glass")) specs.push({ label: "Glass", value: name(options.glass, selection.glass) })
  if (options.grilles.length > 1 && include("grilles")) {
    specs.push({ label: "Grilles", value: name(options.grilles, selection.grille) })
  }
  if (options.hardware && include("hardware")) {
    specs.push({
      label: "Hardware",
      value: `${name(options.hardware.styles, selection.hardware)}, ${name(options.hardware.finishes, selection.finish)}`,
    })
  }
  return specs
}

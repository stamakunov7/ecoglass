import { glassOptions } from "@/lib/configurator/catalog"

export type LayerKind = "pane" | "gap" | "spacer" | "coating" | "interlayer"

/** One part of a glass unit, listed from the outside of the house in. */
export type GlassLayer = { kind: LayerKind; name: string; note: string }

export type GlassInfo = {
  id: string
  name: string
  /** Short name for tabs and table columns */
  short: string
  tagline: string
  body: string
  bestFor: string[]
  layers: GlassLayer[]
}

const OUTER: GlassLayer = { kind: "pane", name: "Outer pane", note: "The glass facing the weather." }
const INNER: GlassLayer = { kind: "pane", name: "Inner pane", note: "The glass facing your room." }
const AIR: GlassLayer = {
  kind: "gap",
  name: "Sealed air space",
  note: "Trapped between the panes, it slows heat moving through the window.",
}
const SPACER: GlassLayer = {
  kind: "spacer",
  name: "Spacer & edge seal",
  note: "Holds the panes apart and keeps the air space sealed.",
}
const LOW_E: GlassLayer = {
  kind: "coating",
  name: "Low-E coating",
  note: "A microscopically thin layer that reflects the sun's heat but lets daylight through.",
}
const INTERLAYER: GlassLayer = {
  kind: "interlayer",
  name: "Laminated interlayer",
  note: "A tough clear layer bonded between the glass that holds it together if it breaks.",
}
const OUTER_PLY: GlassLayer = { kind: "pane", name: "Outer glass", note: "The outside layer of the laminated glass." }
const INNER_PLY: GlassLayer = { kind: "pane", name: "Inner glass", note: "The inside layer of the laminated glass." }

/** What the site adds to each glass from the designer, in the order the page shows them. */
const DETAILS: Record<string, Omit<GlassInfo, "id" | "name">> = {
  clear: {
    short: "Clear",
    tagline: "The everyday standard.",
    body: "Two panes of clear glass with a sealed space between them. The space slows heat moving through the window, so rooms stay more comfortable than with a single pane, and the view stays perfectly clear.",
    bestFor: ["Shaded or north-facing openings", "Projects where budget comes first", "Clear, untinted views"],
    layers: [OUTER, AIR, SPACER, INNER],
  },
  "low-e": {
    short: "Low-E",
    tagline: "Keeps the heat out, lets the light in.",
    body: "A microscopically thin Low-E coating on the glass reflects the sun's heat while letting daylight through. Paired with a sealed dual-pane unit, it keeps rooms cooler and helps the air conditioning work less.",
    bestFor: ["Sunny south- and west-facing rooms", "Lowering cooling costs", "Less fading of floors and furniture"],
    layers: [OUTER, LOW_E, AIR, SPACER, INNER],
  },
  impact: {
    short: "Impact",
    tagline: "Stays in the frame.",
    body: "Two layers of glass bonded to a tough clear interlayer. If something strikes it, the glass may crack, but the interlayer holds the pieces together in the frame instead of letting them fall out.",
    bestFor: ["Hurricane-prone and coastal areas", "Extra security at ground level", "Quieter rooms near busy streets"],
    layers: [OUTER_PLY, INTERLAYER, INNER_PLY],
  },
  "impact-low-e": {
    short: "Impact Low-E",
    tagline: "Protection and efficiency in one.",
    body: "Impact laminated glass with a Low-E coating added, so one window gives you storm protection and the heat control of Low-E glass at the same time.",
    bestFor: ["Florida homes that want both", "Sunny rooms in hurricane zones", "Year-round comfort without trade-offs"],
    layers: [OUTER_PLY, LOW_E, INTERLAYER, INNER_PLY],
  },
}

const ORDER = ["clear", "low-e", "impact", "impact-low-e"]

/** Glass offered in the designer, joined with the page's details. Glass the page has no details for is left out. */
export const glasses: GlassInfo[] = ORDER.flatMap((id) => {
  const option = glassOptions.find((g) => g.id === id)
  const details = DETAILS[id]
  return option && details ? [{ id, name: option.name, ...details }] : []
})

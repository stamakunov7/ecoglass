/**
 * The door lineup. Sliding and terrace models and their features come from the series EcoGlass lists on its
 * previous site (NOVA, PRESTIGE and DURAPLUS). Entry, French and storm doors are shown by type until their
 * series are confirmed. Photos are stand-ins of the right door type until real product photos replace them.
 */

export type DoorModel = {
  slug: string
  /** e.g. "Four-Panel Sliding Glass Door" */
  name: string
  /** e.g. "PRESTIGE S-7500"; left out where the series isn't confirmed yet */
  series?: string
  /** Door type, shown as the eyebrow */
  kind: string
  /** Panel layout for the diagram: X slides, O stays fixed */
  panels?: string
  /** Layouts the model comes in, e.g. "OX / XO" */
  layouts?: string
  summary: string
  features: string[]
  image: string
  alt: string
}

/** Every unit we sell shares these, so doors without a confirmed series still have honest details. */
const ECOGLASS_BASICS = [
  "Built to your exact opening instead of a stock size",
  "Measured, delivered and installed by our in-house crew",
  "Free in-home estimate and measurement",
]

export const doorModels: DoorModel[] = [
  {
    slug: "nova-sliding-door",
    name: "Sliding Glass Door",
    series: "NOVA",
    kind: "Sliding door",
    panels: "OX",
    layouts: "OX / XO",
    summary: "Two panels: one glides open while the other stays fixed. A dependable everyday sliding door.",
    features: [
      "Right-hand (OX) or left-hand (XO) layout",
      "Available with or without weep covers",
      "Stainless-steel wheel rollers in galvanized steel housings",
      "Ergonomic handle that locks at two points",
      "Heavy-duty aluminum rail system",
      "Multi-chambered, heavy-duty extruded vinyl frame",
    ],
    image: "/images/gallery/sliding-living.webp",
    alt: "Black-framed sliding glass door opening from a living room to the pool",
  },
  {
    slug: "prestige-s-7500",
    name: "Four-Panel Sliding Glass Door",
    series: "PRESTIGE S-7500",
    kind: "Sliding door",
    panels: "OXXO",
    layouts: "OXXO",
    summary: "Four panels: the two in the middle slide open and the two at the sides stay fixed.",
    features: [
      "Two operable center panels and two fixed side panels",
      "Patented dual-tandem nylon wheels for smooth, quiet operation",
      "Raised rail that keeps the wheels clear of dirt and debris",
      "Glass kept apart from the steel reinforcement to reduce condensation",
      "Interlocking rails that make the panels very hard to remove from outside",
      "Low sill for safer entry and exit",
      "Multi-chamber design for better insulation",
    ],
    image: "/images/gallery/pool-sliders.webp",
    alt: "Wide four-panel sliding glass door looking out to a pool deck",
  },
  {
    slug: "prestige-s-8375",
    name: "Six-Panel Sliding Glass Door",
    series: "PRESTIGE S-8375",
    kind: "Sliding door",
    panels: "OXXXXO",
    layouts: "OXXXXO",
    summary: "Six panels: four in the middle slide open and one at each end stays fixed, for a wall of glass.",
    features: [
      "Four operable center panels and two fixed end panels",
      "Available with or without a screen door",
      "Robust profile with strong thermal performance, no added reinforcement needed",
      "Two-level drainage sill for water evacuation",
      "Weatherstripping mounted on an adapter, so it's easy to replace",
      "Patented tandem nylon wheels that leave no marks on the rail",
    ],
    image: "/images/products/big-doors.webp",
    alt: "Six-panel sliding glass wall opened to a pool terrace",
  },
  {
    slug: "duraplus-impact",
    name: "Impact Sliding Patio Door",
    series: "DURAPLUS S-8386 / S-8500",
    kind: "Impact sliding door",
    panels: "XOX",
    layouts: "OX · XO · XOX · XXO · OXX · OOX",
    summary: "An impact sliding patio door in two- and three-panel layouts.",
    features: [
      "Two-panel (OX, XO) or three-panel (XOX, XXO, OXX, OOX) layouts",
      "Stainless-steel wheel rollers in galvanized steel housings",
      "Ergonomic handle that locks at two points",
      "Heavy-duty aluminum rail system",
      "Multi-chambered, heavy-duty extruded vinyl frame",
    ],
    image: "/images/products/sliding-doors.webp",
    alt: "Large sliding glass doors opened at the corner of a living room to the pool",
  },
  {
    slug: "prestige-s-6300",
    name: "Tilt & Turn Terrace Door",
    series: "PRESTIGE S-6300",
    kind: "Terrace door",
    layouts: "Single (X) or double (XX)",
    summary: "An in-swing terrace door that tilts in at the top for air or swings open fully, single or double.",
    features: [
      "Single (X) or double (XX) door",
      "Double doors with a fixed mullion or an astragal",
      "Multipoint locking around the whole frame for security and airtightness",
      "Continuous double weatherstripping with compression seals",
      "Pressure-balance system for drainage",
      "Reinforced sash built for large surface hinges",
    ],
    image: "/images/gallery/french-doors.webp",
    alt: "Pair of glass terrace doors swung open to a garden patio",
  },
  {
    slug: "french-patio",
    name: "French & Hinged Patio Doors",
    kind: "Patio door",
    summary: "Swinging glass doors with a classic look, opening onto the patio.",
    features: ECOGLASS_BASICS,
    image: "/images/products/french-hinged-patio-doors.webp",
    alt: "French patio doors opening from a living room onto a garden patio",
  },
  {
    slug: "entry",
    name: "Entry Door",
    kind: "Entry door",
    summary: "A secure, efficient front door that sets the tone for your home.",
    features: ECOGLASS_BASICS,
    image: "/images/products/entry-doors.webp",
    alt: "Modern wood entry door with glass sidelights and a transom on a Florida home",
  },
  {
    slug: "storm-screen",
    name: "Storm & Screen Door",
    kind: "Storm door",
    summary: "An extra layer at the entry: fresh air in, bugs and weather out.",
    features: ECOGLASS_BASICS,
    image: "/images/products/storm-screen-doors.webp",
    alt: "Storm and screen door on the front porch of a Florida cottage",
  },
]

export function getDoor(slug: string) {
  return doorModels.find((d) => d.slug === slug)
}

/** "PRESTIGE S-7500 Four-Panel Sliding Glass Door" */
export function doorTitle(door: DoorModel) {
  return door.series ? `${door.series} ${door.name}` : door.name
}

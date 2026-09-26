/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SAMPLE DATA — replace with real supplier data before launch.
 *
 *  Every option below (sizes, colors, glass, grilles, hardware, price tiers,
 *  brand copy) is a placeholder so the product designer can be built and
 *  reviewed. While SAMPLE_DATA is true the page shows a "placeholder options"
 *  notice. Once the NOVA / PRESTIGE / DURO PLAST / PRESTIGE+ catalogs are in,
 *  update the data here and set SAMPLE_DATA to false.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { BrandProfile, BrandSlug, SizeOptions, WindowKind, WindowOptions } from "./types"

export const SAMPLE_DATA = true

/* ---------------- Which product uses which preview / designer ---------------- */

const productKinds: Record<string, WindowKind | null> = {
  awning: "awning",
  "bay-bow": "bay",
  casement: "casement",
  "double-single-hung": "hung",
  sliding: "slider",
  "pass-through": "slider",
  picture: "picture",
  specialty: "arch",
}

/** Returns the preview kind for a product, or null when it has no online designer yet (doors). */
export function getWindowKind(productSlug: string): WindowKind | null {
  return productKinds[productSlug] ?? null
}

/* ---------------- Default options (shared by every brand unless overridden) ---------------- */

const sizesByKind: Record<WindowKind, SizeOptions> = {
  awning: {
    widths: [17.5, 23.5, 29.5, 35.5, 41.5, 47.5],
    heights: [17.5, 23.5, 29.5, 35.5],
    min: { width: 14, height: 12 },
    max: { width: 48, height: 36 },
    default: { width: 41.5, height: 23.5 },
  },
  casement: {
    widths: [17.5, 23.5, 29.5, 35.5],
    heights: [35.5, 41.5, 47.5, 59.5, 71.5],
    min: { width: 14, height: 24 },
    max: { width: 36, height: 72 },
    default: { width: 23.5, height: 47.5 },
  },
  hung: {
    widths: [23.5, 29.5, 35.5, 41.5],
    heights: [35.5, 47.5, 53.5, 59.5, 71.5],
    min: { width: 18, height: 30 },
    max: { width: 48, height: 84 },
    default: { width: 35.5, height: 59.5 },
  },
  slider: {
    widths: [35.5, 47.5, 59.5, 71.5],
    heights: [23.5, 35.5, 47.5, 59.5],
    min: { width: 24, height: 18 },
    max: { width: 84, height: 60 },
    default: { width: 59.5, height: 35.5 },
  },
  picture: {
    widths: [23.5, 35.5, 47.5, 59.5, 71.5],
    heights: [23.5, 35.5, 47.5, 59.5, 71.5],
    min: { width: 12, height: 12 },
    max: { width: 96, height: 84 },
    default: { width: 47.5, height: 47.5 },
  },
  bay: {
    widths: [71.5, 83.5, 95.5],
    heights: [47.5, 59.5],
    min: { width: 60, height: 36 },
    max: { width: 120, height: 72 },
    default: { width: 83.5, height: 59.5 },
  },
  arch: {
    widths: [23.5, 35.5, 47.5, 59.5],
    heights: [35.5, 47.5, 59.5],
    min: { width: 18, height: 24 },
    max: { width: 72, height: 84 },
    default: { width: 35.5, height: 47.5 },
  },
}

const interiorColors = [
  { id: "white", name: "White", hex: "#F4F4F0" },
  { id: "almond", name: "Almond", hex: "#E3D7C3" },
  { id: "bronze", name: "Bronze", hex: "#4B3C30" },
  { id: "black", name: "Black", hex: "#1F2022" },
]

const exteriorColors = [
  { id: "white", name: "White", hex: "#F4F4F0" },
  { id: "almond", name: "Almond", hex: "#E3D7C3" },
  { id: "gray", name: "Graphite", hex: "#5E6266" },
  { id: "bronze", name: "Bronze", hex: "#4B3C30" },
  { id: "black", name: "Black", hex: "#1F2022" },
]

const glass = [
  {
    id: "low-e",
    name: "Low-E Insulated Glass",
    description:
      "Dual-pane glass with a Low-E coating that reflects the Florida sun's heat and helps lower cooling costs.",
  },
  {
    id: "impact",
    name: "Impact Laminated Glass",
    description:
      "Laminated glass built for hurricane-prone regions. Stays in the frame if broken and adds security and sound control.",
  },
  {
    id: "impact-low-e",
    name: "Impact Low-E Laminated Glass",
    description: "Everything in impact laminated glass, plus a Low-E coating for better energy efficiency.",
  },
  {
    id: "clear",
    name: "Clear Insulated Glass",
    description: "Clear dual-pane glass with basic thermal performance for everyday comfort.",
  },
]

const grilles = [
  { id: "none", name: "None", pattern: "none" as const },
  { id: "colonial", name: "Colonial", pattern: "colonial" as const },
  { id: "prairie", name: "Prairie", pattern: "prairie" as const },
  { id: "fractional", name: "Fractional", pattern: "fractional" as const },
]

const finishes = [
  { id: "white", name: "White", hex: "#F4F4F0" },
  { id: "almond", name: "Almond", hex: "#E3D7C3" },
  { id: "bronze", name: "Bronze", hex: "#4B3C30" },
  { id: "black", name: "Black", hex: "#1F2022" },
  { id: "satin-nickel", name: "Satin Nickel", hex: "#B9BCBF", metallic: true },
  { id: "brushed-brass", name: "Brushed Brass", hex: "#B89B5E", metallic: true },
]

const hardwareStyles: Record<WindowKind, WindowOptions["hardware"]> = {
  awning: {
    styles: [
      { id: "folding-crank", name: "Folding Crank", description: "Crank folds flat so it stays out of the way of blinds." },
      { id: "push-out", name: "Push-Out Handle", description: "Crank-free lever for a cleaner, modern sill." },
    ],
    finishes,
  },
  casement: {
    styles: [
      { id: "folding-crank", name: "Folding Crank", description: "Crank folds flat so it stays out of the way of blinds." },
      { id: "push-out", name: "Push-Out Handle", description: "Crank-free lever for a cleaner, modern look." },
    ],
    finishes,
  },
  hung: {
    styles: [
      { id: "cam-lock", name: "Cam-Action Lock", description: "Classic sash lock that pulls the sashes tight." },
      { id: "low-profile", name: "Low-Profile Lock", description: "Slim lock with a minimal footprint on the rail." },
    ],
    finishes,
  },
  slider: {
    styles: [
      { id: "cam-lock", name: "Cam-Action Lock", description: "Classic lock that pulls the sashes tight." },
      { id: "keyed", name: "Keyed Lock", description: "Adds a key cylinder for extra security." },
    ],
    finishes,
  },
  bay: {
    styles: [{ id: "folding-crank", name: "Folding Crank", description: "Operates the two venting side units." }],
    finishes,
  },
  picture: null,
  arch: null,
}

function defaultOptions(kind: WindowKind): WindowOptions {
  return {
    sizes: sizesByKind[kind],
    interiorColors,
    exteriorColors,
    glass,
    grilles,
    hardware: hardwareStyles[kind],
  }
}

/* ---------------- Brands ---------------- */

export const brandProfiles: BrandProfile[] = [
  {
    slug: "nova",
    name: "NOVA",
    tagline: "Slim profiles. Everyday reliability.",
    description:
      "Clean, modern designs with slim profiles and dependable performance. A great fit for contemporary spaces that need energy efficiency and everyday reliability.",
    material: "Slim, clean-lined frames built for dependable everyday performance and energy efficiency.",
    highlights: ["Slim, modern profiles", "Energy-efficient everyday performance"],
    priceTier: 2,
  },
  {
    slug: "prestige",
    name: "PRESTIGE",
    tagline: "Designer looks. Advanced performance.",
    description:
      "Elegant products that combine designer aesthetics with advanced performance. Ideal for homeowners who want a premium, refined finish.",
    material: "Refined frames that pair designer aesthetics with advanced performance.",
    highlights: ["Designer aesthetics, refined finish", "Advanced performance"],
    priceTier: 3,
  },
  {
    slug: "duro-plast",
    name: "DURO PLAST",
    tagline: "Built strong. Built to last.",
    description:
      "Strong, practical builds made for long-lasting everyday performance. Designed to combine durability, low maintenance, and efficiency.",
    material: "Strong, practical frames made for durability, low maintenance, and efficiency.",
    highlights: ["Durable, low-maintenance build", "Practical and efficient"],
    priceTier: 2,
  },
  {
    slug: "prestige-plus",
    name: "PRESTIGE+",
    tagline: "Sleek style. Upgraded performance.",
    description:
      "Enhanced systems with a sleek appearance and upgraded performance. Perfect for projects that need style, functionality, and premium details.",
    material: "Enhanced systems with a sleek appearance, upgraded performance, and premium details.",
    highlights: ["Upgraded performance", "Sleek look with premium details"],
    priceTier: 4,
  },
]

export const brandSlugs: BrandSlug[] = brandProfiles.map((b) => b.slug)

export function getBrandProfile(slug: string): BrandProfile | undefined {
  return brandProfiles.find((b) => b.slug === slug)
}

/** Resolved options for one brand + product kind (brand overrides win over the defaults). */
export function getWindowOptions(kind: WindowKind, brand: BrandProfile): WindowOptions {
  return { ...defaultOptions(kind), ...brand.options }
}

export type BrandSlug = "nova" | "prestige" | "duro-plast" | "prestige-plus"

/** How the live preview draws a product. `null` means the product has no online designer yet (doors). */
export type WindowKind = "awning" | "casement" | "hung" | "slider" | "picture" | "bay" | "arch"

export type GrillePattern = "none" | "colonial" | "prairie" | "fractional"

export type ColorOption = { id: string; name: string; hex: string }

export type GlassOption = { id: string; name: string; description: string }

export type GrilleOption = { id: string; name: string; pattern: GrillePattern }

export type HardwareStyle = { id: string; name: string; description: string }

export type FinishOption = { id: string; name: string; hex: string; metallic?: boolean }

export type SizeOptions = {
  /** Standard sizes in inches (e.g. 41.5 for 41 1/2"). */
  widths: number[]
  heights: number[]
  /** Limits for custom sizes, in inches. */
  min: { width: number; height: number }
  max: { width: number; height: number }
  /** Size preselected when the designer opens (should be one of the standard sizes). */
  default: { width: number; height: number }
}

export type WindowOptions = {
  sizes: SizeOptions
  interiorColors: ColorOption[]
  exteriorColors: ColorOption[]
  glass: GlassOption[]
  grilles: GrilleOption[]
  /** `null` for fixed units (picture, arch) that have no operating hardware. */
  hardware: { styles: HardwareStyle[]; finishes: FinishOption[] } | null
}

export type BrandProfile = {
  slug: BrandSlug
  name: string
  /** Short headline shown next to the preview, e.g. "Slim profiles. Everyday reliability." */
  tagline: string
  description: string
  /** Shown under "Is it right for you?" → Material. */
  material: string
  /** Two short selling points for the "Explore other" cards. */
  highlights: [string, string]
  /** 1–4, rendered as $ signs on the "Explore other" cards. */
  priceTier?: 1 | 2 | 3 | 4
  /** Per-brand overrides when a supplier offers different options than the defaults. */
  options?: Partial<WindowOptions>
}

/** Everything a shopper picked. Sizes are in inches. */
export type Selection = {
  sizeMode: "standard" | "custom"
  width: number
  height: number
  interior: string
  exterior: string
  glass: string
  grille: string
  hardware: string
  finish: string
}

export type StepId = "size" | "interior" | "exterior" | "glass" | "grilles" | "hardware" | "summary"

export type Spec = { label: string; value: string }

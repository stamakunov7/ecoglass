export type GalleryCategory = "windows" | "doors" | "homes" | "craft"

export type GalleryItem = {
  slug: string
  title: string
  category: GalleryCategory
  /** Crop used in the grid, as a CSS aspect-ratio. The lightbox always shows the whole photo. */
  ratio: string
  /** Size of the full image file. */
  width: number
  height: number
}

export const GALLERY_CATEGORIES: { id: "all" | GalleryCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "windows", label: "Windows" },
  { id: "doors", label: "Doors" },
  { id: "homes", label: "Homes" },
  { id: "craft", label: "Craftsmanship" },
]

export const CATEGORY_LABEL: Record<GalleryCategory, string> = {
  windows: "Windows",
  doors: "Doors",
  homes: "Homes",
  craft: "Craftsmanship",
}

const square = { width: 1024, height: 1024 }

/**
 * PLACEHOLDER PHOTOGRAPHY. These are the product renders used elsewhere on the site, standing in
 * until real photos of finished EcoGlass projects are supplied. Swap the files in
 * public/images/gallery (keep `<slug>.webp` plus a 720px-wide `<slug>-sm.webp`) and update the
 * captions and sizes below.
 */
export const GALLERY: GalleryItem[] = [
  { slug: "multi-slide", title: "Multi-slide doors open to the pool", category: "doors", ratio: "4 / 5", ...square },
  { slug: "picture-windows", title: "Black-framed picture windows", category: "windows", ratio: "1 / 1", ...square },
  { slug: "dusk-home", title: "A wall of glass at dusk", category: "homes", ratio: "3 / 4", ...square },
  { slug: "frame-detail", title: "Frame and glass detail", category: "craft", ratio: "4 / 5", ...square },
  { slug: "bay-window", title: "Bay window with a reading nook", category: "windows", ratio: "4 / 3", ...square },
  { slug: "entry-dusk", title: "Modern entry door at dusk", category: "doors", ratio: "3 / 4", ...square },
  { slug: "awning-open", title: "Awning window, open to the breeze", category: "windows", ratio: "16 / 10", width: 1600, height: 900 },
  { slug: "pocket-sliders", title: "Pocket sliders to the lanai", category: "doors", ratio: "1 / 1", ...square },
  { slug: "factory-floor", title: "On the floor at our Longwood factory", category: "craft", ratio: "4 / 3", ...square },
  { slug: "awning-stone", title: "Awning window in a stone wall", category: "windows", ratio: "4 / 5", ...square },
  { slug: "french-doors", title: "French doors to the garden", category: "doors", ratio: "4 / 5", ...square },
  { slug: "arched-home", title: "Arched specialty window", category: "homes", ratio: "1 / 1", ...square },
  { slug: "casement-windows", title: "Black casement windows", category: "windows", ratio: "3 / 4", ...square },
  { slug: "installation", title: "Installing a black-framed window", category: "craft", ratio: "1 / 1", ...square },
  { slug: "pool-sliders", title: "Floor-to-ceiling sliders to the pool deck", category: "doors", ratio: "4 / 3", ...square },
  { slug: "window-walls", title: "Window walls under a timber ceiling", category: "windows", ratio: "4 / 5", ...square },
  { slug: "lake-home", title: "Lakefront home at sunrise", category: "homes", ratio: "16 / 10", width: 1600, height: 900 },
  { slug: "entry-transom", title: "Entry door with a transom", category: "doors", ratio: "4 / 5", ...square },
  { slug: "double-hung", title: "Double-hung window, garden view", category: "windows", ratio: "1 / 1", ...square },
  { slug: "measuring", title: "Measuring every opening", category: "craft", ratio: "3 / 4", ...square },
  { slug: "sliding-living", title: "Sliding glass doors, living room", category: "doors", ratio: "1 / 1", ...square },
  { slug: "pass-through", title: "Pass-through window to the patio", category: "windows", ratio: "4 / 3", ...square },
  { slug: "awning-kitchen", title: "Awning window over the kitchen sink", category: "windows", ratio: "4 / 5", ...square },
  { slug: "storm-door", title: "Storm door on a Florida cottage", category: "doors", ratio: "3 / 4", ...square },
  { slug: "blinds-between-glass", title: "Blinds built in between the glass", category: "craft", ratio: "1 / 1", ...square },
  { slug: "living-windows", title: "Black-framed windows, living room", category: "windows", ratio: "4 / 5", ...square },
  { slug: "awning-exterior", title: "Awning window from outside", category: "windows", ratio: "1 / 1", ...square },
  { slug: "family-room", title: "Family room with a view", category: "windows", ratio: "4 / 3", ...square },
  { slug: "awning-marble", title: "Awning window beside marble", category: "windows", ratio: "3 / 4", ...square },
  { slug: "showroom", title: "Our Longwood showroom", category: "craft", ratio: "4 / 3", width: 1024, height: 846 },
]

export const fullSrc = (slug: string) => `/images/gallery/${slug}.webp`
export const smallSrc = (slug: string) => `/images/gallery/${slug}-sm.webp`

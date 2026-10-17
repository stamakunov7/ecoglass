import type { ReactNode } from "react"
import { NovaLogo, PrestigeLogo, DuroPlastLogo, PrestigePlusLogo } from "./brand-logos"

export type ProductCategory = "Windows" | "Doors"

export type Brand = {
  /** URL segment, e.g. "nova" → /products/awning/nova */
  slug: string
  name: string
  description: string
  image: string
  alt: string
  href: string
  logo: ReactNode
}

export type Product = {
  slug: string
  /** Short menu label, e.g. "Bay & Bow" */
  name: string
  category: ProductCategory
  /** Full hero + document title, e.g. "Bay & Bow Windows" */
  title: string
  /** One line on how this style works, for the catalog. */
  summary: string
  description: string
  heroImage: string
  heroAlt: string
  brands: Brand[]
}

/** Products whose brand cards have their own photos in /images/series. The rest show the awning set for now. */
const SERIES_PHOTOS = new Set(["awning", "double-single-hung"])

/** Photo of one brand's version of a product, e.g. /images/series/casement-nova.webp. */
function seriesImage(slug: string, brand: string) {
  return `/images/series/${SERIES_PHOTOS.has(slug) ? slug : "awning"}-${brand}.webp`
}

/**
 * The four supplier brands are shared across every product line. Descriptions are
 * kept product-neutral so they read correctly for both windows and doors.
 */
function makeBrands(slug: string): Brand[] {
  return [
    {
      slug: "nova",
      name: "NOVA",
      description:
        "Clean, modern designs with slim profiles and dependable performance. A great fit for contemporary spaces that need energy efficiency and everyday reliability.",
      image: seriesImage(slug, "nova"),
      alt: "NOVA product",
      href: `/products/${slug}/nova`,
      logo: <NovaLogo />,
    },
    {
      slug: "prestige",
      name: "PRESTIGE",
      description:
        "Elegant products that combine designer aesthetics with advanced performance. Ideal for homeowners who want a premium, refined finish.",
      image: seriesImage(slug, "prestige"),
      alt: "PRESTIGE product",
      href: `/products/${slug}/prestige`,
      logo: <PrestigeLogo />,
    },
    {
      slug: "duro-plast",
      name: "DURO PLAST",
      description:
        "Strong, practical builds made for long-lasting everyday performance. Designed to combine durability, low maintenance, and efficiency.",
      image: seriesImage(slug, "duro-plast"),
      alt: "DURO PLAST product",
      href: `/products/${slug}/duro-plast`,
      logo: <DuroPlastLogo />,
    },
    {
      slug: "prestige-plus",
      name: "PRESTIGE+",
      description:
        "Enhanced systems with a sleek appearance and upgraded performance. Perfect for projects that need style, functionality, and premium details.",
      image: seriesImage(slug, "prestige-plus"),
      alt: "PRESTIGE+ product",
      href: `/products/${slug}/prestige-plus`,
      logo: <PrestigePlusLogo />,
    },
  ]
}

type ProductSeed = {
  slug: string
  name: string
  category: ProductCategory
  title: string
  /** One line on how this style works, for the catalog. */
  summary: string
  description: string
  heroImage: string
  heroAlt: string
}

/** Window styles. Doors have their own lineup in door-catalog.ts. */
const seeds: ProductSeed[] = [
  {
    slug: "awning",
    name: "Awning",
    category: "Windows",
    title: "Awning Windows",
    summary: "Hinged at the top and opens outward, so you can let air in even when it rains.",
    description:
      "EcoGlass offers awning windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect awning window for your home.",
    heroImage: "/images/products/awning.webp",
    heroAlt: "Close-up of a black-framed awning window cranked open outward on a modern home, with lush greenery outside",
  },
  {
    slug: "bay-bow",
    name: "Bay & Bow",
    category: "Windows",
    title: "Bay & Bow Windows",
    summary: "Projects out from the wall for more light, more room and a view on three sides.",
    description:
      "EcoGlass offers bay & bow windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect bay or bow window for your home.",
    heroImage: "/images/products/bay-bow.webp",
    heroAlt: "Bay and bow window projecting outward on a premium Florida home",
  },
  {
    slug: "casement",
    name: "Casement",
    category: "Windows",
    title: "Casement Windows",
    summary: "Hinged at the side and cranks open all the way for the most airflow.",
    description:
      "EcoGlass offers casement windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect casement window for your home.",
    heroImage: "/images/products/casement.webp",
    heroAlt: "Modern casement window cranked open on a Florida home",
  },
  {
    slug: "double-single-hung",
    name: "Double & Single-Hung",
    category: "Windows",
    title: "Double & Single-Hung Windows",
    summary: "Classic sashes that slide up and down. Simple to use, easy to clean.",
    description:
      "EcoGlass offers double and single-hung windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect hung window for your home.",
    heroImage: "/images/products/double-single-hung.webp",
    heroAlt: "Classic double-hung window in a bright Florida home interior",
  },
  {
    slug: "sliding",
    name: "Sliding",
    category: "Windows",
    title: "Sliding Windows",
    summary: "Sashes glide side to side on a track for wide views and easy operation.",
    description:
      "EcoGlass offers sliding windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect sliding window for your home.",
    heroImage: "/images/products/sliding.webp",
    heroAlt: "Large horizontal sliding window on a modern Florida home",
  },
  {
    slug: "pass-through",
    name: "Pass-Through",
    category: "Windows",
    title: "Pass-Through Windows",
    summary: "Opens the kitchen to the patio for easy serving and outdoor living.",
    description:
      "EcoGlass offers pass-through windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect pass-through window for your home.",
    heroImage: "/images/products/pass-through.webp",
    heroAlt: "Pass-through kitchen window opening onto an outdoor patio bar",
  },
  {
    slug: "picture",
    name: "Picture",
    category: "Windows",
    title: "Picture Windows",
    summary: "One large fixed pane that frames the view and brings in the most light.",
    description:
      "EcoGlass offers picture windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect picture window for your home.",
    heroImage: "/images/products/picture.webp",
    heroAlt: "Large fixed picture window framing a garden view in a Florida living room",
  },
  {
    slug: "specialty",
    name: "Specialty",
    category: "Windows",
    title: "Specialty Windows",
    summary: "Arches, circles and custom shapes made to fit your architecture.",
    description:
      "EcoGlass offers specialty windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect specialty window for your home.",
    heroImage: "/images/products/specialty.webp",
    heroAlt: "Elegant arched specialty window on a premium Florida home facade",
  },
]

export const products: Product[] = seeds.map((seed) => ({
  ...seed,
  brands: makeBrands(seed.slug),
}))

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductSlugs(): string[] {
  return products.map((p) => p.slug)
}

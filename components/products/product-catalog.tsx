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
  {
    slug: "big-doors",
    name: "Big Doors",
    category: "Doors",
    title: "Big Doors",
    summary: "Floor-to-ceiling glass walls that open whole rooms to the outdoors.",
    description:
      "EcoGlass offers big door systems from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect big door for your home.",
    heroImage: "/images/products/big-doors.webp",
    heroAlt: "Large multi-panel sliding glass big door system opening to a pool patio",
  },
  {
    slug: "entry-doors",
    name: "Entry Doors",
    category: "Doors",
    title: "Entry Doors",
    summary: "A secure, efficient front door that sets the tone for your home.",
    description:
      "EcoGlass offers entry doors from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect entry door for your home.",
    heroImage: "/images/products/entry-doors.webp",
    heroAlt: "Premium modern front entry door with sidelights on a Florida home",
  },
  {
    slug: "french-hinged-patio-doors",
    name: "French & Hinged Patio Doors",
    category: "Doors",
    title: "French & Hinged Patio Doors",
    summary: "Swinging glass doors with a classic look, opening onto the patio.",
    description:
      "EcoGlass offers french and hinged patio doors from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect patio door for your home.",
    heroImage: "/images/products/french-hinged-patio-doors.webp",
    heroAlt: "Elegant french hinged patio doors opening onto a garden patio",
  },
  {
    slug: "sliding-doors",
    name: "Sliding Doors",
    category: "Doors",
    title: "Sliding Doors",
    summary: "Large glass panels that slide open to the pool deck or lanai.",
    description:
      "EcoGlass offers sliding doors from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect sliding door for your home.",
    heroImage: "/images/products/sliding-doors.webp",
    heroAlt: "Modern sliding glass patio door connecting a living room to a pool deck",
  },
  {
    slug: "storm-screen-doors",
    name: "Storm & Screen Doors",
    category: "Doors",
    title: "Storm & Screen Doors",
    summary: "An extra layer at the entry: fresh air in, bugs and weather out.",
    description:
      "EcoGlass offers storm and screen doors from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect storm or screen door for your home.",
    heroImage: "/images/products/storm-screen-doors.webp",
    heroAlt: "Storm and screen door on a welcoming Florida home entrance",
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

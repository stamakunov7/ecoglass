import type { Brand } from "./brand-catalog-row"
import { NovaLogo, PrestigeLogo, DuroPlastLogo, PrestigePlusLogo } from "./brand-logos"

export type ProductCategory = "Windows" | "Doors"

export type Product = {
  slug: string
  /** Short menu label, e.g. "Bay & Bow" */
  name: string
  category: ProductCategory
  /** Full hero + document title, e.g. "Bay & Bow Windows" */
  title: string
  description: string
  heroImage: string
  heroAlt: string
  brands: Brand[]
}

/**
 * The four supplier brands are shared across every product line. Descriptions are
 * kept product-neutral so they read correctly for both windows and doors. Each
 * product reuses the same representative brand imagery; swap per-product art later
 * by overriding the image paths in makeBrands.
 */
function makeBrands(slug: string): Brand[] {
  return [
    {
      slug: "nova",
      name: "NOVA",
      description:
        "Clean, modern designs with slim profiles and dependable performance. A great fit for contemporary spaces that need energy efficiency and everyday reliability.",
      image: "/images/awning-nova.png",
      alt: "NOVA product",
      href: `/products/${slug}/nova`,
      logo: <NovaLogo />,
    },
    {
      slug: "prestige",
      name: "PRESTIGE",
      description:
        "Elegant products that combine designer aesthetics with advanced performance. Ideal for homeowners who want a premium, refined finish.",
      image: "/images/awning-prestige.png",
      alt: "PRESTIGE product",
      href: `/products/${slug}/prestige`,
      logo: <PrestigeLogo />,
    },
    {
      slug: "duro-plast",
      name: "DURO PLAST",
      description:
        "Strong, practical builds made for long-lasting everyday performance. Designed to combine durability, low maintenance, and efficiency.",
      image: "/images/awning-duroplast.png",
      alt: "DURO PLAST product",
      href: `/products/${slug}/duro-plast`,
      logo: <DuroPlastLogo />,
    },
    {
      slug: "prestige-plus",
      name: "PRESTIGE+",
      description:
        "Enhanced systems with a sleek appearance and upgraded performance. Perfect for projects that need style, functionality, and premium details.",
      image: "/images/awning-prestige-plus.png",
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
    description:
      "EcoGlass offers awning windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect awning window for your home.",
    heroImage: "/images/awning-hero.png",
    heroAlt: "Close-up of a black-framed awning window cranked open outward on a modern home, with lush greenery outside",
  },
  {
    slug: "bay-bow",
    name: "Bay & Bow",
    category: "Windows",
    title: "Bay & Bow Windows",
    description:
      "EcoGlass offers bay & bow windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect bay or bow window for your home.",
    heroImage: "/images/hero-bay-bow.png",
    heroAlt: "Bay and bow window projecting outward on a premium Florida home",
  },
  {
    slug: "casement",
    name: "Casement",
    category: "Windows",
    title: "Casement Windows",
    description:
      "EcoGlass offers casement windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect casement window for your home.",
    heroImage: "/images/hero-casement.png",
    heroAlt: "Modern casement window cranked open on a Florida home",
  },
  {
    slug: "double-single-hung",
    name: "Double & Single-Hung",
    category: "Windows",
    title: "Double & Single-Hung Windows",
    description:
      "EcoGlass offers double and single-hung windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect hung window for your home.",
    heroImage: "/images/hero-double-single-hung.png",
    heroAlt: "Classic double-hung window in a bright Florida home interior",
  },
  {
    slug: "sliding",
    name: "Sliding",
    category: "Windows",
    title: "Sliding Windows",
    description:
      "EcoGlass offers sliding windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect sliding window for your home.",
    heroImage: "/images/hero-sliding.png",
    heroAlt: "Large horizontal sliding window on a modern Florida home",
  },
  {
    slug: "pass-through",
    name: "Pass-Through",
    category: "Windows",
    title: "Pass-Through Windows",
    description:
      "EcoGlass offers pass-through windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect pass-through window for your home.",
    heroImage: "/images/hero-pass-through.png",
    heroAlt: "Pass-through kitchen window opening onto an outdoor patio bar",
  },
  {
    slug: "picture",
    name: "Picture",
    category: "Windows",
    title: "Picture Windows",
    description:
      "EcoGlass offers picture windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect picture window for your home.",
    heroImage: "/images/hero-picture.png",
    heroAlt: "Large fixed picture window framing a garden view in a Florida living room",
  },
  {
    slug: "specialty",
    name: "Specialty",
    category: "Windows",
    title: "Specialty Windows",
    description:
      "EcoGlass offers specialty windows from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect specialty window for your home.",
    heroImage: "/images/hero-specialty.png",
    heroAlt: "Elegant arched specialty window on a premium Florida home facade",
  },
  {
    slug: "big-doors",
    name: "Big Doors",
    category: "Doors",
    title: "Big Doors",
    description:
      "EcoGlass offers big door systems from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect big door for your home.",
    heroImage: "/images/hero-big-doors.png",
    heroAlt: "Large multi-panel sliding glass big door system opening to a pool patio",
  },
  {
    slug: "entry-doors",
    name: "Entry Doors",
    category: "Doors",
    title: "Entry Doors",
    description:
      "EcoGlass offers entry doors from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect entry door for your home.",
    heroImage: "/images/hero-entry-doors.png",
    heroAlt: "Premium modern front entry door with sidelights on a Florida home",
  },
  {
    slug: "french-hinged-patio-doors",
    name: "French & Hinged Patio Doors",
    category: "Doors",
    title: "French & Hinged Patio Doors",
    description:
      "EcoGlass offers french and hinged patio doors from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect patio door for your home.",
    heroImage: "/images/hero-french-hinged-patio-doors.png",
    heroAlt: "Elegant french hinged patio doors opening onto a garden patio",
  },
  {
    slug: "sliding-doors",
    name: "Sliding Doors",
    category: "Doors",
    title: "Sliding Doors",
    description:
      "EcoGlass offers sliding doors from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect sliding door for your home.",
    heroImage: "/images/hero-sliding-doors.png",
    heroAlt: "Modern sliding glass patio door connecting a living room to a pool deck",
  },
  {
    slug: "storm-screen-doors",
    name: "Storm & Screen Doors",
    category: "Doors",
    title: "Storm & Screen Doors",
    description:
      "EcoGlass offers storm and screen doors from several trusted brands, giving you options to match your style, performance needs, and budget. Find the perfect storm or screen door for your home.",
    heroImage: "/images/hero-storm-screen-doors.png",
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

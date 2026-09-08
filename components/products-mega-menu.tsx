"use client"

import Image from "next/image"
import {
  PanelTop,
  Frame,
  RectangleVertical,
  Rows2,
  Columns2,
  AppWindow,
  Square,
  Sparkles,
  LayoutGrid,
  DoorClosed,
  DoorOpen,
  Grid2x2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

type Item = { label: string; href: string; icon?: LucideIcon }

const windows: Item[] = [
  { label: "Awning", href: "#products", icon: PanelTop },
  { label: "Bay & Bow", href: "#products", icon: Frame },
  { label: "Casement", href: "#products", icon: RectangleVertical },
  { label: "Double & Single-Hung", href: "#products", icon: Rows2 },
  { label: "Sliding", href: "#products", icon: Columns2 },
  { label: "Pass-Through", href: "#products", icon: AppWindow },
  { label: "Picture", href: "#products", icon: Square },
  { label: "Specialty", href: "#products", icon: Sparkles },
]

const windowsLinks: Item[] = [
  { label: "Replacement Windows", href: "#products" },
  { label: "Coastal Windows & Doors", href: "#products" },
]

const doors: Item[] = [
  { label: "Big Doors", href: "#products", icon: LayoutGrid },
  { label: "Entry Doors", href: "#products", icon: DoorClosed },
  { label: "French & Hinged Patio Doors", href: "#products", icon: DoorOpen },
  { label: "Sliding Doors", href: "#products", icon: Columns2 },
  { label: "Storm & Screen Doors", href: "#products", icon: Grid2x2 },
]

const doorsLinks: Item[] = [{ label: "Replacement Doors", href: "#products" }]

const cards = [
  { label: "Browse by Series", href: "#products", src: "/images/mega-series.png" },
  { label: "Browse by Materials", href: "#products", src: "/images/mega-materials.png" },
  { label: "All Windows & Doors", href: "#products", src: "/images/hero-home.png" },
  { label: "Specialty Glass Products", href: "#products", src: "/images/product-smartglass.png" },
]

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-lg font-bold tracking-tight text-forest">{children}</h3>
  )
}

function ProductLink({ item, onNavigate }: { item: Item; onNavigate: () => void }) {
  const Icon = item.icon
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className="group flex items-center gap-3 rounded-lg py-1.5 text-[15px] text-ink/80 transition-colors hover:text-cta"
    >
      {Icon ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-offwhite text-forest transition-colors group-hover:border-cta/40 group-hover:text-cta">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      ) : null}
      <span className="font-medium">{item.label}</span>
    </a>
  )
}

export function ProductsMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
      {/* Left: two product columns */}
      <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
        <div>
          <ColumnHeading>Windows</ColumnHeading>
          <div className="mt-3 flex flex-col">
            {windows.map((item) => (
              <ProductLink key={item.label} item={item} onNavigate={onNavigate} />
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3">
            {windowsLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className="py-1 text-[15px] font-semibold text-ink/70 transition-colors hover:text-cta"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#products"
              onClick={onNavigate}
              className="mt-1 inline-flex items-center gap-1 text-[15px] font-bold text-cta transition-colors hover:text-cta-dark"
            >
              See All <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <ColumnHeading>Doors</ColumnHeading>
          <div className="mt-3 flex flex-col">
            {doors.map((item) => (
              <ProductLink key={item.label} item={item} onNavigate={onNavigate} />
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3">
            {doorsLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className="py-1 text-[15px] font-semibold text-ink/70 transition-colors hover:text-cta"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#products"
              onClick={onNavigate}
              className="mt-1 inline-flex items-center gap-1 text-[15px] font-bold text-cta transition-colors hover:text-cta-dark"
            >
              See All <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Right: 2x2 visual cards */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            onClick={onNavigate}
            className="group relative flex aspect-[3/2] items-end justify-center overflow-hidden rounded-xl border border-border bg-muted"
          >
            <Image
              src={card.src || "/placeholder.svg"}
              alt={card.label}
              fill
              sizes="(min-width: 1024px) 240px, 40vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-forest-deep/50 to-transparent" aria-hidden="true" />
            <span className="relative mb-4 inline-flex items-center rounded-full border-2 border-cta bg-card px-4 py-2 text-center text-[13px] font-bold text-forest shadow-lg shadow-forest-deep/20 transition-colors group-hover:bg-cta group-hover:text-white">
              {card.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

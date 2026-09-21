"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

type Item = { label: string; href: string; icon?: string }

const windows: Item[] = [
  { label: "Awning", href: "/products/awning", icon: "/product-icons/awning.png" },
  { label: "Bay & Bow", href: "/products/bay-bow", icon: "/product-icons/bay-bow.png" },
  { label: "Casement", href: "/products/casement", icon: "/product-icons/casement.png" },
  { label: "Double & Single-Hung", href: "/products/double-single-hung", icon: "/product-icons/single-double-hung.png" },
  { label: "Sliding", href: "/products/sliding", icon: "/product-icons/sliding-window.png" },
  { label: "Pass-Through", href: "/products/pass-through", icon: "/product-icons/pass-through.png" },
  { label: "Picture", href: "/products/picture", icon: "/product-icons/picture-window.png" },
  { label: "Specialty", href: "/products/specialty", icon: "/product-icons/specialty-window.png" },
]

const windowsLinks: Item[] = [
  { label: "Replacement Windows", href: "#products" },
  { label: "Coastal Windows & Doors", href: "#products" },
]

const doors: Item[] = [
  { label: "Big Doors", href: "/products/big-doors", icon: "/product-icons/big-doors.png" },
  { label: "Entry Doors", href: "/products/entry-doors", icon: "/product-icons/entry-door.png" },
  {
    label: "French & Hinged Patio Doors",
    href: "/products/french-hinged-patio-doors",
    icon: "/product-icons/french-hinged-patio.png",
  },
  { label: "Sliding Doors", href: "/products/sliding-doors", icon: "/product-icons/sliding-door.png" },
  { label: "Storm & Screen Doors", href: "/products/storm-screen-doors", icon: "/product-icons/storm-screen-door.png" },
]

const doorsLinks: Item[] = [
  { label: "Replacement Doors", href: "#products", icon: "/product-icons/replacement-door.png" },
]

const cards = [
  { label: "Browse by Series", href: "#products", src: "/images/mega-series.png" },
  { label: "Browse by Materials", href: "#products", src: "/images/mega-materials.png" },
  { label: "All Windows & Doors", href: "/products", src: "/images/hero-home.png" },
  { label: "Specialty Glass Products", href: "#products", src: "/images/product-smartglass.png" },
]

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-display text-lg font-bold tracking-tight text-forest">{children}</h3>
  )
}

function ProductIcon({ src }: { src: string }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center sm:h-7 sm:w-7 lg:h-8 lg:w-8">
      <Image
        src={src}
        alt=""
        width={36}
        height={36}
        className="h-auto max-h-full w-auto max-w-full object-contain transition-transform duration-200 ease-out group-hover:scale-[1.03]"
      />
    </span>
  )
}

function ProductLink({ item, onNavigate }: { item: Item; onNavigate: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex min-h-[44px] items-center gap-3 rounded-lg py-1 text-[15px] text-ink/80 transition-colors duration-200 hover:text-cta"
    >
      {item.icon ? <ProductIcon src={item.icon} /> : null}
      <span className="min-w-0 text-pretty font-medium leading-snug">{item.label}</span>
    </Link>
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
            <Link
              href="/products?category=windows"
              onClick={onNavigate}
              className="mt-1 inline-flex items-center gap-1 text-[15px] font-bold text-cta transition-colors hover:text-cta-dark"
            >
              See All <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
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
                className="group flex min-h-[44px] items-center gap-3 rounded-lg py-1 text-[15px] font-semibold text-ink/70 transition-colors duration-200 hover:text-cta"
              >
                {item.icon ? <ProductIcon src={item.icon} /> : null}
                <span className="min-w-0 text-pretty leading-snug">{item.label}</span>
              </a>
            ))}
            <Link
              href="/products?category=doors"
              onClick={onNavigate}
              className="mt-1 inline-flex items-center gap-1 text-[15px] font-bold text-cta transition-colors hover:text-cta-dark"
            >
              See All <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Right: 2x2 visual cards */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
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
          </Link>
        ))}
      </div>
    </div>
  )
}

import Link from "next/link"
import { ArrowRight, PanelTop, Blinds, DoorOpen, SunMedium } from "lucide-react"

const products = [
  {
    title: "Windows",
    subtitle: "Stylish. Efficient. Built to Last.",
    image: "/images/product-windows.png",
    icon: PanelTop,
    href: "/products?category=windows",
  },
  {
    title: "Sliding Doors",
    subtitle: "Smooth Operation. Wide Open Views.",
    image: "/images/product-sliding.png",
    icon: Blinds,
    href: "/products/sliding-doors",
  },
  {
    title: "Entry Doors",
    subtitle: "Make an Entrance. Built with Strength.",
    image: "/images/product-entry.png",
    icon: DoorOpen,
    href: "/products/entry-doors",
  },
  {
    title: "Smart Glass & Blinds",
    subtitle: "Privacy. Comfort. At the Touch.",
    image: "/images/product-smartglass.png",
    icon: SunMedium,
    href: "/products",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        {/* Editorial intro */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Our Products</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl lg:text-5xl">
              Windows and Doors Built Around You
            </h2>
            <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
              We offer a wide range of customizable windows and doors designed for Florida living. Built with quality
              materials and expert craftsmanship.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cta transition-colors hover:text-cta-dark sm:mt-6"
            >
              Explore All Products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="hidden overflow-hidden rounded-3xl lg:block">
            <img
              src="/images/product-windows.png"
              alt="Bright living room with large energy-efficient windows"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-14 lg:grid-cols-4">
          {products.map(({ title, subtitle, image, icon: Icon, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-forest/5 transition-shadow hover:shadow-lg hover:shadow-forest/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
            >
              <div className="relative">
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  className="h-28 w-full object-cover sm:h-40 lg:h-44"
                />
                <span className="absolute -bottom-4 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-card text-cta shadow-md ring-1 ring-border sm:h-11 sm:w-11">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3.5 pt-6 sm:p-5 sm:pt-8">
                <h3 className="text-[15px] font-bold leading-tight text-forest sm:text-lg">{title}</h3>
                <p className="mt-1 text-[12px] leading-snug text-muted-foreground sm:text-sm">{subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-cta sm:mt-4 sm:text-sm">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

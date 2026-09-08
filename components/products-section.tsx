import { ArrowRight, PanelTop, Blinds, DoorOpen, SunMedium } from "lucide-react"

const products = [
  {
    title: "Windows",
    subtitle: "Stylish. Efficient. Built to Last.",
    image: "/images/product-windows.png",
    icon: PanelTop,
  },
  {
    title: "Sliding Doors",
    subtitle: "Smooth Operation. Wide Open Views.",
    image: "/images/product-sliding.png",
    icon: Blinds,
  },
  {
    title: "Entry Doors",
    subtitle: "Make an Entrance. Built with Strength.",
    image: "/images/product-entry.png",
    icon: DoorOpen,
  },
  {
    title: "Smart Glass & Blinds",
    subtitle: "Privacy. Comfort. At the Touch.",
    image: "/images/product-smartglass.png",
    icon: SunMedium,
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="bg-background">
      <div className="mx-auto max-w-[440px] px-5 py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta">Our Products</p>
        <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance">
          Windows and Doors Built Around You
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          We offer a wide range of customizable windows and doors designed for Florida living. Built with quality
          materials and expert craftsmanship.
        </p>
        <a href="#products" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cta">
          Explore All Products
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <div className="mt-7 grid grid-cols-2 gap-4">
          {products.map(({ title, subtitle, image, icon: Icon }) => (
            <article
              key={title}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-forest/5"
            >
              <div className="relative">
                <img src={image || "/placeholder.svg"} alt={title} className="h-28 w-full object-cover" />
                <span className="absolute -bottom-4 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-card text-cta shadow-md ring-1 ring-border">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-3.5 pt-6">
                <h3 className="text-[15px] font-bold leading-tight text-forest">{title}</h3>
                <p className="mt-1 text-[12px] leading-snug text-muted-foreground">{subtitle}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-cta">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Reveal } from "./reveal"

const products = [
  {
    title: "Windows",
    subtitle: "Stylish. Efficient. Built to last.",
    image: "/images/product-windows.png",
    alt: "Bright living room with large energy-efficient windows",
    href: "/products?category=windows",
  },
  {
    title: "Sliding Doors",
    subtitle: "Smooth operation. Wide open views.",
    image: "/images/product-sliding.png",
    alt: "Wide sliding glass doors opening onto a pool deck",
    href: "/products/sliding-doors",
  },
  {
    title: "Entry Doors",
    subtitle: "Make an entrance. Built with strength.",
    image: "/images/product-entry.png",
    alt: "Modern glass entry door on a Florida home",
    href: "/products/entry-doors",
  },
  {
    title: "Smart Glass & Blinds",
    subtitle: "Privacy and comfort at the touch.",
    image: "/images/product-smartglass.png",
    alt: "Window with built-in blinds between the glass",
    href: "/products",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="scroll-mt-[var(--header-h)] bg-background">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
              <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
              Our products
            </p>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest text-balance sm:text-5xl lg:text-[64px]">
              Windows &amp; doors,{" "}
              <span className="font-serif font-normal italic text-cta-dark">built around you.</span>
            </h2>
          </div>
          <div className="max-w-[420px] lg:pb-2">
            <p className="text-[16px] leading-relaxed text-muted-foreground">
              A wide range of customizable windows and doors designed for Florida living, built with quality materials
              and expert craftsmanship.
            </p>
            <Link
              href="/products"
              className="group mt-5 inline-flex h-12 items-center gap-2 rounded-full border border-forest/25 px-6 text-[15px] font-semibold text-forest transition-colors hover:border-forest hover:bg-forest hover:text-white"
            >
              Explore all products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        {/* Swipeable row on phones, grid from tablets up */}
        <div className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:mt-16 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {products.map(({ title, subtitle, image, alt, href }, i) => (
            <Reveal key={title} delay={i * 100} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <Link
                href={href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[24px] bg-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2"
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_26_21/0.35)_0%,rgb(8_26_21/0)_30%,rgb(8_26_21/0)_45%,rgb(8_26_21/0.85)_100%)] transition-opacity duration-500"
                  aria-hidden="true"
                />
                <span className="absolute left-5 top-5 font-display text-sm font-bold tabular-nums text-white/80">
                  0{i + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                  <div className="min-w-0">
                    <h3 className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em]">{title}</h3>
                    <p className="mt-1 text-[14px] leading-snug text-white/75">{subtitle}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-forest">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

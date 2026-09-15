"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export type Brand = {
  name: string
  description: string
  image: string
  alt: string
  href: string
  logo: ReactNode
}

export function BrandCatalogRow({ brand, index }: { brand: Brand; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={ref}
      className={`grid grid-cols-1 items-center gap-8 border-t border-border py-14 transition-all duration-[600ms] ease-out sm:gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)_minmax(0,1.6fr)] md:gap-12 md:py-20 lg:py-24 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      }`}
      style={{ transitionDelay: visible ? `${index * 60}ms` : "0ms" }}
    >
      {/* Logo */}
      <div className="flex justify-center md:justify-start">{brand.logo}</div>

      {/* Text content */}
      <div className="flex flex-col items-start text-left">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-forest sm:text-3xl">{brand.name}</h2>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">{brand.description}</p>
        <Link
          href={brand.href}
          className="group mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-cta px-6 text-sm font-semibold text-white shadow-sm shadow-cta/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-cta-dark hover:shadow-md hover:shadow-cta/30"
        >
          View more
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>

      {/* Product image */}
      <div className="w-full overflow-hidden rounded-2xl border border-border shadow-sm shadow-forest/5">
        <Image
          src={brand.image || "/placeholder.svg"}
          alt={brand.alt}
          width={640}
          height={440}
          sizes="(min-width: 768px) 32vw, 100vw"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
    </article>
  )
}

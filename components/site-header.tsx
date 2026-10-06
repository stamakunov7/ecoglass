"use client"

import { useEffect, useRef, useState } from "react"
import { Menu, Phone, MapPin, CalendarCheck, CreditCard, ChevronDown } from "lucide-react"
import { BrandLogo } from "./brand-logo"
import { ProductsMegaMenu } from "./products-mega-menu"
import { WhyMegaMenu } from "./why-mega-menu"
import { useEstimate } from "./estimate-modal"
import { EstimateCta } from "./estimate-cta"

type NavItem = {
  label: string
  href: string
  items?: { label: string; href: string }[]
}

type MenuKey = "products" | "why"

const simpleNav: NavItem[] = [
  { label: "Our Process", href: "/our-process" },
  { label: "Financing", href: "/financing" },
  { label: "Commercial", href: "/commercial" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
]

export function SiteHeader({ onOpenMenu, overlay = false }: { onOpenMenu: () => void; overlay?: boolean }) {
  const [menu, setMenu] = useState<MenuKey | null>(null)
  const [scrolled, setScrolled] = useState(false)
  // Keep the last-opened menu mounted so the panel shows the right content while it fades out.
  const [rendered, setRendered] = useState<MenuKey>("products")
  const { open: openEstimate } = useEstimate()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (menu) setRendered(menu)
  }, [menu])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenu(null)
    }
    if (menu) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [menu])

  useEffect(() => {
    // Pinned dark scenes marked data-header-clear keep the header see-through while they sit behind it.
    const onScroll = () => {
      const height = headerRef.current?.offsetHeight ?? 0
      const overScene = Array.from(document.querySelectorAll<HTMLElement>("[data-header-clear]")).some((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top <= 1 && rect.bottom >= height
      })
      setScrolled(window.scrollY > 24 && !overScene)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Over a full-bleed hero the header starts see-through and turns solid once the page scrolls
  // or a mega menu opens.
  const clear = overlay && !scrolled && !menu
  const navText = clear ? "text-white/90 hover:text-white" : "text-ink/80 hover:text-cta"
  const barSurface = clear
    ? "border-transparent bg-transparent"
    : `border-border bg-card ${scrolled && !menu ? "shadow-[0_10px_30px_-18px_rgb(13_44_37/0.35)]" : ""}`

  // Publish the header's real height so full-screen heroes can size themselves
  // to exactly fill the remaining viewport on any device.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const setVar = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`)
    setVar()
    const ro = new ResizeObserver(setVar)
    ro.observe(el)
    window.addEventListener("resize", setVar)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", setVar)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={`${overlay ? "fixed inset-x-0" : "sticky"} top-0 z-30 print:hidden`}
    >
      {/* Page-dimming overlay for the mega menu (desktop only) */}
      <div
        onClick={() => setMenu(null)}
        className={`fixed inset-0 top-0 -z-10 hidden bg-forest-deep/50 backdrop-blur-[1px] transition-opacity duration-300 xl:block ${
          menu ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Dark fade from the top edge: the header reads over any video frame without a hard bar */}
      {overlay && (
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 -z-[5] h-[135%] bg-[linear-gradient(180deg,rgb(5_20_16/0.88)_0%,rgb(5_20_16/0.62)_38%,rgb(5_20_16/0.2)_76%,rgb(5_20_16/0)_100%)] transition-opacity duration-500 ${
            clear ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Utility bar */}
      <div className="relative text-white/90">
        <div
          className={`absolute inset-0 bg-gradient-to-r from-forest-deep to-forest transition-opacity duration-300 ${
            clear ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex w-full max-w-[1400px] items-center justify-center gap-4 px-4 py-2 text-xs sm:px-6 md:justify-between lg:px-8">
          <div className="hidden items-center gap-6 md:flex">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cta" aria-hidden="true" />
              Serving all of Florida
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarCheck className="h-3.5 w-3.5 text-cta" aria-hidden="true" />
              Free in-home estimates
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+13212070507" className="flex items-center gap-1.5 font-medium">
              <Phone className="h-3.5 w-3.5 text-cta" aria-hidden="true" />
              (321) 207-0507
            </a>
            <span className="h-3 w-px bg-white/25" aria-hidden="true" />
            <span className="flex items-center gap-1.5 text-white/80">
              <CreditCard className="hidden h-3.5 w-3.5 text-cta sm:block" aria-hidden="true" />
              Financing available
            </span>
          </div>
        </div>
      </div>

      {/* Main header + mega menu share one hover region */}
      <div className="relative" onMouseLeave={() => setMenu(null)}>
        <div
          className={`absolute inset-0 border-b transition-[background-color,border-color,box-shadow] duration-300 ${barSurface}`}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
            <BrandLogo onDark={overlay ? clear : undefined} />

            <nav className="hidden items-center gap-6 whitespace-nowrap xl:flex 2xl:gap-7">
              {/* Products (mega menu) */}
              <button
                type="button"
                onMouseEnter={() => setMenu("products")}
                onFocus={() => setMenu("products")}
                onClick={() => setMenu("products")}
                aria-expanded={menu === "products"}
                aria-haspopup="true"
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                  menu === "products" ? "text-cta" : navText
                }`}
              >
                Products
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${menu === "products" ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              {/* Why EcoGlass: hover previews the mega menu, a click opens the page */}
              <a
                href="/why-ecoglass"
                onMouseEnter={() => setMenu("why")}
                onFocus={() => setMenu("why")}
                aria-expanded={menu === "why"}
                aria-haspopup="true"
                className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                  menu === "why" ? "text-cta" : navText
                }`}
              >
                Why EcoGlass
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${menu === "why" ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </a>

              {simpleNav.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onMouseEnter={() => setMenu(null)}
                  className={`text-sm font-semibold transition-colors ${navText}`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <EstimateCta onClick={openEstimate} className="hidden xl:flex" />
              <button
                type="button"
                onClick={onOpenMenu}
                aria-label="Open navigation menu"
                className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors xl:hidden ${
                  clear
                    ? "border-white/30 bg-white/10 text-white backdrop-blur-md active:bg-white/20"
                    : "border-border bg-card text-forest active:bg-muted"
                }`}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu panel (shared by Products and Why EcoGlass) */}
        <div
          className={`absolute left-0 right-0 top-full z-40 hidden origin-top border-b border-border bg-card shadow-2xl shadow-forest-deep/20 transition-all duration-200 ease-out xl:block ${
            menu
              ? "visible translate-y-0 opacity-100"
              : "pointer-events-none invisible -translate-y-2 opacity-0"
          }`}
        >
          {rendered === "why" ? (
            <WhyMegaMenu onNavigate={() => setMenu(null)} />
          ) : (
            <ProductsMegaMenu onNavigate={() => setMenu(null)} />
          )}
        </div>
      </div>
    </header>
  )
}

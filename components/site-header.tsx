"use client"

import { Menu, Phone, MapPin, CalendarCheck, CreditCard } from "lucide-react"
import { BrandLogo } from "./brand-logo"

const nav = [
  { label: "Products", href: "#products" },
  { label: "Why EcoGlass", href: "#why" },
  { label: "Our Process", href: "#process" },
  { label: "Financing", href: "#financing" },
  { label: "Gallery", href: "#products" },
  { label: "Contact", href: "#estimate" },
]

export function SiteHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30">
      {/* Utility bar */}
      <div className="bg-gradient-to-r from-forest-deep to-forest text-white/90">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-center gap-4 px-4 py-2 text-xs sm:px-6 lg:justify-between lg:px-8">
          <div className="hidden items-center gap-6 lg:flex">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cta" aria-hidden="true" />
              Serving Central Florida
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

      {/* Main header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <BrandLogo />

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm font-semibold text-ink/80 transition-colors hover:text-cta"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#estimate"
              className="hidden h-11 items-center justify-center rounded-xl bg-cta px-5 text-sm font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark lg:flex"
            >
              Get a Free Estimate
            </a>
            <button
              type="button"
              onClick={onOpenMenu}
              aria-label="Open navigation menu"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-forest transition-colors active:bg-muted lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

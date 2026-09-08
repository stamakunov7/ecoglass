"use client"

import { Menu, Phone } from "lucide-react"
import { BrandLogo } from "./brand-logo"

export function SiteHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30">
      {/* Utility bar */}
      <div className="bg-gradient-to-r from-forest-deep to-forest text-white/90">
        <div className="mx-auto flex max-w-[440px] items-center justify-center gap-4 px-4 py-2 text-xs">
          <a href="tel:+13212070507" className="flex items-center gap-1.5 font-medium">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            (321) 207-0507
          </a>
          <span className="h-3 w-px bg-white/25" aria-hidden="true" />
          <span className="text-white/80">Financing available</span>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[440px] items-center justify-between px-4 py-4">
          <BrandLogo />
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-forest transition-colors active:bg-muted"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}

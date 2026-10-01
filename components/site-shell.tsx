"use client"

import { useState, type ReactNode } from "react"
import { SiteHeader } from "./site-header"
import { MobileMenu } from "./mobile-menu"
import { EstimateProvider } from "./estimate-modal"

/** `overlayHeader`: the page opens with a full-bleed dark hero, so the header floats over it see-through. */
export function SiteShell({ children, overlayHeader = false }: { children: ReactNode; overlayHeader?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <EstimateProvider>
      <div className="relative min-h-screen w-full overflow-x-clip bg-background">
        <SiteHeader overlay={overlayHeader} onOpenMenu={() => setMenuOpen(true)} />
        {children}
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </EstimateProvider>
  )
}

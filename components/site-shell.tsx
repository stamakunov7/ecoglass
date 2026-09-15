"use client"

import { useState, type ReactNode } from "react"
import { SiteHeader } from "./site-header"
import { MobileMenu } from "./mobile-menu"
import { EstimateProvider } from "./estimate-modal"

export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <EstimateProvider>
      <div className="relative min-h-screen w-full overflow-x-clip bg-background">
        <SiteHeader onOpenMenu={() => setMenuOpen(true)} />
        {children}
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </EstimateProvider>
  )
}

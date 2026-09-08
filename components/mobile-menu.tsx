"use client"

import { useEffect } from "react"
import { X, ChevronRight, ArrowRight, Phone, CreditCard, PackageOpen, Sparkles, Route, Wallet, Images, Mail } from "lucide-react"
import { BrandLogo } from "./brand-logo"

const links = [
  { label: "Products", icon: PackageOpen, href: "#products" },
  { label: "Why EcoGlass", icon: Sparkles, href: "#why" },
  { label: "Our Process", icon: Route, href: "#process" },
  { label: "Financing", icon: Wallet, href: "#financing" },
  { label: "Gallery", icon: Images, href: "#products" },
  { label: "Contact", icon: Mail, href: "#estimate" },
]

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        className={`absolute inset-0 bg-forest-deep/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`absolute right-0 top-0 flex h-full w-[80%] max-w-[320px] flex-col bg-card shadow-2xl shadow-forest-deep/40 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <BrandLogo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-forest transition-colors active:bg-muted"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-col px-3 py-2">
          {links.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              onClick={onClose}
              className="flex items-center gap-3 border-b border-border/70 px-2 py-3.5 text-[15px] font-semibold text-forest transition-colors active:bg-muted"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage text-forest">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1">{label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-2.5 px-4 pb-5 pt-3">
          <a
            href="#estimate"
            onClick={onClose}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta text-[15px] font-semibold text-white shadow-md shadow-cta/30 transition-colors active:bg-cta-dark"
          >
            Get a Free Estimate
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="tel:+13212070507"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-cta/40 bg-card text-[15px] font-semibold text-cta transition-colors active:bg-sage/60"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call (321) 207-0507
          </a>
          <div className="flex items-center justify-center gap-2 rounded-xl bg-sage px-4 py-3 text-[13px] font-semibold text-forest">
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            Financing available
          </div>

          <div className="mt-2 rounded-xl bg-forest px-4 py-4">
            <p className="text-[13px] font-bold text-white">Built for Florida. Backed by Experience.</p>
            <p className="mt-1 text-[12px] leading-relaxed text-white/70">
              Proudly serving homeowners across Central Florida with premium windows and doors.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

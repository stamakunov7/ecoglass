import { Phone, MapPin, Mail, Clock } from "lucide-react"
import { BrandLogo } from "./brand-logo"

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Why EcoGlass", href: "/why-ecoglass" },
  { label: "Our Process", href: "/our-process" },
  { label: "Financing", href: "/financing" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
]

const productLinks = ["Windows", "Sliding Doors", "Entry Doors", "Smart Glass & Built-In Blinds"]

const contactItems = [
  {
    icon: MapPin,
    label: "144 Hope Street, Longwood, FL 32750",
    href: "https://www.google.com/maps/search/?api=1&query=144+Hope+Street,+Longwood,+FL+32750",
  },
  { icon: Phone, label: "(321) 207-0507", href: "tel:+13212070507" },
  { icon: Mail, label: "info@vk-ecoglass.com", href: "mailto:info@vk-ecoglass.com" },
  { icon: Clock, label: "Mon – Fri, 8:30 AM – 5:30 PM" },
]

const heading = "text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9fd3a2]"
const link =
  "text-white/60 underline decoration-transparent underline-offset-4 transition-colors hover:text-white hover:decoration-[#9fd3a2]/60"

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-forest-deep text-white print:hidden">
      {/* Depth: a soft glow, a fine grid that fades out, and a hairline along the top edge */}
      <div
        className="absolute -left-40 -top-48 -z-10 h-[460px] w-[680px] rounded-full bg-cta/20 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.05] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#9fd3a2]/40 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1400px] px-5 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo onDark />
            <p className="mt-5 max-w-[38ch] text-[13px] leading-relaxed text-white/60">
              Custom windows and doors manufactured in Central Florida and installed across the state.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className={heading}>Quick Links</h3>
            <ul className="mt-5 space-y-3 text-[14px]">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={link}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Products">
            <h3 className={heading}>Products</h3>
            <ul className="mt-5 space-y-3 text-[14px]">
              {productLinks.map((label) => (
                <li key={label}>
                  <a href="/#products" className={link}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className={heading}>Contact</h3>
            <ul className="mt-5 space-y-3.5 text-[14px]">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#9fd3a2]" aria-hidden="true" />
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={link}
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-white/60">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-[12px] text-white/40 sm:flex-row lg:mt-16">
          <p>© {new Date().getFullYear()} EcoGlass. All rights reserved.</p>
          <p>Made in Longwood, Florida</p>
        </div>
      </div>

      {/* Oversized outline wordmark, cropped by the bottom edge */}
      <p
        className="pointer-events-none mt-6 select-none text-center font-display text-[22vw] font-extrabold leading-[0.78] tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgb(159_211_162/0.22)] lg:text-[240px] xl:text-[280px]"
        aria-hidden="true"
      >
        EcoGlass
      </p>
    </footer>
  )
}

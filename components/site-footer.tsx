import { Phone, MapPin, Mail, Clock } from "lucide-react"
import { BrandLogo } from "./brand-logo"

const quickLinks = [
  { label: "Products", href: "/products" },
  { label: "Why EcoGlass", href: "/why-ecoglass" },
  { label: "Our Process", href: "/our-process" },
  { label: "Financing", href: "/financing" },
  { label: "Gallery", href: "/#products" },
  { label: "Contact", href: "/contact" },
]

const productLinks = ["Windows", "Sliding Doors", "Entry Doors", "Smart Glass & Built-In Blinds"]

export function SiteFooter() {
  return (
    <footer className="bg-charcoal print:hidden">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <BrandLogo variant="dark" />
            <p className="mt-3 max-w-[38ch] text-[13px] leading-relaxed text-white/55">
              Custom windows and doors manufactured, supplied, and installed in Central Florida.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-white/55 transition-colors hover:text-cta">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Products */}
          <nav aria-label="Products">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Products</h3>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {productLinks.map((label) => (
                <li key={label}>
                  <a href="/#products" className="text-white/55 transition-colors hover:text-cta">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h3>
            <dl className="mt-4 space-y-3 text-[13px]">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
                <dd className="text-white/55">144 Hope Street, Longwood, FL 32750</dd>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
                <dd className="text-white/55">(321) 207-0507</dd>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
                <dd className="text-white/55">info@vk-ecoglass.com</dd>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
                <dd className="text-white/55">Mon – Fri, 8:30 AM – 5:30 PM</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-center text-[11px] text-white/40 sm:text-xs lg:mt-12">
          © 2024 EcoGlass. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

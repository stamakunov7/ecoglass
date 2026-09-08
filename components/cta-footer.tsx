import { ArrowRight, Phone, MapPin, Mail, Clock } from "lucide-react"
import { BrandLogo } from "./brand-logo"

const quickLinks = [
  { label: "Products", href: "#products" },
  { label: "Why EcoGlass", href: "#why" },
  { label: "Our Process", href: "#process" },
  { label: "Financing", href: "#financing" },
  { label: "Gallery", href: "#products" },
  { label: "Contact", href: "#estimate" },
]

const productLinks = ["Windows", "Sliding Doors", "Entry Doors", "Smart Glass & Built-In Blinds"]

export function CtaFooter() {
  return (
    <>
      {/* Final CTA */}
      <section id="estimate" className="bg-gradient-to-b from-forest-deep to-forest">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-14 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <h2 className="mx-auto max-w-[20ch] font-display text-[1.75rem] font-extrabold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Ready to Upgrade Your Home?
          </h2>
          <p className="mx-auto mt-3 max-w-[42ch] text-[14px] leading-relaxed text-white/75 sm:mt-4 sm:text-base lg:text-lg">
            Schedule your free, no-obligation in-home estimate today with your local window and door experts.
          </p>
          <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="#estimate"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-7 text-[15px] font-semibold text-white shadow-lg shadow-forest-deep/40 transition-colors hover:bg-cta-dark active:bg-cta-dark"
            >
              Get a Free Estimate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="tel:+13212070507"
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/5 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/15 active:bg-white/15"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call (321) 207-0507
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <BrandLogo className="[&_span:last-child]:text-white" />
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
                    <a href="#products" className="text-white/55 transition-colors hover:text-cta">
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

          {/* Estimate CTA card */}
          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-forest px-6 py-6 sm:flex-row sm:items-center lg:mt-12">
            <div>
              <p className="text-base font-bold text-white">Serving Central Florida</p>
              <p className="mt-1 text-[13px] text-white/70">Let&apos;s talk about your window and door project.</p>
            </div>
            <a
              href="#estimate"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-cta px-6 text-sm font-semibold text-white transition-colors hover:bg-cta-dark sm:w-auto"
            >
              Get a Free Estimate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-8 border-t border-white/10 pt-6 text-center text-[11px] text-white/40 sm:text-xs">
            © 2024 EcoGlass. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

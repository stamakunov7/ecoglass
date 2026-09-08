import { ArrowRight, Phone, MapPin, Mail, Clock } from "lucide-react"
import { BrandLogo } from "./brand-logo"

export function CtaFooter() {
  return (
    <>
      <section id="estimate" className="bg-gradient-to-b from-forest to-forest-deep">
        <div className="mx-auto max-w-[440px] px-5 py-12 text-center">
          <h2 className="font-display text-[1.75rem] font-extrabold leading-tight text-white text-balance">
            Ready to Upgrade Your Home?
          </h2>
          <p className="mx-auto mt-3 max-w-[32ch] text-[14px] leading-relaxed text-white/75">
            Get a free, no-obligation in-home estimate from your local window and door experts.
          </p>
          <div className="mt-7 flex flex-col gap-3">
            <a
              href="#estimate"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-cta text-[15px] font-semibold text-white shadow-lg shadow-forest-deep/40 transition-colors active:bg-cta-dark"
            >
              Get a Free Estimate
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="tel:+13212070507"
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/40 bg-white/5 text-[15px] font-semibold text-white transition-colors active:bg-white/15"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call (321) 207-0507
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal">
        <div className="mx-auto max-w-[440px] px-5 py-10">
          <BrandLogo className="[&_span:last-child]:text-white" />
          <p className="mt-3 text-[13px] leading-relaxed text-white/55">
            Custom windows and doors manufactured, supplied, and installed in Central Florida.
          </p>

          <dl className="mt-7 space-y-4 text-[13px]">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-white/80">Address</dt>
                <dd className="text-white/55">144 Hope Street, Longwood, FL 32750</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-white/80">Phone</dt>
                <dd className="text-white/55">(321) 207-0507</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-white/80">Email</dt>
                <dd className="text-white/55">info@vk-ecoglass.com</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cta" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-white/80">Hours</dt>
                <dd className="text-white/55">Mon – Fri, 8:30 AM – 5:30 PM</dd>
              </div>
            </div>
          </dl>

          <p className="mt-8 border-t border-white/10 pt-5 text-center text-[11px] text-white/40">
            © 2024 EcoGlass. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

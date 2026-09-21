import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, CreditCard, ArrowRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | EcoGlass Windows & Doors",
  description:
    "Contact EcoGlass in Longwood, FL for a free in-home window and door estimate, product questions, or service. Call (321) 207-0507 or send us a message.",
}

const contactCards = [
  {
    icon: Phone,
    label: "Call us",
    value: "(321) 207-0507",
    href: "tel:+13212070507",
    note: "Mon – Fri, 8:30 AM – 5:30 PM",
  },
  {
    icon: Mail,
    label: "Email us",
    value: "info@vk-ecoglass.com",
    href: "mailto:info@vk-ecoglass.com",
    note: "We reply within one business day",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "144 Hope Street, Longwood, FL 32750",
    href: "https://www.google.com/maps/search/?api=1&query=144+Hope+Street,+Longwood,+FL+32750",
    note: "Showroom and manufacturing facility",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Monday – Friday, 8:30 AM – 5:30 PM",
    note: "Closed Saturday and Sunday",
  },
]

const serviceAreas = [
  "Longwood",
  "Orlando",
  "Winter Park",
  "Altamonte Springs",
  "Lake Mary",
  "Sanford",
  "Oviedo",
  "Apopka",
  "Kissimmee",
  "Clermont",
  "Daytona Beach",
  "The Villages",
]

export default function ContactPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Contact EcoGlass"
          title="Let's talk about your home"
          description="Questions about a product, ready for a free estimate, or need support on an existing project? Reach out any way you like and a real member of our Longwood team will get back to you."
          image="/images/contact-hero.png"
          imageAlt="Exterior of the EcoGlass showroom and facility in Longwood, Florida"
          primaryHref="#message"
          primaryLabel="Send us a message"
        />

        {/* Contact cards */}
        <section className="bg-card">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {contactCards.map(({ icon: Icon, label, value, href, note }) => {
                const inner = (
                  <>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage text-forest">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-cta">{label}</p>
                    <p className="mt-1.5 text-[15px] font-bold leading-snug text-forest">{value}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground">{note}</p>
                  </>
                )
                const className =
                  "flex h-full flex-col rounded-2xl border border-border bg-offwhite p-6 transition-colors"
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`${className} hover:border-cta hover:bg-card`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={label} className={className}>
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Form + map */}
        <section id="message" className="scroll-mt-24 bg-offwhite">
          <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Send a message</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
                Tell us about your project
              </h2>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground sm:text-base">
                Share a few details and we will follow up to answer questions or schedule your free in-home estimate.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
                <iframe
                  title="Map showing EcoGlass at 144 Hope Street, Longwood, FL"
                  src="https://www.google.com/maps?q=144+Hope+Street,+Longwood,+FL+32750&output=embed"
                  className="h-[320px] w-full border-0 lg:h-[380px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta">Service area</p>
                <h3 className="mt-2 font-display text-xl font-extrabold text-forest">Proudly serving Central Florida</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  We manufacture in Longwood and install throughout the greater Orlando area and surrounding counties.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full bg-sage px-3 py-1 text-[12px] font-semibold text-forest"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[12px] text-muted-foreground">
                  Not on the list? Give us a call and we will let you know if we can help.
                </p>
              </div>

              <Link
                href="/financing"
                className="flex items-center justify-between gap-4 rounded-2xl bg-forest px-6 py-5 text-white transition-colors hover:bg-forest-deep"
              >
                <span className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-cta" aria-hidden="true" />
                  <span>
                    <span className="block text-[15px] font-bold">Financing available</span>
                    <span className="block text-[12px] text-white/70">Flexible plans through Synchrony Bank</span>
                  </span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

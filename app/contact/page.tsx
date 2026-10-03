import type { Metadata } from "next"
import Image from "next/image"
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { ContactForm } from "@/components/contact/contact-form"
import { FloridaMap } from "@/components/contact/florida-map"
import { OpenStatus } from "@/components/contact/open-status"

export const metadata: Metadata = {
  title: "Contact Us | EcoGlass Windows & Doors",
  description:
    "Contact EcoGlass for a free in-home window and door estimate anywhere in Florida, product questions, or service. Call (321) 207-0507 or visit our Longwood showroom.",
}

const ADDRESS = "144 Hope Street, Longwood, FL 32750"
const DIRECTIONS = "https://www.google.com/maps/dir/?api=1&destination=144+Hope+Street,+Longwood,+FL+32750"
const MAP_EMBED = "https://www.google.com/maps?q=144+Hope+Street,+Longwood,+FL+32750&z=15&output=embed"

const regions = [
  { name: "North Florida & Panhandle", cities: "Jacksonville, Tallahassee, Gainesville, Pensacola, Panama City" },
  { name: "Central Florida", cities: "Orlando, Longwood, Daytona Beach, Ocala, Melbourne" },
  { name: "Tampa Bay & Gulf Coast", cities: "Tampa, St. Petersburg, Sarasota, Fort Myers, Naples" },
  { name: "South Florida & the Keys", cities: "Miami, Fort Lauderdale, West Palm Beach, Key West" },
]

export default function ContactPage() {
  const reachUs = [
    { icon: Phone, label: "Call us", value: "(321) 207-0507", href: "tel:+13212070507", note: <OpenStatus tone="dark" /> },
    {
      icon: Mail,
      label: "Email us",
      value: "info@vk-ecoglass.com",
      href: "mailto:info@vk-ecoglass.com",
      note: "We reply within one business day",
    },
    { icon: MapPin, label: "Visit the showroom", value: ADDRESS, href: DIRECTIONS, note: "Showroom & factory · Get directions" },
  ]

  return (
    <SiteShell overlayHeader>
      <main>
        {/* Hero: talk to us, or write to us right here */}
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <Image
            src="/images/contact-showroom.webp"
            alt="The EcoGlass showroom and factory in Longwood, Florida"
            fill
            preload
            sizes="100vw"
            className="ken-burns -z-20 object-cover object-[50%_65%]"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.92)_0%,rgb(8_26_21/0.72)_40%,rgb(8_26_21/0.35)_68%,rgb(8_26_21/0.25)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.72)_0%,rgb(8_26_21/0.93)_55%)]"
            aria-hidden="true"
          />

          <div className="mx-auto grid min-h-svh w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-6 sm:pb-20 sm:pt-[calc(var(--header-h)+4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-16 lg:px-8 lg:pb-24 xl:gap-24">
            <div>
              <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
                <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
                Contact EcoGlass
              </p>
              <h1
                className="hero-reveal mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.035em] text-balance sm:text-6xl lg:text-[76px]"
                style={{ animationDelay: "150ms" }}
              >
                Let&apos;s talk about{" "}
                <span className="font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]">your home.</span>
              </h1>
              <p
                className="hero-reveal mt-6 max-w-[520px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
                style={{ animationDelay: "300ms" }}
              >
                Questions about a product, ready for a free estimate, or need help with an existing project? A real
                person from our team answers — and we serve homeowners across all of Florida.
              </p>

              <ul
                className="hero-reveal mt-10 max-w-[500px] divide-y divide-white/15 border-y border-white/15"
                style={{ animationDelay: "450ms" }}
              >
                {reachUs.map(({ icon: Icon, label, value, href, note }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[#9fd3a2] backdrop-blur-md transition-colors group-hover:border-[#9fd3a2]/60">
                        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                          {label}
                        </span>
                        <span className="mt-0.5 block text-[16px] font-semibold text-white sm:text-[17px]">
                          {value}
                        </span>
                        <span className="mt-0.5 block text-[13px]">
                          {typeof note === "string" ? <span className="text-white/70">{note}</span> : note}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              id="message"
              className="hero-reveal scroll-mt-[calc(var(--header-h)+1.5rem)] rounded-[28px] bg-card p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9"
              style={{ animationDelay: "300ms" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cta-dark">Free consultation</p>
              <h2 className="mt-2 font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-forest sm:text-[32px]">
                Book an appointment
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                Leave your details and we&apos;ll call you to set a time that works for you.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Service area */}
        <section className="overflow-hidden bg-[#f5f4ef]">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20 lg:px-8 lg:py-32">
            <Reveal>
              <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
                <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                Service area
              </p>
              <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
                Serving all of <span className="font-serif font-normal italic text-cta-dark">Florida.</span>
              </h2>
              <p className="mt-6 max-w-[540px] text-[17px] leading-relaxed text-muted-foreground">
                Every window and door is built in our Longwood factory, then measured, delivered, and installed by the
                EcoGlass team anywhere in the state — from the Panhandle to the Keys.
              </p>

              <dl className="mt-10 grid gap-x-10 gap-y-7 border-t border-forest/15 pt-8 sm:grid-cols-2">
                {regions.map((r) => (
                  <div key={r.name}>
                    <dt className="font-display text-[17px] font-bold text-forest">{r.name}</dt>
                    <dd className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{r.cities}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-9 text-[14px] text-muted-foreground">
                Don&apos;t see your town? We cover the whole state —{" "}
                <a href="tel:+13212070507" className="font-semibold text-forest underline-offset-4 hover:underline">
                  call (321) 207-0507
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={150} className="mx-auto w-full max-w-[560px]">
              <FloridaMap />
            </Reveal>
          </div>
        </section>

        {/* Map: one tap opens directions in Google Maps */}
        <section className="bg-card">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <Reveal>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to EcoGlass, ${ADDRESS}, in Google Maps`}
                className="group relative block h-[440px] overflow-hidden rounded-[28px] border border-border bg-muted shadow-sm sm:h-[460px] lg:h-[520px]"
              >
                <iframe
                  title={`Map showing EcoGlass at ${ADDRESS}`}
                  src={MAP_EMBED}
                  className="pointer-events-none h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  tabIndex={-1}
                  aria-hidden="true"
                />
                {/* Our own pin over the map's center (the embed centers on the address) */}
                <span className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
                  <span className="map-ping absolute -left-3 -top-1.5 h-3 w-6 rounded-[50%] bg-forest/35" />
                  <svg
                    viewBox="0 0 40 52"
                    className="absolute -left-5 -top-[52px] h-[52px] w-10 drop-shadow-[0_8px_10px_rgb(13_44_37/0.35)] transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <path
                      d="M20 0C9 0 0 8.6 0 19.3 0 33.8 20 52 20 52s20-18.2 20-32.7C40 8.6 31 0 20 0z"
                      className="fill-forest"
                    />
                    <circle cx="20" cy="19" r="8" className="fill-white" />
                    <circle cx="20" cy="19" r="4" className="fill-cta" />
                  </svg>
                </span>
                <span className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3 rounded-2xl bg-card/95 px-4 py-3 shadow-[0_20px_40px_-20px_rgb(13_44_37/0.45)] backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[440px] sm:p-5">
                  <span className="min-w-0">
                    <span className="block text-[15px] font-bold text-forest">EcoGlass showroom</span>
                    <span className="mt-0.5 block text-[13px] text-muted-foreground">{ADDRESS}</span>
                  </span>
                  <span className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-forest px-4 text-[13px] font-bold text-white transition-colors group-hover:bg-forest-deep sm:px-5">
                    Directions
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

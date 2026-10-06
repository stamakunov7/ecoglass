import type { Metadata } from "next"
import { Building2, Users, KeyRound, HardHat, Mail, Phone } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { FaqSection } from "@/components/faq-section"
import { Reveal } from "@/components/reveal"
import { BuildSequence } from "@/components/commercial/build-sequence"
import { BidForm } from "@/components/commercial/bid-form"

export const metadata: Metadata = {
  title: "Commercial Windows & Doors | EcoGlass",
  description:
    "Factory-direct windows and doors for builders, developers, general contractors and condo associations across Florida. Phased deliveries, in-house installation, licensed GC.",
}

const clients = [
  {
    icon: Building2,
    title: "Builders & developers",
    body: "The same product and pricing across every home in the community, delivered in step with your build schedule.",
  },
  {
    icon: Users,
    title: "Condo associations",
    body: "Building-wide window and door replacement, planned with your board, management and residents.",
  },
  {
    icon: KeyRound,
    title: "Property managers",
    body: "Replacement programs for rentals and multifamily buildings, unit by unit or all at once.",
  },
  {
    icon: HardHat,
    title: "Contractors & architects",
    body: "A local manufacturer for your spec: made-to-measure units, documentation for your permit package and a reliable installer.",
  },
]

const reasons = [
  {
    title: "Your schedule, not a national backlog",
    body: "We build in our own Longwood factory, so production is planned around your project instead of a distributor's queue.",
  },
  {
    title: "Phased production & delivery",
    body: "Units are built and delivered by building, floor or phase, so nothing sits on site waiting.",
  },
  {
    title: "A licensed general contractor",
    body: "EcoGlass holds a general contractor license, so we can take the window and door scope from permit to final inspection.",
  },
  {
    title: "Made to measure, at volume",
    body: "Every opening built to its exact size, with the same frame, glass and finish across the whole project.",
  },
  {
    title: "One project manager",
    body: "One point of contact from takeoff to closeout, with no hand-offs between supplier and installer.",
  },
  {
    title: "Supply only, or supply & install",
    body: "Use our crews, yours, or a mix. We scope the work to fit your job.",
  },
]

const faqs = [
  {
    q: "Do you work directly with builders and general contractors?",
    a: "Yes. We supply and install for developers, builders, general contractors and condo associations, and EcoGlass is a licensed general contractor itself.",
  },
  {
    q: "Can you supply windows and doors without installing them?",
    a: "Yes. We can supply only, or supply and install. We scope the work to what your project needs.",
  },
  {
    q: "How do you handle large or phased projects?",
    a: "Production and delivery are scheduled by building, floor or phase, so units arrive when each part of the project is ready for them.",
  },
  {
    q: "Do you provide product documentation for permits?",
    a: "Yes. We provide the product documentation your permit package and inspector need, and we can handle the window and door permits ourselves.",
  },
  {
    q: "Where do you work?",
    a: "Across Florida. Every unit is built in our Longwood factory and delivered and installed by our team.",
  },
]

const eyebrow = "flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] sm:text-xs"
const h2 = "mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[64px]"

export default function CommercialPage() {
  return (
    <SiteShell overlayHeader>
      <main>
        <BuildSequence />

        {/* Who we work with */}
        <section className="bg-card">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div>
                <p className={`${eyebrow} text-cta-dark`}>
                  <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                  Who we work with
                </p>
                <h2 className={`${h2} text-forest`}>
                  One supplier <span className="font-serif font-normal italic text-cta-dark">for the whole job.</span>
                </h2>
              </div>
              <p className="max-w-[420px] text-[16px] leading-relaxed text-muted-foreground">
                Whether you&apos;re building a community or replacing every window in a tower, we plan, build and install
                around your project.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-12 grid grid-cols-1 border-t border-forest/15 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
                {clients.map(({ icon: Icon, title, body }) => (
                  <div
                    key={title}
                    className="group relative py-8 sm:pr-8 lg:px-7 lg:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-forest/15"
                  >
                    <span
                      className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-cta transition-transform duration-500 group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-[#9fd3a2]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-bold leading-tight text-forest">{title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Why a manufacturer */}
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <div
            className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="absolute -top-40 left-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-cta/20 blur-[120px]"
            aria-hidden="true"
          />
          <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <Reveal className="max-w-[760px]">
              <p className={`${eyebrow} text-[#9fd3a2]`}>
                <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
                Why build with us
              </p>
              <h2 className={h2}>
                Straight from <span className="font-serif font-normal italic text-[#cfe8cf]">the manufacturer.</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
              {reasons.map(({ title, body }, i) => (
                <Reveal key={title} delay={(i % 3) * 90} className="h-full">
                  <div className="h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-7 transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.07] sm:p-8">
                    <span className="font-display text-sm font-bold tabular-nums text-[#9fd3a2]">0{i + 1}</span>
                    <h3 className="mt-6 font-display text-xl font-bold leading-tight">{title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/65">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Bid request */}
        <section id="bid" className="scroll-mt-[var(--header-h)] bg-card">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20 lg:px-8 lg:py-28">
            <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
              <div className="lg:pt-2">
                <p className={`${eyebrow} text-cta-dark`}>
                  <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                  Request a bid
                </p>
                <h2 className={`${h2} text-forest`}>
                  Tell us about <span className="font-serif font-normal italic text-cta-dark">your project.</span>
                </h2>
                <p className="mt-6 max-w-[440px] text-[17px] leading-relaxed text-muted-foreground">
                  Send the basics: where it is, roughly how many windows and doors, and when you need them. Our commercial
                  team will follow up to review plans and prepare your proposal.
                </p>
                <ul className="mt-10 max-w-[440px] divide-y divide-forest/10 border-y border-forest/10">
                  <li>
                    <a href="tel:+13212070507" className="group flex items-center gap-4 py-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-forest">
                        <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="text-[16px] font-semibold text-forest group-hover:text-cta-dark">(321) 207-0507</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@vk-ecoglass.com" className="group flex items-center gap-4 py-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-forest">
                        <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                      </span>
                      <span className="text-[16px] font-semibold text-forest group-hover:text-cta-dark">
                        info@vk-ecoglass.com
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-[28px] border border-forest/10 bg-card p-6 shadow-[0_40px_80px_-40px_rgb(13_44_37/0.35)] sm:p-9">
                <BidForm />
              </div>
            </Reveal>
          </div>
        </section>

        <FaqSection title="Commercial questions" faqs={faqs} />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

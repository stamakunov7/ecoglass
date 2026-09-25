import type { Metadata } from "next"
import { Wallet, FileCheck, CalendarClock, ShieldCheck, CreditCard, MonitorSmartphone, Phone } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/page-hero"
import { FinancingContactForm } from "@/components/financing/financing-contact-form"

export const metadata: Metadata = {
  title: "Financing | EcoGlass Windows & Doors",
  description:
    "Flexible financing for windows and doors through EcoGlass's partnership with Synchrony Bank. Promotional plans, low monthly payments, and a quick, simple application.",
}

const benefits = [
  {
    icon: CalendarClock,
    title: "Promotional financing",
    body: "Take advantage of special promotional plans on qualifying window and door projects.",
  },
  {
    icon: Wallet,
    title: "Low monthly payments",
    body: "Spread the cost of your upgrade into predictable, budget-friendly monthly payments.",
  },
  {
    icon: FileCheck,
    title: "Simple application",
    body: "A quick, straightforward application with a fast decision so your project can start sooner.",
  },
  {
    icon: MonitorSmartphone,
    title: "Manage online",
    body: "View statements, make payments, and manage your account anytime through Synchrony.",
  },
]

const steps = [
  {
    title: "Get your estimate",
    body: "Request a free, no-obligation estimate for your windows and doors from EcoGlass.",
  },
  {
    title: "Apply with Synchrony",
    body: "Complete a quick application through our financing partner and get a fast credit decision.",
  },
  {
    title: "Upgrade your home",
    body: "Move forward with your project now and pay over time on terms that fit your budget.",
  },
]

const faqs = [
  {
    q: "Who provides the financing?",
    a: "Financing is provided by Synchrony Bank, one of the nation's leading providers of consumer financing for home improvement projects. EcoGlass partners with Synchrony to offer plans directly to our customers.",
  },
  {
    q: "What can I finance?",
    a: "You can finance any EcoGlass window and door project, including manufacturing, supply, and professional installation.",
  },
  {
    q: "How do I apply?",
    a: "Start by requesting a free estimate. Our team will walk you through the Synchrony application, which takes just a few minutes and provides a fast decision.",
  },
  {
    q: "Is there an obligation?",
    a: "No. Requesting an estimate or asking about financing is completely free and carries no obligation. Financing is subject to credit approval.",
  },
]

export default function FinancingPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Financing in partnership with Synchrony"
          title="Upgrade Now, Pay Over Time"
          description="Don't let budget hold back your home upgrade. Through our partnership with Synchrony Bank, EcoGlass offers flexible financing so you can get the windows and doors you want, on terms that work for you."
          image="/images/financing-hero.png"
          imageAlt="A couple relaxing in a bright Florida living room with new EcoGlass windows and doors"
          primaryHref="#contact"
          primaryLabel="Talk to us about financing"
        />

        {/* Synchrony partnership band */}
        <section className="bg-card">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-14 lg:px-8">
            <div className="flex flex-col items-start gap-6 rounded-3xl bg-gradient-to-br from-forest to-forest-deep px-7 py-10 text-white shadow-lg shadow-forest/20 sm:px-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Proud financing partner</p>
              <span className="inline-flex items-center rounded-2xl bg-white px-6 py-4 shadow-md shadow-black/10">
                <img
                  src="/images/synchrony-logo.webp"
                  alt="Synchrony"
                  width={2000}
                  height={426}
                  className="h-7 w-auto sm:h-8"
                />
              </span>
              <p className="text-[14px] leading-relaxed text-white/75">
                EcoGlass partners with Synchrony Bank, a trusted national leader in home improvement financing, to bring
                you flexible, transparent payment options.
              </p>
              <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-white/85">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-cta" aria-hidden="true" />
                  Trusted national lender
                </span>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Financing</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
                Financing that fits your budget
              </h2>
              <p className="mt-3 max-w-[56ch] text-[14px] leading-relaxed text-muted-foreground sm:text-base">
                A new home upgrade shouldn&apos;t mean paying it all at once. With financing through Synchrony, you can
                invest in energy-efficient, impact-rated windows and doors today and pay for them comfortably over time.
                Our team will help you find the plan that&apos;s right for you.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-forest">
                <span className="inline-flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-cta" aria-hidden="true" />
                  Flexible plans
                </span>
                <span className="inline-flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-cta" aria-hidden="true" />
                  Fast decisions
                </span>
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-cta" aria-hidden="true" />
                  No obligation
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-offwhite">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Why finance</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
                The benefits of financing with EcoGlass
              </h2>
            </div>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-forest/10"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-forest-deep text-white shadow-sm shadow-forest/20 ring-1 ring-inset ring-white/10">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-tight text-forest">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-background">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">How it works</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
                Three simple steps
              </h2>
              <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground sm:text-base">
                From first estimate to finished install, financing your project takes just a few minutes.
              </p>
            </div>

            <ol className="relative mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
              {/* Connecting line across the numbered nodes (desktop) */}
              <span
                className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
                aria-hidden="true"
              />
              {steps.map(({ title, body }, i) => (
                <li key={title} className="relative flex flex-col">
                  <div className="flex items-center gap-4 md:block">
                    <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-forest-deep font-display text-xl font-extrabold tracking-tight text-white shadow-lg shadow-forest/25 ring-8 ring-background">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta md:mt-6">
                      Step {i + 1}
                    </p>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-extrabold leading-tight text-forest md:mt-1">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-[38ch] text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <FaqSection title="Financing questions, answered" faqs={faqs} />

        {/* Contact form */}
        <section id="contact" className="scroll-mt-24 bg-background">
          <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Contact us</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
                Talk to us about financing
              </h2>
              <p className="mt-3 max-w-[48ch] text-[14px] leading-relaxed text-muted-foreground sm:text-base">
                Have a question about payment plans or ready to get started? Send us a note and an EcoGlass financing
                specialist will help you find the right Synchrony plan for your project.
              </p>

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+13212070507"
                  className="flex items-center gap-3.5 text-[15px] font-semibold text-forest transition-colors hover:text-cta"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-forest-deep text-white shadow-sm shadow-forest/20 ring-1 ring-inset ring-white/10">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  (321) 207-0507
                </a>
                <div className="flex items-center gap-3.5 rounded-xl bg-sage px-4 py-3 text-[13px] font-semibold text-forest">
                  <CreditCard className="h-5 w-5 text-cta" aria-hidden="true" />
                  Financing subject to credit approval by Synchrony Bank.
                </div>
              </div>
            </div>

            <FinancingContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

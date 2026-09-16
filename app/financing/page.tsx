import type { Metadata } from "next"
import { Wallet, FileCheck, CalendarClock, ShieldCheck, CreditCard, MonitorSmartphone, Phone } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { FinancingHero } from "@/components/financing/financing-hero"
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
        <FinancingHero />

        {/* Synchrony partnership band */}
        <section className="bg-card">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.2fr] lg:gap-14 lg:px-8">
            <div className="flex flex-col items-start gap-5 rounded-3xl bg-forest px-7 py-10 text-white sm:px-9">
              <ShieldCheck className="h-9 w-9 text-cta" aria-hidden="true" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Proud partner</p>
                <p className="mt-2 font-display text-4xl font-extrabold tracking-tight">Synchrony</p>
                <p className="mt-1 text-sm text-white/70">Home improvement financing</p>
              </div>
              <p className="text-[14px] leading-relaxed text-white/75">
                EcoGlass partners with Synchrony Bank, a trusted national leader in home improvement financing, to bring
                you flexible, transparent payment options.
              </p>
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
                <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sage text-forest">
                    <Icon className="h-6 w-6" aria-hidden="true" />
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
            </div>
            <ol className="mt-9 grid gap-6 md:grid-cols-3">
              {steps.map(({ title, body }, i) => (
                <li key={title} className="relative rounded-2xl border border-border bg-card p-7 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cta font-display text-xl font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-bold leading-tight text-forest">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-offwhite">
          <div className="mx-auto w-full max-w-[900px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">FAQ</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
                Financing questions, answered
              </h2>
            </div>
            <div className="mt-9 space-y-3">
              {faqs.map(({ q, a }) => (
                <details
                  key={q}
                  className="group rounded-xl border border-border bg-card px-5 py-4 shadow-sm [&_summary]:list-none"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-[15px] font-bold text-forest">
                    {q}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-cta transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

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
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage text-forest">
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

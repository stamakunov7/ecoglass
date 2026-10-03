import type { Metadata } from "next"
import Image from "next/image"
import { Check } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { FinancingContactForm } from "@/components/financing/financing-contact-form"

export const metadata: Metadata = {
  title: "Financing | EcoGlass Windows & Doors",
  description:
    "Flexible financing for windows and doors through EcoGlass's partnership with Synchrony Bank. Promotional plans, low monthly payments, and a quick, simple application.",
}

const highlights = [
  "Promotional plans on qualifying projects",
  "Low, predictable monthly payments",
  "Quick application, fast decision",
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
    <SiteShell overlayHeader>
      <main>
        {/* Hero: the pitch on the left, the form right beside it */}
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <Image
            src="/images/financing-hero.png"
            alt="A couple relaxing in a bright Florida living room with new windows and doors"
            fill
            preload
            sizes="100vw"
            className="ken-burns -z-20 object-cover object-[50%_40%]"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.93)_0%,rgb(8_26_21/0.74)_42%,rgb(8_26_21/0.38)_70%,rgb(8_26_21/0.28)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.72)_0%,rgb(8_26_21/0.93)_55%)]"
            aria-hidden="true"
          />

          <div className="mx-auto grid min-h-svh w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-6 sm:pb-20 sm:pt-[calc(var(--header-h)+4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:gap-16 lg:px-8 lg:pb-24 xl:gap-24">
            <div>
              <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
                <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
                Financing
              </p>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[80px]">
                <span className="block overflow-hidden pb-[0.06em]">
                  <span className="mask-reveal inline-block" style={{ animationDelay: "200ms" }}>
                    Upgrade now.
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.14em]">
                  <span
                    className="mask-reveal inline-block font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]"
                    style={{ animationDelay: "360ms" }}
                  >
                    Pay over time.
                  </span>
                </span>
              </h1>
              <p
                className="hero-reveal mt-6 max-w-[520px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
                style={{ animationDelay: "520ms" }}
              >
                Flexible payment plans through our partner Synchrony Bank, so your new windows and doors don&apos;t have
                to wait.
              </p>

              <ul className="hero-reveal mt-8 space-y-3" style={{ animationDelay: "660ms" }}>
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-white/85 sm:text-base">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#9fd3a2]/20 text-[#9fd3a2]">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div
                className="hero-reveal mt-9 inline-flex items-center gap-3 rounded-full bg-white/95 py-2.5 pl-5 pr-6 shadow-lg shadow-black/20"
                style={{ animationDelay: "800ms" }}
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  In partnership with
                </span>
                <img
                  src="/images/synchrony-logo.webp"
                  alt="Synchrony"
                  width={2000}
                  height={426}
                  className="h-5 w-auto"
                />
              </div>
            </div>

            <div
              id="apply"
              className="hero-reveal scroll-mt-[calc(var(--header-h)+1.5rem)] rounded-[28px] bg-card p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9"
              style={{ animationDelay: "360ms" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cta-dark">Free, no obligation</p>
              <h2 className="mt-2 font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-forest sm:text-[32px]">
                Ask about financing
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                A specialist will walk you through your Synchrony options.
              </p>
              <div className="mt-7">
                <FinancingContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-card">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
              <div>
                <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
                  <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                  How it works
                </p>
                <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
                  Three steps. <span className="font-serif font-normal italic text-cta-dark">That&apos;s it.</span>
                </h2>
              </div>
              <p className="max-w-[400px] text-[16px] leading-relaxed text-muted-foreground">
                From first estimate to finished install, financing your project takes just a few minutes.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ol className="mt-12 grid grid-cols-1 border-t border-forest/15 md:grid-cols-3 lg:mt-16">
                {steps.map(({ title, body }, i) => (
                  <li
                    key={title}
                    className="group relative pb-4 pt-8 md:px-8 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-forest/15 lg:pt-10"
                  >
                    {/* A line that draws across the top edge on hover */}
                    <span
                      className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-cta transition-transform duration-500 group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <span
                      className="font-display text-[72px] font-extrabold leading-[0.85] tracking-[-0.05em] text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_rgb(18_59_50/0.35)] group-hover:text-forest"
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-forest">
                      {title}
                    </h3>
                    <p className="mt-2.5 max-w-[34ch] text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <FaqSection title="Financing questions, answered" faqs={faqs} />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"
import { Reveal } from "@/components/reveal"
import { canonicalMeta } from "@/lib/site"
import { WarrantyForm } from "@/components/warranty/warranty-form"

export const metadata: Metadata = {
  title: "Warranty Registration | EcoGlass Windows & Doors",
  description:
    "Register the warranty for EcoGlass windows and doors installed by our authorized installers. We confirm your installation and email your warranty certificate.",
  ...canonicalMeta("/warranty"),
}

const highlights = [
  "For EcoGlass products installed by our own installers",
  "Have your invoice number ready",
  "Your certificate arrives by email once confirmed",
]

const steps = [
  {
    title: "Register",
    body: "Fill in the form with your project address, invoice number and the series of your windows or doors.",
  },
  {
    title: "We confirm",
    body: "Our team checks your invoice and confirms that EcoGlass's authorized installers completed your installation.",
  },
  {
    title: "Get your certificate",
    body: "Once everything checks out, we email your warranty certificate to the address you gave us.",
  },
]

const faqs = [
  {
    q: "Who can register a warranty?",
    a: "Customers whose EcoGlass windows and doors were installed by EcoGlass's authorized installers. The warranty is not valid for products installed by anyone else.",
  },
  {
    q: "Where do I find my invoice number?",
    a: "On the invoice you received from EcoGlass for your project. If you can't find it, call us and we'll help you look it up.",
  },
  {
    q: "Which product series do I have?",
    a: "Choose NOVA, DURO PLAST, PRESTIGE, PRESTIGE+ or DURAPLUS if you know it. If you're not sure, pick \"Not sure\" and we'll check it against your order.",
  },
  {
    q: "Why isn't the certificate sent right away?",
    a: "Every registration is checked against our records first, so that each certificate goes to a real EcoGlass installation.",
  },
]

export default function WarrantyPage() {
  return (
    <SiteShell overlayHeader>
      <main>
        {/* Hero: who it's for on the left, the registration form beside it */}
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <Image
            src="/images/gallery/installation.webp"
            alt="An EcoGlass installer fitting a new window"
            fill
            preload
            sizes="100vw"
            className="ken-burns -z-20 object-cover object-[30%_45%]"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.93)_0%,rgb(8_26_21/0.76)_42%,rgb(8_26_21/0.4)_70%,rgb(8_26_21/0.3)_100%)] max-lg:bg-[linear-gradient(180deg,rgb(8_26_21/0.74)_0%,rgb(8_26_21/0.93)_55%)]"
            aria-hidden="true"
          />

          <div className="mx-auto grid min-h-svh w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-6 sm:pb-20 sm:pt-[calc(var(--header-h)+4rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16 lg:px-8 lg:pb-24 xl:gap-24">
            <div>
              <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
                <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
                Warranty registration
              </p>
              <h1 className="mt-6 font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-[80px]">
                <span className="block overflow-hidden pb-[0.06em]">
                  <span className="mask-reveal inline-block" style={{ animationDelay: "200ms" }}>
                    Register your
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.14em]">
                  <span
                    className="mask-reveal inline-block font-serif font-normal italic tracking-[-0.01em] text-[#cfe8cf]"
                    style={{ animationDelay: "360ms" }}
                  >
                    warranty.
                  </span>
                </span>
              </h1>
              <p
                className="hero-reveal mt-6 max-w-[520px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
                style={{ animationDelay: "520ms" }}
              >
                Your EcoGlass warranty is valid only when our products are installed by EcoGlass&apos;s authorized
                installers. Register your project and we&apos;ll email your certificate once it&apos;s confirmed.
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
            </div>

            <div
              id="register"
              className="hero-reveal scroll-mt-[calc(var(--header-h)+1.5rem)] rounded-[28px] bg-card p-6 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9"
              style={{ animationDelay: "360ms" }}
            >
              <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-cta-dark">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                EcoGlass installations only
              </p>
              <h2 className="mt-2 font-display text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-forest sm:text-[32px]">
                Register your warranty
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                Fields marked <span className="text-cta">*</span> are required.
              </p>
              <div className="mt-7">
                <WarrantyForm />
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
                  Registered, checked, <span className="font-serif font-normal italic text-cta-dark">certified.</span>
                </h2>
              </div>
              <p className="max-w-[400px] text-[16px] leading-relaxed text-muted-foreground">
                Each certificate is issued by a person on our team, after we&apos;ve matched your registration to your
                installation.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ol className="mt-12 grid grid-cols-1 border-t border-forest/15 md:grid-cols-3 lg:mt-16">
                {steps.map(({ title, body }, i) => (
                  <li
                    key={title}
                    className="group relative pb-4 pt-8 md:px-8 md:first:pl-0 md:last:pr-0 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-forest/15 lg:pt-10"
                  >
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

            <Reveal delay={200}>
              <Link
                href="/care"
                className="group mt-14 flex flex-col gap-4 rounded-[24px] bg-sage/60 p-6 transition-colors hover:bg-sage sm:flex-row sm:items-center sm:justify-between sm:p-8"
              >
                <span>
                  <span className="block font-display text-xl font-bold tracking-[-0.01em] text-forest sm:text-2xl">
                    Keep your windows like new
                  </span>
                  <span className="mt-1 block text-[15px] text-muted-foreground">
                    Simple care and maintenance tips for glass, frames, screens and sliding doors.
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-2 text-[15px] font-bold text-forest">
                  Care &amp; maintenance
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        <FaqSection title="Warranty questions, answered" faqs={faqs} />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

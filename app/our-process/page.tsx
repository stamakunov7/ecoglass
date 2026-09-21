import type { Metadata } from "next"
import { ClipboardList, Ruler, Factory, Wrench, FileBadge, Brush, ShieldCheck, PhoneCall, CheckCircle2 } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { CtaFooter } from "@/components/cta-footer"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Our Process | EcoGlass Windows & Doors",
  description:
    "From your free in-home estimate to final installation, see exactly how EcoGlass manufactures and installs custom windows and doors in Central Florida.",
}

const steps = [
  {
    icon: ClipboardList,
    title: "Request an Estimate",
    summary: "Tell us about your project and we will schedule a free, no-obligation in-home visit at a time that works for you.",
    details: [
      "Call, message, or use the estimate form on this site",
      "We confirm your appointment within one business day",
      "No pressure, no obligation, and no cost",
    ],
    image: "/images/hero-home.png",
    alt: "Modern Florida home exterior with new windows and doors",
  },
  {
    icon: Ruler,
    title: "Measure and Review",
    summary: "An EcoGlass specialist measures every opening and walks you through products, glass options, colors, and finishes.",
    details: [
      "Precise laser and tape measurements of each opening",
      "Side-by-side product and glass package comparison",
      "Written, itemized quote with financing options",
    ],
    image: "/images/process-measure.png",
    alt: "Specialist measuring a window opening with a tape measure and laser level",
  },
  {
    icon: Factory,
    title: "Manufacture and Prepare",
    summary: "Your custom windows and doors are built in our Central Florida facility while we handle permitting and scheduling.",
    details: [
      "Each unit built to your exact measurements",
      "Quality inspection before anything leaves the floor",
      "Permits and HOA paperwork handled by our team",
    ],
    image: "/images/why-hero.png",
    alt: "Window units on racks inside the EcoGlass manufacturing facility",
  },
  {
    icon: Wrench,
    title: "Install and Complete",
    summary: "Our in-house crew installs everything, seals and finishes each unit, and leaves your home clean and ready to enjoy.",
    details: [
      "Trained EcoGlass installers, never subcontracted",
      "Proper flashing, sealing, and interior finish work",
      "Final walkthrough and cleanup on the same day",
    ],
    image: "/images/process-hero.png",
    alt: "Installer fitting a black-framed window on a modern Florida home",
  },
]

const promises = [
  {
    icon: FileBadge,
    title: "We handle the permits",
    body: "Florida window and door replacements typically require permits. Our team files and manages them so you do not have to.",
  },
  {
    icon: Brush,
    title: "We leave it clean",
    body: "Old units are removed and hauled away, and every work area is cleaned before we call the job finished.",
  },
  {
    icon: ShieldCheck,
    title: "We stand behind the work",
    body: "Product and workmanship are both covered, and because we are local, support is always a short drive away.",
  },
  {
    icon: PhoneCall,
    title: "One point of contact",
    body: "From estimate to follow-up you work with the EcoGlass team directly, not a rotating cast of vendors.",
  },
]

const faqs = [
  {
    q: "How long does the whole process take?",
    a: "Timelines depend on project size and product selection, but because we manufacture locally, most projects move significantly faster than national brands that ship from out of state. Your specialist will give you a clear schedule at the measurement visit.",
  },
  {
    q: "Do I need to be home during installation?",
    a: "We ask that an adult be present at the start of installation and for the final walkthrough. Beyond that, our crew can work independently while you go about your day.",
  },
  {
    q: "Will installation damage my walls or landscaping?",
    a: "Our installers protect floors, furniture, and landscaping before work begins and repair any interior trim affected by the replacement. Leaving your home as we found it is part of the job.",
  },
  {
    q: "Can you replace just a few windows or does it have to be the whole house?",
    a: "Any size project is welcome. Many homeowners replace in phases, and because every unit is custom-made, later phases will match perfectly.",
  },
]

export default function OurProcessPage() {
  return (
    <SiteShell>
      <main>
        <PageHero
          eyebrow="Our process"
          title="Simple. Clear. Efficient."
          description="Replacing windows and doors should not be stressful. Here is exactly what happens from your first call to the final walkthrough, with EcoGlass handling every step in between."
          image="/images/process-hero.png"
          imageAlt="EcoGlass installer fitting a new window on a Central Florida home"
          primaryHref="#steps"
          primaryLabel="See the four steps"
        />

        {/* Steps */}
        <section id="steps" className="scroll-mt-24 bg-offwhite">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Step by step</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl lg:text-5xl">
                Four steps from first call to finished home
              </h2>
            </div>

            <ol className="mt-12 flex flex-col gap-12 lg:gap-20">
              {steps.map(({ icon: Icon, title, summary, details, image, alt }, i) => (
                <li
                  key={title}
                  className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-3xl bg-muted shadow-lg shadow-forest/10">
                    <img src={image} alt={alt} className="aspect-[4/3] h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-lg shadow-cta/30">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-wider text-cta">Step {i + 1} of 4</p>
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-extrabold leading-tight text-forest sm:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                      {summary}
                    </p>
                    <ul className="mt-6 flex flex-col gap-3">
                      {details.map((d) => (
                        <li key={d} className="flex items-start gap-3 text-[14px] text-ink sm:text-[15px]">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cta" aria-hidden="true" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Promises */}
        <section className="bg-gradient-to-b from-forest to-forest-deep">
          <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="max-w-2xl lg:mx-auto lg:text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">What to expect</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-white text-balance sm:text-4xl">
                Every EcoGlass project includes
              </h2>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {promises.map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cta">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-tight text-white">{title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/65">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-offwhite">
          <div className="mx-auto w-full max-w-[900px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">FAQ</p>
              <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
                Common questions about the process
              </h2>
            </div>
            <div className="mt-9 flex flex-col gap-3">
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
      </main>
      <CtaFooter />
    </SiteShell>
  )
}

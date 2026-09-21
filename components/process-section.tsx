import { ClipboardList, Ruler, Factory, Wrench } from "lucide-react"
import { ProcessVideoBg } from "./process-video-bg"

const steps = [
  {
    icon: ClipboardList,
    title: "Request an Estimate",
    body: "Reach out and tell us about your project. We'll schedule a free in-home visit.",
  },
  {
    icon: Ruler,
    title: "Measure and Review",
    body: "We take precise measurements and help you choose the right products.",
  },
  {
    icon: Factory,
    title: "Manufacture and Prepare",
    body: "Your custom windows and doors are built locally with care and precision.",
  },
  {
    icon: Wrench,
    title: "Install and Complete",
    body: "Our in-house team installs everything and leaves your home spotless.",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative overflow-hidden bg-gradient-to-b from-forest to-forest-deep">
      <ProcessVideoBg />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="max-w-[640px] lg:mx-auto lg:text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Our Process</p>
          <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-white text-balance sm:text-4xl lg:text-5xl">
            Simple. Clear. Efficient.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/70 sm:mt-4 sm:text-base">
            From your first call to final installation, we make the whole process easy and transparent.
          </p>
        </div>

        <ol className="relative mt-10 grid gap-8 sm:mt-14 lg:grid-cols-4 lg:gap-6">
          {/* Desktop connecting line */}
          <span
            className="absolute left-0 right-0 top-8 hidden h-px bg-white/15 lg:block"
            aria-hidden="true"
          />
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="relative flex gap-4 lg:flex-col lg:gap-4 lg:text-center">
              {/* Mobile vertical line */}
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[27px] top-14 h-[calc(100%+2rem)] w-px bg-white/15 lg:hidden"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cta text-white shadow-lg shadow-forest-deep/40 lg:mx-auto">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="pt-1 lg:pt-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-cta">Step {i + 1}</p>
                <h3 className="mt-1 text-base font-bold text-white sm:text-lg">{title}</h3>
                <p className="mt-1.5 max-w-[30ch] text-[13px] leading-relaxed text-white/65 sm:text-sm lg:mx-auto">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

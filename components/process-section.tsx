import Link from "next/link"
import { ClipboardList, Ruler, Factory, Wrench, ArrowRight } from "lucide-react"
import { ProcessVideoBg } from "./process-video-bg"
import { Reveal } from "./reveal"

const steps = [
  {
    icon: ClipboardList,
    title: "Request an estimate",
    body: "Reach out and tell us about your project. We'll schedule a free in-home visit.",
  },
  {
    icon: Ruler,
    title: "Measure and review",
    body: "We take precise measurements and help you choose the right products.",
  },
  {
    icon: Factory,
    title: "Manufacture and prepare",
    body: "Your custom windows and doors are built locally with care and precision.",
  },
  {
    icon: Wrench,
    title: "Install and complete",
    body: "Our in-house team installs everything and leaves your home spotless.",
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="relative isolate overflow-hidden bg-forest-deep text-white">
      <ProcessVideoBg />
      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              Our process
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[56px]">
              Simple. Clear. <span className="font-serif font-normal italic text-[#cfe8cf]">Efficient.</span>
            </h2>
          </div>
          <div className="max-w-[420px]">
            <p className="text-[15px] leading-relaxed text-[#d4ded9] sm:text-base">
              From your first call to final installation, we make the whole process easy and transparent.
            </p>
            <Link
              href="/our-process"
              className="group mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-white transition-colors hover:text-[#cfe8cf]"
            >
              See the full process
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ol className="mt-10 grid grid-cols-1 gap-y-7 border-t border-white/15 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-y-0">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className="group relative pt-6 sm:pr-6 lg:px-6 lg:pt-7 lg:first:pl-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-white/15"
              >
                {/* A line that draws across the top edge on hover */}
                <span
                  className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-[#9fd3a2] transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold tabular-nums text-[#9fd3a2]">0{i + 1}</span>
                  <Icon
                    className="h-4 w-4 text-white/50 transition-colors group-hover:text-[#9fd3a2]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-tight sm:text-xl">{title}</h3>
                <p className="mt-1.5 max-w-[34ch] text-[14px] leading-relaxed text-white/65">{body}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

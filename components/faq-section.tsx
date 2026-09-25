import type { ReactNode } from "react"
import { Plus } from "lucide-react"

export type Faq = { q: string; a: string }

/** Borderless two-column FAQ: sticky heading on the left, numbered accordion on the right. */
export function FaqSection({ title, intro, faqs }: { title: string; intro?: ReactNode; faqs: Faq[] }) {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-20 lg:px-8 lg:py-24">
        <div className="lg:sticky lg:self-start" style={{ top: "calc(var(--header-h, 140px) + 2rem)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">FAQ</p>
          <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-muted-foreground">
            {intro ?? (
              <>
                Don&apos;t see your question? Call us at{" "}
                <a href="tel:+13212070507" className="font-semibold text-forest underline-offset-4 hover:text-cta hover:underline">
                  (321) 207-0507
                </a>{" "}
                and a real person from our Longwood team will help.
              </>
            )}
          </p>
        </div>

        <div className="border-t border-forest/15">
          {faqs.map(({ q, a }, i) => (
            <details
              key={q}
              className="group border-b border-forest/15 [&_summary::-webkit-details-marker]:hidden [&_summary]:list-none"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 sm:py-7">
                <span className="flex items-baseline gap-4 sm:gap-6">
                  <span className="w-6 shrink-0 font-display text-sm font-bold tabular-nums text-cta">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-bold leading-snug text-forest transition-colors group-hover:text-cta sm:text-xl">
                    {q}
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest/[0.06] text-forest transition-all duration-300 group-open:rotate-45 group-open:bg-cta group-open:text-white">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="-mt-2 max-w-[62ch] pb-7 pl-10 pr-12 text-[15px] leading-relaxed text-muted-foreground sm:pl-12">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

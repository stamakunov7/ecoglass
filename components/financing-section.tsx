import { ArrowRight, Wallet, FileCheck, CheckCircle2 } from "lucide-react"

const features = [
  {
    icon: Wallet,
    title: "Flexible payment options",
    body: "Choose a plan that works for your budget and your project.",
  },
  {
    icon: FileCheck,
    title: "Simple application process",
    body: "Quick, straightforward approval so your project can start sooner.",
  },
  {
    icon: CheckCircle2,
    title: "Financing available",
    body: "Upgrade now and spread the cost over time with trusted partners.",
  },
]

export function FinancingSection() {
  return (
    <section id="financing" className="bg-background">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-5 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-24">
        {/* Image */}
        <div className="order-1 overflow-hidden rounded-3xl lg:order-none">
          <img
            src="/images/product-sliding.png"
            alt="Modern living space with large sliding glass doors opening to a patio"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        {/* Copy */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Financing</p>
          <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl lg:text-5xl">
            Financing Options That Fit Your Budget
          </h2>
          <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
            Don't let budget hold back your home upgrade. We offer flexible financing so you can get the windows and
            doors you want, on terms that work for you.
          </p>

          <ul className="mt-6 flex flex-col gap-4 sm:mt-8">
            {features.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage text-forest">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold leading-tight text-forest sm:text-base">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#estimate"
            className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-6 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark sm:mt-8"
          >
            Explore Financing
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}

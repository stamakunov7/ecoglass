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
    body: "Upgrade now and spread the cost over time with a trusted lender.",
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
            Don&apos;t let budget hold back your home upgrade. We offer flexible financing so you can get the windows and
            doors you want, on terms that work for you.
          </p>

          <ul className="mt-6 flex flex-col gap-4 sm:mt-8">
            {features.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3.5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-forest to-forest-deep text-white shadow-sm shadow-forest/20 ring-1 ring-inset ring-white/10">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold leading-tight text-forest sm:text-base">{title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground sm:text-sm">{body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-5 sm:mt-8 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="/financing"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cta px-6 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark"
            >
              Explore Financing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>

            {/* Partner lockup */}
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-[11px]">
                In partnership with
              </span>
              <img
                src="/images/synchrony-logo.webp"
                alt="Synchrony"
                width={2000}
                height={426}
                className="h-5 w-auto sm:h-[22px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Ruler, Factory, Wrench } from "lucide-react"

const items = [
  { icon: Ruler, title: "Custom sizing", sub: "Perfect fit" },
  { icon: Factory, title: "Local manufacturing", sub: "Built in Central Florida" },
  { icon: Wrench, title: "Pro installation", sub: "In-house expert team" },
]

export function TrustRow() {
  return (
    <section className="bg-forest">
      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-3 divide-x divide-white/10 px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
        {items.map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-1.5 px-1 text-center lg:flex-row lg:justify-center lg:gap-4 lg:text-left"
          >
            <span className="flex items-center justify-center lg:h-12 lg:w-12 lg:shrink-0 lg:rounded-full lg:bg-white/10">
              <Icon className="h-6 w-6 text-cta" aria-hidden="true" />
            </span>
            <div className="flex flex-col lg:gap-0.5">
              <span className="text-[13px] font-semibold leading-tight text-white text-balance sm:text-sm lg:text-base">
                {title}
              </span>
              <span className="text-[11px] leading-tight text-white/60 text-balance sm:text-xs lg:text-sm">
                {sub}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

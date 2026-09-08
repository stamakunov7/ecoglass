import { Ruler, Factory, Wrench } from "lucide-react"

const items = [
  { icon: Ruler, title: "Custom sizing", sub: "Perfect fit" },
  { icon: Factory, title: "Local manufacturing", sub: "Built in Central Florida" },
  { icon: Wrench, title: "Pro installation", sub: "In-house expert team" },
]

export function TrustRow() {
  return (
    <section className="bg-forest">
      <div className="mx-auto grid max-w-[440px] grid-cols-3 divide-x divide-white/10 px-4 py-5">
        {items.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex flex-col items-center gap-1.5 px-1 text-center">
            <Icon className="h-6 w-6 text-cta" aria-hidden="true" />
            <span className="text-[13px] font-semibold leading-tight text-white text-balance">{title}</span>
            <span className="text-[11px] leading-tight text-white/60 text-balance">{sub}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

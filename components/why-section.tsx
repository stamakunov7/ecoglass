import { Factory, Timer, Ruler, ShieldCheck, Sparkles, Headset } from "lucide-react"

const benefits = [
  {
    icon: Factory,
    title: "Direct Local Manufacturing",
    body: "We build our products right here in Central Florida.",
  },
  {
    icon: Timer,
    title: "Shorter Lead Times",
    body: "Faster turnaround from your local facility to your home or job site.",
  },
  {
    icon: Ruler,
    title: "Custom Measurements",
    body: "Every window and door is custom-built to fit your space perfectly.",
  },
  {
    icon: ShieldCheck,
    title: "Energy-Efficient Solutions",
    body: "Designed to improve comfort and support energy efficiency.",
  },
  {
    icon: Sparkles,
    title: "Quality Craftsmanship",
    body: "Premium materials and workmanship you can rely on for years.",
  },
  {
    icon: Headset,
    title: "Long-Term Support",
    body: "We're here for maintenance and support when you need us.",
  },
]

export function WhySection() {
  return (
    <section id="why" className="bg-offwhite">
      <div className="mx-auto max-w-[440px] px-5 py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta">Why Choose EcoGlass</p>
        <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance">
          Built Local. Built for You.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
          As a local manufacturer, we control the process so you get better quality, faster timelines, and
          personalized service.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-3.5">
          {benefits.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-3.5 rounded-2xl border border-border bg-card p-4 shadow-sm shadow-forest/5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage text-forest">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[15px] font-bold leading-tight text-forest">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

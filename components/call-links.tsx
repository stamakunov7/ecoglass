import { Phone } from "lucide-react"
import { PHONE_LIST, type RegionalPhone } from "@/lib/site"
import { cn } from "@/lib/utils"

const button = {
  onDark:
    "inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 text-[15px] font-semibold text-white backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20",
  onLight:
    "inline-flex h-14 items-center justify-center gap-2 rounded-full border border-forest px-6 text-[15px] font-semibold text-forest transition-colors hover:bg-forest hover:text-white",
}

/** Pair of region-labeled call buttons, used next to estimate CTAs. */
export function CallButtons({
  tone,
  className,
}: {
  tone: "onDark" | "onLight"
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      {PHONE_LIST.map((phone) => (
        <a key={phone.id} href={phone.tel} className={button[tone]}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          {phone.shortRegion} {phone.display}
        </a>
      ))}
    </div>
  )
}

/** Compact header/utility-bar links. */
export function HeaderPhones({ className }: { className?: string }) {
  return (
    <span className={cn("flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      {PHONE_LIST.map((phone, i) => (
        <span key={phone.id} className="flex items-center gap-3">
          {i > 0 ? <span className="h-3 w-px bg-white/25" aria-hidden="true" /> : null}
          <a href={phone.tel} className="flex items-center gap-1.5 font-medium">
            <Phone className="h-3.5 w-3.5 text-cta" aria-hidden="true" />
            <span className="text-white/70">{phone.shortRegion}</span> {phone.display}
          </a>
        </span>
      ))}
    </span>
  )
}

export function PhoneInline({ className }: { className?: string }) {
  return (
    <>
      {PHONE_LIST.map((phone, i) => (
        <span key={phone.id}>
          {i > 0 ? " or " : ""}
          <a href={phone.tel} className={className}>
            {phone.display}
          </a>{" "}
          ({phone.shortRegion})
        </span>
      ))}
    </>
  )
}

export function phoneAriaLabel(phone: RegionalPhone) {
  return `Call EcoGlass ${phone.region} at ${phone.display}`
}

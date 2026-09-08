import { Leaf } from "lucide-react"

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-cta/10 text-cta">
        <Leaf className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-forest">
        ECO<span className="text-cta">GLASS</span>
      </span>
    </div>
  )
}

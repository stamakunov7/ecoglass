"use client"

import { useRef } from "react"
import { FileBadge, Brush, ShieldCheck, PhoneCall } from "lucide-react"
import { Reveal } from "@/components/reveal"

const PROMISES = [
  {
    icon: FileBadge,
    title: "We handle the permits",
    body: "Florida window and door replacements typically require permits. Our team files and manages them so you do not have to.",
  },
  {
    icon: Brush,
    title: "We leave it clean",
    body: "Old units are removed and hauled away, and every work area is cleaned before we call the job finished.",
  },
  {
    icon: ShieldCheck,
    title: "We stand behind the work",
    body: "Product and workmanship are both covered, and because we are local, support is always a short drive away.",
  },
  {
    icon: PhoneCall,
    title: "One point of contact",
    body: "From estimate to follow-up you work with the EcoGlass team directly, not a rotating cast of vendors.",
  },
]

/** Dark section whose cards catch a soft light that follows the cursor. */
export function ProcessPromises() {
  const gridRef = useRef<HTMLDivElement>(null)

  function onPointerMove(e: React.PointerEvent) {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-spotlight]")
    cards?.forEach((card) => {
      const rect = card.getBoundingClientRect()
      card.style.setProperty("--x", `${e.clientX - rect.left}px`)
      card.style.setProperty("--y", `${e.clientY - rect.top}px`)
    })
  }

  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-white">
      {/* Fine grid and a soft glow give the dark surface some depth */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 left-1/2 -z-10 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-cta/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1400px] px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <p className="flex items-center justify-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
            What to expect
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[64px]">
            Every EcoGlass project <span className="font-serif font-normal italic text-[#cfe8cf]">includes.</span>
          </h2>
        </Reveal>

        <div
          ref={gridRef}
          onPointerMove={onPointerMove}
          className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5"
        >
          {PROMISES.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 100} className="h-full">
              <div
                data-spotlight
                className="group relative h-full overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-7 transition-colors duration-500 hover:border-white/20 sm:p-8"
              >
                {/* Cursor light: a soft fill plus a brighter rim */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(360px_circle_at_var(--x)_var(--y),rgb(159_211_162/0.14),transparent_60%)]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[24px] p-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(240px_circle_at_var(--x)_var(--y),rgb(159_211_162/0.7),transparent_70%)] [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]"
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-[#9fd3a2] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-105">
                      <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
                    </span>
                    <span className="font-display text-sm font-bold tabular-nums text-white/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-xl font-bold leading-tight">{title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/65">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

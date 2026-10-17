import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Phone } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Page Not Found | EcoGlass",
  robots: { index: false },
}

const LINKS = [
  { label: "Home", note: "Start from the beginning", href: "/" },
  { label: "Windows & doors", note: "The full catalog", href: "/products" },
  { label: "Our process", note: "From estimate to install", href: "/our-process" },
  { label: "Contact", note: "Talk to our team", href: "/contact" },
]

export default function NotFound() {
  return (
    <SiteShell overlayHeader>
      <main>
        <section className="relative isolate overflow-hidden bg-forest-deep text-white">
          <div
            className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="absolute left-1/2 top-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cta/20 blur-[120px]"
            aria-hidden="true"
          />
          {/* An oversized 404 drawn as an empty window frame behind the copy */}
          <span
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[38vw] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(159_211_162/0.18)] lg:text-[30vw]"
            aria-hidden="true"
          >
            404
          </span>

          <div className="mx-auto flex min-h-svh w-full max-w-[1400px] flex-col justify-center px-5 pb-16 pt-[calc(var(--header-h)+3rem)] sm:px-6 lg:px-8">
            <p className="hero-reveal flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
              <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
              Page not found
            </p>
            <h1
              className="hero-reveal mt-6 max-w-[900px] font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] sm:text-7xl lg:text-[96px]"
              style={{ animationDelay: "150ms" }}
            >
              This door <span className="font-serif font-normal italic text-[#cfe8cf]">doesn&apos;t open.</span>
            </h1>
            <p
              className="hero-reveal mt-6 max-w-[520px] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg"
              style={{ animationDelay: "300ms" }}
            >
              The page you were looking for has moved or no longer exists. One of these should get you where you were
              going.
            </p>

            <ul
              className="hero-reveal mt-12 grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4"
              style={{ animationDelay: "450ms" }}
            >
              {LINKS.map(({ label, note, href }, i) => (
                <li key={href} className={i > 0 ? "lg:border-l lg:border-white/15" : ""}>
                  <Link
                    href={href}
                    className="group flex items-start justify-between gap-4 border-b border-white/15 py-6 lg:border-b-0 lg:px-6 lg:first:pl-0"
                  >
                    <span>
                      <span className="block font-display text-xl font-bold">{label}</span>
                      <span className="mt-1 block text-[14px] text-white/60">{note}</span>
                    </span>
                    <ArrowUpRight
                      className="mt-1 h-5 w-5 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9fd3a2]"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="tel:+13212070507"
              className="hero-reveal mt-10 inline-flex items-center gap-2 self-start text-[15px] font-semibold text-white/80 transition-colors hover:text-white"
              style={{ animationDelay: "600ms" }}
            >
              <Phone className="h-4 w-4 text-[#9fd3a2]" aria-hidden="true" />
              Or call us at (321) 207-0507
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

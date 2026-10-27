import type { ReactNode } from "react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"

export function LegalArticle({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <SiteShell>
      <main className="bg-offwhite">
        <article className="mx-auto w-full max-w-[760px] px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cta">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.03em] text-forest sm:text-5xl">{title}</h1>
          <p className="mt-3 text-[14px] text-muted-foreground">{updated}</p>
          <div className="legal-copy mt-10 text-[15px] leading-relaxed text-ink/85">{children}</div>
        </article>
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

export function LegalH2({ children }: { children: ReactNode }) {
  return <h2 className="mt-10 font-display text-xl font-extrabold text-forest sm:text-2xl">{children}</h2>
}

export function LegalP({ children }: { children: ReactNode }) {
  return <p className="mt-4">{children}</p>
}

export function LegalUl({ children }: { children: ReactNode }) {
  return <ul className="mt-3 list-disc space-y-1.5 pl-5">{children}</ul>
}

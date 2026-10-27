import type { Metadata } from "next"
import { Suspense } from "react"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { ThankYouBody } from "./thank-you-body"
import { canonicalMeta } from "@/lib/site"

export const metadata: Metadata = {
  title: "Thank you | EcoGlass Windows & Doors",
  description: "Your request has been received. An EcoGlass specialist will be in touch shortly.",
  robots: { index: false, follow: false },
  ...canonicalMeta("/thank-you"),
}

export default function ThankYouPage() {
  return (
    <SiteShell overlayHeader>
      <main>
        <Suspense>
          <ThankYouBody />
        </Suspense>
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

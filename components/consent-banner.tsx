"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { readConsent, subscribeConsent, writeConsent } from "@/lib/consent"

export function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(readConsent() === null)
    return subscribeConsent(() => setVisible(readConsent() === null))
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] print:hidden">
      <div className="mx-auto w-full max-w-[1400px] px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-forest-deep/95 px-5 py-4 text-white shadow-[0_-12px_40px_-18px_rgb(13_44_37/0.65)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-6 sm:px-6">
          <p className="flex-1 text-[13px] leading-relaxed text-white/80">
            We use cookies and advertising pixels (Meta, TikTok, Google) to measure ads and improve this site. See our{" "}
            <Link href="/privacy" className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => writeConsent("denied")}
              className="h-10 rounded-full border border-white/25 px-4 text-[13px] font-semibold text-white/85 transition-colors hover:bg-white/10"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => writeConsent("granted")}
              className="h-10 rounded-full bg-cta px-5 text-[13px] font-semibold text-white transition-colors hover:bg-cta-dark"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

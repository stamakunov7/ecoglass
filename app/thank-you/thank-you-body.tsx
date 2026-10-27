"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight, CheckCircle2, Phone } from "lucide-react"
import { peekLeadName } from "@/lib/attribution"
import { PHONE_LIST } from "@/lib/site"
import type { LeadSource } from "@/lib/leads"

const COPY: Record<LeadSource, { title: string; body: string }> = {
  estimate: {
    title: "Your estimate request is in.",
    body: "A local EcoGlass representative will reach out shortly to schedule your free, no-obligation in-home estimate.",
  },
  quote: {
    title: "Your quote request is in.",
    body: "We have your design. A local EcoGlass representative will reach out shortly with pricing and to schedule a free in-home measurement.",
  },
  contact: {
    title: "We got your message.",
    body: "A member of the EcoGlass team will call you within one business day to confirm a time.",
  },
  financing: {
    title: "Your financing inquiry is in.",
    body: "An EcoGlass financing specialist will reach out shortly to walk you through your Synchrony options.",
  },
  commercial: {
    title: "Your project is in.",
    body: "Our commercial team will review it and get back to you within one business day.",
  },
}

function isLeadSource(value: string | null): value is LeadSource {
  return value === "estimate" || value === "quote" || value === "contact" || value === "financing" || value === "commercial"
}

export function ThankYouBody() {
  const params = useSearchParams()
  const from = params.get("from")
  const source = isLeadSource(from) ? from : "estimate"
  const copy = COPY[source]
  const [name, setName] = useState("")

  useEffect(() => {
    setName(peekLeadName())
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-white">
      <div
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cta/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto flex min-h-svh w-full max-w-[800px] flex-col items-center justify-center px-5 pb-20 pt-[calc(var(--header-h)+3rem)] text-center sm:px-6">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-[#9fd3a2]">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2]">Thank you{name ? `, ${name}` : ""}</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[56px]">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-[#d4ded9] sm:text-lg">{copy.body}</p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="shine inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-[15px] font-bold text-forest shadow-xl shadow-black/20 transition-transform hover:-translate-y-0.5"
          >
            Back to home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 text-[14px] text-white/75 sm:flex-row sm:gap-6">
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#9fd3a2]" aria-hidden="true" />
            Prefer to talk now?
          </span>
          {PHONE_LIST.map((phone) => (
            <a key={phone.id} href={phone.tel} className="font-semibold text-white underline-offset-4 hover:underline">
              {phone.shortRegion} {phone.display}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

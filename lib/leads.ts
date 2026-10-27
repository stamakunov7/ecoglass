import { readAttribution, type Attribution } from "@/lib/attribution"
import { newEventId } from "@/lib/event-id"

export type LeadSource = "estimate" | "quote" | "contact" | "financing" | "commercial"

export type LeadSpec = { label: string; value: string }

export type LeadPayload = {
  source: LeadSource
  firstName: string
  lastName: string
  email: string
  phone: string
  zip?: string
  /** Estimate / quote flow */
  role?: string
  projectType?: string
  /** Contact + financing forms */
  topic?: string
  message?: string
  budget?: string
  /** Commercial bid requests */
  businessName?: string
  location?: string
  units?: string
  timeline?: string
  plansLink?: string
  /** A product designed in the configurator. */
  configuration?: {
    title: string
    specs: LeadSpec[]
    quantity?: number
    link?: string
  }
  /** Page the form was sent from. */
  page?: string
  /** Honeypot — real visitors never fill this in. */
  company?: string
  /** Shared id for pixel + future Conversions API dedup. */
  eventId?: string
  /** Paid-click and campaign params from the landing URL. */
  attribution?: Attribution
}

export type LeadResult = { ok: boolean; error?: string; eventId?: string }

/** Sends a lead to /api/lead. Resolves to `{ ok: false }` instead of throwing so forms can show a message. */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const eventId = payload.eventId || newEventId()
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        eventId,
        page: payload.page ?? window.location.href,
        attribution: payload.attribution ?? readAttribution(),
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
    return res.ok && data.ok ? { ok: true, eventId } : { ok: false, error: data.error }
  } catch {
    return { ok: false }
  }
}

export function thankYouHref(source: LeadSource) {
  return `/thank-you?from=${source}`
}

export const LEAD_ERROR_MESSAGE =
  "Sorry — we couldn't send your request. Please try again or call us at (321) 207-0507 (Orlando) or (689) 777-8085 (Tampa Bay)."

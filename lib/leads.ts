export type LeadSource = "estimate" | "quote" | "contact" | "financing"

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
}

/** Sends a lead to /api/lead. Resolves to `{ ok: false }` instead of throwing so forms can show a message. */
export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, page: payload.page ?? window.location.href }),
    })
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
    return res.ok && data.ok ? { ok: true } : { ok: false, error: data.error }
  } catch {
    return { ok: false }
  }
}

export const LEAD_ERROR_MESSAGE =
  "Sorry — we couldn't send your request. Please try again or call us at (321) 207-0507."

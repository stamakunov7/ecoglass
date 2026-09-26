import type { LeadPayload, LeadSource } from "@/lib/leads"

/**
 * Receives every form on the site (estimate, product quote, contact, financing) and
 * emails it to the team through Resend.
 *
 * Environment:
 *   RESEND_API_KEY   – required in production (https://resend.com/api-keys)
 *   LEAD_TO_EMAIL    – where leads go; comma-separated for several (default info@vk-ecoglass.com)
 *   LEAD_FROM_EMAIL  – sender on a domain verified in Resend (default Resend's onboarding sender)
 */

const SOURCES: LeadSource[] = ["estimate", "quote", "contact", "financing"]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function str(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : ""
}

/** Single-line fields end up in the email subject, so line breaks are collapsed. */
function line(value: unknown, max = 200) {
  return str(value, max).replace(/[\r\n\t]+/g, " ")
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)
}

function parse(body: unknown): { lead?: LeadPayload; error?: string } {
  if (!body || typeof body !== "object") return { error: "Invalid request." }
  const b = body as Record<string, unknown>
  const source = str(b.source) as LeadSource
  if (!SOURCES.includes(source)) return { error: "Invalid request." }

  const lead: LeadPayload = {
    source,
    firstName: line(b.firstName, 80),
    lastName: line(b.lastName, 80),
    email: line(b.email, 160),
    phone: line(b.phone, 40),
    zip: line(b.zip, 20),
    role: line(b.role, 60),
    projectType: line(b.projectType, 80),
    topic: line(b.topic, 80),
    message: str(b.message, 4000),
    budget: line(b.budget, 120),
    page: line(b.page, 500),
    company: line(b.company, 200),
  }
  if (!lead.firstName || !lead.lastName) return { error: "Please enter your name." }
  if (!EMAIL_RE.test(lead.email)) return { error: "Please enter a valid email address." }
  if (!lead.phone) return { error: "Please enter a phone number." }

  const c = b.configuration as Record<string, unknown> | undefined
  if (c && typeof c === "object") {
    const specs = Array.isArray(c.specs) ? c.specs.slice(0, 30) : []
    const link = str(c.link, 2000)
    const quantity = Math.round(Number(c.quantity))
    lead.configuration = {
      title: line(c.title),
      specs: specs
        .map((s) => ({ label: line((s as Record<string, unknown>)?.label, 80), value: line((s as Record<string, unknown>)?.value) }))
        .filter((s) => s.label && s.value),
      quantity: Number.isFinite(quantity) && quantity > 0 ? Math.min(quantity, 999) : undefined,
      link: /^https?:\/\//.test(link) ? link : undefined,
    }
  }
  return { lead }
}

function subjectFor(lead: LeadPayload) {
  const name = `${lead.firstName} ${lead.lastName}`
  switch (lead.source) {
    case "quote":
      return `New quote request: ${lead.configuration?.title ?? "Product"} — ${name}`
    case "estimate":
      return `New free estimate request — ${name}`
    case "financing":
      return `New financing inquiry — ${name}`
    default:
      return `New contact message${lead.topic ? ` (${lead.topic})` : ""} — ${name}`
  }
}

function rowsFor(lead: LeadPayload): [string, string][] {
  const rows: [string, string][] = [
    ["Name", `${lead.firstName} ${lead.lastName}`],
    ["Email", lead.email],
    ["Phone", lead.phone],
  ]
  const optional: [string, string | undefined][] = [
    ["Zip code", lead.zip],
    ["I am a", lead.role],
    ["Project type", lead.projectType],
    ["Topic", lead.topic],
    ["Budget", lead.budget],
    ["Message", lead.message],
  ]
  for (const [label, value] of optional) if (value) rows.push([label, value])
  return rows
}

function renderEmail(lead: LeadPayload) {
  const contact = rowsFor(lead)
  const config = lead.configuration
  const configRows: [string, string][] = config
    ? [
        ["Product", config.title],
        ...config.specs.map((s) => [s.label, s.value] as [string, string]),
        ...(config.quantity ? ([["Quantity", String(config.quantity)]] as [string, string][]) : []),
      ]
    : []

  const table = (rows: [string, string][]) =>
    `<table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7e3;color:#5c6b66;width:160px;vertical-align:top">${escapeHtml(
            k,
          )}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7e3;color:#123b32;font-weight:600;white-space:pre-wrap">${escapeHtml(
            v,
          )}</td></tr>`,
      )
      .join("")}</table>`

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#123b32">
  <h2 style="margin:0 0 4px;font-size:20px">${escapeHtml(subjectFor(lead))}</h2>
  <p style="margin:0 0 20px;color:#5c6b66;font-size:13px">Sent from the EcoGlass website${
    lead.page ? ` · <a href="${escapeHtml(lead.page)}" style="color:#3e8e41">${escapeHtml(lead.page)}</a>` : ""
  }</p>
  <h3 style="margin:0 0 8px;font-size:15px">Contact</h3>
  ${table(contact)}
  ${
    config
      ? `<h3 style="margin:24px 0 8px;font-size:15px">Designed product</h3>${table(configRows)}${
          config.link
            ? `<p style="margin:16px 0 0"><a href="${escapeHtml(config.link)}" style="color:#3e8e41;font-weight:600">Open this design on the website →</a></p>`
            : ""
        }`
      : ""
  }
</div>`

  const text = [
    subjectFor(lead),
    "",
    ...contact.map(([k, v]) => `${k}: ${v}`),
    ...(config ? ["", "Designed product", ...configRows.map(([k, v]) => `${k}: ${v}`), config.link ? `Design link: ${config.link}` : ""] : []),
    lead.page ? `\nSent from: ${lead.page}` : "",
  ].join("\n")

  return { html, text }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const { lead, error } = parse(body)
  if (!lead) return Response.json({ ok: false, error }, { status: 400 })

  // Bots fill every field, including the hidden one. Pretend it worked.
  if (lead.company) return Response.json({ ok: true })

  const apiKey = process.env.RESEND_API_KEY
  const to = (process.env.LEAD_TO_EMAIL || "info@vk-ecoglass.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
  const from = process.env.LEAD_FROM_EMAIL || "EcoGlass Website <onboarding@resend.dev>"
  const { html, text } = renderEmail(lead)

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[lead] RESEND_API_KEY is not set — this lead was NOT emailed:\n${text}`)
      return Response.json({ ok: true, delivered: false })
    }
    console.error("[lead] RESEND_API_KEY is not set — cannot deliver lead")
    return Response.json({ ok: false, error: "Lead email is not configured." }, { status: 503 })
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, reply_to: lead.email, subject: subjectFor(lead), html, text }),
  })
  if (!res.ok) {
    console.error(`[lead] Resend responded ${res.status}: ${await res.text().catch(() => "")}`)
    return Response.json({ ok: false, error: "We couldn't send your request." }, { status: 502 })
  }
  return Response.json({ ok: true })
}

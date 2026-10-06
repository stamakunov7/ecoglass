"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { LEAD_ERROR_MESSAGE, submitLead } from "@/lib/leads"

const ROLES = ["Builder / developer", "Condo association", "Property manager", "General contractor", "Architect", "Other"]
const PROJECT_TYPES = ["New construction", "Condo / multifamily", "Commercial building", "Replacement / retrofit"]
const TIMELINES = ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just planning"]

type Form = {
  firstName: string
  lastName: string
  businessName: string
  email: string
  phone: string
  role: string
  projectType: string
  location: string
  units: string
  timeline: string
  plansLink: string
  message: string
}

const empty: Form = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  phone: "",
  role: ROLES[0],
  projectType: PROJECT_TYPES[0],
  location: "",
  units: "",
  timeline: TIMELINES[1],
  plansLink: "",
  message: "",
}

const input =
  "h-12 w-full rounded-xl border bg-offwhite px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cta focus:bg-card focus:ring-4 focus:ring-cta/10"
const labelText = "mb-1.5 block text-[13px] font-semibold text-forest"

export function BidForm() {
  const [form, setForm] = useState<Form>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState("")
  const [honeypot, setHoneypot] = useState("")

  function update(key: keyof Form, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const next: Partial<Record<keyof Form, string>> = {}
    if (!form.firstName.trim()) next.firstName = "First name is required."
    if (!form.lastName.trim()) next.lastName = "Last name is required."
    if (!form.email.trim()) next.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address."
    if (!form.phone.trim()) next.phone = "Phone number is required."
    if (!form.location.trim()) next.location = "Where is the project?"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending || !validate()) return
    setSending(true)
    setSendError("")
    const result = await submitLead({ source: "commercial", ...form, company: honeypot })
    setSending(false)
    if (result.ok) setSent(true)
    else setSendError(LEAD_ERROR_MESSAGE)
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center px-2 py-14 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-cta">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-forest">
          Thanks{form.firstName ? `, ${form.firstName}` : ""}!
        </h3>
        <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
          Your project is in. Our commercial team will review it and get back to you within one business day.
        </p>
      </div>
    )
  }

  const field = (key: keyof Form, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className={labelText}>
        {label}
        {props.required && <span className="text-cta"> *</span>}
        {props.required === false && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </span>
      <input
        {...props}
        required={undefined}
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        aria-invalid={!!errors[key]}
        className={`${input} ${errors[key] ? "border-destructive" : "border-input"}`}
      />
      {errors[key] && <span className="mt-1 block text-xs text-destructive">{errors[key]}</span>}
    </label>
  )

  const select = (key: keyof Form, label: string, options: string[]) => (
    <label className="block">
      <span className={labelText}>{label}</span>
      <select
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        className={`${input} border-input appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23123b32' stroke-width='2'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <fieldset>
        <legend className={labelText}>I&apos;m a</legend>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <label
              key={r}
              className={`cursor-pointer rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-cta/40 ${
                form.role === r
                  ? "border-forest bg-forest text-white"
                  : "border-border bg-offwhite text-ink/80 hover:border-forest/40 hover:text-forest"
              }`}
            >
              <input
                type="radio"
                name="role"
                value={r}
                checked={form.role === r}
                onChange={() => update("role", r)}
                className="sr-only"
              />
              {r}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {field("firstName", "First name", { required: true, placeholder: "First name" })}
        {field("lastName", "Last name", { required: true, placeholder: "Last name" })}
        {field("email", "Email address", { required: true, type: "email", placeholder: "you@company.com" })}
        {field("phone", "Phone number", { required: true, type: "tel", placeholder: "(###) ###-####" })}
        {field("businessName", "Company", { required: false, placeholder: "Company name" })}
        {field("location", "Project location", { required: true, placeholder: "City, FL" })}
        {select("projectType", "Project type", PROJECT_TYPES)}
        {select("timeline", "Timeline", TIMELINES)}
        {field("units", "Windows & doors, approx.", { required: false, placeholder: "e.g. 120 windows, 40 doors" })}
        {field("plansLink", "Link to plans", { required: false, type: "url", placeholder: "Dropbox, Google Drive…" })}
      </div>

      <label className="mt-4 block">
        <span className={labelText}>
          Notes <span className="font-normal text-muted-foreground">(optional)</span>
        </span>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={3}
          placeholder="Phasing, product preferences, anything we should know."
          className="w-full resize-none rounded-xl border border-input bg-offwhite px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cta focus:bg-card focus:ring-4 focus:ring-cta/10"
        />
      </label>

      {/* Honeypot: hidden from people, filled in by bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {sendError && (
        <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {sendError}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="shine group mt-6 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-forest px-8 text-[15px] font-bold text-white shadow-lg shadow-forest/20 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-forest-deep disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Request a bid
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  )
}

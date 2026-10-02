"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { LEAD_ERROR_MESSAGE, submitLead } from "@/lib/leads"

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")
  const [honeypot, setHoneypot] = useState("")

  function updateField(key: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.firstName.trim()) next.firstName = "First name is required."
    if (!form.lastName.trim()) next.lastName = "Last name is required."
    if (!form.email.trim()) next.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address."
    if (!form.phone.trim()) next.phone = "Phone number is required."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending || !validate()) return
    setSending(true)
    setSendError("")
    const result = await submitLead({
      source: "contact",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      topic: "Appointment request",
      message: form.message,
      company: honeypot,
    })
    setSending(false)
    if (result.ok) setSubmitted(true)
    else setSendError(LEAD_ERROR_MESSAGE)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center px-2 py-12 text-center sm:py-16">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-cta">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-forest">
          Thanks{form.firstName ? `, ${form.firstName}` : ""}!
        </h3>
        <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
          Your request is in. A member of the EcoGlass team will call you within one business day to confirm a time.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="First name"
          required
          placeholder="Enter first name"
          value={form.firstName}
          error={errors.firstName}
          onChange={(v) => updateField("firstName", v)}
        />
        <Field
          label="Last name"
          required
          placeholder="Enter last name"
          value={form.lastName}
          error={errors.lastName}
          onChange={(v) => updateField("lastName", v)}
        />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field
          label="Email address"
          required
          type="email"
          placeholder="you@example.com"
          value={form.email}
          error={errors.email}
          onChange={(v) => updateField("email", v)}
        />
        <Field
          label="Phone number"
          required
          type="tel"
          placeholder="(###) ###-####"
          value={form.phone}
          error={errors.phone}
          onChange={(v) => updateField("phone", v)}
        />
      </div>
      <div className="mt-4">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-forest">
            Message <span className="font-normal text-muted-foreground">(optional)</span>
          </span>
          <textarea
            value={form.message}
            placeholder="Anything we should know before your visit — the rooms, the windows or doors, your timing."
            onChange={(e) => updateField("message", e.target.value)}
            rows={3}
            className="w-full resize-none rounded-xl border border-input bg-offwhite px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cta focus:bg-card focus:ring-4 focus:ring-cta/10"
          />
        </label>
      </div>

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
            Book my appointment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        By submitting, you agree to be contacted by EcoGlass about your inquiry. We never share your information.
      </p>
    </form>
  )
}

function Field({
  label,
  required,
  placeholder,
  value,
  error,
  type = "text",
  onChange,
}: {
  label: string
  required?: boolean
  placeholder: string
  value: string
  error?: string
  type?: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-forest">
        {label}
        {required && <span className="text-cta"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        className={`h-12 w-full rounded-xl border bg-offwhite px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cta focus:bg-card focus:ring-4 focus:ring-cta/10 ${
          error ? "border-destructive" : "border-input"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  )
}

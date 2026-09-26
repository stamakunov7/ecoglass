"use client"

import { useState } from "react"
import { Send, CheckCircle2, Loader2 } from "lucide-react"
import { LEAD_ERROR_MESSAGE, submitLead } from "@/lib/leads"

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  topic: string
  message: string
}

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  topic: "Free estimate",
  message: "",
}

const topics = ["Free estimate", "Product question", "Existing project", "Service & support", "Financing", "Other"]

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
    if (!form.message.trim()) next.message = "Please tell us a little about your project."
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
      topic: form.topic,
      message: form.message,
      company: honeypot,
    })
    setSending(false)
    if (result.ok) setSubmitted(true)
    else setSendError(LEAD_ERROR_MESSAGE)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-14 text-center shadow-sm">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-cta">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold text-forest">
          Thanks{form.firstName ? `, ${form.firstName}` : ""}!
        </h3>
        <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
          Your message has been received. A member of the EcoGlass team will get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
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
          <span className="mb-1.5 block text-[13px] font-semibold text-forest">What can we help with?</span>
          <select
            value={form.topic}
            onChange={(e) => updateField("topic", e.target.value)}
            className="h-11 w-full rounded-lg border border-input bg-card px-3.5 text-sm text-ink outline-none transition-colors focus:border-cta focus:ring-2 focus:ring-cta/20"
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-4">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-forest">
            Message <span className="text-cta">*</span>
          </span>
          <textarea
            value={form.message}
            placeholder="Tell us about your home, the windows or doors you're considering, and any timing."
            onChange={(e) => updateField("message", e.target.value)}
            rows={5}
            aria-invalid={!!errors.message}
            className={`w-full resize-none rounded-lg border bg-card px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cta focus:ring-2 focus:ring-cta/20 ${
              errors.message ? "border-destructive" : "border-input"
            }`}
          />
          {errors.message && <span className="mt-1 block text-xs text-destructive">{errors.message}</span>}
        </label>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        By submitting, you agree to be contacted by EcoGlass about your inquiry. We never share your information.
      </p>

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
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-cta px-7 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark sm:w-auto disabled:cursor-wait disabled:opacity-80"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
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
        className={`h-11 w-full rounded-lg border bg-card px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-cta focus:ring-2 focus:ring-cta/20 ${
          error ? "border-destructive" : "border-input"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  )
}

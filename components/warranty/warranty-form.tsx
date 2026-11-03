"use client"

import { useState } from "react"
import { ArrowRight, Check, CheckCircle2, Loader2 } from "lucide-react"
import { LEAD_ERROR_MESSAGE, submitLead } from "@/lib/leads"

/** The series a customer can register; DURAPLUS is the impact door line. */
const SERIES = ["NOVA", "DURO PLAST", "PRESTIGE", "PRESTIGE+", "DURAPLUS", "Not sure"]

type FormState = {
  firstName: string
  lastName: string
  businessName: string
  email: string
  phone: string
  address: string
  invoiceNumber: string
  poName: string
  series: string
  installedByEcoGlass: boolean
}

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  businessName: "",
  email: "",
  phone: "",
  address: "",
  invoiceNumber: "",
  poName: "",
  series: "",
  installedByEcoGlass: false,
}

type Errors = Partial<Record<keyof FormState, string>>

export function WarrantyForm() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")
  const [honeypot, setHoneypot] = useState("")

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate() {
    const next: Errors = {}
    if (!form.firstName.trim()) next.firstName = "First name is required."
    if (!form.lastName.trim()) next.lastName = "Last name is required."
    if (!form.email.trim()) next.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address."
    if (!form.phone.trim()) next.phone = "Phone number is required."
    if (!form.address.trim()) next.address = "Project address is required."
    if (!form.invoiceNumber.trim()) next.invoiceNumber = "Invoice number is required."
    if (!form.series) next.series = "Choose the series of your windows or doors."
    if (!form.installedByEcoGlass)
      next.installedByEcoGlass = "The warranty covers only installations by EcoGlass's authorized installers."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending || !validate()) return
    setSending(true)
    setSendError("")
    const result = await submitLead({
      source: "warranty",
      firstName: form.firstName,
      lastName: form.lastName,
      businessName: form.businessName,
      email: form.email,
      phone: form.phone,
      location: form.address,
      invoiceNumber: form.invoiceNumber,
      poName: form.poName,
      productSeries: form.series,
      installedByEcoGlass: form.installedByEcoGlass,
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
          Registration received{form.firstName ? `, ${form.firstName}` : ""}.
        </h3>
        <p className="mx-auto mt-3 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
          Our team will check your invoice and installation. Once it&apos;s confirmed, we&apos;ll email your warranty
          certificate to {form.email || "you"}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First name" required placeholder="First name" value={form.firstName} error={errors.firstName} onChange={(v) => updateField("firstName", v)} />
        <Field label="Last name" required placeholder="Last name" value={form.lastName} error={errors.lastName} onChange={(v) => updateField("lastName", v)} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Email" required type="email" placeholder="you@example.com" value={form.email} error={errors.email} onChange={(v) => updateField("email", v)} />
        <Field label="Phone" required type="tel" placeholder="(###) ###-####" value={form.phone} error={errors.phone} onChange={(v) => updateField("phone", v)} />
      </div>
      <div className="mt-4">
        <Field label="Project address" required placeholder="Where the windows or doors were installed" value={form.address} error={errors.address} onChange={(v) => updateField("address", v)} />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Invoice number" required placeholder="From your EcoGlass invoice" value={form.invoiceNumber} error={errors.invoiceNumber} onChange={(v) => updateField("invoiceNumber", v)} />
        <Field label="Company name" placeholder="If a company placed the order" value={form.businessName} onChange={(v) => updateField("businessName", v)} />
      </div>
      <div className="mt-4">
        <Field label="PO name" placeholder="Purchase order name, if you have one" value={form.poName} onChange={(v) => updateField("poName", v)} />
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 block text-[13px] font-semibold text-forest">
          Product series<span className="text-cta"> *</span>
        </legend>
        <div className="flex flex-wrap gap-2" role="radiogroup">
          {SERIES.map((s) => {
            const on = form.series === s
            return (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => updateField("series", s)}
                className={`rounded-full border px-4 py-2 text-[13px] font-bold tracking-[0.04em] transition-colors ${
                  on ? "border-forest bg-forest text-white" : "border-input bg-offwhite text-forest hover:border-forest/40"
                }`}
              >
                {s}
              </button>
            )
          })}
        </div>
        {errors.series && <span className="mt-1.5 block text-xs text-destructive">{errors.series}</span>}
      </fieldset>

      <label className="mt-5 flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 flex h-5 w-5 shrink-0">
          <input
            type="checkbox"
            checked={form.installedByEcoGlass}
            onChange={(e) => updateField("installedByEcoGlass", e.target.checked)}
            aria-invalid={!!errors.installedByEcoGlass}
            className={`peer h-5 w-5 cursor-pointer appearance-none rounded-md border bg-offwhite transition-colors checked:border-forest checked:bg-forest focus-visible:ring-4 focus-visible:ring-cta/20 ${
              errors.installedByEcoGlass ? "border-destructive" : "border-input"
            }`}
          />
          <Check
            className="pointer-events-none absolute inset-0 m-auto h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100"
            strokeWidth={3}
            aria-hidden="true"
          />
        </span>
        <span className="text-[13.5px] leading-snug text-ink">
          My windows or doors were installed by EcoGlass&apos;s authorized installers.<span className="text-cta"> *</span>
          {errors.installedByEcoGlass && (
            <span className="mt-1 block text-xs text-destructive">{errors.installedByEcoGlass}</span>
          )}
        </span>
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
            Register my warranty
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        We confirm every registration against our records before a certificate is issued.
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
        {required ? <span className="text-cta"> *</span> : <span className="font-normal text-muted-foreground"> (optional)</span>}
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

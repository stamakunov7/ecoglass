"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import {
  Check,
  ArrowRight,
  ArrowLeft,
  X,
  Home,
  Hammer,
  RefreshCw,
  User,
  Briefcase,
  CheckCircle2,
  Loader2,
  type LucideIcon,
} from "lucide-react"
import { LEAD_ERROR_MESSAGE, submitLead, type LeadSpec } from "@/lib/leads"

/** A product designed in the configurator, sent along with a quote request. */
export type QuoteDetails = {
  title: string
  specs: LeadSpec[]
  quantity?: number
  link?: string
  /** Rendered in the modal's left panel (e.g. the live window preview). */
  preview?: ReactNode
}

type EstimateContextValue = {
  /** Opens the generic free-estimate form. Safe to pass straight to onClick. */
  open: () => void
  /** Opens the same form as a quote request for a designed product. */
  openQuote: (quote: QuoteDetails) => void
}

const EstimateContext = createContext<EstimateContextValue | null>(null)

export function useEstimate() {
  const ctx = useContext(EstimateContext)
  if (!ctx) throw new Error("useEstimate must be used within an EstimateProvider")
  return ctx
}

export function EstimateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [quote, setQuote] = useState<QuoteDetails | null>(null)
  const open = useCallback(() => {
    setQuote(null)
    setIsOpen(true)
  }, [])
  const openQuote = useCallback((details: QuoteDetails) => {
    setQuote(details)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <EstimateContext.Provider value={{ open, openQuote }}>
      {children}
      <EstimateModal open={isOpen} onClose={close} quote={quote} />
    </EstimateContext.Provider>
  )
}

/* ---------------- Modal ---------------- */

type Role = "homeowner" | "trade"
type ProjectType = "replacement" | "new" | "remodel"

type ProjectOption = {
  id: ProjectType
  icon: LucideIcon
  title: string
  body: string
}

const projectOptions: ProjectOption[] = [
  {
    id: "replacement",
    icon: RefreshCw,
    title: "Replacement only",
    body: "Replacement windows or doors with same size in an existing wall.",
  },
  {
    id: "new",
    icon: Home,
    title: "New home or addition",
    body: "Windows or doors for a new home or addition.",
  },
  {
    id: "remodel",
    icon: Hammer,
    title: "Remodel with new walls",
    body: "Putting windows or doors into new or modified walls as part of a remodel.",
  },
]

type FormState = {
  firstName: string
  lastName: string
  email: string
  mobile: string
  zip: string
}

const emptyForm: FormState = { firstName: "", lastName: "", email: "", mobile: "", zip: "" }

function EstimateModal({
  open,
  onClose,
  quote,
}: {
  open: boolean
  onClose: () => void
  quote: QuoteDetails | null
}) {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<Role | null>(null)
  const [projectType, setProjectType] = useState<ProjectType | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState("")
  const [honeypot, setHoneypot] = useState("")

  // Lock scroll + Escape to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  // Reset a moment after closing so the exit animation stays clean
  useEffect(() => {
    if (open) return
    const t = setTimeout(() => {
      setStep(1)
      setRole(null)
      setProjectType(null)
      setForm(emptyForm)
      setErrors({})
      setSubmitted(false)
      setSending(false)
      setSendError("")
      setHoneypot("")
    }, 250)
    return () => clearTimeout(t)
  }, [open])

  function selectRole(value: Role) {
    setRole(value)
    setStep(value === "trade" ? 3 : 2)
  }

  function selectProject(value: ProjectType) {
    setProjectType(value)
    setStep(3)
  }

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
    if (!form.mobile.trim()) next.mobile = "Mobile number is required."
    if (!form.zip.trim()) next.zip = "Zip code is required."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (sending || !validate()) return
    setSending(true)
    setSendError("")
    const result = await submitLead({
      source: quote ? "quote" : "estimate",
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.mobile,
      zip: form.zip,
      role: role === "trade" ? "Trade professional" : "Homeowner",
      projectType: projectOptions.find((p) => p.id === projectType)?.title,
      configuration: quote
        ? { title: quote.title, specs: quote.specs, quantity: quote.quantity, link: quote.link }
        : undefined,
      company: honeypot,
    })
    setSending(false)
    if (result.ok) setSubmitted(true)
    else setSendError(LEAD_ERROR_MESSAGE)
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center p-0 sm:p-4 md:p-6 ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close request a free estimate"
        onClick={onClose}
        className={`absolute inset-0 bg-forest-deep/70 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a free estimate"
        className={`relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden bg-card shadow-2xl shadow-forest-deep/40 transition-all duration-200 sm:h-auto sm:max-h-[92vh] sm:rounded-2xl md:flex-row ${
          open ? "translate-y-0 opacity-100 sm:scale-100" : "translate-y-3 opacity-0 sm:scale-95"
        }`}
      >
        {/* Left panel: the designed product for quotes, otherwise the estimate photo */}
        <div className="relative hidden shrink-0 md:block md:w-2/5">
          {quote ? (
            <QuoteSummary quote={quote} />
          ) : (
            <>
              <img
                src="/images/estimate.png"
                alt="EcoGlass professional measuring a window during an in-home estimate"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-lg font-bold text-white">Free, no-obligation estimates</p>
                <p className="mt-1 text-sm text-white/80">Built, supplied, and installed by EcoGlass in Central Florida.</p>
              </div>
            </>
          )}
        </div>

        {/* Right content */}
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-forest shadow-sm transition-colors hover:bg-muted md:text-forest"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
            {submitted ? (
              <SuccessView firstName={form.firstName} onClose={onClose} isQuote={!!quote} />
            ) : (
              <>
                {/* Header */}
                <div className="text-center">
                  <h2 className="font-display text-2xl font-extrabold text-forest sm:text-3xl">
                    {quote ? "Request a Quote" : "Request a Free Estimate"}
                  </h2>
                  <p className="mx-auto mt-2 max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                    {quote
                      ? `Tell us about your project to receive a no-obligation price quote on your ${quote.title} from EcoGlass.`
                      : "Tell us about your project to receive a no-obligation price quote on windows and doors from EcoGlass."}
                  </p>
                  {quote && (
                    <p className="mx-auto mt-4 inline-flex max-w-full items-center gap-2 rounded-full bg-sage/60 px-3.5 py-1.5 text-xs font-semibold text-forest md:hidden">
                      <span className="truncate">
                        {quote.title}
                        {quote.specs[0] ? ` · ${quote.specs[0].value}` : ""}
                      </span>
                    </p>
                  )}
                </div>

                {/* Progress */}
                <div className="mt-8">
                  <ProgressIndicator step={step} />
                </div>

                {/* Steps */}
                <div className="mx-auto mt-9 max-w-xl">
                  {step === 1 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <OptionCard
                        icon={User}
                        label="I'm a homeowner"
                        selected={role === "homeowner"}
                        onClick={() => selectRole("homeowner")}
                      />
                      <OptionCard
                        icon={Briefcase}
                        label="I'm a trade professional"
                        selected={role === "trade"}
                        onClick={() => selectRole("trade")}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-cta">
                        Choose a project type
                      </p>
                      <div className="mt-5 flex flex-col gap-3">
                        {projectOptions.map((opt) => (
                          <ProjectCard
                            key={opt.id}
                            option={opt}
                            selected={projectType === opt.id}
                            onClick={() => selectProject(opt.id)}
                          />
                        ))}
                      </div>
                      <div className="mt-7">
                        <PreviousButton onClick={() => setStep(1)} />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field
                          label="First name"
                          required
                          placeholder="Enter First Name"
                          value={form.firstName}
                          error={errors.firstName}
                          onChange={(v) => updateField("firstName", v)}
                        />
                        <Field
                          label="Last name"
                          required
                          placeholder="Enter Last Name"
                          value={form.lastName}
                          error={errors.lastName}
                          onChange={(v) => updateField("lastName", v)}
                        />
                      </div>
                      <div className="mt-4">
                        <Field
                          label="Email address"
                          required
                          type="email"
                          placeholder="Enter Valid Email Address"
                          value={form.email}
                          error={errors.email}
                          onChange={(v) => updateField("email", v)}
                        />
                      </div>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <Field
                          label="Mobile number"
                          required
                          type="tel"
                          placeholder="(###) ###-####"
                          value={form.mobile}
                          error={errors.mobile}
                          onChange={(v) => updateField("mobile", v)}
                        />
                        <Field
                          label="Zip code"
                          required
                          placeholder="Zip Code"
                          value={form.zip}
                          error={errors.zip}
                          onChange={(v) => updateField("zip", v)}
                        />
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

                      <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
                        By clicking &quot;Request a quote&quot;, you agree to be contacted by EcoGlass about your project.
                      </p>

                      {sendError && (
                        <p role="alert" className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-center text-sm text-destructive">
                          {sendError}
                        </p>
                      )}

                      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <PreviousButton onClick={() => setStep(role === "trade" ? 1 : 2)} />
                        <button
                          type="submit"
                          disabled={sending}
                          className="flex h-12 items-center justify-center gap-2 rounded-full bg-cta px-7 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark disabled:cursor-wait disabled:opacity-80"
                        >
                          {sending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                              Sending…
                            </>
                          ) : (
                            <>
                              Request a quote
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------- Pieces ---------------- */

function ProgressIndicator({ step }: { step: number }) {
  const steps = [1, 2, 3]
  return (
    <div className="flex items-start justify-center">
      {steps.map((n, i) => {
        const active = n <= step
        return (
          <div key={n} className="flex items-start">
            <div className="flex w-16 flex-col items-center sm:w-20">
              <span className={`text-sm font-bold ${active ? "text-forest" : "text-muted-foreground"}`}>
                Step {n}
              </span>
              <span
                className={`mt-2 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  active ? "border-cta bg-cta text-white" : "border-border bg-card text-muted-foreground/50"
                }`}
              >
                <Check className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`mt-[42px] h-0.5 w-12 rounded-full transition-colors sm:w-20 ${
                  step > n ? "bg-cta" : "bg-border"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function OptionCard({
  icon: Icon,
  label,
  selected,
  onClick,
}: {
  icon: LucideIcon
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 bg-card px-6 py-8 text-center transition-all hover:border-cta hover:bg-sage/30 ${
        selected ? "border-cta bg-sage/40 shadow-sm" : "border-border"
      }`}
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          selected ? "bg-cta text-white" : "bg-sage text-forest"
        }`}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <span className="text-[15px] font-semibold text-forest">{label}</span>
    </button>
  )
}

function ProjectCard({
  option,
  selected,
  onClick,
}: {
  option: ProjectOption
  selected: boolean
  onClick: () => void
}) {
  const Icon = option.icon
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-start gap-4 rounded-xl border-2 bg-card px-5 py-4 text-left transition-all hover:border-cta hover:bg-sage/30 ${
        selected ? "border-cta bg-sage/40 shadow-sm" : "border-border"
      }`}
    >
      <span
        className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          selected ? "bg-cta text-white" : "bg-sage text-forest"
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-[15px] font-bold text-forest">{option.title}</span>
        <span className="mt-0.5 block text-[13px] leading-relaxed text-muted-foreground">{option.body}</span>
      </span>
    </button>
  )
}

function PreviousButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-[15px] font-semibold text-forest transition-colors hover:bg-muted"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Previous
    </button>
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

function QuoteSummary({ quote }: { quote: QuoteDetails }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-offwhite">
      {quote.preview && <div className="border-b border-border bg-[#F3F1EC] px-6 pt-8 pb-4">{quote.preview}</div>}
      <div className="px-6 py-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta">Your design</p>
        <p className="mt-1 font-display text-xl font-extrabold leading-tight text-forest">{quote.title}</p>
        <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-card text-[13px]">
          {quote.specs.map((s) => (
            <div key={s.label} className="flex gap-3 px-4 py-2.5">
              <dt className="w-28 shrink-0 text-muted-foreground">{s.label}</dt>
              <dd className="font-semibold text-forest">{s.value}</dd>
            </div>
          ))}
          {quote.quantity && quote.quantity > 1 && (
            <div className="flex gap-3 px-4 py-2.5">
              <dt className="w-28 shrink-0 text-muted-foreground">Quantity</dt>
              <dd className="font-semibold text-forest">{quote.quantity}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  )
}

function SuccessView({
  firstName,
  onClose,
  isQuote,
}: {
  firstName: string
  onClose: () => void
  isQuote: boolean
}) {
  return (
    <div className="flex flex-col items-center py-10 text-center sm:py-16">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-cta">
        <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-display text-2xl font-extrabold text-forest sm:text-3xl">
        Thanks{firstName ? `, ${firstName}` : ""}!
      </h2>
      <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
        {isQuote
          ? "Your quote request and design have been received. A local EcoGlass representative will reach out shortly with pricing and to schedule your free in-home measurement."
          : "Your request has been received. A local EcoGlass representative will reach out shortly to schedule your free, no-obligation in-home estimate."}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-8 flex h-12 items-center justify-center rounded-full bg-cta px-8 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark"
      >
        Done
      </button>
    </div>
  )
}

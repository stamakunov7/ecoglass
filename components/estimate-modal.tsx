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
  type LucideIcon,
} from "lucide-react"

type EstimateContextValue = { open: () => void }

const EstimateContext = createContext<EstimateContextValue | null>(null)

export function useEstimate() {
  const ctx = useContext(EstimateContext)
  if (!ctx) throw new Error("useEstimate must be used within an EstimateProvider")
  return ctx
}

export function EstimateProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <EstimateContext.Provider value={{ open }}>
      {children}
      <EstimateModal open={isOpen} onClose={close} />
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

function EstimateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<Role | null>(null)
  const [projectType, setProjectType] = useState<ProjectType | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (validate()) setSubmitted(true)
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
        {/* Left image */}
        <div className="relative hidden shrink-0 md:block md:w-2/5">
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
              <SuccessView firstName={form.firstName} onClose={onClose} />
            ) : (
              <>
                {/* Header */}
                <div className="text-center">
                  <h2 className="font-display text-2xl font-extrabold text-forest sm:text-3xl">
                    Request a Free Estimate
                  </h2>
                  <p className="mx-auto mt-2 max-w-[46ch] text-[13px] leading-relaxed text-muted-foreground sm:text-sm">
                    Tell us about your project to receive a no-obligation price quote on windows and doors from EcoGlass.
                  </p>
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

                      <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
                        By clicking &quot;Request a quote&quot;, I agree to the terms below.
                      </p>

                      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <PreviousButton onClick={() => setStep(role === "trade" ? 1 : 2)} />
                        <button
                          type="submit"
                          className="flex h-12 items-center justify-center gap-2 rounded-full bg-cta px-7 text-[15px] font-semibold text-white shadow-sm shadow-cta/30 transition-colors hover:bg-cta-dark"
                        >
                          Request a quote
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
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

function SuccessView({ firstName, onClose }: { firstName: string; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-10 text-center sm:py-16">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage text-cta">
        <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
      </span>
      <h2 className="mt-6 font-display text-2xl font-extrabold text-forest sm:text-3xl">
        Thanks{firstName ? `, ${firstName}` : ""}!
      </h2>
      <p className="mx-auto mt-3 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
        Your request has been received. A local EcoGlass representative will reach out shortly to schedule your free,
        no-obligation in-home estimate.
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

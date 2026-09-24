"use client"

import { Check } from "lucide-react"
import type { StepDef } from "@/lib/configurator/selection"
import type { StepId } from "@/lib/configurator/types"

export function Stepper({
  steps,
  current,
  isComplete,
  onSelect,
}: {
  steps: StepDef[]
  current: StepId
  isComplete: (id: StepId) => boolean
  onSelect: (id: StepId) => void
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <ol
        className="grid min-w-[480px] border-y border-border py-4"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((step, i) => {
          const done = isComplete(step.id)
          const active = step.id === current
          const linkDone = done && i < steps.length - 1
          return (
            <li key={step.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onSelect(step.id)}
                aria-current={active ? "step" : undefined}
                className="group flex w-full flex-col items-center"
              >
                <span
                  className={`text-[12px] font-bold transition-colors sm:text-[13px] ${
                    active || done ? "text-forest" : "text-muted-foreground group-hover:text-forest"
                  }`}
                >
                  {step.label}
                </span>
                <span className="mt-0.5 h-3.5 text-[10px] leading-none text-muted-foreground">
                  {step.id === "summary" ? "" : step.required ? "Required" : "Optional"}
                </span>
                <span className="relative mt-2.5 flex h-7 w-full items-center justify-center">
                  {i < steps.length - 1 && (
                    <span
                      className={`absolute left-1/2 top-1/2 h-0.5 w-full -translate-y-1/2 transition-colors duration-300 ${
                        linkDone ? "bg-cta" : "bg-border"
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  {done ? (
                    <span
                      className={`relative flex h-7 w-7 items-center justify-center rounded-full bg-cta text-white shadow-sm shadow-cta/30 transition-transform ${
                        active ? "ring-4 ring-cta/20" : ""
                      }`}
                    >
                      <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                    </span>
                  ) : active ? (
                    <span className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-cta bg-card">
                      <span className="h-2.5 w-2.5 rounded-full bg-cta" />
                    </span>
                  ) : (
                    <span className="relative h-3.5 w-3.5 rounded-full border-2 border-border bg-card transition-colors group-hover:border-forest/40" />
                  )}
                </span>
                <span className="sr-only">{done ? " (completed)" : ""}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

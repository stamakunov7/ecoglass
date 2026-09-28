"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, RotateCcw } from "lucide-react"
import { useEstimate } from "@/components/estimate-modal"
import { Reveal } from "@/components/reveal"

export type QuizBrand = { slug: string; name: string; href: string; image: string; alt: string; tagline: string }

type Option = { label: string; scores: Record<string, number> }

/**
 * Points each answer gives to a brand. Based on how the brands are positioned
 * (see lib/configurator/catalog.ts) — update alongside the real brand data.
 */
const QUESTIONS: { question: string; options: Option[] }[] = [
  {
    question: "What matters most to you?",
    options: [
      { label: "Best value", scores: { nova: 2, "duro-plast": 2 } },
      { label: "Modern, slim look", scores: { nova: 3, "prestige-plus": 1 } },
      { label: "Durability, low upkeep", scores: { "duro-plast": 3 } },
      { label: "Premium finish", scores: { prestige: 2, "prestige-plus": 2 } },
    ],
  },
  {
    question: "What budget are you planning for?",
    options: [
      { label: "Keep it practical", scores: { nova: 2, "duro-plast": 2 } },
      { label: "Mid-range", scores: { nova: 1, prestige: 2, "duro-plast": 1 } },
      { label: "Premium", scores: { prestige: 2, "prestige-plus": 1 } },
      { label: "Top of the line", scores: { "prestige-plus": 3 } },
    ],
  },
  {
    question: "Which style fits your home?",
    options: [
      { label: "Clean and contemporary", scores: { nova: 2, "prestige-plus": 1 } },
      { label: "Classic and refined", scores: { prestige: 3 } },
      { label: "Rugged and practical", scores: { "duro-plast": 3 } },
      { label: "A sleek statement", scores: { "prestige-plus": 3 } },
    ],
  },
]

export function BrandQuiz({ brands, backdrop, cta }: { brands: QuizBrand[]; backdrop: string; cta: string }) {
  const { open: openEstimate } = useEstimate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(QUESTIONS.map(() => null))
  const done = step >= QUESTIONS.length

  const match = done
    ? brands.reduce<{ brand: QuizBrand; score: number } | null>((best, brand) => {
        const score = answers.reduce<number>(
          (sum, a, q) => sum + (a === null ? 0 : QUESTIONS[q].options[a].scores[brand.slug] ?? 0),
          0,
        )
        return !best || score > best.score ? { brand, score } : best
      }, null)?.brand
    : null

  function choose(option: number) {
    setAnswers((prev) => prev.map((a, i) => (i === step ? option : a)))
  }

  function restart() {
    setAnswers(QUESTIONS.map(() => null))
    setStep(0)
  }

  const current = QUESTIONS[step]

  return (
    <section className="relative isolate overflow-hidden bg-forest-deep">
      <Image src={backdrop} alt="" fill sizes="100vw" className="-z-20 scale-110 object-cover blur-[22px] saturate-[1.2]" />
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(8_26_21/0.92)_0%,rgb(8_26_21/0.72)_55%,rgb(8_26_21/0.5)_100%)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-5 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        <Reveal>
          <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#9fd3a2] sm:text-xs">
            <span className="h-px w-11 bg-[#9fd3a2]" aria-hidden="true" />
            Help me choose
          </p>
          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl lg:text-[56px]">
            Not sure which <span className="font-serif font-normal italic text-[#cfe8cf]">fits?</span>
          </h2>
          <p className="mt-5 max-w-[520px] text-[17px] leading-relaxed text-[#c9d6d0]">
            Three quick questions and we&apos;ll point you to your match — or we&apos;ll bring samples of every brand to
            your home.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="rounded-[28px] border border-white/25 bg-white/10 p-6 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-xl backdrop-saturate-150 sm:p-10"
            aria-live="polite"
          >
            {!done ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#c3d0ca]">
                    Question {step + 1} of {QUESTIONS.length}
                  </span>
                  <span className="flex gap-1.5" aria-hidden="true">
                    {QUESTIONS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 w-8 rounded-full transition-colors duration-300 ${i <= step ? "bg-[#9fd3a2]" : "bg-white/25"}`}
                      />
                    ))}
                  </span>
                </div>
                <p className="mt-5 font-display text-2xl font-bold text-white sm:text-[28px]">{current.question}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={current.question}>
                  {current.options.map((o, i) => {
                    const selected = answers[step] === i
                    return (
                      <button
                        key={o.label}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => choose(i)}
                        className={`h-[60px] rounded-2xl border px-4 text-[15px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 ${
                          selected
                            ? "border-[#9fd3a2] bg-[#9fd3a2]/25"
                            : "border-white/30 bg-white/[0.08] hover:border-white/55 hover:bg-white/20"
                        }`}
                      >
                        {o.label}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-7 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className={`text-[14px] font-semibold text-[#c3d0ca] transition-colors hover:text-white ${step === 0 ? "invisible" : ""}`}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={answers[step] === null}
                    className="shine inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-7 text-[15px] font-bold text-forest transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {step === QUESTIONS.length - 1 ? "See my match" : "Next question"}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : (
              match && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#9fd3a2]">Your match</p>
                  <div className="mt-5 flex items-center gap-5">
                    <Image
                      src={match.image}
                      alt={match.alt}
                      width={120}
                      height={96}
                      className="h-24 w-[120px] shrink-0 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-display text-3xl font-extrabold text-white">{match.name}</p>
                      <p className="mt-1 font-serif text-xl italic text-[#cfe8cf]">{match.tagline}</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={match.href}
                      className="shine inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-[15px] font-bold text-forest"
                    >
                      {cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <button
                      type="button"
                      onClick={openEstimate}
                      className="inline-flex h-[52px] items-center justify-center rounded-full border border-white/35 bg-white/10 px-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/20"
                    >
                      Book a free in-home visit
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={restart}
                    className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#c3d0ca] transition-colors hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Start over
                  </button>
                </div>
              )
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

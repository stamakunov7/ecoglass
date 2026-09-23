import { ArrowUpRight, PenLine } from "lucide-react"

const PLACE_ID = "ChIJ52NeRhRy54gRw-TSUPoZ1vA"
const REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`
const LISTING_URL = "https://www.google.com/maps?cid=17354086777007301827"
const RATING = 4.7
const COUNT = 103

type Review = {
  name: string
  stars: number
  tag?: string
  text: string
}

const reviews: Review[] = [
  {
    name: "Tami Cinquemani",
    stars: 5,
    tag: "Local Guide",
    text: "I had replaced my home windows with ECO Glass several years ago and was so impressed with the high quality and the energy savings.",
  },
  {
    name: "Keri Troyano",
    stars: 5,
    text: "The buying process was extremely simple. The windows arrived in excellent condition and appear to be a high-end quality product.",
  },
  {
    name: "Jeff Cokeroft",
    stars: 4,
    tag: "Local Guide",
    text: "We had 8 windows installed by this company. We picked them because the price was the best for our budget, and the salesman was friendly, prompt and very sharp.",
  },
]

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  )
}

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100))
  const star = (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8L10 1.5z"
      />
    </svg>
  )
  return (
    <span className="relative inline-flex" role="img" aria-label={`${value} out of 5 stars`}>
      <span className="inline-flex text-border">
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i}>{star}</span>
        ))}
      </span>
      <span className="absolute inset-0 inline-flex overflow-hidden text-[#FBBC05]" style={{ width: `${pct}%` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i}>{star}</span>
        ))}
      </span>
    </span>
  )
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="bg-offwhite">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cta sm:text-xs">Reviews</p>
            <h2 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight text-forest text-balance sm:text-4xl lg:text-5xl">
              Trusted by homeowners across Central Florida
            </h2>
            <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-muted-foreground sm:text-base">
              Real reviews from real EcoGlass customers. See why neighbors across Longwood and Central Florida choose us
              for their windows and doors.
            </p>
          </div>

          {/* Rating summary + actions */}
          <div className="flex shrink-0 flex-col gap-6 lg:items-end">
            <div className="flex items-center gap-5">
              <span className="font-display text-[3.5rem] font-extrabold leading-none tracking-tight text-forest sm:text-6xl">
                {RATING.toFixed(1)}
              </span>
              <span className="h-14 w-px bg-border" aria-hidden="true" />
              <div>
                <Stars value={RATING} className="h-[22px] w-[22px]" />
                <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground">
                  <GoogleG className="h-4 w-4" />
                  Based on {COUNT} Google reviews
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cta px-6 text-[15px] font-semibold text-white shadow-lg shadow-cta/25 transition-all hover:bg-cta-dark hover:shadow-cta/40"
              >
                <PenLine className="h-4 w-4" aria-hidden="true" />
                Leave a review
              </a>
              <a
                href={LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[15px] font-semibold text-forest transition-colors hover:text-cta"
              >
                Read all reviews
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3">
          {reviews.map(({ name, stars, tag, text }) => (
            <figure
              key={name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md hover:shadow-forest/10"
            >
              <div className="flex items-center justify-between">
                <Stars value={stars} className="h-[18px] w-[18px]" />
                <GoogleG className="h-5 w-5" />
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">“{text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-forest to-forest-deep text-sm font-bold text-white">
                  {name.charAt(0)}
                </span>
                <span>
                  <span className="block text-[14px] font-bold leading-tight text-forest">{name}</span>
                  <span className="text-[12px] text-muted-foreground">{tag ? `${tag} · ` : ""}Google review</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

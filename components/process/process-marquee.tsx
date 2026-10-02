const PHRASES = [
  "Free in-home estimate",
  "Built in our Longwood factory",
  "Permits handled for you",
  "In-house installers",
  "Clean-up included",
  "One point of contact",
]

/** An endless, slow ribbon of what every project includes. */
export function ProcessMarquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {PHRASES.map((phrase, i) => (
        <li key={phrase} className="flex items-center">
          <span
            className={`whitespace-nowrap px-8 text-3xl leading-none text-forest sm:px-10 sm:text-[44px] ${
              i % 2 ? "font-serif italic text-cta-dark" : "font-display font-extrabold tracking-[-0.03em]"
            }`}
          >
            {phrase}
          </span>
          <span className="h-2 w-2 rotate-45 bg-cta" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <section
      aria-label="Included with every project"
      className="group overflow-hidden border-y border-forest/10 bg-card py-8 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] sm:py-10"
    >
      <div className="marquee flex w-max group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </section>
  )
}

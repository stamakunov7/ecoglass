import Link from "next/link"

export function BrandLogo({
  className = "",
  onDark,
}: {
  className?: string
  /** For dark surfaces: true shows the white-lettered version, and toggling it crossfades between the two. */
  onDark?: boolean
}) {
  const logo = (
    <span className="relative inline-flex">
      <img
        src="/images/ecoglass-logo.svg?v=2"
        alt="EcoGlass Windows & Doors"
        width={220}
        height={81}
        className={`h-9 w-auto object-contain transition-opacity duration-300 sm:h-10 ${onDark ? "opacity-0" : "opacity-100"}`}
      />
      {onDark !== undefined && (
        <img
          src="/images/ecoglass-logo-light.svg"
          alt=""
          aria-hidden="true"
          width={220}
          height={81}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${onDark ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </span>
  )

  return (
    <Link
      href="/"
      aria-label="EcoGlass Windows & Doors — go to homepage"
      className={`inline-flex items-center rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`}
    >
      {logo}
    </Link>
  )
}

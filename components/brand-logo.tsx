import Link from "next/link"

export function BrandLogo({
  className = "",
  variant = "light",
  onDark,
}: {
  className?: string
  variant?: "light" | "dark"
  /** Set when the logo sits over imagery that can change: true crossfades to the white-lettered version. */
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

  const base =
    variant === "dark"
      ? "inline-flex items-center rounded-lg bg-white px-3 py-2"
      : "inline-flex items-center"

  return (
    <Link
      href="/"
      aria-label="EcoGlass Windows & Doors — go to homepage"
      className={`${base} rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${className}`}
    >
      {logo}
    </Link>
  )
}

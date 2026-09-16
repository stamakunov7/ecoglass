import Image from "next/image"
import Link from "next/link"

export function BrandLogo({
  className = "",
  variant = "light",
}: {
  className?: string
  variant?: "light" | "dark"
}) {
  const logo = (
    <Image
      src="/images/ecoglass-logo.png"
      alt="EcoGlass Windows & Doors"
      width={220}
      height={64}
      priority
      className="h-9 w-auto object-contain sm:h-10"
    />
  )

  const base =
    variant === "dark"
      ? "inline-flex items-center rounded-lg bg-white px-3 py-2"
      : "inline-flex items-center"

  return (
    <Link
      href="/"
      aria-label="EcoGlass Windows & Doors — go to homepage"
      className={`${base} rounded-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 ${className}`}
    >
      {logo}
    </Link>
  )
}

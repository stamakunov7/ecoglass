import Image from "next/image"

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

  if (variant === "dark") {
    return (
      <div className={`inline-flex items-center rounded-lg bg-white px-3 py-2 ${className}`}>{logo}</div>
    )
  }

  return <div className={`flex items-center ${className}`}>{logo}</div>
}

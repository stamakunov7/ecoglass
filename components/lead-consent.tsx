import Link from "next/link"

const link = "font-semibold text-forest underline decoration-forest/25 underline-offset-4 hover:decoration-forest"

export function LeadConsent({ action }: { action: string }) {
  return (
    <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
      By {action}, you agree to be contacted by EcoGlass about your project, and to our{" "}
      <Link href="/privacy" className={link}>
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="/terms" className={link}>
        Terms
      </Link>
      .
    </p>
  )
}

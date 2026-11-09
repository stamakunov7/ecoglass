import { SITE } from "@/lib/site"
import { cn } from "@/lib/utils"

type Network = { label: string; href: string; icon: typeof InstagramIcon }

const networks: Network[] = [
  { label: "Instagram", href: SITE.social.instagram, icon: InstagramIcon },
  { label: "Facebook", href: SITE.social.facebook, icon: FacebookIcon },
  { label: "TikTok", href: SITE.social.tiktok, icon: TikTokIcon },
]

export function SocialLinks({
  onDark = false,
  compact = false,
  className,
}: {
  onDark?: boolean
  /** Smaller icons for tight spots such as the header's top bar. */
  compact?: boolean
  className?: string
}) {
  const items = networks.filter((n) => n.href)
  if (!items.length) return null

  const color = onDark
    ? compact
      ? "text-white/70 hover:text-[#9fd3a2] focus-visible:outline-[#9fd3a2]"
      : "border border-white/15 text-white/70 hover:border-[#9fd3a2]/70 hover:bg-[#9fd3a2]/10 hover:text-white focus-visible:outline-[#9fd3a2]"
    : "text-forest/70 hover:text-forest focus-visible:outline-forest"

  return (
    <ul className={cn("flex items-center", compact ? "gap-0.5" : "gap-2.5", className)}>
      {items.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SITE.shortName} on ${label} (opens in a new tab)`}
            title={label}
            className={cn(
              "flex items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
              compact ? "h-7 w-7" : "h-11 w-11",
              color,
            )}
          >
            <Icon className={compact ? "h-3.5 w-3.5" : "h-[18px] w-[18px]"} />
          </a>
        </li>
      ))}
    </ul>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 22v-8.2h2.8l.4-3.2h-3.2V8.6c0-.9.3-1.6 1.6-1.6h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.4 0-4.1 1.5-4.1 4.2v2.4H7.5v3.2h2.7V22z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14.6 3c.3 2.4 1.7 4.2 4.1 4.5v2.6c-1.4 0-2.7-.5-3.8-1.3v6.7c0 3.4-2.7 6.2-6.2 6.2S2.5 18.9 2.5 15.4c0-3.4 2.7-6.1 6.1-6.2v2.7c-1.9.1-3.4 1.6-3.4 3.5s1.5 3.5 3.5 3.5 3.5-1.6 3.5-3.5V3h2.4z" />
    </svg>
  )
}

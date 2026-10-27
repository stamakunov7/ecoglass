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
  className,
}: {
  onDark?: boolean
  className?: string
}) {
  const items = networks.filter((n) => n.href)
  if (!items.length) return null

  const color = onDark
    ? "text-white/70 hover:text-white hover:bg-white/10"
    : "text-forest/70 hover:text-forest hover:bg-sage/80"

  return (
    <ul className={cn("flex items-center gap-1.5", className)}>
      {items.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={cn("flex h-9 w-9 items-center justify-center rounded-full transition-colors", color)}
          >
            <Icon className="h-4 w-4" />
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
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z" />
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

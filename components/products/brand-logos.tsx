/**
 * Temporary vector logo treatments for the awning brands.
 * Each renders a mark + wordmark and can be swapped later for a real
 * asset in /public by replacing the returned SVG with an <Image />.
 */

type LogoProps = { className?: string }

/** Fixed-size frame so every mark shares the same box and baseline regardless of its own viewBox proportions. */
function LogoFrame({ children, label, color }: { children: React.ReactNode; label: string; color: string }) {
  return (
    <div className="flex w-28 flex-col items-center gap-2">
      <div className="flex h-11 w-full items-center justify-center">{children}</div>
      <p className="text-center text-[13px] font-bold leading-none tracking-[0.22em]" style={{ color }}>
        {label}
      </p>
    </div>
  )
}

export function NovaLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <LogoFrame label="NOVA" color="#1e2a52">
        <svg viewBox="0 0 64 64" className="h-11 w-11" role="img" aria-label="NOVA logo">
          <path d="M14 50V14h7l22 26V14h7v36h-7L21 24v26h-7z" fill="#1e2a52" />
        </svg>
      </LogoFrame>
    </div>
  )
}

export function PrestigeLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <LogoFrame label="PRESTIGE" color="#b8933f">
        <svg viewBox="0 0 64 64" className="h-11 w-11" role="img" aria-label="PRESTIGE logo">
          <rect x="12" y="12" width="40" height="40" rx="2" fill="none" stroke="#b8933f" strokeWidth="3.5" />
          <rect x="24" y="24" width="16" height="16" rx="1" fill="#b8933f" />
        </svg>
      </LogoFrame>
    </div>
  )
}

export function DuroPlastLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <LogoFrame label="DURO PLAST" color="#1d4e89">
        <svg viewBox="0 0 72 64" className="h-11 w-12" role="img" aria-label="DURO PLAST logo">
          <path d="M12 12h14a18 18 0 0 1 0 36H12V12zm8 8v20h6a10 10 0 0 0 0-20h-6z" fill="#1d4e89" />
          <path d="M40 12h16a12 12 0 0 1 0 24h-8v12h-8V12zm8 8v8h8a4 4 0 0 0 0-8h-8z" fill="#1d4e89" />
        </svg>
      </LogoFrame>
    </div>
  )
}

export function PrestigePlusLogo({ className }: LogoProps) {
  return (
    <div className={className}>
      <LogoFrame label="PRESTIGE+" color="#1f2933">
        <svg viewBox="0 0 72 64" className="h-11 w-12" role="img" aria-label="PRESTIGE+ logo">
          <path d="M16 12h18a13 13 0 0 1 0 26h-9v14h-9V12zm9 8v10h9a5 5 0 0 0 0-10h-9z" fill="#1f2933" />
          <path d="M52 22h6v8h8v6h-8v8h-6v-8h-8v-6h8v-8z" fill="#1f2933" />
        </svg>
      </LogoFrame>
    </div>
  )
}

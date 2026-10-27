export type ConsentChoice = "granted" | "denied"

export const CONSENT_COOKIE = "ecoglass_consent"
const MAX_AGE = 60 * 60 * 24 * 365

const listeners = new Set<() => void>()

function cookieSuffix() {
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : ""
  return `; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`
}

export function readConsent(): ConsentChoice | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`))
  return match ? (match[1] as ConsentChoice) : null
}

export function writeConsent(choice: ConsentChoice) {
  if (typeof document === "undefined") return
  document.cookie = `${CONSENT_COOKIE}=${choice}${cookieSuffix()}`
  listeners.forEach((l) => l())
}

export function subscribeConsent(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
  }
}

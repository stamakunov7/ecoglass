export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "ttclid",
] as const

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number]
export type Attribution = Partial<Record<AttributionKey, string>>

const STORAGE_KEY = "ecoglass_attr"
const COOKIE = "ecoglass_attr"
const MAX_AGE = 90 * 24 * 60 * 60

function sanitize(value: string) {
  return value.trim().slice(0, 200)
}

function parse(raw: string | null): Attribution {
  if (!raw) return {}
  try {
    const data = JSON.parse(raw) as Record<string, unknown>
    const out: Attribution = {}
    for (const key of ATTRIBUTION_KEYS) {
      const value = data[key]
      if (typeof value === "string" && value.trim()) out[key] = sanitize(value)
    }
    return out
  } catch {
    return {}
  }
}

function persist(data: Attribution) {
  const json = JSON.stringify(data)
  try {
    sessionStorage.setItem(STORAGE_KEY, json)
  } catch {
    /* private mode */
  }
  const secure = location.protocol === "https:" ? "; Secure" : ""
  document.cookie = `${COOKIE}=${encodeURIComponent(json)}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`
}

/** Last-touch: new landing params overwrite stored ones; a visit without params keeps the previous click. */
export function captureAttribution() {
  if (typeof window === "undefined") return
  const params = new URLSearchParams(window.location.search)
  const incoming: Attribution = {}
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)
    if (value) incoming[key] = sanitize(value)
  }
  if (!Object.keys(incoming).length) return
  persist({ ...readAttribution(), ...incoming })
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {}
  try {
    const fromSession = parse(sessionStorage.getItem(STORAGE_KEY))
    if (Object.keys(fromSession).length) return fromSession
  } catch {
    /* ignore */
  }
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`))
  return parse(match ? decodeURIComponent(match[1]) : null)
}

export const THANK_YOU_NAME_KEY = "ecoglass_lead_name"

export function rememberLeadName(name: string) {
  try {
    sessionStorage.setItem(THANK_YOU_NAME_KEY, name.trim().slice(0, 80))
  } catch {
    /* ignore */
  }
}

export function peekLeadName() {
  try {
    return sessionStorage.getItem(THANK_YOU_NAME_KEY) ?? ""
  } catch {
    return ""
  }
}

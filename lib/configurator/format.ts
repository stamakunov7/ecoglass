const EIGHTHS = ["", "1/8", "1/4", "3/8", "1/2", "5/8", "3/4", "7/8"]

/** Fraction choices for custom-size inputs (value = number of eighths). */
export const EIGHTH_OPTIONS = EIGHTHS.map((label, value) => ({ value, label: label || "0" }))

/** Splits inches into whole inches + eighths, rounded to the nearest 1/8". */
export function splitInches(value: number) {
  let whole = Math.floor(value)
  let eighths = Math.round((value - whole) * 8)
  if (eighths === 8) {
    whole += 1
    eighths = 0
  }
  return { whole, eighths, fraction: EIGHTHS[eighths] }
}

/** 41.5 → `41 1/2"` */
export function formatInches(value: number) {
  const { whole, fraction } = splitInches(value)
  return fraction ? `${whole} ${fraction}"` : `${whole}"`
}

/** `41 1/2" W × 23 1/2" H` */
export function formatSize(width: number, height: number) {
  return `${formatInches(width)} W × ${formatInches(height)} H`
}

function toRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** Mixes a color toward white (amount > 0) or black (amount < 0). `amount` is -1…1. */
export function shade(hex: string, amount: number) {
  const target = amount < 0 ? 0 : 255
  const p = Math.min(1, Math.abs(amount))
  const [r, g, b] = toRgb(hex).map((c) => Math.round((target - c) * p + c))
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}

/** True for colors dark enough that highlights should lighten rather than darken. */
export function isDark(hex: string) {
  const [r, g, b] = toRgb(hex)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.45
}

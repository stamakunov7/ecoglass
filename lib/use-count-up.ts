import { useEffect, useState } from "react"

/** Counts from 0 up to `value` once, after `delay` ms. Renders the final value on the server. */
export function useCountUp(value: number, delay: number, decimals = 0) {
  const [current, setCurrent] = useState(value)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let frame = 0
    setCurrent(0)
    const timeout = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400)
        const eased = 1 - Math.pow(1 - t, 3)
        setCurrent(value * eased)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay)
    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
    }
  }, [value, delay])
  return current.toFixed(decimals)
}

import type Lenis from "lenis"

let lenis: Lenis | null = null
let glideId = 0
let gliding = false

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function hasSmoothScroll() {
  return lenis !== null
}

/** True while a `glideTo` is moving the page, so scroll-driven helpers can stand down. */
export function isGliding() {
  return gliding
}

const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2

/**
 * Slowly carries the page to a target. With smooth scrolling on, the user's own scrolling is held
 * until it arrives; without it, falls back to the browser's smooth scroll.
 */
export function glideTo(target: HTMLElement | number, duration = 2.4) {
  if (!lenis) {
    if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" })
    else target.scrollIntoView({ behavior: "smooth", block: "start" })
    return
  }
  const id = ++glideId
  gliding = true
  const done = () => {
    if (id === glideId) gliding = false
  }
  lenis.scrollTo(target, { duration, easing: easeInOutSine, lock: true, force: true, onComplete: done })
  // Safety net in case the glide is cut short and never reports completion.
  window.setTimeout(done, duration * 1000 + 400)
}

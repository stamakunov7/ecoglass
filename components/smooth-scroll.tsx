"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { setLenis } from "@/lib/smooth-scroll"

/** Weighted, inertial wheel scrolling across the site. Touch scrolling stays native. */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      autoRaf: true,
      // Pauses itself whenever the page is locked (e.g. while the photo viewer is open).
      autoToggle: true,
      // Lets scrollable panels like the estimate form scroll on their own.
      allowNestedScroll: true,
      // Drops leftover momentum when a link to another page is clicked.
      stopInertiaOnNavigate: true,
    })
    setLenis(lenis)

    // Next treats a link to the section already in the address bar as a no-op, so clicking
    // "Direct Local Manufacturing" again after scrolling away did nothing. Jump there ourselves.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.("a[href]")
      if (!(link instanceof HTMLAnchorElement) || !link.hash || link.href !== window.location.href) return
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)))
      if (target) requestAnimationFrame(() => target.scrollIntoView())
    }
    window.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("click", onClick)
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return null
}

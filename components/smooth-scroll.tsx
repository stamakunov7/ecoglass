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
    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return null
}

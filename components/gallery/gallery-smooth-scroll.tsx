"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { setLenis } from "@/lib/smooth-scroll"

/** Weighted, inertial wheel scrolling for the gallery. Touch scrolling stays native. */
export function GallerySmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.085,
      autoRaf: true,
      // Pauses itself whenever the page is locked (e.g. while the photo viewer is open).
      autoToggle: true,
      // Lets scrollable panels like the estimate form scroll on their own.
      allowNestedScroll: true,
    })
    setLenis(lenis)
    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return null
}

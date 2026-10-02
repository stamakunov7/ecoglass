"use client"

import { useEffect, useRef, useState } from "react"

const PROCESS_VIDEO = {
  desktop: "/videos/process-hero.mp4",
  // Lighter 720p encode for phones.
  mobile: "/videos/process-hero-720.mp4",
  poster: "/images/process-hero-poster.webp",
}

export function ProcessVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // A cached video can fire canplay before hydration attaches onCanPlay.
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) setReady(true)

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      if (reduceMotion.matches) {
        video.pause()
      } else {
        video.play().catch(() => {})
      }
    }
    sync()
    reduceMotion.addEventListener("change", sync)
    return () => reduceMotion.removeEventListener("change", sync)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        poster={PROCESS_VIDEO.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        tabIndex={-1}
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 h-full w-full scale-[1.02] object-cover transition-opacity duration-[1400ms] ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={PROCESS_VIDEO.mobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={PROCESS_VIDEO.desktop} type="video/mp4" />
      </video>
      {/* Brand tint: denser where the copy sits, lighter through the middle so the footage reads */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/85 via-forest-deep/55 to-forest-deep/90" />
    </div>
  )
}

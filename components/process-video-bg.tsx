"use client"

import { useEffect, useRef, useState } from "react"

const PROCESS_VIDEO_SRC = "/videos/process-bg.mp4"

export function ProcessVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

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
        src={PROCESS_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 h-full w-full scale-[1.02] object-cover transition-opacity duration-[1400ms] ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Brand tint: denser where the copy sits, lighter through the middle so the footage reads */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/80 via-forest-deep/45 to-forest-deep/85" />
    </div>
  )
}

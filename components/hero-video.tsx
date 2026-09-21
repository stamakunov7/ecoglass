"use client"

import { useEffect, useRef, useState } from "react"

const HERO_VIDEO_SRC =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero_video-2UAgVo25a7flHAiicrky8kW5wEyIvZ.mp4"

export function HeroVideo() {
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
    <div className="absolute inset-0 overflow-hidden">
      <img
        src="/images/hero-home.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        poster="/images/hero-home.png"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 h-full w-full scale-[1.02] object-cover transition-opacity duration-[1400ms] ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
}

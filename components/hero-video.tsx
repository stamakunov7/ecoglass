"use client"

import { useEffect, useRef, useState } from "react"

const HERO_VIDEO = {
  desktop: "/videos/hero-florida.mp4",
  // Lighter 720p encode for phones.
  mobile: "/videos/hero-florida-720.mp4",
  poster: "/images/hero-florida-poster.webp",
}

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // A fast (local, cached) video can fire canplay before hydration attaches onCanPlay.
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
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={HERO_VIDEO.poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        poster={HERO_VIDEO.poster}
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
      >
        <source src={HERO_VIDEO.mobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={HERO_VIDEO.desktop} type="video/mp4" />
      </video>
    </div>
  )
}

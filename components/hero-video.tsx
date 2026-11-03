"use client"

import { useBackgroundVideo, VideoSources, type VideoSet } from "./background-video"

const HERO_VIDEO: VideoSet = {
  portrait: "/videos/hero-florida-portrait.mp4",
  medium: "/videos/hero-florida-720.mp4",
  full: "/videos/hero-florida.mp4",
  poster: "/images/hero-florida-poster.webp",
}

export function HeroVideo() {
  const { videoRef, load, ready, onCanPlay } = useBackgroundVideo()

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        src={HERO_VIDEO.poster}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        onCanPlay={onCanPlay}
        className={`absolute inset-0 h-full w-full scale-[1.02] object-cover transition-opacity duration-[1400ms] ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {load && <VideoSources set={HERO_VIDEO} />}
      </video>
    </div>
  )
}

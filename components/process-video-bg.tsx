"use client"

import { useBackgroundVideo, VideoSources, type VideoSet } from "./background-video"

export const PROCESS_VIDEO: VideoSet = {
  portrait: "/videos/process-hero-portrait.mp4",
  medium: "/videos/process-hero-720.mp4",
  full: "/videos/process-hero.mp4",
  poster: "/images/process-hero-poster.webp",
}

export function ProcessVideoBg() {
  const { videoRef, load, ready, onCanPlay } = useBackgroundVideo()

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src={PROCESS_VIDEO.poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        poster={PROCESS_VIDEO.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
        onCanPlay={onCanPlay}
        className={`absolute inset-0 h-full w-full scale-[1.02] object-cover transition-opacity duration-[1400ms] ease-out ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {load && <VideoSources set={PROCESS_VIDEO} />}
      </video>
      {/* Brand tint: denser where the copy sits, lighter through the middle so the footage reads */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/85 via-forest-deep/55 to-forest-deep/90" />
    </div>
  )
}

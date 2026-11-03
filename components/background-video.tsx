"use client"

import { useEffect, useRef, useState } from "react"

/** One background clip in three encodes, so each screen downloads only what it can show. */
export type VideoSet = {
  /** Centre crop for phones held upright, where a 16:9 frame is mostly cropped away anyway */
  portrait: string
  /** 720p for phones on their side and tablets */
  medium: string
  /** 1080p for larger screens */
  full: string
  poster: string
}

type Connection = { saveData?: boolean; effectiveType?: string }

/** Data saver on, or a 2G-class connection: the poster alone will do. */
function skipVideo() {
  const connection = (navigator as Navigator & { connection?: Connection }).connection
  return Boolean(connection?.saveData) || /(^|-)2g$/.test(connection?.effectiveType ?? "")
}

/**
 * Holds the video back until the page has finished loading, so the clip never competes with the
 * text and images people see first. Until then the poster shows.
 */
export function useBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [load, setLoad] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (skipVideo()) return
    const start = () => setLoad(true)
    if (document.readyState === "complete") {
      start()
      return
    }
    window.addEventListener("load", start, { once: true })
    return () => window.removeEventListener("load", start)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!load || !video) return
    // A cached video can fire canplay before React attaches onCanPlay.
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) setReady(true)

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => (reduceMotion.matches ? video.pause() : video.play().catch(() => {}))
    sync()
    reduceMotion.addEventListener("change", sync)
    return () => reduceMotion.removeEventListener("change", sync)
  }, [load])

  return { videoRef, load, ready, onCanPlay: () => setReady(true) }
}

/** Adding these to a video with no source starts the download, so render them only once `load` is true. */
export function VideoSources({ set }: { set: VideoSet }) {
  return (
    <>
      <source src={set.portrait} type="video/mp4" media="(max-width: 767px) and (orientation: portrait)" />
      <source src={set.medium} type="video/mp4" media="(max-width: 1023px)" />
      <source src={set.full} type="video/mp4" />
    </>
  )
}

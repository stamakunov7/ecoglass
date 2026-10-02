"use client"

import { useEffect, useState } from "react"

const OPENS = 8 * 60 + 30
const CLOSES = 17 * 60 + 30
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

/** Whether the Longwood office is open right now, in Florida time. Holidays are not accounted for. */
function officeStatus(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ""
  const day = DAYS.indexOf(get("weekday"))
  const minutes = Number(get("hour")) * 60 + Number(get("minute"))
  const weekday = day >= 1 && day <= 5

  if (weekday && minutes >= OPENS && minutes < CLOSES) return { open: true, label: "Open now · until 5:30 PM" }
  if (weekday && minutes < OPENS) return { open: false, label: "Closed · opens today at 8:30 AM" }
  if (day >= 1 && day <= 4) return { open: false, label: "Closed · opens tomorrow at 8:30 AM" }
  if (day === 0) return { open: false, label: "Closed · opens tomorrow at 8:30 AM" }
  return { open: false, label: "Closed · opens Monday at 8:30 AM" }
}

export function OpenStatus({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [status, setStatus] = useState<ReturnType<typeof officeStatus> | null>(null)

  useEffect(() => {
    const update = () => setStatus(officeStatus(new Date()))
    update()
    const timer = setInterval(update, 60_000)
    return () => clearInterval(timer)
  }, [])

  const muted = tone === "dark" ? "text-white/70" : "text-muted-foreground"

  // The server can't know the visitor's moment in time, so it renders the plain hours.
  if (!status) return <span className={muted}>Mon – Fri, 8:30 AM – 5:30 PM</span>

  return (
    <span className={`inline-flex items-center gap-2 ${muted}`}>
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${status.open ? "soft-pulse bg-[#9fd3a2]" : tone === "dark" ? "bg-white/40" : "bg-muted-foreground/50"}`}
        aria-hidden="true"
      />
      {status.label}
    </span>
  )
}

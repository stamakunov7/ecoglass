import { PIXEL_IDS } from "@/lib/pixel-ids"
import type { PhoneRegionId } from "@/lib/site"

declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean }
    _fbq?: unknown
    ttq?: {
      page: (...args: unknown[]) => void
      track: (...args: unknown[]) => void
    }
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    __ecoPixels?: { meta?: boolean; tiktok?: boolean; gtag?: boolean }
  }
}

function pixels() {
  return typeof window === "undefined" ? undefined : window.__ecoPixels
}

/** Meta Lead, TikTok SubmitForm, GA4 generate_lead (+ optional Google Ads conversion). No-ops if pixels aren't loaded. */
export function trackLead(input: { formType: string; eventId: string }) {
  const { formType, eventId } = input
  const ready = pixels()
  if (ready?.meta && typeof window.fbq === "function") {
    window.fbq("track", "Lead", { content_name: formType, content_category: "lead_form" }, { eventID: eventId })
  }
  if (ready?.tiktok && typeof window.ttq?.track === "function") {
    window.ttq.track("SubmitForm", { content_name: formType, form_type: formType }, { event_id: eventId })
  }
  if (ready?.gtag && typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", {
      form_type: formType,
      event_id: eventId,
      transaction_id: eventId,
    })
    if (PIXEL_IDS.ads && PIXEL_IDS.adsLeadLabel) {
      window.gtag("event", "conversion", {
        send_to: `${PIXEL_IDS.ads}/${PIXEL_IDS.adsLeadLabel}`,
        event_id: eventId,
        transaction_id: eventId,
      })
    }
  }
}

/** Contact event on tel: clicks. `region` is orlando | tampa-bay when the number is known. */
export function trackContact(input: { region?: PhoneRegionId } = {}) {
  const ready = pixels()
  const region = input.region
  if (ready?.meta && typeof window.fbq === "function") {
    window.fbq("track", "Contact", region ? { content_name: region } : undefined)
  }
  if (ready?.tiktok && typeof window.ttq?.track === "function") {
    window.ttq.track("Contact", region ? { content_name: region } : {})
  }
  if (ready?.gtag && typeof window.gtag === "function") {
    window.gtag("event", "contact", { method: "phone", ...(region ? { region } : {}) })
  }
}

export function trackPageView() {
  const ready = pixels()
  if (ready?.meta && typeof window.fbq === "function") window.fbq("track", "PageView")
  if (ready?.tiktok && typeof window.ttq?.page === "function") window.ttq.page()
  if (ready?.gtag && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: window.location.pathname,
      page_location: window.location.href,
      page_title: document.title,
    })
  }
}

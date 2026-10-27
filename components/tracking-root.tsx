"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"
import { usePathname } from "next/navigation"
import { captureAttribution } from "@/lib/attribution"
import { HAS_GOOGLE_TAG, PIXEL_IDS } from "@/lib/pixel-ids"
import { readConsent, subscribeConsent, type ConsentChoice } from "@/lib/consent"
import { phoneFromTel } from "@/lib/site"
import { trackContact, trackPageView } from "@/lib/track"

const CONSENT_GRANTED = `
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted"
`

function mark(kind: "meta" | "tiktok" | "gtag") {
  return `window.__ecoPixels=window.__ecoPixels||{};window.__ecoPixels.${kind}=true;`
}

const metaSnippet = PIXEL_IDS.meta
  ? `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_IDS.meta}');${mark("meta")}fbq('track','PageView');`
  : ""

const tiktokSnippet = PIXEL_IDS.tiktok
  ? `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};n=d.createElement("script");n.type="text/javascript";n.async=!0;n.src=r+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${PIXEL_IDS.tiktok}');${mark("tiktok")}ttq.page();}(window,document,'ttq');`
  : ""

function gtagSnippet(grantStorage: boolean) {
  const primary = PIXEL_IDS.ga || PIXEL_IDS.ads
  if (!primary) return ""
  const configs = [
    PIXEL_IDS.ga ? `gtag('config','${PIXEL_IDS.ga}',{send_page_view:false,anonymize_ip:true});` : "",
    PIXEL_IDS.ads ? `gtag('config','${PIXEL_IDS.ads}',{send_page_view:false});` : "",
  ].join("")
  const consent = grantStorage ? `gtag('consent','update',{${CONSENT_GRANTED}});` : ""
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${consent}${configs}${mark("gtag")}gtag('event','page_view',{page_path:location.pathname,page_location:location.href,page_title:document.title});`
}

/**
 * Ad pixels (next/script), App Router page views after the first load, tel: click tracking,
 * and landing-URL attribution capture.
 */
export function TrackingRoot() {
  const pathname = usePathname()
  const [consent, setConsent] = useState<ConsentChoice | null>(null)
  const [consentReady, setConsentReady] = useState(false)
  const initialPath = useRef(true)

  useEffect(() => {
    setConsent(readConsent())
    setConsentReady(true)
    return subscribeConsent(() => setConsent(readConsent()))
  }, [])

  useEffect(() => {
    captureAttribution()
  }, [pathname])

  useEffect(() => {
    if (initialPath.current) {
      initialPath.current = false
      return
    }
    trackPageView()
  }, [pathname])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as Element | null)?.closest?.("a[href^='tel:']")
      if (!(link instanceof HTMLAnchorElement)) return
      const phone = phoneFromTel(link.getAttribute("href") || "")
      trackContact({ region: phone?.id })
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  const loadMetaTiktok = consentReady && consent === "granted"
  const loadGtag = consentReady && HAS_GOOGLE_TAG && consent !== null
  const gtagId = PIXEL_IDS.ga || PIXEL_IDS.ads

  return (
    <>
      {loadMetaTiktok && PIXEL_IDS.meta ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {metaSnippet}
        </Script>
      ) : null}
      {loadMetaTiktok && PIXEL_IDS.tiktok ? (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {tiktokSnippet}
        </Script>
      ) : null}
      {loadGtag && gtagId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {gtagSnippet(consent === "granted")}
          </Script>
        </>
      ) : null}
    </>
  )
}

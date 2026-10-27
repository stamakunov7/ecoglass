/** Pixel / tag IDs from public env vars. Empty when unset so scripts never load with a blank id. */
function envId(value: string | undefined) {
  const id = value?.trim() ?? ""
  return /^[A-Za-z0-9_-]+$/.test(id) ? id : ""
}

export const PIXEL_IDS = {
  meta: envId(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  tiktok: envId(process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID),
  ga: envId(process.env.NEXT_PUBLIC_GA_ID),
  ads: envId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID),
  adsLeadLabel: envId(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL),
}

export const HAS_GOOGLE_TAG = Boolean(PIXEL_IDS.ga || PIXEL_IDS.ads)

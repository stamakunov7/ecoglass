"use client"

import { Box } from "lucide-react"
import { SHOW_GLASS_EVENT } from "./glass-explorer"

/** Opens this glass in the 3D viewer at the top of the page. */
export function ShowIn3D({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(SHOW_GLASS_EVENT, { detail: id }))}
      className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-xl transition-colors hover:border-white/60 hover:bg-white/20"
    >
      <Box className="h-4 w-4" aria-hidden="true" />
      See it in 3D
    </button>
  )
}

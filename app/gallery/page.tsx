import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { GalleryHero } from "@/components/gallery/gallery-hero"
import { GalleryZoom } from "@/components/gallery/gallery-zoom"
import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { GallerySmoothScroll } from "@/components/gallery/gallery-smooth-scroll"
import { ProcessClosing } from "@/components/process/process-closing"

export const metadata: Metadata = {
  title: "Gallery | EcoGlass Windows & Doors",
  description:
    "Browse windows, doors and homes by EcoGlass — custom-built in Longwood and installed across Florida.",
}

export default function GalleryPage() {
  return (
    <SiteShell overlayHeader>
      <GallerySmoothScroll />
      <main>
        <GalleryHero />
        <GalleryZoom />
        <GalleryGrid />
        <ProcessClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

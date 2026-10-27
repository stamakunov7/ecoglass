import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { ReviewsSection } from "@/components/reviews-section"
import { CollectionClosing } from "@/components/products/collection-closing"
import { DoorCarousel } from "@/components/products/door-carousel"
import { DoorDetail } from "@/components/products/door-detail"
import { doorModels, doorTitle, getDoor } from "@/components/products/door-catalog"
import { canonicalMeta } from "@/lib/site"

export const dynamicParams = false

export function generateStaticParams() {
  return doorModels.map((door) => ({ model: door.slug }))
}

type Params = { params: Promise<{ model: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { model } = await params
  const door = getDoor(model)
  if (!door) return { title: "Door Not Found | EcoGlass" }
  return {
    title: `${doorTitle(door)} | EcoGlass`,
    description: `${door.summary} Made to measure and installed across Florida by EcoGlass. Get a free in-home estimate.`,
    ...canonicalMeta(`/products/doors/${model}`),
  }
}

export default async function DoorPage({ params }: Params) {
  const { model } = await params
  const door = getDoor(model)
  if (!door) notFound()

  // The rest of the lineup, starting with the door after this one.
  const at = doorModels.indexOf(door)
  const others = [...doorModels.slice(at + 1), ...doorModels.slice(0, at)]

  return (
    <SiteShell overlayHeader>
      <main>
        <DoorDetail door={door} />

        <section className="bg-card py-20 sm:py-24 lg:py-28">
          <DoorCarousel
            doors={others}
            numberFrom={doorModels}
            tone="light"
            heading={
              <>
                <p className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cta-dark sm:text-xs">
                  <span className="h-px w-11 bg-cta-dark" aria-hidden="true" />
                  More doors
                </p>
                <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-forest sm:text-5xl lg:text-[64px]">
                  Explore <span className="font-serif font-normal italic text-cta-dark">the lineup.</span>
                </h2>
              </>
            }
          />
        </section>

        <ReviewsSection />
        <CollectionClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

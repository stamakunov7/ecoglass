import { ClipboardList, Ruler, Factory, Wrench, type LucideIcon } from "lucide-react"

export type ProcessStep = {
  icon: LucideIcon
  /** Short label for the step index in the hero. */
  short: string
  title: string
  summary: string
  details: string[]
  image: string
  alt: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: ClipboardList,
    short: "Request an estimate",
    title: "Request an Estimate",
    summary: "Tell us about your project and we will schedule a free, no-obligation in-home visit at a time that works for you.",
    details: [
      "Call, message, or use the estimate form on this site",
      "We confirm your appointment within one business day",
      "No pressure, no obligation, and no cost",
    ],
    image: "/images/estimate.png",
    alt: "EcoGlass specialist reviewing a window with a homeowner during an in-home visit",
  },
  {
    icon: Ruler,
    short: "Measure & review",
    title: "Measure and Review",
    summary: "An EcoGlass specialist measures every opening and walks you through products, glass options, colors, and finishes.",
    details: [
      "Precise laser and tape measurements of each opening",
      "Side-by-side product and glass package comparison",
      "Written, itemized quote with financing options",
    ],
    image: "/images/process-measure.png",
    alt: "Specialist measuring a window opening with a tape measure and laser level",
  },
  {
    icon: Factory,
    short: "Manufacture",
    title: "Manufacture and Prepare",
    summary: "Your custom windows and doors are built in our Central Florida facility while we handle permitting and scheduling.",
    details: [
      "Each unit built to your exact measurements",
      "Quality inspection before anything leaves the floor",
      "Permits and HOA paperwork handled by our team",
    ],
    image: "/images/why-hero.png",
    alt: "Window units on racks inside the EcoGlass manufacturing facility",
  },
  {
    icon: Wrench,
    short: "Install & complete",
    title: "Install and Complete",
    summary: "Our in-house crew installs everything, seals and finishes each unit, and leaves your home clean and ready to enjoy.",
    details: [
      "Trained EcoGlass installers, never subcontracted",
      "Proper flashing, sealing, and interior finish work",
      "Final walkthrough and cleanup on the same day",
    ],
    image: "/images/process-hero.png",
    alt: "Installer fitting a black-framed window on a modern Florida home",
  },
]

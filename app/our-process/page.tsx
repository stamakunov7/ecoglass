import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { SiteFooter } from "@/components/site-footer"
import { FaqSection } from "@/components/faq-section"
import { ProcessHero } from "@/components/process/process-hero"
import { ProcessSteps } from "@/components/process/process-steps"
import { ProcessMarquee } from "@/components/process/process-marquee"
import { ProcessPromises } from "@/components/process/process-promises"
import { ProcessClosing } from "@/components/process/process-closing"

export const metadata: Metadata = {
  title: "Our Process | EcoGlass Windows & Doors",
  description:
    "From your free in-home estimate to final installation, see exactly how EcoGlass manufactures and installs custom windows and doors across Florida.",
}

const faqs = [
  {
    q: "How long does the whole process take?",
    a: "Timelines depend on project size and product selection, but because we manufacture locally, most projects move significantly faster than national brands that ship from out of state. Your specialist will give you a clear schedule at the measurement visit.",
  },
  {
    q: "Do I need to be home during installation?",
    a: "We ask that an adult be present at the start of installation and for the final walkthrough. Beyond that, our crew can work independently while you go about your day.",
  },
  {
    q: "Will installation damage my walls or landscaping?",
    a: "Our installers protect floors, furniture, and landscaping before work begins and repair any interior trim affected by the replacement. Leaving your home as we found it is part of the job.",
  },
  {
    q: "Can you replace just a few windows or does it have to be the whole house?",
    a: "Any size project is welcome. Many homeowners replace in phases, and because every unit is custom-made, later phases will match perfectly.",
  },
]

export default function OurProcessPage() {
  return (
    <SiteShell overlayHeader>
      <main>
        <ProcessHero />
        <ProcessSteps />
        <ProcessMarquee />
        <ProcessPromises />
        <FaqSection title="Common questions about the process" faqs={faqs} />
        <ProcessClosing />
      </main>
      <SiteFooter />
    </SiteShell>
  )
}

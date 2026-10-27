import type { Metadata } from "next"
import Link from "next/link"
import { LegalArticle, LegalH2, LegalP, LegalUl } from "@/components/legal-article"
import { PHONE_LIST, SITE, canonicalMeta } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms of Use | EcoGlass Windows & Doors",
  description: `Terms of use for the ${SITE.shortName} website, estimates, and product information.`,
  ...canonicalMeta("/terms"),
}

const link = "font-semibold text-forest underline decoration-forest/25 underline-offset-4 hover:decoration-forest"

export default function TermsPage() {
  return (
    <LegalArticle eyebrow={SITE.shortName} title="Terms of Use" updated="Effective October 27, 2026">
      <LegalP>
        These Terms of Use govern your use of the {SITE.name} website at {SITE.url.replace("https://", "")} (the
        “Site”). By using the Site you agree to these terms. If you do not agree, please do not use the Site.
      </LegalP>
      <LegalP>
        EcoGlass manufactures and installs custom windows and doors. Our factory and showroom are at {SITE.address.line}.
        These terms are for the website. Any window or door project is governed by a separate written contract, not by
        this page. This page is not legal advice and should be reviewed by counsel.
      </LegalP>

      <LegalH2>The website is informational</LegalH2>
      <LegalP>
        Product photos, prices, sizes, glass options, energy figures, and lead times on the Site are illustrative.
        Actual products are made to measure. Colors, finishes, and performance can vary. We may update the catalog at
        any time.
      </LegalP>

      <LegalH2>Estimates, quotes, and bids</LegalH2>
      <LegalUl>
        <li>A request submitted through our forms is an inquiry, not a contract, order, or guaranteed price.</li>
        <li>
          A free in-home estimate or a quote we later provide is an offer to discuss your project. It becomes binding
          only if we both sign a written agreement.
        </li>
        <li>
          Commercial bid requests are invitations for us to review your project. We are not obligated to bid, and a bid
          is not a contract until accepted in writing.
        </li>
        <li>You agree that the information you submit is accurate to the best of your knowledge.</li>
      </LegalUl>

      <LegalH2>Financing</LegalH2>
      <LegalP>
        Financing is offered through Synchrony Bank and is subject to credit approval. The financing form on this Site
        is not a credit application. EcoGlass is not the lender. Terms, including promotional plans, are set by
        Synchrony and may change.
      </LegalP>

      <LegalH2>Contacting you</LegalH2>
      <LegalP>
        If you submit a form, you ask us to contact you about your project by phone, email, or text at the details you
        provide. Our regional numbers are {PHONE_LIST.map((p) => `${p.display} (${p.region})`).join(" and ")}. Message
        and data rates may apply. You may opt out of marketing messages; we may still contact you about an inquiry you
        submitted.
      </LegalP>

      <LegalH2>Acceptable use</LegalH2>
      <LegalP>
        You may not misuse the Site, attempt to disrupt it, scrape it in a way that overloads our systems, submit
        unlawful or deceptive content, or use our forms to send spam. We may block access that we believe violates these
        terms.
      </LegalP>

      <LegalH2>Intellectual property</LegalH2>
      <LegalP>
        The Site’s design, text, logos, photos, videos, and product imagery are owned by EcoGlass or used with
        permission. You may not copy or reuse them for commercial purposes without our written consent. Trademarks of
        other companies (including Synchrony and glass or hardware brands) belong to their owners.
      </LegalP>

      <LegalH2>Third-party services</LegalH2>
      <LegalP>
        The Site may link to Google Maps, Synchrony, social networks, and other third parties. Their terms and privacy
        policies apply to those services. Advertising pixels and analytics are described in our{" "}
        <Link href="/privacy" className={link}>
          Privacy Policy
        </Link>
        .
      </LegalP>

      <LegalH2>No warranty</LegalH2>
      <LegalP>
        The Site is provided “as is.” We do not warrant that it will be uninterrupted, error-free, or free of harmful
        components. Product warranties, if any, are stated in your written sales contract and manufacturer documents —
        not on this page.
      </LegalP>

      <LegalH2>Limitation of liability</LegalH2>
      <LegalP>
        To the fullest extent allowed by Florida law, EcoGlass is not liable for indirect, incidental, special, or
        consequential damages arising from your use of the Site. Our total liability for claims relating to the Site is
        limited to one hundred dollars ($100). This limit does not affect rights you may have under a signed installation
        contract or under non-waivable consumer law.
      </LegalP>

      <LegalH2>Florida law</LegalH2>
      <LegalP>
        These terms are governed by the laws of the State of Florida, without regard to conflict-of-law rules. You agree
        that courts in Seminole County, Florida, are the proper venue for disputes arising from the Site, except where
        the law requires otherwise.
      </LegalP>

      <LegalH2>Changes</LegalH2>
      <LegalP>
        We may revise these terms by posting an updated version on this page. The effective date will change when we do.
        If you continue to use the Site after a change, you accept the new terms.
      </LegalP>

      <LegalH2>Contact</LegalH2>
      <LegalP>
        {SITE.name}
        <br />
        {SITE.address.line}
        <br />
        Email:{" "}
        <a href={`mailto:${SITE.email}`} className={link}>
          {SITE.email}
        </a>
        <br />
        {PHONE_LIST.map((p) => (
          <span key={p.id}>
            {p.region}:{" "}
            <a href={p.tel} className={link}>
              {p.display}
            </a>
            <br />
          </span>
        ))}
      </LegalP>
    </LegalArticle>
  )
}

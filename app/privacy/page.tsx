import type { Metadata } from "next"
import Link from "next/link"
import { LegalArticle, LegalH2, LegalP, LegalUl } from "@/components/legal-article"
import { PHONE_LIST, SITE, canonicalMeta } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy | EcoGlass Windows & Doors",
  description: `How ${SITE.shortName} collects, uses, and shares information from our website, lead forms, and advertising pixels.`,
  ...canonicalMeta("/privacy"),
}

const link = "font-semibold text-forest underline decoration-forest/25 underline-offset-4 hover:decoration-forest"

export default function PrivacyPage() {
  return (
    <LegalArticle eyebrow={SITE.shortName} title="Privacy Policy" updated="Effective October 27, 2026">
      <LegalP>
        This Privacy Policy describes how {SITE.name} (“EcoGlass,” “we,” “us”) collects, uses, and shares information
        when you visit {SITE.url.replace("https://", "")}, request an estimate or quote, call us, or otherwise interact
        with our website. We are a Florida home-improvement company. Our showroom and factory are at {SITE.address.line}.
      </LegalP>
      <LegalP>
        This page is provided for transparency. It is not legal advice. Please have it reviewed by your own counsel
        before relying on it for advertising or compliance purposes.
      </LegalP>

      <LegalH2>Information we collect</LegalH2>
      <LegalP>We collect information you give us and information collected automatically:</LegalP>
      <LegalUl>
        <li>
          <strong>Lead forms.</strong> Name, email, phone number, zip code, project details, company name (commercial),
          budget, and any message you send. Forms appear on estimate requests, product quotes, contact, financing
          inquiries, and commercial bid requests.
        </li>
        <li>
          <strong>Calls.</strong> If you tap a click-to-call link, your device places the call. We use two regional
          numbers: {PHONE_LIST.map((p) => `${p.display} (${p.region})`).join(" and ")}.
        </li>
        <li>
          <strong>Advertising and analytics identifiers.</strong> If you accept cookies, our advertising pixels may
          collect device and browser data, pages viewed, and events such as form submissions. We may also receive
          click identifiers from the ad platform that sent you here (for example utm parameters, gclid, fbclid, and
          ttclid) so we know which ad led to an inquiry.
        </li>
        <li>
          <strong>Usage data.</strong> Vercel Analytics records aggregated, privacy-oriented traffic information about
          visits to this site. It does not use advertising cookies.
        </li>
      </LegalUl>

      <LegalH2>How we use information</LegalH2>
      <LegalUl>
        <li>To respond to estimate, quote, contact, financing, and commercial requests.</li>
        <li>To call, email, or text you about your project, including scheduling an in-home visit.</li>
        <li>To measure and improve our advertising on Meta (Facebook and Instagram), TikTok, YouTube, and Google.</li>
        <li>To understand how the website is used and to keep it secure and reliable.</li>
        <li>To comply with law and to protect our rights.</li>
      </LegalUl>

      <LegalH2>Advertising pixels and cookies</LegalH2>
      <LegalP>
        When you accept cookies, we may load the following third-party tags. Each tag loads only if we have configured
        its ID, and only after you accept (Google tags may still load in a restricted{" "}
        <em>consent mode</em> if you decline, without storing advertising or analytics cookies):
      </LegalP>
      <LegalUl>
        <li>
          <strong>Meta Pixel</strong> (Facebook/Instagram), which may set cookies and measure PageView, Lead, and Contact
          events.
        </li>
        <li>
          <strong>TikTok Pixel</strong>, which may set cookies and measure page views, SubmitForm, and Contact events.
        </li>
        <li>
          <strong>Google tag (gtag.js)</strong> for Google Analytics 4 and/or Google Ads, including conversion events
          such as generate_lead.
        </li>
      </LegalUl>
      <LegalP>
        These companies may use the data they collect to provide services to us and for their own purposes, including
        ads measurement and, where allowed, ad personalization. See their privacy policies for details. You can decline
        cookies on our banner; if you decline, we do not load the Meta or TikTok pixels, and Google tags run (if at all)
        with storage denied.
      </LegalP>
      <LegalP>
        We may later send the same conversion events from our server (a Conversions API) using a shared event id so
        platforms can avoid counting the same lead twice. That server-side matching, if enabled, would use information
        you submitted on a form.
      </LegalP>

      <LegalH2>Email delivery</LegalH2>
      <LegalP>
        Website inquiries are emailed to our team using Resend, a third-party email provider. Resend processes the
        contents of your request in order to deliver the message. We use the address you provide as a reply-to so we can
        respond.
      </LegalP>

      <LegalH2>Hosting and analytics</LegalH2>
      <LegalP>
        This website is hosted on Vercel. Vercel processes technical data (such as IP address and request logs) to
        operate the site. In production we also use Vercel Analytics for aggregated traffic reports.
      </LegalP>

      <LegalH2>How we share information</LegalH2>
      <LegalP>
        We do not sell your personal information. We share it with service providers who help us run the website and
        respond to you (hosting, email delivery, advertising platforms when you have accepted cookies) and when we are
        required by law. Financing applications, if you choose to apply, are handled by Synchrony Bank under Synchrony’s
        own privacy policy — our financing form is only an inquiry to EcoGlass, not a credit application.
      </LegalP>

      <LegalH2>Calls, texts, and emails</LegalH2>
      <LegalP>
        By submitting a form you agree that EcoGlass may contact you about your project by phone, email, or text at the
        numbers and addresses you provide, including via an autodialer or prerecorded voice if we use those tools.
        Consent is not a condition of purchase. Message and data rates may apply. You can ask us to stop at any time.
      </LegalP>

      <LegalH2>How long we keep information</LegalH2>
      <LegalP>
        We keep inquiry records as long as needed to follow up on your project, maintain our customer relationship, and
        meet legal or accounting requirements, then delete or de-identify them when they are no longer needed.
      </LegalP>

      <LegalH2>Your choices</LegalH2>
      <LegalUl>
        <li>Use the cookie banner to accept or decline advertising pixels.</li>
        <li>Request access to or deletion of the information we hold about you by contacting us.</li>
        <li>Use browser or platform controls (for example, Meta, TikTok, and Google ad settings) to limit ads.</li>
      </LegalUl>
      <LegalP>
        If you are a Florida resident, you may also have rights under Florida law regarding certain uses of personal
        data. We will not discriminate against you for exercising privacy rights.
      </LegalP>

      <LegalH2>Children</LegalH2>
      <LegalP>
        Our website is for homeowners and trade professionals. We do not knowingly collect personal information from
        children under 13.
      </LegalP>

      <LegalH2>Changes</LegalH2>
      <LegalP>
        We may update this policy. The effective date above will change when we do. Continued use of the site after an
        update means you accept the revised policy.
      </LegalP>

      <LegalH2>Contact us</LegalH2>
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
      <LegalP>
        Related:{" "}
        <Link href="/terms" className={link}>
          Terms of Use
        </Link>
        .
      </LegalP>
    </LegalArticle>
  )
}

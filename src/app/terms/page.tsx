import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply to your use of the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

function Tbc({ children }: { children: React.ReactNode }) {
  return <span className="tbc">[{children}]</span>;
}

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="23 September 2026"
      intro={`These terms govern your use of the ${site.name} website. Services we deliver are governed by a separate engagement agreement, not by this page.`}
    >
      <h2>Acceptance</h2>
      <p>
        By using this website you agree to these terms. If you do not agree with them, please do not
        use the site.
      </p>

      <h2>What this website is</h2>
      <p>
        This site describes our services and lets you send us an enquiry. Everything on it is
        general information about our capabilities. It is not accounting, tax, legal or investment
        advice, and it does not create a professional relationship between us.
      </p>

      <h2>No reliance</h2>
      <p>
        Regulatory requirements differ by jurisdiction, entity type and circumstance, and they
        change. Summaries on this site — including the tax compliance sections — are simplified and
        may not reflect the current position. Do not act on them without advice specific to your
        situation. Any figures shown in interactive elements, including forecasting and scenario
        charts, are illustrative demonstrations of model structure and are not real client data.
      </p>

      <h2>Estimates and quotes</h2>
      <p>
        The consultation builder produces a preliminary summary of what you have told us. It is not
        a quotation, an offer, or a commitment to deliver at a particular price or date. Scope and
        fees are agreed only in a signed engagement agreement.
      </p>

      <h2>Engagement terms</h2>
      <p>
        Where we deliver services, the governing document is the engagement agreement or statement
        of work signed by both parties. Where that document conflicts with this page, that document
        prevails.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design, code and marks on this site belong to {site.name} or its licensors. The
        names of third-party platforms referenced on this site — including SAP, Oracle, NetSuite,
        Odoo, ERPNext, SolarWinds, QuickBooks, Xero, Zoho, Shopify, WooCommerce, Amazon and Magento
        — are the trademarks of their respective owners. Reference to them describes the platforms
        we implement and support, and does not imply any endorsement, partnership or certification
        unless separately stated.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not attempt to gain unauthorised access to the site or its infrastructure.</li>
        <li>Do not use the site to transmit unlawful, harmful or misleading material.</li>
        <li>Do not scrape, republish or resell the content without permission.</li>
      </ul>

      <h2>Third-party links</h2>
      <p>
        We are not responsible for the content or practices of sites we link to. Visiting them is at
        your own risk.
      </p>

      <h2>Availability</h2>
      <p>
        We aim to keep the site available and accurate, but we do not guarantee uninterrupted access
        and we may change or withdraw content at any time.
      </p>

      <h2>Liability</h2>
      <p>
        To the fullest extent permitted by law, we exclude liability for loss arising from use of
        this website or reliance on its content. Nothing in these terms excludes liability that
        cannot lawfully be excluded, including for fraud, or for death or personal injury caused by
        negligence.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of <Tbc>governing jurisdiction to be confirmed</Tbc>,
        and disputes are subject to the exclusive jurisdiction of its courts.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The version published here, with the date shown above, is the one
        that applies.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can go to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles personal information submitted through this website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

/** Marks a detail the business must supply before this page is published. */
function Tbc({ children }: { children: React.ReactNode }) {
  return <span className="tbc">[{children}]</span>;
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="23 September 2026"
      intro={`This policy explains what personal information ${site.name} collects through this website, why we collect it, and what you can ask us to do with it.`}
    >
      <h2>Who we are</h2>
      <p>
        {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides ERP implementation, accounting
        outsourcing, tax compliance, IT infrastructure and automation services. For the purposes of
        applicable data protection law, we are the data controller for information submitted through
        this website. Our registered entity details are <Tbc>registered name and address to be
        confirmed</Tbc>.
      </p>

      <h2>Information we collect</h2>
      <p>This website does not run analytics, advertising or tracking cookies.</p>
      <ul>
        <li>
          <strong>Information you send us.</strong> The consultation and contact forms on this site
          do not transmit data to a server. They assemble the details you enter and open your own
          email client, so the information reaches us only if you choose to send that email. At that
          point we receive your name, email address, company name, and whatever you write.
        </li>
        <li>
          <strong>Information from engagements.</strong> If we go on to work together, we will
          handle further information under the terms of the engagement agreement rather than this
          policy.
        </li>
        <li>
          <strong>Technical logs.</strong> Our hosting provider records standard server logs,
          including IP address and request metadata, for security and reliability purposes.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To respond to your enquiry and prepare a proposal or scope.</li>
        <li>To maintain a record of our correspondence with you.</li>
        <li>To keep the website secure and available.</li>
      </ul>
      <p>
        We do not sell personal information, and we do not use enquiry details for unrelated
        marketing.
      </p>

      <h2>Legal basis</h2>
      <p>
        Where UK or EU data protection law applies, we rely on our legitimate interest in responding
        to business enquiries, and on taking steps at your request before entering into a contract.
        Where we rely on consent, you may withdraw it at any time.
      </p>

      <h2>Sharing</h2>
      <p>
        We share personal information only with service providers who help us operate — for example
        our email and hosting providers — and where we are required to by law. Our current
        processors are <Tbc>list of processors to be confirmed</Tbc>.
      </p>

      <h2>International transfers</h2>
      <p>
        We operate across multiple jurisdictions, including Pakistan, the United Kingdom and the
        United States. Where personal information is transferred between them, we use appropriate
        safeguards for the transfer.
      </p>

      <h2>Retention</h2>
      <p>
        We keep enquiry correspondence for as long as needed to deal with the enquiry and to
        maintain a reasonable business record, then delete it. Engagement records are retained for
        the period required by the applicable professional and tax rules.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you are, you may have the right to request access to your personal
        information, correct it, delete it, restrict or object to its use, or receive a portable
        copy. To exercise any of these, email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. You may also complain to your local data
        protection authority.
      </p>

      <h2>Security</h2>
      <p>
        We apply access controls and encryption in transit appropriate to the information we hold.
        No method of transmission is completely secure, so please do not send sensitive financial or
        identity documents by unencrypted email — we will tell you how to share them safely.
      </p>

      <h2>Changes</h2>
      <p>
        We will update this page when our practices change, and revise the date shown above. Please
        check it when you next contact us.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can go to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}

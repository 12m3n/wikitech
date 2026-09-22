import type { Metadata } from "next";
import { Mail, Clock, Globe2 } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Wikitech Group about ERP implementation, accounting outsourcing, multi-jurisdictional tax compliance, IT infrastructure monitoring or automation.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-brand-950 text-white">
        <SectionBackdrop image="bg/contact" priority dim={0.5} />
        <div aria-hidden className="grid-field absolute inset-0 opacity-45" />
        <div className="shell relative py-16 sm:py-20">
          <Reveal className="max-w-2xl">
            <Eyebrow tone="dark">Contact</Eyebrow>
            <h1 className="mt-5 text-display-xl text-white">Start with the problem.</h1>
            <p className="mt-6 text-lead text-brand-100/75">
              Tell us what is actually going wrong — the migration that stalled, the close that
              slips, the filings nobody owns. We will tell you what it takes to fix it, and whether
              we are the right people to do it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="shell grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-14">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={90} className="lg:pt-2">
            <h2 className="font-mono text-eyebrow uppercase text-muted">Direct</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 flex items-start gap-3 rounded-lg border border-line bg-surface p-5 transition-colors hover:border-brand-300"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
              <span>
                <span className="block text-[0.75rem] uppercase tracking-[0.08em] text-muted">
                  Email
                </span>
                <span className="mt-1 block break-all text-[0.9375rem] font-medium text-ink">
                  {site.email}
                </span>
              </span>
            </a>

            <dl className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <div>
                  <dt className="text-[0.875rem] font-medium text-ink">Response</dt>
                  <dd className="mt-1 text-[0.875rem] leading-relaxed text-body">
                    Enquiries are answered by a practitioner, not a sales sequence.
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                <div>
                  <dt className="text-[0.875rem] font-medium text-ink">Tax coverage</dt>
                  <dd className="mt-1 text-[0.875rem] leading-relaxed text-body">
                    Pakistan, the United Kingdom and the United States.
                  </dd>
                </div>
              </div>
            </dl>

            {/*
              Registered address, phone numbers and office hours go here once
              confirmed. Nothing invented in the meantime.
            */}
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Seal } from "@/components/brand/Logo";
import { Eyebrow, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Wikitech Group brings technology, finance, implementation and automation into a single accountable team — across ERP, accounting, tax compliance and IT infrastructure.",
  alternates: { canonical: "/about" },
};

const objectives = [
  {
    title: "Bridge technology and finance",
    detail:
      "The brief we set ourselves is to close the gap between technical infrastructure and financial consulting, because that gap is where most implementation failures live.",
  },
  {
    title: "One accountable partner",
    detail:
      "Clients should not have to arbitrate between an ERP partner, an accounting firm and an IT vendor. We carry the whole chain and own the outcome.",
  },
  {
    title: "Work across jurisdictions",
    detail:
      "Enterprise, mid-market and SME clients operate across borders. Our compliance practice covers Pakistan, the United Kingdom and the United States under one calendar.",
  },
  {
    title: "Build what survives handover",
    detail:
      "Systems get inherited. We document, train and stabilise so the people who run it afterwards are not reverse-engineering someone else's decisions.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-line bg-brand-950 text-white">
        <SectionBackdrop image="bg/about" priority dim={0.56} />
        <div aria-hidden className="grid-field absolute inset-0 opacity-45" />
        <div className="shell relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:py-24">
          <Reveal>
            <Eyebrow tone="dark">About the firm</Eyebrow>
            <h1 className="mt-5 text-display-xl text-white">
              A technology firm that can close the books.
            </h1>
            <p className="mt-6 max-w-xl text-lead text-brand-100/75">
              Wikitech Group is a multidisciplinary professional services firm. We implement and
              operate the systems businesses depend on — the ERP, the ledger, the filings and the
              network underneath them — with one team accountable for all of it.
            </p>
          </Reveal>

          <Reveal delay={120} className="justify-self-center lg:justify-self-end">
            <Seal tone="light" priority className="w-52 opacity-95 sm:w-64" />
          </Reveal>
        </div>
      </section>

      {/* What we set out to do */}
      <section className="section border-b border-line bg-canvas">
        <div className="shell">
          <SectionHeader
            eyebrow="Our approach"
            title="Four commitments that shape how we work."
            lead="These are not values on a wall. They are the constraints we accept when we take an engagement."
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {objectives.map((o, i) => (
              <Reveal as="li" key={o.title} delay={i * 60} className="bg-canvas p-7 lg:p-9">
                <span className="font-mono text-[0.75rem] font-medium text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-display-sm">{o.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-body">{o.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Practice areas */}
      <section className="section border-b border-line bg-surface">
        <div className="shell">
          <SectionHeader
            eyebrow="Practice areas"
            title="What sits under one roof."
            action={
              <Button href="/#services" variant="secondary" size="lg">
                Explore services
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            }
          />
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal as="li" key={s.id} delay={Math.min(i, 4) * 50} className="bg-canvas p-6">
                <s.icon className="h-5 w-5 text-brand-600" aria-hidden />
                <h3 className="mt-4 text-[0.9375rem] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                  {s.capabilities.slice(0, 2).join(" · ")}
                </p>
              </Reveal>
            ))}
          </ul>

          {/*
            Team bios, formation date, registrations and certifications belong here.
            Left out deliberately — nothing is published until it can be verified.
          */}
        </div>
      </section>

      {/* Contact strip */}
      <section className="section-tight bg-canvas">
        <div className="shell">
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-xl border border-line bg-surface p-8 sm:flex-row sm:items-center lg:p-10">
            <div>
              <h2 className="text-display-sm">Want to know whether we are a fit?</h2>
              <p className="mt-2 max-w-xl text-[0.9375rem] text-body">
                Describe the problem and we will tell you plainly whether it is work we should take.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href="/#quote" size="lg">
                Scope a project
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary" size="lg">
                Email us
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

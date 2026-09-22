import { Receipt, ArrowLeftRight, BookOpen, CalendarCheck, FileBarChart, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardImage } from "@/components/ui/CardImage";

const cycle = [
  {
    icon: Receipt,
    image: "cycle/transactions",
    title: "Transaction processing",
    detail: "Source documents captured, coded and filed against the right entity and period.",
  },
  {
    icon: ArrowLeftRight,
    image: "cycle/ap-ar",
    title: "AP / AR",
    detail: "Supplier invoices, payment runs, customer invoicing and collections follow-up.",
  },
  {
    icon: BookOpen,
    image: "cycle/bookkeeping",
    title: "Bookkeeping",
    detail: "Bank, card and control-account reconciliations kept current rather than caught up.",
  },
  {
    icon: CalendarCheck,
    image: "cycle/close",
    title: "Monthly close",
    detail: "Accruals, prepayments and a documented checklist signed off to a fixed calendar.",
  },
  {
    icon: FileBarChart,
    image: "cycle/reporting",
    title: "Reporting",
    detail: "A management pack with variance commentary, delivered on the agreed working day.",
  },
] as const;

const podRoles = [
  { role: "Transaction processor", scope: "Daily capture and coding" },
  { role: "AP / AR administrator", scope: "Payables, receivables, collections" },
  { role: "Bookkeeper", scope: "Reconciliations and ledger integrity" },
  { role: "Reviewer", scope: "Close checklist and reporting pack" },
];

export function AccountingSection() {
  return (
    <section id="accounting" className="section scroll-mt-24 border-b border-line bg-canvas">
      <div className="shell">
        <SectionHeader
          eyebrow="03 — Accounting & Outsourcing"
          title="A finance function you can staff in a week."
          lead="Offshore accounting works when the scope is explicit and the calendar is published. We run the routine cycle inside your systems so your in-house team keeps review, approval and analysis."
        />

        {/* The cycle */}
        <div className="mt-12">
          <h3 className="font-mono text-eyebrow uppercase text-muted">The monthly cycle</h3>
          <ol className="relative mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-5">
            {cycle.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 70} className="group relative bg-canvas">
                <CardImage
                  image={step.image}
                  className="aspect-[16/9] w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-brand-200 bg-brand-50 text-brand-700">
                      <step.icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="font-mono text-[0.75rem] font-medium text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="mt-4 text-[0.9375rem] font-semibold text-ink">{step.title}</h4>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{step.detail}</p>
                </div>
                {i < cycle.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-line-strong lg:block"
                  />
                )}
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Accounting pod */}
        <Reveal
          delay={80}
          className="mt-8 grid overflow-hidden rounded-xl border border-line bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
        >
          <div className="p-7 lg:p-10">
            <span className="inline-flex items-center rounded-sm border border-brand-200 bg-brand-50 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-brand-700">
              The model
            </span>
            <h3 className="mt-4 text-display-md">The Accounting Pod</h3>
            <p className="mt-4 text-lead text-body">
              Rather than a pool of interchangeable staff, you get a named group with defined roles
              that behaves like part of your own team — same systems, same calendar, same escalation
              path.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                "Works inside your ledger, not a parallel set of books",
                "Fixed close calendar with named owners per task",
                "Scales by adding roles to the pod, not by renegotiating scope",
                "Your team retains review, approval and sign-off",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.9375rem] text-body">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Pod composition diagram */}
          <div className="border-t border-line bg-canvas p-7 lg:border-l lg:border-t-0 lg:p-10">
            <div className="rounded-lg border border-line-strong bg-surface p-4">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                Your organisation
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["CFO / Finance Director", "Controller", "Approvers"].map((r) => (
                  <span
                    key={r}
                    className="rounded-sm border border-line bg-canvas px-2.5 py-1.5 text-[0.8125rem] text-body"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div aria-hidden className="flex flex-col items-center py-3">
              <span className="h-5 w-px bg-line-strong" />
              <span className="my-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-faint">
                review &amp; approval
              </span>
              <span className="h-5 w-px bg-line-strong" />
            </div>

            <div className="rounded-lg border border-brand-200 bg-brand-50/60 p-4">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-brand-700">
                Wikitech accounting pod
              </p>
              <ul className="mt-3 divide-y divide-brand-100">
                {podRoles.map((r) => (
                  <li key={r.role} className="flex items-baseline justify-between gap-4 py-2.5">
                    <span className="text-[0.875rem] font-medium text-brand-900">{r.role}</span>
                    <span className="text-right text-[0.75rem] leading-tight text-brand-700/75">
                      {r.scope}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { ScanText, Workflow, Plug, LayoutDashboard, ShieldCheck, ArrowDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";

const architecture = [
  {
    label: "Client & operator",
    nodes: ["Web portal", "Email intake", "Uploads"],
    note: "Where work arrives",
  },
  {
    label: "AI & automation layer",
    nodes: ["Document OCR", "Extraction & coding", "Workflow agents", "Confidence thresholds"],
    note: "Proposes, never silently commits",
    accent: true,
  },
  {
    label: "APIs & middleware",
    nodes: ["REST & webhooks", "Queues & retries", "Field mapping", "Audit log"],
    note: "Deterministic plumbing",
  },
  {
    label: "Systems of record",
    nodes: ["ERP", "CRM", "Accounting ledger"],
    note: "The source of truth stays authoritative",
  },
  {
    label: "Business workflow",
    nodes: ["Approvals", "Reporting", "Downstream process"],
    note: "Where the outcome lands",
  },
];

const capabilities = [
  {
    icon: ScanText,
    title: "Invoice & document OCR",
    detail:
      "Extraction from PDFs and scans with line-item capture, coded against the purchase order and held for review when confidence is low.",
  },
  {
    icon: Workflow,
    title: "Workflow agents",
    detail:
      "Long-running agents that chase exceptions, prepare reconciliations and escalate anything outside the rules they were given.",
  },
  {
    icon: Plug,
    title: "Middleware & APIs",
    detail:
      "Integration services between systems that were never designed to talk, with retries, idempotency and an audit trail.",
  },
  {
    icon: LayoutDashboard,
    title: "Client dashboards",
    detail:
      "Custom interfaces over your own data, so operational status is visible without exporting a report first.",
  },
];

export function AiSection() {
  return (
    <section id="ai" className="section relative scroll-mt-24 overflow-hidden bg-brand-950 text-white">
      <SectionBackdrop image="bg/ai" dim={0.5} />
      <div aria-hidden className="grid-field absolute inset-0 opacity-45" />

      <div className="shell relative">
        <SectionHeader
          tone="dark"
          eyebrow="06 — Agentic AI & Custom Software"
          title="Automation that reports to a control, not to itself."
          lead="Autonomy is useful right up until something posts to the ledger that nobody checked. We build agents that propose work, show their evidence, and hand anything uncertain to a person — with the audit trail that makes that defensible."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          {/* Architecture stack */}
          <Reveal delay={60}>
            <h3 className="font-mono text-eyebrow uppercase text-brand-300">Reference architecture</h3>
            <ol className="mt-5">
              {architecture.map((layer, i) => (
                <li key={layer.label}>
                  <div
                    className={
                      "rounded-lg border p-4 " +
                      (layer.accent
                        ? "border-accent-500/45 bg-accent-500/15"
                        : "border-white/12 bg-brand-950/80")
                    }
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-[0.9375rem] font-semibold text-white">{layer.label}</h4>
                      <p className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-brand-300/80">
                        {layer.note}
                      </p>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {layer.nodes.map((n) => (
                        <li
                          key={n}
                          className="rounded-sm border border-white/10 bg-brand-900/80 px-2 py-1 text-[0.75rem] text-brand-100/85"
                        >
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {i < architecture.length - 1 && (
                    <div aria-hidden className="flex justify-center py-1.5">
                      <ArrowDown className="h-4 w-4 text-brand-400/60" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Capabilities */}
          <div>
            <h3 className="font-mono text-eyebrow uppercase text-brand-300">Capabilities</h3>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-white/12 bg-white/10 sm:grid-cols-2">
              {capabilities.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 60} className="bg-brand-950 p-6">
                  <c.icon className="h-5 w-5 text-accent-500" aria-hidden />
                  <h4 className="mt-4 text-[1rem] font-semibold text-white">{c.title}</h4>
                  <p className="mt-2.5 text-[0.875rem] leading-relaxed text-brand-100/70">
                    {c.detail}
                  </p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-6 flex gap-4 rounded-xl border border-white/12 bg-brand-950/80 p-6 backdrop-blur-sm">
              <ShieldCheck className="h-5 w-5 shrink-0 text-brand-300" aria-hidden />
              <div>
                <h4 className="text-[0.9375rem] font-semibold text-white">
                  Human approval stays in the loop
                </h4>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-brand-100/70">
                  Every automated action is logged with its inputs and the rule it applied. Anything
                  below the agreed confidence threshold routes to a named approver instead of
                  posting. That is the difference between automation you can audit and automation
                  you have to unwind.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

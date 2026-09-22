import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const sources = ["Shopify", "WooCommerce", "Amazon", "Magento"];
const targets = ["QuickBooks Online", "NetSuite", "Odoo", "SAP"];

const payload = ["Orders", "Inventory", "Settlements", "Fees", "Refunds", "Customers"];

const middlewareJobs = [
  { title: "Map", detail: "One order schema across every channel" },
  { title: "Validate", detail: "Rules applied before anything posts" },
  { title: "Reconcile", detail: "Settlements matched net of fees" },
  { title: "Recover", detail: "Retries, alerting and an exception queue" },
];

/** Converging / diverging connector band. Non-uniform scale keeps it responsive at any width. */
function Connectors({ direction }: { direction: "in" | "out" }) {
  // Outbound lines stop short of the baseline so they never run through the
  // "Systems of record" label sitting directly beneath the band.
  const lines =
    direction === "in"
      ? ["M50 0 L200 56", "M150 0 L200 56", "M250 0 L200 56", "M350 0 L200 56"]
      : ["M200 0 L50 40", "M200 0 L150 40", "M200 0 L250 40", "M200 0 L350 40"];

  return (
    <svg
      viewBox="0 0 400 56"
      preserveAspectRatio="none"
      aria-hidden
      className="h-10 w-full sm:h-14"
    >
      {lines.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--color-brand-300)"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {lines.map((d) => (
        <path
          key={`${d}-flow`}
          d={d}
          fill="none"
          stroke="var(--color-accent-500)"
          strokeWidth="2"
          strokeDasharray="5 27"
          vectorEffect="non-scaling-stroke"
          className="motion-safe:[animation:var(--animate-dash)]"
        />
      ))}
    </svg>
  );
}

function NodeRow({ items, label }: { items: string[]; label: string }) {
  return (
    <div>
      <h3 className="mt-1 text-center font-mono text-eyebrow uppercase text-muted">{label}</h3>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-line bg-canvas px-3 py-4 text-center text-[0.875rem] font-medium text-ink shadow-xs transition-shadow duration-300 hover:shadow-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function IntegrationsSection() {
  return (
    <section id="integrations" className="section scroll-mt-24 border-b border-line bg-canvas">
      <div className="shell">
        <SectionHeader
          eyebrow="05 — E-Commerce Integrations"
          title="From storefront to ledger, without re-keying."
          lead="Multi-channel sellers usually reconcile marketplace settlements by hand because fees, refunds and payouts never line up with order totals. The integration layer is where that gets resolved — not the accounts team."
        />

        <Reveal delay={60} className="mt-12 rounded-xl border border-line bg-surface p-5 sm:p-8 lg:p-10">
          <NodeRow items={sources} label="Sales channels" />

          <Connectors direction="in" />

          {/* Middleware */}
          <div className="rounded-xl border border-brand-200 bg-brand-50/60 p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="text-display-sm text-brand-900">Integration &amp; middleware layer</h3>
              <ul className="flex flex-wrap gap-1.5">
                {payload.map((p) => (
                  <li
                    key={p}
                    className="rounded-sm border border-brand-200 bg-canvas px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-brand-700"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {middlewareJobs.map((job) => (
                <li key={job.title} className="rounded-lg border border-brand-100 bg-canvas p-4">
                  <h4 className="text-[0.875rem] font-semibold text-brand-800">{job.title}</h4>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-body">{job.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <Connectors direction="out" />

          <NodeRow items={targets} label="Systems of record" />
        </Reveal>
      </div>
    </section>
  );
}

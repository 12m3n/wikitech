"use client";

import { useState } from "react";
import { Check, Layers } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CardImage } from "@/components/ui/CardImage";
import { tiers, industries, platforms, type Tier, type Industry } from "@/data/erp";
import { cn } from "@/lib/cn";

const phases = [
  { n: "01", label: "Blueprint", detail: "Requirements and process mapping", image: "phase/blueprint" },
  { n: "02", label: "Re-engineer", detail: "Process redesign before configuration", image: "phase/re-engineer" },
  { n: "03", label: "Migrate", detail: "Data cleansing and reconciliation", image: "phase/migrate" },
  { n: "04", label: "Train", detail: "Role-based user enablement", image: "phase/train" },
  { n: "05", label: "Hypercare", detail: "Supported stabilisation post go-live", image: "phase/hypercare" },
] as const;

const categoryTone: Record<string, string> = {
  "Tier-1 ERP": "border-brand-200 bg-brand-50 text-brand-700",
  "Cloud ERP": "border-accent-500/25 bg-accent-50 text-accent-600",
  "Cloud Accounting": "border-line-strong bg-surface-2 text-body",
};

export function ErpSection() {
  const [tier, setTier] = useState<Tier>("mid");
  const [industry, setIndustry] = useState<Industry>("manufacturing");

  const matches = platforms.filter(
    (p) => p.tiers.includes(tier) && p.industries.includes(industry),
  );
  const others = platforms.filter((p) => !matches.includes(p));

  return (
    <section id="erp" className="section scroll-mt-24 border-b border-line bg-surface">
      <div className="shell">
        <SectionHeader
          eyebrow="01 — ERP & Business Software"
          title="Start from the business, not the brochure."
          lead="The right platform depends on how many entities you consolidate, how your operations actually run, and what you are willing to change. Set two variables and see what we would shortlist."
        />

        {/* Configurator */}
        <Reveal delay={60} className="mt-10 overflow-hidden rounded-xl border border-line bg-canvas">
          <div className="grid gap-px bg-line md:grid-cols-2">
            {/* A <legend> escapes its fieldset's padding box and collides with the
                panel border, so these use an explicit label + aria-labelledby. */}
            <div className="bg-canvas p-6 md:p-7">
              <p id="erp-size-label" className="font-mono text-eyebrow uppercase text-muted">
                Step 1 — Company size
              </p>
              <div
                className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3"
                role="radiogroup"
                aria-labelledby="erp-size-label"
              >
                {tiers.map((t) => (
                  <button
                    key={t.id}
                    role="radio"
                    aria-checked={tier === t.id}
                    onClick={() => setTier(t.id)}
                    className={cn(
                      "rounded-md border px-3 py-3 text-left transition-colors duration-200",
                      tier === t.id
                        ? "border-brand-700 bg-brand-50/70"
                        : "border-line-strong bg-canvas hover:border-brand-300",
                    )}
                  >
                    <span
                      className={cn(
                        "block text-[0.875rem] font-semibold",
                        tier === t.id ? "text-brand-800" : "text-ink",
                      )}
                    >
                      {t.label}
                    </span>
                    <span className="mt-1 block text-[0.75rem] leading-tight text-muted">
                      {t.detail}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-canvas p-6 md:p-7">
              <p id="erp-industry-label" className="font-mono text-eyebrow uppercase text-muted">
                Step 2 — Industry
              </p>
              <div
                className="mt-4 flex flex-wrap gap-2"
                role="radiogroup"
                aria-labelledby="erp-industry-label"
              >
                {industries.map((ind) => (
                  <button
                    key={ind.id}
                    role="radio"
                    aria-checked={industry === ind.id}
                    onClick={() => setIndustry(ind.id)}
                    className={cn(
                      "rounded-md border px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-200",
                      industry === ind.id
                        ? "border-brand-700 bg-brand-700 text-white"
                        : "border-line-strong bg-canvas text-body hover:border-brand-300 hover:text-ink",
                    )}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result */}
          <div className="border-t border-line bg-surface-2/50 px-6 py-7 md:px-7">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="flex items-center gap-2 text-display-sm">
                <Layers className="h-4 w-4 text-brand-600" aria-hidden />
                Likely shortlist
              </h3>
              <p aria-live="polite" className="font-mono text-[0.75rem] text-muted">
                {matches.length} of {platforms.length} platforms match
              </p>
            </div>

            {matches.length > 0 ? (
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {matches.map((p) => (
                  <li
                    key={p.id}
                    className="animate-reveal flex flex-col rounded-lg border border-line bg-canvas p-5 shadow-xs transition-shadow duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-[1.0625rem] font-semibold leading-tight text-ink">
                          {p.name}
                        </h4>
                        <p className="mt-1 text-[0.75rem] text-muted">{p.vendor}</p>
                      </div>
                      <span
                        className={cn(
                          "shrink-0 rounded-sm border px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.06em]",
                          categoryTone[p.category],
                        )}
                      >
                        {p.category}
                      </span>
                    </div>
                    <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-body">
                      {p.blurb}
                    </p>
                    <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                      {p.strengths.map((s) => (
                        <li
                          key={s}
                          className="flex items-start gap-2 text-[0.8125rem] text-muted"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 rounded-lg border border-dashed border-line-strong bg-canvas p-6 text-[0.9375rem] text-body">
                No standard fit for that combination — which usually means the answer is a tailored
                configuration rather than an off-the-shelf suite.{" "}
                <a href="#quote" className="font-medium text-brand-700 underline underline-offset-4">
                  Tell us the constraints
                </a>{" "}
                and we will scope it properly.
              </p>
            )}

            {others.length > 0 && (
              <p className="mt-5 text-[0.8125rem] text-muted">
                <span className="font-medium text-body">Also implemented: </span>
                {others.map((p) => p.name).join(" · ")}
              </p>
            )}
          </div>
        </Reveal>

        {/* Implementation method */}
        <Reveal delay={120} className="mt-12">
          <h3 className="font-mono text-eyebrow uppercase text-muted">
            End-to-end implementation method
          </h3>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {phases.map((p) => (
              <li key={p.n} className="group bg-canvas transition-colors hover:bg-brand-50/40">
                <CardImage
                  image={p.image}
                  className="aspect-[16/9] w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="p-5">
                  <span className="font-mono text-[0.75rem] font-medium text-brand-500">{p.n}</span>
                  <h4 className="mt-2 text-[0.9375rem] font-semibold text-ink">{p.label}</h4>
                  <p className="mt-1.5 text-[0.8125rem] leading-snug text-muted">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={160} className="mt-8">
          <Button href="#quote" variant="secondary" size="lg">
            Scope an ERP project
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

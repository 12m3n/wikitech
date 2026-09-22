"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Flag } from "@/components/ui/Flag";
import { regions } from "@/data/tax";
import { cn } from "@/lib/cn";

export function TaxSection() {
  const [activeId, setActiveId] = useState(regions[0].id);
  const active = regions.find((r) => r.id === activeId)!;

  return (
    <section id="tax" className="section scroll-mt-24 border-b border-line bg-surface">
      <div className="shell">
        <SectionHeader
          eyebrow="04 — Tax Compliance"
          title="Three jurisdictions, one filing calendar."
          lead="Cross-border groups usually end up with an adviser per country and no shared view of what is due when. We prepare from one reconciled set of books and track every obligation in a single calendar."
        />

        <Reveal delay={60} className="mt-10 overflow-hidden rounded-xl border border-line bg-canvas">
          {/* Region tabs */}
          <div role="tablist" aria-label="Tax jurisdiction" className="grid grid-cols-3 bg-surface-2/60">
            {regions.map((r) => {
              const isActive = r.id === activeId;
              return (
                <button
                  key={r.id}
                  role="tab"
                  id={`tax-tab-${r.id}`}
                  aria-selected={isActive}
                  aria-controls={`tax-panel-${r.id}`}
                  onClick={() => setActiveId(r.id)}
                  className={cn(
                    "relative border-b px-3 py-4 text-center transition-colors duration-200 sm:px-5 sm:py-5",
                    isActive
                      ? "border-brand-700 bg-canvas"
                      : "border-line hover:bg-canvas/60",
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center gap-2 text-[0.9375rem] font-semibold sm:text-[1.0625rem]",
                      isActive ? "text-brand-800" : "text-body",
                    )}
                  >
                    <Flag
                      code={r.id}
                      className={cn("h-3.5 sm:h-4", !isActive && "opacity-70")}
                    />
                    {r.label}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-mono text-[0.625rem] uppercase leading-tight tracking-[0.06em] sm:text-[0.6875rem]",
                      isActive ? "text-brand-600" : "text-faint",
                    )}
                  >
                    {r.authority}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            key={active.id}
            role="tabpanel"
            id={`tax-panel-${active.id}`}
            aria-labelledby={`tax-tab-${active.id}`}
            className="animate-reveal p-6 sm:p-8 lg:p-10"
          >
            <p className="max-w-3xl text-lead text-body">{active.summary}</p>

            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
              {active.areas.map((area) => (
                <details key={area.title} className="group bg-canvas [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface">
                    <span className="text-[0.9375rem] font-medium text-ink">{area.title}</span>
                    <ChevronDown
                      aria-hidden
                      className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
                    />
                  </summary>
                  <p className="animate-reveal px-5 pb-5 text-[0.875rem] leading-relaxed text-body">
                    {area.detail}
                  </p>
                </details>
              ))}
            </div>

            <p className="mt-6 text-[0.8125rem] leading-relaxed text-muted">
              Summary information only. Obligations depend on entity type, registrations and
              activity — we confirm the applicable position before any engagement begins.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

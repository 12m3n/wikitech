"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardImage } from "@/components/ui/CardImage";
import { caseStudies, caseTags, type CaseTag } from "@/data/cases";
import { cn } from "@/lib/cn";

type Filter = "all" | CaseTag;

const blocks = [
  { key: "challenge", label: "Challenge" },
  { key: "solution", label: "Solution" },
  { key: "outcome", label: "Outcome" },
] as const;

export function CaseStudiesSection() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? caseStudies : caseStudies.filter((c) => c.tags.includes(filter));

  return (
    <section id="work" className="section scroll-mt-24 border-b border-line bg-surface">
      <div className="shell">
        <SectionHeader
          eyebrow="Selected work"
          title="Engagements, described by their shape."
          lead="These are real engagement profiles. Client names and quantified results are withheld until each is cleared for publication — we would rather show you the work than a number you cannot verify."
        />

        <Reveal delay={60}>
          <div
            role="tablist"
            aria-label="Filter work by discipline"
            className="no-bar -mx-5 mt-9 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {[{ id: "all" as const, label: "All work" }, ...caseTags].map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={filter === t.id}
                onClick={() => setFilter(t.id as Filter)}
                className={cn(
                  "shrink-0 rounded-md border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200",
                  filter === t.id
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-line-strong bg-canvas text-body hover:border-brand-300 hover:text-ink",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Reveal>

        <p aria-live="polite" className="sr-only">
          {visible.length} engagements shown
        </p>

        <ul className="mt-8 grid gap-5 lg:grid-cols-2">
          {visible.map((c, i) => (
            <Reveal
              as="li"
              key={c.id}
              delay={Math.min(i, 3) * 60}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-canvas shadow-xs transition-shadow duration-300 hover:shadow-md"
            >
              <CardImage
                image={c.image}
                className="aspect-[16/7] w-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="flex flex-1 flex-col p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-brand-600">
                  {c.sector}
                </span>
                <span aria-hidden className="h-3 w-px bg-line-strong" />
                <ul className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-xs border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.06em] text-muted"
                    >
                      {caseTags.find((ct) => ct.id === t)?.label}
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="mt-4 text-display-sm">{c.title}</h3>

              <dl className="mt-6 flex-1 space-y-5">
                {blocks.map((b) => (
                  <div key={b.key} className="grid gap-1.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4">
                    <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-faint sm:pt-0.5">
                      {b.label}
                    </dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-body">{c[b.key]}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                {c.technology.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-line bg-surface px-2 py-1 text-[0.75rem] text-body"
                  >
                    {t}
                  </span>
                ))}
              </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

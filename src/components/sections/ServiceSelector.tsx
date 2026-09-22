"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardImage } from "@/components/ui/CardImage";
import { services, groupLabels, type ServiceGroup } from "@/data/services";
import { cn } from "@/lib/cn";

type Filter = "all" | ServiceGroup;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All services" },
  { id: "systems", label: groupLabels.systems },
  { id: "finance", label: groupLabels.finance },
  { id: "growth", label: groupLabels.growth },
];

export function ServiceSelector() {
  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState(services[0].id);
  const [openId, setOpenId] = useState<string | null>(services[0].id);

  const visible = services.filter((s) => filter === "all" || s.group === filter);
  const active = visible.find((s) => s.id === activeId) ?? visible[0];

  const selectFilter = (id: Filter) => {
    setFilter(id);
    const next = services.find((s) => id === "all" || s.group === id);
    if (next) {
      setActiveId(next.id);
      setOpenId(next.id);
    }
  };

  return (
    <section id="services" className="section scroll-mt-24 border-b border-line bg-canvas">
      <div className="shell">
        <SectionHeader
          eyebrow="What we do"
          title="Eight practices, one engagement model."
          lead="Most of our work crosses two or three of these at once — an ERP rollout that needs the ledger migrated, or a monitoring estate that has to survive an audit. Pick a starting point."
        />

        {/* Filter chips */}
        <Reveal delay={60}>
          <div
            role="tablist"
            aria-label="Filter services by practice area"
            className="no-bar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => selectFilter(f.id)}
                className={cn(
                  "shrink-0 rounded-md border px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200",
                  filter === f.id
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-line-strong bg-canvas text-body hover:border-brand-300 hover:text-ink",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ---------- Desktop: master / detail ---------- */}
        <Reveal
          delay={100}
          className="mt-8 hidden overflow-hidden rounded-xl border border-line bg-surface lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
        >
          <ul
            className="divide-y divide-line border-r border-line bg-canvas"
            role="tablist"
            aria-orientation="vertical"
          >
            {visible.map((s) => {
              const isActive = active?.id === s.id;
              return (
                <li key={s.id}>
                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(s.id)}
                    className={cn(
                      "group relative flex w-full items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200",
                      isActive ? "bg-brand-50/70" : "hover:bg-surface",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-y-0 left-0 w-0.5 origin-center bg-brand-700 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
                        isActive ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <CardImage
                      image={s.image}
                      sizes="64px"
                      className={cn(
                        "h-9 w-12 shrink-0 rounded-sm transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-55 group-hover:opacity-85",
                      )}
                    />
                    <span
                      className={cn(
                        "flex-1 text-[0.9375rem] font-medium transition-colors",
                        isActive ? "text-brand-800" : "text-body group-hover:text-ink",
                      )}
                    >
                      {s.title}
                    </span>
                    <ArrowRight
                      className={cn(
                        "h-4 w-4 shrink-0 transition-all duration-300",
                        isActive
                          ? "translate-x-0 text-brand-700 opacity-100"
                          : "-translate-x-1 opacity-0",
                      )}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {active && (
            <div key={active.id} className="animate-reveal">
              <CardImage
                image={active.image}
                className="aspect-[24/7] w-full"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="p-9 xl:p-11">
              <p className="font-mono text-eyebrow uppercase text-brand-600">
                {groupLabels[active.group]}
              </p>
              <h3 className="mt-3 text-display-md">{active.title}</h3>
              <p className="mt-4 max-w-2xl text-lead text-body">{active.summary}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h4 className="font-mono text-eyebrow uppercase text-muted">Core capabilities</h4>
                  <ul className="mt-4 space-y-2.5">
                    {active.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-[0.9375rem] text-body">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-eyebrow uppercase text-muted">Platforms &amp; scope</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {active.stack.map((t) => (
                      <li
                        key={t}
                        className="rounded-sm border border-line bg-canvas px-2.5 py-1.5 text-[0.8125rem] text-body"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={`#${active.anchor}`}
                className="mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-brand-700 transition-colors hover:text-brand-800"
              >
                See how we deliver it
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              </div>
            </div>
          )}
        </Reveal>

        {/* ---------- Mobile: accordion ---------- */}
        <div className="mt-8 divide-y divide-line overflow-hidden rounded-lg border border-line lg:hidden">
          {visible.map((s) => {
            const isOpen = openId === s.id;
            return (
              <div key={s.id}>
                <h3>
                  <button
                    onClick={() => setOpenId(isOpen ? null : s.id)}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${s.id}`}
                    className="flex w-full items-center gap-3 bg-canvas px-4 py-4 text-left"
                  >
                    <s.icon
                      className={cn(
                        "h-[1.125rem] w-[1.125rem] shrink-0",
                        isOpen ? "text-brand-700" : "text-faint",
                      )}
                      aria-hidden
                    />
                    <span className="flex-1 text-[0.9375rem] font-medium text-ink">{s.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-muted transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={`svc-${s.id}`}
                  hidden={!isOpen}
                  className="animate-reveal bg-surface"
                >
                  <CardImage image={s.image} className="aspect-[16/7] w-full" sizes="100vw" />
                  <div className="px-4 pb-5 pt-4">
                  <p className="text-[0.9375rem] leading-relaxed text-body">{s.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-[0.875rem] text-body">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`#${s.anchor}`}
                    className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-medium text-brand-700"
                  >
                    See how we deliver it
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

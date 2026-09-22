"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/* --------------------------------------------------------------------------
   Illustrative model output. These are demonstration figures for the chart
   mechanics only — they are not client data and are labelled as such in the UI.
   -------------------------------------------------------------------------- */

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ACTUAL_END = 5; // index of the last actual month

const actual = [118, 131, 127, 146, 142, 163];

const scenarios = {
  base: { label: "Base", values: [163, 171, 176, 184, 190, 198, 206] },
  upside: { label: "Upside", values: [163, 176, 187, 199, 212, 226, 241] },
  downside: { label: "Downside", values: [163, 165, 162, 166, 163, 167, 170] },
} as const;

type ScenarioId = keyof typeof scenarios;

const CHART_W = 720;
const CHART_H = 250;
const PAD = { top: 18, right: 18, bottom: 34, left: 44 };
const Y_MAX = 260;

const plotW = CHART_W - PAD.left - PAD.right;
const plotH = CHART_H - PAD.top - PAD.bottom;

const x = (i: number) => PAD.left + (i * plotW) / (months.length - 1);
const y = (v: number) => PAD.top + plotH - (v / Y_MAX) * plotH;

const toPath = (values: readonly number[], startIndex: number) =>
  values.map((v, i) => `${i === 0 ? "M" : "L"}${x(startIndex + i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");

const capabilities = [
  { title: "Financial modelling", detail: "Three-statement models tied back to the ledger." },
  { title: "Cash-flow modelling", detail: "Weekly and monthly positions, not just year-end." },
  { title: "Budget forecasting", detail: "Budget versus actual with variance commentary." },
  { title: "Sensitivity analysis", detail: "Which assumptions actually move the outcome." },
  { title: "Scenario planning", detail: "Base, upside and downside held side by side." },
  { title: "Management dashboards", detail: "The monthly view leadership reviews and signs off." },
];

export function ForecastingSection() {
  const [scenario, setScenario] = useState<ScenarioId>("base");
  const [hover, setHover] = useState<number | null>(null);

  const forecast = scenarios[scenario].values;

  // Sensitivity band: upside forward, downside back, closed.
  const band = [
    toPath(scenarios.upside.values, ACTUAL_END),
    ...scenarios.downside.values
      .map((v, i) => `L${x(ACTUAL_END + i).toFixed(1)} ${y(v).toFixed(1)}`)
      .reverse(),
    "Z",
  ].join(" ");

  const series = [...actual, ...forecast.slice(1)];
  const gridValues = [0, 65, 130, 195, 260];

  const onMove = (e: React.PointerEvent<SVGRectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const i = Math.round(((ratio * CHART_W - PAD.left) / plotW) * (months.length - 1));
    setHover(Math.min(months.length - 1, Math.max(0, i)));
  };

  return (
    <section id="forecasting" className="section scroll-mt-24 border-b border-line bg-surface">
      <div className="shell">
        <SectionHeader
          eyebrow="07 — Business Planning & Forecasting"
          title="Models that reconcile to the ledger."
          lead="A forecast is only useful if someone can trace it back to the accounts it came from. We build models on top of books we can stand behind, and keep the assumptions visible enough to argue with."
        />

        <Reveal delay={60} className="mt-10 overflow-hidden rounded-xl border border-line bg-canvas">
          <div className="flex flex-col gap-4 border-b border-line px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h3 className="text-display-sm">Rolling 12-month cash position</h3>
              <p className="mt-1 text-[0.8125rem] text-muted">
                Demonstration of model structure — figures are illustrative, not client data.
              </p>
            </div>
            <div
              role="radiogroup"
              aria-label="Forecast scenario"
              className="flex shrink-0 rounded-md border border-line-strong p-0.5"
            >
              {(Object.keys(scenarios) as ScenarioId[]).map((id) => (
                <button
                  key={id}
                  role="radio"
                  aria-checked={scenario === id}
                  onClick={() => setScenario(id)}
                  className={cn(
                    "rounded-sm px-3 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200",
                    scenario === id
                      ? "bg-brand-700 text-white"
                      : "text-body hover:bg-surface hover:text-ink",
                  )}
                >
                  {scenarios[id].label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative px-2 py-5 sm:px-5">
            <svg
              viewBox={`0 0 ${CHART_W} ${CHART_H}`}
              className="h-auto w-full touch-pan-y"
              role="img"
              aria-label={`Illustrative rolling twelve-month cash position. Actual to ${months[ACTUAL_END]}, then the ${scenarios[scenario].label.toLowerCase()} forecast, shown against a sensitivity band between the downside and upside scenarios.`}
            >
              {/* Recessive grid + y axis */}
              <g>
                {gridValues.map((v) => (
                  <g key={v}>
                    <line
                      x1={PAD.left}
                      x2={CHART_W - PAD.right}
                      y1={y(v)}
                      y2={y(v)}
                      stroke="var(--color-line)"
                      strokeWidth="1"
                    />
                    <text
                      x={PAD.left - 10}
                      y={y(v) + 4}
                      textAnchor="end"
                      fill="var(--color-faint)"
                      fontFamily="var(--font-mono)"
                      fontSize="11"
                    >
                      {v}
                    </text>
                  </g>
                ))}
              </g>

              {/* x labels */}
              {months.map((m, i) => (
                <text
                  key={m}
                  x={x(i)}
                  y={CHART_H - 12}
                  textAnchor="middle"
                  fill={hover === i ? "var(--color-body)" : "var(--color-faint)"}
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                >
                  {m}
                </text>
              ))}

              {/* Sensitivity band */}
              <path d={band} fill="var(--color-brand-500)" opacity="0.09" />

              {/* Forecast boundary */}
              <line
                x1={x(ACTUAL_END)}
                x2={x(ACTUAL_END)}
                y1={PAD.top}
                y2={PAD.top + plotH}
                stroke="var(--color-line-strong)"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <text
                x={x(ACTUAL_END) + 7}
                y={PAD.top + 11}
                fill="var(--color-muted)"
                fontFamily="var(--font-mono)"
                fontSize="10.5"
                letterSpacing="0.6"
              >
                FORECAST
              </text>

              {/* Actual */}
              <path
                d={toPath(actual, 0)}
                fill="none"
                stroke="#3760c8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Forecast — same entity, so same hue, distinguished by dash */}
              <path
                d={toPath(forecast, ACTUAL_END)}
                fill="none"
                stroke="#3760c8"
                strokeWidth="2"
                strokeDasharray="6 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Endpoint marker, direct-labelled */}
              <circle cx={x(11)} cy={y(forecast[forecast.length - 1])} r="4.5" fill="#3760c8" stroke="var(--color-canvas)" strokeWidth="2" />

              {/* Hover layer */}
              {hover !== null && (
                <g pointerEvents="none">
                  <line
                    x1={x(hover)}
                    x2={x(hover)}
                    y1={PAD.top}
                    y2={PAD.top + plotH}
                    stroke="var(--color-brand-300)"
                    strokeWidth="1"
                  />
                  <circle
                    cx={x(hover)}
                    cy={y(series[hover])}
                    r="5"
                    fill="#3760c8"
                    stroke="var(--color-canvas)"
                    strokeWidth="2"
                  />
                </g>
              )}

              <rect
                x={PAD.left}
                y={PAD.top}
                width={plotW}
                height={plotH}
                fill="transparent"
                onPointerMove={onMove}
                onPointerDown={onMove}
                onPointerLeave={() => setHover(null)}
                style={{ cursor: "crosshair" }}
              />
            </svg>

            {/* Tooltip */}
            {hover !== null && (
              <div
                role="status"
                className="pointer-events-none absolute top-6 z-10 -translate-x-1/2 rounded-md border border-line bg-canvas px-3 py-2 shadow-md"
                style={{
                  left: `calc(${(x(hover) / CHART_W) * 100}% )`,
                }}
              >
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted">
                  {months[hover]} · {hover > ACTUAL_END ? scenarios[scenario].label : "Actual"}
                </p>
                <p className="tabular mt-0.5 text-[0.9375rem] font-semibold text-ink">
                  {series[hover]}
                </p>
              </div>
            )}
          </div>

          {/* Legend — identity is never colour-alone */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line px-5 py-4 sm:px-7">
            <span className="flex items-center gap-2 text-[0.8125rem] text-body">
              <svg width="22" height="8" aria-hidden>
                <line x1="1" y1="4" x2="21" y2="4" stroke="#3760c8" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Actual
            </span>
            <span className="flex items-center gap-2 text-[0.8125rem] text-body">
              <svg width="22" height="8" aria-hidden>
                <line x1="1" y1="4" x2="21" y2="4" stroke="#3760c8" strokeWidth="2" strokeDasharray="6 5" strokeLinecap="round" />
              </svg>
              Forecast ({scenarios[scenario].label.toLowerCase()})
            </span>
            <span className="flex items-center gap-2 text-[0.8125rem] text-body">
              <span aria-hidden className="h-3 w-5 rounded-xs border border-brand-300/60 bg-brand-500/15" />
              Sensitivity range
            </span>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 50} className="bg-canvas p-6">
              <h3 className="text-[0.9375rem] font-semibold text-ink">{c.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{c.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

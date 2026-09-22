import { ArrowRight, Boxes, Network, Calculator, Bot, Workflow } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";

const layers = [
  { icon: Workflow, label: "Business workflow", tag: "Outcome" },
  { icon: Bot, label: "AI agents & automation", tag: "Agentic" },
  { icon: Boxes, label: "ERP & accounting core", tag: "System of record" },
  { icon: Calculator, label: "Finance, tax & reporting", tag: "Compliance" },
  { icon: Network, label: "Network & infrastructure", tag: "Foundation" },
];

const platforms = [
  "SAP",
  "Oracle",
  "NetSuite",
  "Odoo",
  "ERPNext",
  "SolarWinds",
  "QuickBooks",
  "Xero",
  "Zoho",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {/* Photographic ground, then the hairline grid and directional wash on top. */}
      <SectionBackdrop image="bg/hero" priority dim={0.54} />
      <div aria-hidden className="grid-field absolute inset-0 opacity-50" />

      <div className="shell relative grid items-center gap-14 pb-16 pt-14 sm:pb-20 sm:pt-18 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:gap-16 lg:pb-24 lg:pt-22">
        <Reveal>
          <Eyebrow tone="dark">Multidisciplinary services</Eyebrow>

          <h1 className="mt-5 max-w-[19ch] text-pretty text-display-xl text-white">
            ERP, finance and infrastructure,{" "}
            <span className="text-brand-300">engineered as one system.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lead text-brand-100/75">
            We implement the platforms mid-market and enterprise businesses run on — then operate
            the accounting, compliance and monitoring that keep them trustworthy. One accountable
            partner across the stack, instead of vendors pointing at each other.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/#quote" variant="onDark" size="lg">
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/#services" variant="inverse" size="lg">
              Explore Services
            </Button>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-t border-white/12 pt-7 sm:grid-cols-3">
            {[
              ["Implementation", "Blueprint to hypercare"],
              ["Operations", "Books, close and filings"],
              ["Jurisdictions", "Pakistan · UK · US"],
            ].map(([term, detail]) => (
              <div key={term}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-brand-300">
                  {term}
                </dt>
                <dd className="mt-1.5 text-[0.875rem] leading-snug text-brand-100/80">{detail}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* The stack diagram: what "multidisciplinary" actually means, in one read. */}
        <Reveal delay={120} className="lg:justify-self-end lg:pl-4">
          <div className="relative w-full max-w-md rounded-xl border border-white/15 bg-brand-950/55 p-1.5 shadow-lg backdrop-blur-md lg:max-w-none">
            <div className="rounded-lg border border-white/10 bg-brand-950/85">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-brand-200">
                  Operating stack
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-brand-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-500 opacity-70 motion-reduce:hidden" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
                  </span>
                  monitored
                </span>
              </div>

              <ol className="relative px-4 py-3">
                {/* spine */}
                <span
                  aria-hidden
                  className="absolute bottom-8 left-[1.6875rem] top-8 w-px bg-gradient-to-b from-brand-400/60 via-brand-400/30 to-accent-500/50"
                />
                {layers.map(({ icon: Icon, label, tag }, i) => (
                  <li key={label} className="relative flex items-center gap-3.5 py-3">
                    <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/12 bg-brand-900 text-brand-200">
                      <Icon className="h-[0.9375rem] w-[0.9375rem]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1 text-[0.875rem] font-medium text-white/90">
                      {label}
                    </span>
                    <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-brand-300/80">
                      {tag}
                    </span>
                    {i < layers.length - 1 && (
                      <span className="absolute inset-x-0 -bottom-px h-px bg-white/5" />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Platform rail — what we implement, stated plainly. */}
      <div className="relative border-t border-white/10">
        <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:gap-8">
          <p className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-brand-300">
            Platforms we implement &amp; support
          </p>
          <ul className="no-bar -mx-5 flex gap-x-7 gap-y-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {platforms.map((p) => (
              <li
                key={p}
                className="shrink-0 font-display text-[0.9375rem] font-semibold tracking-[-0.01em] text-white/55"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

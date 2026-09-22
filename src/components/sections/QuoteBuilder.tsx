"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { tiers, industries } from "@/data/erp";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const currentSystems = [
  "SAP",
  "Oracle",
  "NetSuite",
  "Odoo",
  "ERPNext",
  "QuickBooks Online",
  "Xero",
  "Zoho Books",
  "Spreadsheets only",
  "Nothing yet",
];

const steps = ["Needs", "Company", "Systems", "Contact", "Summary"] as const;

type Form = {
  needs: string[];
  size: string;
  industry: string;
  systems: string[];
  requirements: string;
  name: string;
  company: string;
  email: string;
  phone: string;
};

const empty: Form = {
  needs: [],
  size: "",
  industry: "",
  systems: [],
  requirements: "",
  name: "",
  company: "",
  email: "",
  phone: "",
};

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/** Multi-select chip grid, shared by the needs and systems steps. */
function ChipGroup({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(o.value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border px-3.5 py-2.5 text-left text-[0.875rem] font-medium transition-colors duration-200",
                on
                  ? "border-brand-700 bg-brand-50 text-brand-800"
                  : "border-line-strong bg-canvas text-body hover:border-brand-300 hover:text-ink",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-xs border transition-colors",
                  on ? "border-brand-700 bg-brand-700 text-white" : "border-line-strong",
                )}
              >
                {on && <Check className="h-3 w-3" strokeWidth={3} />}
              </span>
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({
  label,
  id,
  required,
  error,
  ...input
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.8125rem] font-medium text-ink">
        {label}
        {required && (
          <span className="text-error-500" aria-hidden>
            {" "}
            *
          </span>
        )}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-1.5 h-11 w-full rounded-md border bg-canvas px-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-faint",
          error ? "border-error-500" : "border-line-strong focus:border-brand-600",
        )}
        {...input}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[0.75rem] text-error-500">
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteBuilder() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [touched, setTouched] = useState(false);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const errors = {
    name: !form.name.trim() ? "Please tell us who to reply to." : "",
    email: !isEmail(form.email) ? "Enter a valid email address." : "",
  };

  const canAdvance = [
    form.needs.length > 0,
    Boolean(form.size && form.industry),
    true,
    !errors.name && !errors.email,
    true,
  ][step];

  const summary = useMemo(() => {
    const selected = services.filter((s) => form.needs.includes(s.id));
    const tier = tiers.find((t) => t.id === form.size);
    const ind = industries.find((i) => i.id === form.industry);
    return { selected, tier, ind };
  }, [form]);

  const mailBody = useMemo(() => {
    const lines = [
      "Consultation request — preliminary scope",
      "",
      `Services: ${summary.selected.map((s) => s.title).join(", ") || "—"}`,
      `Company size: ${summary.tier?.label ?? "—"}`,
      `Industry: ${summary.ind?.label ?? "—"}`,
      `Current systems: ${form.systems.join(", ") || "—"}`,
      "",
      "Requirements:",
      form.requirements.trim() || "—",
      "",
      `Name: ${form.name}`,
      `Company: ${form.company || "—"}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "—"}`,
    ];
    return lines.join("\n");
  }, [form, summary]);

  // ponytail: mailto hand-off keeps this backendless. Swap for a POST to the
  // CRM endpoint once one exists — the payload is already assembled above.
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Consultation request — " + (form.company || form.name || "new enquiry"),
  )}&body=${encodeURIComponent(mailBody)}`;

  const next = () => {
    if (step === 3) setTouched(true);
    if (canAdvance) setStep((s) => Math.min(steps.length - 1, s + 1));
  };

  return (
    <section id="quote" className="section scroll-mt-24 border-b border-line bg-canvas">
      <div className="shell">
        <SectionHeader
          eyebrow="Scope a project"
          title="Tell us what you are dealing with."
          lead="Five short steps produce a preliminary scope you can review before anyone books time. No obligation, and no sales sequence."
          align="center"
        />

        <Reveal delay={60} className="mx-auto mt-10 max-w-3xl">
          <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
            {/* Progress */}
            <div className="border-b border-line bg-canvas px-5 py-4 sm:px-7">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-muted">
                  Step {step + 1} of {steps.length}
                  <span className="ml-2 text-ink">{steps[step]}</span>
                </p>
                <ol className="hidden items-center gap-1.5 sm:flex">
                  {steps.map((s, i) => (
                    <li key={s} className="flex items-center gap-1.5">
                      <span
                        aria-current={i === step ? "step" : undefined}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)]",
                          i === step
                            ? "w-7 bg-brand-700"
                            : i < step
                              ? "w-4 bg-brand-300"
                              : "w-4 bg-line-strong",
                        )}
                      />
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-surface-2 sm:hidden">
                <div
                  className="h-full rounded-full bg-brand-700 transition-[width] duration-400 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Body */}
            <div key={step} className="animate-reveal px-5 py-7 sm:px-7 sm:py-8">
              {step === 0 && (
                <>
                  <h3 className="text-display-sm">What do you need help with?</h3>
                  <p className="mt-2 text-[0.9375rem] text-body">Select everything that applies.</p>
                  <div className="mt-6">
                    <ChipGroup
                      legend="Services required"
                      options={services.map((s) => ({ value: s.id, label: s.title }))}
                      selected={form.needs}
                      onToggle={(v) => set("needs", toggle(form.needs, v))}
                    />
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <h3 className="text-display-sm">Tell us about the company</h3>
                  <div className="mt-6">
                    <p id="q-size-label" className="font-mono text-eyebrow uppercase text-muted">
                      Size
                    </p>
                    <div
                      className="mt-3 grid gap-2 sm:grid-cols-3"
                      role="radiogroup"
                      aria-labelledby="q-size-label"
                    >
                      {tiers.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          role="radio"
                          aria-checked={form.size === t.id}
                          onClick={() => set("size", t.id)}
                          className={cn(
                            "rounded-md border px-3 py-3 text-left transition-colors duration-200",
                            form.size === t.id
                              ? "border-brand-700 bg-brand-50"
                              : "border-line-strong bg-canvas hover:border-brand-300",
                          )}
                        >
                          <span className="block text-[0.875rem] font-semibold text-ink">
                            {t.label}
                          </span>
                          <span className="mt-0.5 block text-[0.75rem] text-muted">{t.detail}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7">
                    <p id="q-industry-label" className="font-mono text-eyebrow uppercase text-muted">
                      Industry
                    </p>
                    <div
                      className="mt-3 flex flex-wrap gap-2"
                      role="radiogroup"
                      aria-labelledby="q-industry-label"
                    >
                      {industries.map((ind) => (
                        <button
                          key={ind.id}
                          type="button"
                          role="radio"
                          aria-checked={form.industry === ind.id}
                          onClick={() => set("industry", ind.id)}
                          className={cn(
                            "rounded-md border px-3.5 py-2.5 text-[0.875rem] font-medium transition-colors duration-200",
                            form.industry === ind.id
                              ? "border-brand-700 bg-brand-700 text-white"
                              : "border-line-strong bg-canvas text-body hover:border-brand-300 hover:text-ink",
                          )}
                        >
                          {ind.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="text-display-sm">What are you running today?</h3>
                  <p className="mt-2 text-[0.9375rem] text-body">
                    Optional, but it makes the first conversation far more useful.
                  </p>
                  <div className="mt-6">
                    <ChipGroup
                      legend="Current systems"
                      options={currentSystems.map((s) => ({ value: s, label: s }))}
                      selected={form.systems}
                      onToggle={(v) => set("systems", toggle(form.systems, v))}
                    />
                  </div>
                  <div className="mt-7">
                    <label
                      htmlFor="requirements"
                      className="block text-[0.8125rem] font-medium text-ink"
                    >
                      Anything specific we should know?
                    </label>
                    <textarea
                      id="requirements"
                      rows={4}
                      value={form.requirements}
                      onChange={(e) => set("requirements", e.target.value)}
                      placeholder="Deadlines, entities, jurisdictions, the thing that is actually broken…"
                      className="mt-1.5 w-full resize-y rounded-md border border-line-strong bg-canvas px-3 py-2.5 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-faint focus:border-brand-600"
                    />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="text-display-sm">Where should we send the scope?</h3>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field
                      id="q-name"
                      label="Full name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      error={touched ? errors.name : ""}
                    />
                    <Field
                      id="q-company"
                      label="Company"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                    />
                    <Field
                      id="q-email"
                      label="Work email"
                      type="email"
                      inputMode="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      error={touched ? errors.email : ""}
                    />
                    <Field
                      id="q-phone"
                      label="Phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="text-display-sm">Preliminary scope</h3>
                  <p className="mt-2 text-[0.9375rem] text-body">
                    Review this, then send it over. We will come back with the questions that
                    actually determine cost.
                  </p>

                  <dl className="mt-6 divide-y divide-line overflow-hidden rounded-lg border border-line bg-canvas">
                    {[
                      [
                        "Services",
                        summary.selected.length
                          ? summary.selected.map((s) => s.title).join(" · ")
                          : "Not specified",
                      ],
                      ["Company size", summary.tier?.label ?? "Not specified"],
                      ["Industry", summary.ind?.label ?? "Not specified"],
                      ["Current systems", form.systems.join(" · ") || "Not specified"],
                      ["Requirements", form.requirements.trim() || "Not specified"],
                      ["Contact", [form.name, form.company, form.email].filter(Boolean).join(" · ")],
                    ].map(([term, detail]) => (
                      <div key={term} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-4">
                        <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted sm:pt-0.5">
                          {term}
                        </dt>
                        <dd className="text-[0.9375rem] leading-relaxed text-ink">{detail}</dd>
                      </div>
                    ))}
                  </dl>

                  {summary.selected.length > 0 && (
                    <div className="mt-5 rounded-lg border border-brand-200 bg-brand-50/60 p-5">
                      <p className="font-mono text-eyebrow uppercase text-brand-700">
                        Likely engagement shape
                      </p>
                      <ul className="mt-3 space-y-2">
                        {summary.selected.map((s) => (
                          <li key={s.id} className="flex items-start gap-2.5 text-[0.875rem] text-brand-900">
                            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                            <span>
                              <span className="font-medium">{s.title}</span> — {s.capabilities[0].toLowerCase()},{" "}
                              {s.capabilities[1].toLowerCase()}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[0.75rem] leading-relaxed text-brand-700/80">
                        Indicative only. Scope and pricing are confirmed after a discovery call.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button href={mailto} size="lg">
                      <Mail className="h-4 w-4" aria-hidden />
                      Send &amp; book a consultation
                    </Button>
                    <Button href="/contact" variant="secondary" size="lg">
                      Contact us another way
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Controls */}
            {step < steps.length - 1 && (
              <div className="flex items-center justify-between gap-4 border-t border-line bg-canvas px-5 py-4 sm:px-7">
                {step > 0 ? (
                  <Button variant="ghost" size="md" onClick={() => setStep((s) => s - 1)}>
                    <ArrowLeft className="h-4 w-4" aria-hidden />
                    Back
                  </Button>
                ) : (
                  <span />
                )}
                <Button size="md" onClick={next} disabled={!canAdvance && step !== 3}>
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            )}

            {step === steps.length - 1 && (
              <div className="border-t border-line bg-canvas px-5 py-4 sm:px-7">
                <Button variant="ghost" size="md" onClick={() => setStep(3)}>
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back to contact details
                </Button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";

const topics = [
  "ERP & business software",
  "IT infrastructure & SolarWinds",
  "Accounting & outsourcing",
  "Tax compliance",
  "E-commerce integrations",
  "Agentic AI & custom software",
  "Planning & forecasting",
  "Marketing solutions",
  "Something else",
];

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    topic: topics[0],
    message: "",
  });
  const [touched, setTouched] = useState(false);

  const errors = {
    name: form.name.trim() ? "" : "Please tell us who to reply to.",
    email: isEmail(form.email) ? "" : "Enter a valid email address.",
    message: form.message.trim().length > 9 ? "" : "A sentence or two is enough.",
  };
  const valid = !errors.name && !errors.email && !errors.message;

  // ponytail: mailto hand-off — no backend to run or secure.
  // Swap for a POST to the CRM endpoint when one exists.
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `${form.topic} — ${form.company || form.name || "enquiry"}`,
  )}&body=${encodeURIComponent(
    [
      `Topic: ${form.topic}`,
      `Name: ${form.name}`,
      `Company: ${form.company || "—"}`,
      `Email: ${form.email}`,
      "",
      form.message,
    ].join("\n"),
  )}`;

  const field =
    "mt-1.5 w-full rounded-md border bg-canvas px-3 text-[0.9375rem] text-ink outline-none transition-colors placeholder:text-faint";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (valid) window.location.href = mailto;
      }}
      noValidate
      className="rounded-xl border border-line bg-canvas p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="block text-[0.8125rem] font-medium text-ink">
            Full name <span className="text-error-500">*</span>
          </label>
          <input
            id="c-name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            aria-invalid={touched && !!errors.name}
            aria-describedby={touched && errors.name ? "c-name-error" : undefined}
            className={cn(
              field,
              "h-11",
              touched && errors.name ? "border-error-500" : "border-line-strong focus:border-brand-600",
            )}
          />
          {touched && errors.name && (
            <p id="c-name-error" role="alert" className="mt-1.5 text-[0.75rem] text-error-500">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-company" className="block text-[0.8125rem] font-medium text-ink">
            Company
          </label>
          <input
            id="c-company"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className={cn(field, "h-11 border-line-strong focus:border-brand-600")}
          />
        </div>

        <div>
          <label htmlFor="c-email" className="block text-[0.8125rem] font-medium text-ink">
            Work email <span className="text-error-500">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-invalid={touched && !!errors.email}
            aria-describedby={touched && errors.email ? "c-email-error" : undefined}
            className={cn(
              field,
              "h-11",
              touched && errors.email ? "border-error-500" : "border-line-strong focus:border-brand-600",
            )}
          />
          {touched && errors.email && (
            <p id="c-email-error" role="alert" className="mt-1.5 text-[0.75rem] text-error-500">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="c-topic" className="block text-[0.8125rem] font-medium text-ink">
            What is it about?
          </label>
          <select
            id="c-topic"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className={cn(field, "h-11 border-line-strong focus:border-brand-600")}
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="c-message" className="block text-[0.8125rem] font-medium text-ink">
          How can we help? <span className="text-error-500">*</span>
        </label>
        <textarea
          id="c-message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          aria-invalid={touched && !!errors.message}
          aria-describedby={touched && errors.message ? "c-message-error" : undefined}
          placeholder="The systems involved, the deadline, and what is actually going wrong."
          className={cn(
            field,
            "resize-y py-2.5",
            touched && errors.message
              ? "border-error-500"
              : "border-line-strong focus:border-brand-600",
          )}
        />
        {touched && errors.message && (
          <p id="c-message-error" role="alert" className="mt-1.5 text-[0.75rem] text-error-500">
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg">
          <Mail className="h-4 w-4" aria-hidden />
          Send message
        </Button>
        <p className="text-[0.75rem] leading-relaxed text-muted">
          Opens your email client with the details filled in, so nothing is stored on this site.
        </p>
      </div>
    </form>
  );
}

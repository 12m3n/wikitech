import { Cpu, Calculator, Wrench, Bot } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";

const disciplines = [
  {
    icon: Cpu,
    name: "Technology",
    claim: "We can read the schema, not just the sales deck.",
    detail:
      "ERP architecture, integration design and infrastructure monitoring sit in the same team, so a systems question gets a systems answer.",
  },
  {
    icon: Calculator,
    name: "Finance",
    claim: "The people configuring it also close the books.",
    detail:
      "Chart of accounts, tax treatment and close mechanics are designed by accountants, which is why the reports reconcile the first time.",
  },
  {
    icon: Wrench,
    name: "Implementation",
    claim: "Blueprint through hypercare, not a handover.",
    detail:
      "The same team carries requirements into migration, training and stabilisation — there is no point where accountability transfers.",
  },
  {
    icon: Bot,
    name: "Automation",
    claim: "Built once the process is worth automating.",
    detail:
      "Agents and middleware come after the process is defined, so we are not hard-coding a workaround into your operating model.",
  },
];

const fragmented = [
  ["ERP partner", "Owns the configuration, not the numbers"],
  ["Accounting firm", "Owns the numbers, not the system"],
  ["Tax adviser", "Owns one jurisdiction at a time"],
  ["IT vendor", "Owns the network, blind to the application"],
  ["Automation agency", "Owns a script nobody else can maintain"],
];

export function WhyUsSection() {
  return (
    <section className="section relative overflow-hidden border-b border-line bg-brand-950 text-white">
      <SectionBackdrop image="bg/why-us" dim={0.54} />
      <div aria-hidden className="grid-field absolute inset-0 opacity-45" />
      <div className="shell relative">
        <SectionHeader
          tone="dark"
          eyebrow="Why Wikitech Group"
          title="The gaps between vendors are where projects fail."
          lead="Most of what goes wrong in an ERP or compliance programme happens at a handover — between the people who configure the system and the people who have to close on it. We removed the handover."
        />

        {/* The contrast */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-10">
          <Reveal>
            <div className="h-full rounded-xl border border-white/12 bg-brand-950/80 p-6 backdrop-blur-sm">
              <h3 className="font-mono text-eyebrow uppercase text-brand-300/70">
                The usual arrangement
              </h3>
              <ul className="mt-5 space-y-4">
                {fragmented.map(([who, gap]) => (
                  <li key={who} className="border-l border-white/12 pl-4">
                    <p className="text-[0.9375rem] font-medium text-white/70">{who}</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-snug text-brand-100/45">{gap}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-5 text-[0.8125rem] leading-relaxed text-brand-100/50">
                Five contracts, five roadmaps, and a problem that belongs to whoever answers last.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="h-full rounded-xl border border-brand-400/30 bg-brand-900/80 p-6 backdrop-blur-sm lg:p-8">
              <h3 className="font-mono text-eyebrow uppercase text-brand-200">
                One partner, four disciplines
              </h3>
              <ul className="mt-5 grid gap-5 sm:grid-cols-2">
                {disciplines.map((d) => (
                  <li key={d.name} className="rounded-lg border border-white/10 bg-brand-950/70 p-5">
                    <d.icon className="h-5 w-5 text-brand-300" aria-hidden />
                    <h4 className="mt-3.5 text-[1rem] font-semibold text-white">{d.name}</h4>
                    <p className="mt-1.5 text-[0.875rem] font-medium leading-snug text-brand-200">
                      {d.claim}
                    </p>
                    <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-brand-100/65">
                      {d.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

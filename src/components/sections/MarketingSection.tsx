import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CardImage } from "@/components/ui/CardImage";

const funnel = [
  { image: "funnel/demand", stage: "Demand", detail: "B2B campaigns aimed at defined accounts and roles" },
  { image: "funnel/capture", stage: "Capture", detail: "Google Ads and Meta Ads with intent-matched landing paths" },
  { image: "funnel/qualify", stage: "Qualify", detail: "Automated routing and scoring before a rep is involved" },
  { image: "funnel/crm", stage: "CRM", detail: "Every touch written back, so spend maps to pipeline" },
] as const;

export function MarketingSection() {
  return (
    <section id="marketing" className="section-tight scroll-mt-24 border-b border-line bg-canvas">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          <SectionHeader
            eyebrow="08 — Marketing Solutions"
            title="Spend that can be traced to pipeline."
            lead="B2B marketing gets judged on cost per lead because nobody wired the CRM up properly. We connect the funnel end to end so the conversation is about pipeline instead of clicks."
          />

          <Reveal delay={60}>
            <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {funnel.map((f, i) => (
                <li key={f.stage} className="group bg-canvas">
                  <div className="relative">
                    <CardImage
                      image={f.image}
                      className="aspect-[16/9] w-full"
                      sizes="(max-width: 640px) 100vw, 30vw"
                    />
                    <span className="absolute right-3 top-3 rounded-sm bg-brand-950/70 px-1.5 py-0.5 font-mono text-[0.6875rem] text-white backdrop-blur-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-[0.9375rem] font-semibold text-ink">{f.stage}</h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

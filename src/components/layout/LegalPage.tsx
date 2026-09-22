import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="shell py-14 sm:py-18">
          <Reveal className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-display-lg">{title}</h1>
            <p className="mt-5 text-lead text-body">{intro}</p>
            <p className="mt-6 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-muted">
              Last updated {updated}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="shell">
          <Reveal className="legal">{children}</Reveal>
        </div>
      </section>
    </>
  );
}

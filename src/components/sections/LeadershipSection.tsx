import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";
import { site } from "@/data/site";

/**
 * Everything here restates commitments made elsewhere on the site — the single
 * line of accountability, blueprint-through-hypercare, the three tax regimes.
 * Nothing about the person is invented: the name is a marked placeholder and
 * there is no biography or quotation until the client supplies one.
 */
const commitments = [
  {
    title: "One contract, one roadmap",
    detail:
      "The systems work and the finance work sit under the same engagement, so there is no seam for a problem to fall through.",
  },
  {
    title: "The team that blueprints stays through hypercare",
    detail:
      "Requirements, migration, training and stabilisation are carried by the same people. Accountability never transfers mid-project.",
  },
  {
    title: "One calendar across three jurisdictions",
    detail:
      "Pakistan, the United Kingdom and the United States are tracked together, with a documented position behind every filing.",
  },
];

export function LeadershipSection() {
  const portrait = images["team/owner"];

  return (
    <section id="leadership" className="section scroll-mt-24 border-b border-line bg-canvas">
      <div className="shell">
        <SectionHeader
          eyebrow="Leadership"
          title="The person accountable for the work."
          lead="A single line of accountability is easy to put in a proposal and harder to staff. It is the commitment this firm is built on, so it belongs with a name against it rather than buried in a capability list."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-center lg:gap-16">
          {/* Portrait */}
          <Reveal className="mx-auto w-full max-w-[19rem] lg:mx-0 lg:max-w-none">
            <div className="relative overflow-hidden rounded-xl border border-line bg-gradient-to-b from-brand-50 to-brand-100 shadow-sm">
              {/* A soft vignette so the cut-out sits in the frame rather than floating. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(75%_60%_at_50%_18%,rgba(255,255,255,0.75),transparent_70%)]"
              />
              <Image
                src={portrait.src}
                alt="Portrait of the owner of Wikitech Group"
                width={portrait.width}
                height={portrait.height}
                sizes="(max-width: 1024px) 19rem, 30vw"
                className="relative h-auto w-full object-contain"
              />
            </div>

            <div className="mt-5">
              <p className="text-display-sm leading-tight">
                {/* Replace with the owner's full name. */}
                <span className="tbc">Full name to be confirmed</span>
              </p>
              <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.1em] text-brand-600">
                Owner · {site.name}
              </p>
            </div>
          </Reveal>

          {/* What the commitment means */}
          <div>
            <Reveal>
              <h3 className="font-mono text-eyebrow uppercase text-muted">
                What that accountability covers
              </h3>
            </Reveal>

            <ul className="mt-6 divide-y divide-line border-y border-line">
              {commitments.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 70} className="py-6">
                  <div className="flex gap-5">
                    <span className="mt-0.5 font-mono text-[0.75rem] font-medium text-brand-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="text-[1rem] font-semibold text-ink">{c.title}</h4>
                      <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-body">
                        {c.detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/*
              A short statement from the owner belongs here once supplied —
              nothing is written on their behalf in the meantime.
            */}

            <Reveal delay={220} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/#quote" size="lg">
                Book a consultation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary" size="lg">
                <Mail className="h-4 w-4" aria-hidden />
                Email directly
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Seal } from "@/components/brand/Logo";
import { site } from "@/data/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-brand-900 text-white">
      <SectionBackdrop image="bg/final-cta" dim={0.66} />
      <div aria-hidden className="grid-field absolute inset-0 opacity-40" />

      <div className="shell relative py-18 sm:py-22 lg:py-26">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Seal tone="light" className="mx-auto w-24 opacity-90" />

          <h2 className="mt-8 text-display-lg text-white">
            Let&rsquo;s solve the systems behind your business.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lead text-brand-100/75">
            Bring us the ERP that never quite went live, the close that takes three weeks, or the
            filings nobody owns. We will tell you what it actually takes to fix it.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/#quote" variant="onDark" size="lg">
              Book a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button href="/contact" variant="inverse" size="lg">
              Contact Us
            </Button>
          </div>

          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex items-center gap-2 font-mono text-[0.8125rem] text-brand-200 transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

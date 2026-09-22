import { Hero } from "@/components/sections/Hero";
import { ServiceSelector } from "@/components/sections/ServiceSelector";
import { ErpSection } from "@/components/sections/ErpSection";
import { InfrastructureSection } from "@/components/sections/InfrastructureSection";
import { AccountingSection } from "@/components/sections/AccountingSection";
import { TaxSection } from "@/components/sections/TaxSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import { AiSection } from "@/components/sections/AiSection";
import { ForecastingSection } from "@/components/sections/ForecastingSection";
import { MarketingSection } from "@/components/sections/MarketingSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { CaseStudiesSection } from "@/components/sections/CaseStudiesSection";
import { QuoteBuilder } from "@/components/sections/QuoteBuilder";
import { FinalCta } from "@/components/sections/FinalCta";
import { services } from "@/data/services";
import { site } from "@/data/site";

/** One Service entry per pillar, so each is individually discoverable. */
const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": services.map((s) => ({
    "@type": "Service",
    name: s.title,
    description: s.summary,
    serviceType: s.title,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/#${s.anchor}`,
  })),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceSelector />
      <ErpSection />
      <InfrastructureSection />
      <AccountingSection />
      <TaxSection />
      <IntegrationsSection />
      <AiSection />
      <ForecastingSection />
      <MarketingSection />
      <WhyUsSection />
      <CaseStudiesSection />
      <QuoteBuilder />
      <FinalCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

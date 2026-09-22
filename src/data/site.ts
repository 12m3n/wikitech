export const site = {
  name: "Wikitech Group",
  legalName: "Wikitech Group",
  tagline: "Technology Solutions & Services",
  /** Single verified contact channel from the project brief. */
  email: "wa95122@gmail.com",
  url: "https://wikitechgroup.com",
  description:
    "Wikitech Group implements and runs the systems businesses depend on — ERP, accounting, tax compliance, IT infrastructure and automation — under one accountable partner.",
} as const;

export const nav = [
  { label: "Services", href: "/#services" },
  { label: "ERP", href: "/#erp" },
  { label: "Infrastructure", href: "/#infrastructure" },
  { label: "Finance & Tax", href: "/#accounting" },
  { label: "Automation", href: "/#ai" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = [
  {
    heading: "Platforms & Systems",
    links: [
      { label: "ERP & Business Software", href: "/#erp" },
      { label: "IT Infrastructure & SolarWinds", href: "/#infrastructure" },
      { label: "E-Commerce Integrations", href: "/#integrations" },
      { label: "Agentic AI & Custom Software", href: "/#ai" },
    ],
  },
  {
    heading: "Finance & Advisory",
    links: [
      { label: "Accounting & Outsourcing", href: "/#accounting" },
      { label: "Multi-Jurisdictional Tax", href: "/#tax" },
      { label: "Planning & Forecasting", href: "/#forecasting" },
      { label: "Marketing Solutions", href: "/#marketing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Selected Work", href: "/#work" },
      { label: "Contact", href: "/contact" },
      { label: "Scope a Project", href: "/#quote" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;

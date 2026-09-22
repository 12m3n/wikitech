import type { LucideIcon } from "lucide-react";
import type { ImageKey } from "./images";
import {
  Boxes,
  Network,
  Calculator,
  Landmark,
  ShoppingCart,
  Bot,
  LineChart,
  Megaphone,
} from "lucide-react";

export type ServiceGroup = "systems" | "finance" | "growth";

export type Service = {
  id: string;
  anchor: string;
  title: string;
  short: string;
  summary: string;
  group: ServiceGroup;
  icon: LucideIcon;
  image: ImageKey;
  capabilities: string[];
  /** Named platforms / regimes we work in — drawn from the service catalog. */
  stack: string[];
};

export const groupLabels: Record<ServiceGroup, string> = {
  systems: "Systems & Infrastructure",
  finance: "Finance & Compliance",
  growth: "Automation & Growth",
};

export const services: Service[] = [
  {
    id: "erp",
    anchor: "erp",
    title: "ERP & Business Software",
    short: "ERP",
    group: "systems",
    icon: Boxes,
    image: "service/erp",
    summary:
      "Tier-1 and mid-market ERP implementations, from requirements blueprinting through data migration, training and hypercare.",
    capabilities: [
      "Requirements blueprinting",
      "Business process re-engineering",
      "Data migration & reconciliation",
      "User training & hypercare",
    ],
    stack: ["SAP S/4HANA", "SAP Business One", "Oracle Cloud ERP", "NetSuite", "Odoo", "ERPNext"],
  },
  {
    id: "infrastructure",
    anchor: "infrastructure",
    title: "IT Infrastructure & SolarWinds",
    short: "Infrastructure",
    group: "systems",
    icon: Network,
    image: "service/infrastructure",
    summary:
      "Network, server and application observability for large industrial estates, including OT/IT bridging where plant and corporate networks meet.",
    capabilities: [
      "Network performance monitoring",
      "Server & application monitoring",
      "Large industrial network design",
      "OT/IT convergence",
    ],
    stack: ["SolarWinds NPM", "SolarWinds SAM", "Industrial networks", "OT/IT bridging"],
  },
  {
    id: "accounting",
    anchor: "accounting",
    title: "Accounting & Outsourcing",
    short: "Accounting",
    group: "finance",
    icon: Calculator,
    image: "service/accounting",
    summary:
      "Offshore accounting pods that run full-cycle bookkeeping, AP/AR administration and the monthly close as an extension of your finance function.",
    capabilities: [
      "Full-cycle bookkeeping",
      "AP/AR administration",
      "Monthly close & reporting packs",
      "Dedicated accounting pods",
    ],
    stack: ["QuickBooks Online", "Xero", "Zoho Books", "NetSuite", "Odoo"],
  },
  {
    id: "tax",
    anchor: "tax",
    title: "Tax Compliance",
    short: "Tax",
    group: "finance",
    icon: Landmark,
    image: "service/tax",
    summary:
      "Multi-jurisdictional compliance across Pakistan, the United Kingdom and the United States, handled by one team with one calendar.",
    capabilities: [
      "Registration & filing calendars",
      "Return preparation & submission",
      "Withholding tax management",
      "Digital record-keeping",
    ],
    stack: ["FBR", "PRA / SRB / KPRA", "HMRC MTD", "IRS & state authorities"],
  },
  {
    id: "integrations",
    anchor: "integrations",
    title: "E-Commerce Integrations",
    short: "Integrations",
    group: "growth",
    icon: ShoppingCart,
    image: "service/integrations",
    summary:
      "Storefront-to-ledger synchronisation so orders, inventory, settlements and fees land in the ERP without a spreadsheet in between.",
    capabilities: [
      "Order & inventory sync",
      "Settlement and fee reconciliation",
      "Multi-channel consolidation",
      "Middleware monitoring",
    ],
    stack: ["Shopify", "WooCommerce", "Amazon", "Magento"],
  },
  {
    id: "ai",
    anchor: "ai",
    title: "Agentic AI & Custom Software",
    short: "AI & Software",
    group: "growth",
    icon: Bot,
    image: "service/ai",
    summary:
      "Autonomous agents, invoice OCR and custom middleware built against the systems you already run — with a human approval step where it matters.",
    capabilities: [
      "Document & invoice OCR",
      "Autonomous workflow agents",
      "Custom middleware & APIs",
      "Client-facing dashboards",
    ],
    stack: ["OCR pipelines", "Workflow agents", "REST & webhook middleware", "Custom dashboards"],
  },
  {
    id: "forecasting",
    anchor: "forecasting",
    title: "Business Planning & Forecasting",
    short: "Forecasting",
    group: "finance",
    icon: LineChart,
    image: "service/forecasting",
    summary:
      "Financial models that tie to the ledger — cash-flow forecasting, budgeting, sensitivity analysis and the dashboards leadership reviews monthly.",
    capabilities: [
      "Three-statement modelling",
      "Cash-flow forecasting",
      "Budget vs. actual tracking",
      "Sensitivity & scenario analysis",
    ],
    stack: ["Financial models", "Rolling forecasts", "Scenario planning", "Management dashboards"],
  },
  {
    id: "marketing",
    anchor: "marketing",
    title: "Marketing Solutions",
    short: "Marketing",
    group: "growth",
    icon: Megaphone,
    image: "service/marketing",
    summary:
      "B2B demand generation wired into the CRM, so spend, pipeline and closed revenue are measured in one place rather than three.",
    capabilities: [
      "B2B lead generation funnels",
      "Google Ads management",
      "Meta Ads management",
      "CRM-connected attribution",
    ],
    stack: ["Google Ads", "Meta Ads", "CRM integration", "Funnel automation"],
  },
];

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s])) as Record<
  string,
  Service
>;

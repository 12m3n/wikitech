export type Tier = "sme" | "mid" | "enterprise";

export type Industry =
  | "manufacturing"
  | "distribution"
  | "retail"
  | "services"
  | "construction"
  | "energy";

export const tiers: { id: Tier; label: string; detail: string }[] = [
  { id: "sme", label: "SME", detail: "Up to ~50 staff" },
  { id: "mid", label: "Mid-Market", detail: "~50–500 staff" },
  { id: "enterprise", label: "Enterprise", detail: "500+ staff, multi-entity" },
];

export const industries: { id: Industry; label: string }[] = [
  { id: "manufacturing", label: "Manufacturing" },
  { id: "distribution", label: "Distribution & Wholesale" },
  { id: "retail", label: "Retail & E-Commerce" },
  { id: "services", label: "Professional Services" },
  { id: "construction", label: "Construction & Projects" },
  { id: "energy", label: "Energy & Utilities" },
];

export type Platform = {
  id: string;
  name: string;
  vendor: string;
  category: "Tier-1 ERP" | "Cloud ERP" | "Cloud Accounting";
  blurb: string;
  strengths: string[];
  tiers: Tier[];
  industries: Industry[];
};

export const platforms: Platform[] = [
  {
    id: "s4hana",
    name: "SAP S/4HANA",
    vendor: "SAP",
    category: "Tier-1 ERP",
    blurb:
      "The reference platform for complex, multi-entity groups with demanding consolidation and process depth.",
    strengths: ["Multi-entity consolidation", "Deep process coverage", "Global statutory reporting"],
    tiers: ["enterprise"],
    industries: ["manufacturing", "distribution", "energy", "retail"],
  },
  {
    id: "sap-b1",
    name: "SAP Business One",
    vendor: "SAP",
    category: "Tier-1 ERP",
    blurb:
      "SAP process discipline packaged for smaller organisations that expect to grow into a larger estate.",
    strengths: ["Fast time-to-live", "Production & inventory control", "Upgrade path to S/4HANA"],
    tiers: ["sme", "mid"],
    industries: ["manufacturing", "distribution", "retail"],
  },
  {
    id: "oracle-cloud",
    name: "Oracle Cloud ERP",
    vendor: "Oracle",
    category: "Tier-1 ERP",
    blurb:
      "Strong financial core and project accounting for service-heavy and asset-heavy enterprises.",
    strengths: ["Financial consolidation", "Project accounting", "Procurement depth"],
    tiers: ["enterprise"],
    industries: ["services", "energy", "distribution", "construction"],
  },
  {
    id: "netsuite",
    name: "NetSuite",
    vendor: "Oracle",
    category: "Cloud ERP",
    blurb:
      "A cloud-native suite that suits multi-channel and subscription businesses scaling past accounting software.",
    strengths: ["Multi-subsidiary", "Order-to-cash", "Native e-commerce ties"],
    tiers: ["mid", "enterprise"],
    industries: ["retail", "distribution", "services"],
  },
  {
    id: "odoo",
    name: "Odoo",
    vendor: "Odoo S.A.",
    category: "Cloud ERP",
    blurb:
      "Modular and highly extensible — practical when the process is unusual and off-the-shelf does not fit.",
    strengths: ["Modular rollout", "Open extensibility", "Manufacturing & inventory"],
    tiers: ["sme", "mid"],
    industries: ["manufacturing", "retail", "services", "distribution"],
  },
  {
    id: "erpnext",
    name: "ERPNext",
    vendor: "Frappe",
    category: "Cloud ERP",
    blurb:
      "Open-source ERP with a low licence burden, suited to cost-sensitive operational rollouts.",
    strengths: ["Open source", "Low licence cost", "Rapid customisation"],
    tiers: ["sme", "mid"],
    industries: ["manufacturing", "distribution", "services", "construction"],
  },
  {
    id: "qbo",
    name: "QuickBooks Online",
    vendor: "Intuit",
    category: "Cloud Accounting",
    blurb:
      "The default ledger for smaller entities, with a wide integration ecosystem and simple month-end.",
    strengths: ["Fast onboarding", "Wide app ecosystem", "Straightforward close"],
    tiers: ["sme"],
    industries: ["services", "retail", "construction"],
  },
  {
    id: "zoho-books",
    name: "Zoho Books",
    vendor: "Zoho",
    category: "Cloud Accounting",
    blurb:
      "Cost-effective ledger that fits naturally where the wider Zoho suite is already in use.",
    strengths: ["Suite integration", "Automation rules", "Multi-currency"],
    tiers: ["sme"],
    industries: ["services", "retail", "distribution"],
  },
  {
    id: "xero",
    name: "Xero",
    vendor: "Xero",
    category: "Cloud Accounting",
    blurb:
      "Clean bank reconciliation and strong UK compliance support, including Making Tax Digital.",
    strengths: ["Bank reconciliation", "UK MTD support", "Adviser tooling"],
    tiers: ["sme"],
    industries: ["services", "construction", "retail"],
  },
];

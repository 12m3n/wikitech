import type { ImageKey } from "./images";

export type CaseTag = "erp" | "accounting" | "tax" | "infrastructure" | "ai" | "integration";

export const caseTags: { id: CaseTag; label: string }[] = [
  { id: "erp", label: "ERP" },
  { id: "accounting", label: "Accounting" },
  { id: "tax", label: "Tax" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "ai", label: "AI" },
  { id: "integration", label: "Integration" },
];

export type CaseStudy = {
  id: string;
  sector: string;
  title: string;
  image: ImageKey;
  tags: CaseTag[];
  challenge: string;
  solution: string;
  technology: string[];
  /** Outcomes describe engagement scope, not quantified results. */
  outcome: string;
};

/**
 * Engagement profiles describing the shape of the work.
 * Client names and quantified results are withheld pending approval —
 * replace `outcome` with published figures once each is cleared.
 */
export const caseStudies: CaseStudy[] = [
  {
    id: "multi-entity-erp",
    image: "case/multi-entity-erp",
    sector: "Manufacturing",
    title: "Multi-entity ERP consolidation",
    tags: ["erp", "accounting"],
    challenge:
      "Separate ledgers per legal entity meant group reporting was assembled in spreadsheets days after each period closed.",
    solution:
      "A single chart of accounts, blueprinted intercompany rules, and a staged migration that ran both systems in parallel through one full close.",
    technology: ["SAP Business One", "Data migration", "Intercompany reconciliation"],
    outcome:
      "Group consolidation runs inside the ERP, with every entity closing against one shared calendar.",
  },
  {
    id: "ot-it-visibility",
    image: "case/ot-it-visibility",
    sector: "Industrial",
    title: "Plant and corporate network visibility",
    tags: ["infrastructure"],
    challenge:
      "Operational technology and corporate IT were monitored separately, so faults crossing the boundary were diagnosed by phone.",
    solution:
      "A unified monitoring estate covering both sides of the OT/IT boundary, with alert routing mapped to the teams that own each segment.",
    technology: ["SolarWinds NPM", "SolarWinds SAM", "OT/IT segmentation"],
    outcome:
      "One topology view spans plant and corporate networks, with a single escalation path per fault class.",
  },
  {
    id: "storefront-to-ledger",
    image: "case/storefront-to-ledger",
    sector: "Retail & E-Commerce",
    title: "Storefront-to-ledger synchronisation",
    tags: ["integration", "accounting"],
    challenge:
      "Orders, refunds, marketplace fees and settlements were re-keyed from four channels into the accounting system every week.",
    solution:
      "Middleware that maps each channel to one order schema, posts settlements net of fees, and holds exceptions in a review queue instead of failing silently.",
    technology: ["Shopify", "Amazon", "WooCommerce", "Custom middleware"],
    outcome:
      "Channel activity posts to the ledger automatically, with a reconciliation queue for anything that does not match.",
  },
  {
    id: "offshore-pod",
    image: "case/offshore-pod",
    sector: "Professional Services",
    title: "Offshore accounting pod",
    tags: ["accounting"],
    challenge:
      "An in-house finance team was absorbed by transaction processing and had no capacity left for analysis.",
    solution:
      "A dedicated pod took on transaction processing, AP/AR and the monthly close, working inside the existing systems on a published calendar.",
    technology: ["QuickBooks Online", "AP/AR workflow", "Monthly close pack"],
    outcome:
      "Routine processing moved offshore; the in-house team retained review, approval and analysis.",
  },
  {
    id: "invoice-ocr",
    image: "case/invoice-ocr",
    sector: "Distribution",
    title: "Invoice capture with human approval",
    tags: ["ai", "integration"],
    challenge:
      "Supplier invoices arrived as PDFs and scans, and were typed into the ERP line by line before approval.",
    solution:
      "An OCR and extraction pipeline that proposes a coded invoice, matches it against the purchase order, and routes anything below a confidence threshold to a person.",
    technology: ["Invoice OCR", "Three-way matching", "Approval workflow"],
    outcome:
      "Capture and coding are automated end to end, with human approval retained as the control point.",
  },
  {
    id: "multi-jurisdiction-tax",
    image: "case/multi-jurisdiction-tax",
    sector: "Cross-border Group",
    title: "Compliance across three jurisdictions",
    tags: ["tax", "accounting"],
    challenge:
      "Entities in Pakistan, the UK and the US were served by three advisers with no shared view of deadlines or positions.",
    solution:
      "One compliance calendar covering all three regimes, prepared from a common set of books with a documented position behind every filing.",
    technology: ["FBR", "HMRC MTD", "US federal & state"],
    outcome:
      "Filings across three jurisdictions are tracked in a single calendar with one point of accountability.",
  },
];

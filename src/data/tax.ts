export type Region = {
  id: "pk" | "uk" | "us";
  label: string;
  authority: string;
  summary: string;
  areas: { title: string; detail: string }[];
};

export const regions: Region[] = [
  {
    id: "pk",
    label: "Pakistan",
    authority: "FBR · PRA · SRB · KPRA",
    summary:
      "Federal income tax alongside provincial sales-tax-on-services regimes, each with its own portal, rates and filing calendar.",
    areas: [
      {
        title: "Income tax",
        detail:
          "Registration, annual returns and advance tax under the Income Tax Ordinance 2001, filed through the FBR portal.",
      },
      {
        title: "Sales tax on services",
        detail:
          "Provincial filings for PRA (Punjab), SRB (Sindh) and KPRA (Khyber Pakhtunkhwa), reconciled against the federal position.",
      },
      {
        title: "Withholding tax",
        detail:
          "Deduction at source on payments, statement preparation and reconciliation of challans against vendor ledgers.",
      },
      {
        title: "Ongoing compliance",
        detail:
          "A maintained filing calendar, documentation trail and correspondence handling with the relevant authority.",
      },
    ],
  },
  {
    id: "uk",
    label: "United Kingdom",
    authority: "HMRC",
    summary:
      "Making Tax Digital moved VAT and record-keeping into software. Compliance is now as much a systems question as an accounting one.",
    areas: [
      {
        title: "Making Tax Digital",
        detail:
          "Digital record-keeping and API submission from the accounting system, with the digital links between records kept intact.",
      },
      {
        title: "VAT returns",
        detail:
          "Preparation and submission on the applicable scheme, including partial exemption and reverse-charge treatment.",
      },
      {
        title: "Corporation tax",
        detail:
          "Computations and return preparation drawn from the statutory accounts rather than rebuilt by hand.",
      },
      {
        title: "Record-keeping",
        detail:
          "An audit-ready digital trail from source document to submitted return, retained for the statutory period.",
      },
    ],
  },
  {
    id: "us",
    label: "United States",
    authority: "IRS · State authorities",
    summary:
      "Federal filings sit over a patchwork of state regimes, and sales tax depends on where economic nexus has been triggered.",
    areas: [
      {
        title: "Federal compliance",
        detail:
          "Entity-appropriate federal returns prepared from a closed and reconciled set of books.",
      },
      {
        title: "State tax",
        detail:
          "State income and franchise obligations tracked per registered jurisdiction, with a calendar per entity.",
      },
      {
        title: "Sales tax",
        detail:
          "Nexus review, registration and periodic filings — including CDTFA in California — with marketplace-facilitator rules applied.",
      },
      {
        title: "1099 reporting",
        detail:
          "Contractor classification review, W-9 collection and annual 1099 preparation and distribution.",
      },
    ],
  },
];

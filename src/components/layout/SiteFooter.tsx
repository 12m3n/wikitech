import Link from "next/link";
import { Mail } from "lucide-react";
import { Seal } from "@/components/brand/Logo";
import { site, footerNav } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="shell grid gap-12 py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)] lg:gap-16 lg:py-18">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Seal className="w-11 shrink-0" />
            <div>
              <div className="font-display text-[1.0625rem] font-bold uppercase leading-none tracking-[-0.015em] text-ink">
                Wikitech <span className="text-brand-700">Group</span>
              </div>
              <div className="mt-1.5 font-mono text-[0.6rem] font-medium uppercase leading-none tracking-[0.13em] text-muted">
                {site.tagline}
              </div>
            </div>
          </div>

          <p className="mt-6 text-[0.9375rem] leading-relaxed text-body">
            One partner across the systems a business actually runs on — the ERP, the ledger, the
            filings and the network underneath them.
          </p>

          <a
            href={`mailto:${site.email}`}
            className="mt-6 inline-flex items-center gap-2 rounded-md text-[0.9375rem] font-medium text-brand-700 transition-colors hover:text-brand-800"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {site.email}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {footerNav.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="font-mono text-eyebrow uppercase text-muted">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[0.875rem] leading-snug text-body transition-colors hover:text-brand-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-6 text-[0.8125rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.08em]">
            Tax coverage: Pakistan · United Kingdom · United States
          </p>
        </div>
      </div>
    </footer>
  );
}

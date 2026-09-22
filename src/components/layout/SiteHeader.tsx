"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { WikitechLogo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { nav } from "@/data/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Scroll elevation is a pure visual sync with an external system, so it
  // toggles a class rather than re-rendering the header on every scroll frame.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Scroll-spy: the homepage is long, so the nav says where you are.
  useEffect(() => {
    // `active` is only read on the homepage, so there is nothing to reset.
    if (pathname !== "/") return;
    const ids = nav.map((n) => n.href.split("#")[1]).filter(Boolean) as string[];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && active === href.slice(2);
    return pathname === href;
  };

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-50 border-b border-transparent bg-canvas transition-[background-color,border-color,box-shadow] duration-300"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="shell flex h-[4.25rem] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`Wikitech Group — home`}
          className="-ml-1 shrink-0 rounded-md px-1 py-1 transition-opacity hover:opacity-80"
        >
          <WikitechLogo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "true" : undefined}
                  className={cn(
                    "relative whitespace-nowrap rounded-md px-2.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200 xl:px-3",
                    isActive(item.href)
                      ? "text-brand-700"
                      : "text-body hover:bg-surface hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-2.5 -bottom-px h-0.5 origin-left rounded-full bg-brand-700 transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {/* Both CTAs plus the full nav overflow at 1024 — the secondary one
              returns once there is room for it. */}
          <span className="hidden xl:block">
            <Button href="/contact" variant="secondary" size="md">
              Contact
            </Button>
          </span>
          <Button href="/#quote" size="md">
            Book a Consultation
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-surface lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel — a full sheet with large targets, not a squeezed desktop nav. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.25rem] z-50 overflow-y-auto border-t border-line bg-canvas lg:hidden"
      >
        <nav aria-label="Primary mobile" className="shell py-4">
          <ul className="divide-y divide-line">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-[1.0625rem] font-medium text-ink"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-faint" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 pb-10">
            <Button href="/#quote" size="lg" onClick={() => setOpen(false)}>
              Book a Consultation
            </Button>
            <Button href="/contact" variant="secondary" size="lg" onClick={() => setOpen(false)}>
              Contact us
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

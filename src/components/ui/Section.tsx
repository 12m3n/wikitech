import { Reveal } from "./Reveal";
import { cn } from "@/lib/cn";

/** Small monospace label that opens every section — the site's connective tissue. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-eyebrow uppercase",
        tone === "dark" ? "text-brand-300" : "text-brand-600",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-px w-6", tone === "dark" ? "bg-brand-300/60" : "bg-brand-600/40")}
      />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  className,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal
      as="header"
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-10",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2
          className={cn(
            "mt-4 text-display-lg",
            tone === "dark" ? "text-white" : "text-ink",
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-4 text-lead",
              tone === "dark" ? "text-brand-100/80" : "text-body",
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

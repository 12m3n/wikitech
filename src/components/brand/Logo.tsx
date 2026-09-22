import Image from "next/image";
import { seal as sealAssets } from "@/data/brand";
import { cn } from "@/lib/cn";

/**
 * The corporate seal, lifted from the supplied artwork by scripts/extract-logo.py.
 * `brand` is the blue original; `light` is the same mark re-inked white for the
 * dark sections. Nothing here is a redrawing — it is the client's mark.
 */
export function Seal({
  tone = "brand",
  large = false,
  className,
  priority = false,
}: {
  tone?: "brand" | "light";
  /** Use the 512px master where the mark is displayed above ~120px. */
  large?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const asset =
    tone === "light" ? sealAssets.light : large ? sealAssets.large : sealAssets.brand;

  return (
    <Image
      src={asset.src}
      alt="Wikitech Group"
      width={asset.size}
      height={asset.size}
      priority={priority}
      className={cn("h-auto object-contain", className)}
    />
  );
}

/** Horizontal lockup — the seal plus the wordmark, which stays legible small. */
export function WikitechLogo({
  className,
  tagline = true,
}: {
  className?: string;
  tagline?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Seal priority className="w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.97rem] font-bold uppercase tracking-[-0.015em] text-ink">
          Wikitech <span className="text-brand-700">Group</span>
        </span>
        {tagline && (
          /* Hidden in the 1024–1279 band, where the full nav needs the width. */
          <span className="mt-1 block font-mono text-[0.545rem] font-medium uppercase tracking-[0.13em] text-muted lg:hidden xl:block">
            Technology Solutions &amp; Services
          </span>
        )}
      </span>
    </span>
  );
}

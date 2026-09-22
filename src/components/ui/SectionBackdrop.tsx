import Image from "next/image";
import { images, type ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";

/**
 * Photographic ground for the dark sections.
 *
 * The photograph is already dimmed by the build script; this adds an even
 * neutral veil on top so white type keeps its contrast. No tint and no
 * gradient — the picture should read as a picture.
 */
export function SectionBackdrop({
  image,
  priority = false,
  /** 0–1. How far the veil closes over the photograph. */
  dim = 0.45,
  className,
}: {
  image: ImageKey;
  priority?: boolean;
  dim?: number;
  className?: string;
}) {
  const im = images[image];

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <Image
        src={im.src}
        alt=""
        fill
        sizes="100vw"
        priority={priority}
        placeholder="blur"
        blurDataURL={im.blurDataURL}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black" style={{ opacity: dim }} />
    </div>
  );
}

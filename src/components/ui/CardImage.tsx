import Image from "next/image";
import { images, type ImageKey } from "@/data/images";
import { cn } from "@/lib/cn";

/**
 * Photograph inside a card.
 *
 * Every image is decorative — the heading beside it already carries the meaning —
 * so alt is empty by design. The photograph is shown as shot; it only lifts
 * slightly when its card is hovered (add `group` to the card).
 */
export function CardImage({
  image,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
}: {
  image: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const im = images[image];

  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      <Image
        src={im.src}
        alt=""
        aria-hidden
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={im.blurDataURL}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
      />
    </div>
  );
}

import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 " +
  "ease-[cubic-bezier(.4,0,.2,1)] active:translate-y-px " +
  "disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white shadow-xs hover:bg-brand-800 hover:shadow-sm",
  secondary:
    "border border-line-strong bg-canvas text-ink hover:border-brand-300 hover:bg-brand-50/70",
  ghost: "text-brand-700 hover:bg-brand-50",
  inverse: "border border-white/25 bg-white/5 text-white hover:border-white/50 hover:bg-white/15",
  // Solid light button for use on the dark sections.
  onDark: "bg-white text-brand-800 shadow-xs hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-[0.8125rem]",
  md: "h-10 px-4 text-[0.875rem]",
  lg: "h-12 px-5 text-[0.9375rem]",
};

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AnchorProps = Common &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & { href: string };

type NativeProps = Common &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: AnchorProps | NativeProps) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    const { href, ...anchorRest } = rest as Omit<AnchorProps, keyof Common>;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<NativeProps, keyof Common>)}>
      {children}
    </button>
  );
}

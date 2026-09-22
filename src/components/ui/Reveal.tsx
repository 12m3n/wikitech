"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const HIDDEN = ["opacity-0", "translate-y-3.5"];

/**
 * Scroll reveal via IntersectionObserver — no animation library, no React state.
 *
 * Renders visible, then hides only what is below the fold before observing it.
 * That means no flash on first paint, nothing hidden without JS, and content
 * already on screen simply appears rather than animating in.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Already in view on load: leave it alone.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.classList.add(...HIDDEN);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.remove(...HIDDEN);
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform] duration-[620ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

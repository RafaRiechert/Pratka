import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "panel -rotate-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold text-ink shadow-brutal-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Tag({
  children,
  variant = "lavender",
  className,
}: {
  children: ReactNode;
  variant?: "lavender" | "pink" | "mint";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border-2 border-ink px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-ink shadow-[2px_2px_0_0_var(--color-ink)] transition-transform duration-150 hover:-translate-y-0.5 hover:rotate-1",
        variant === "lavender" && "bg-lavender",
        variant === "pink" && "bg-pink",
        variant === "mint" && "bg-mint",
        className
      )}
    >
      {children}
    </span>
  );
}

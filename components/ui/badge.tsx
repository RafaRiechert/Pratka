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
        "glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-ink/85 shadow-[0_0_20px_-6px_rgba(255,90,31,0.35)]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Tag({
  children,
  variant = "tangerine",
  className,
}: {
  children: ReactNode;
  variant?: "tangerine" | "ink";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variant === "tangerine" && "bg-tangerine/15 text-tangerine-deep",
        variant === "ink" && "bg-ink/10 text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

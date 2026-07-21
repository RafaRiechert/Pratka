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
        "panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-ink/80",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Tag({
  children,
  variant = "neutral",
  className,
}: {
  children: ReactNode;
  variant?: "neutral" | "outline" | "signal";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide",
        variant === "neutral" && "border-ink/20 text-ink/75",
        variant === "outline" && "border-mist-2/60 text-mist",
        variant === "signal" && "border-signal text-signal",
        className
      )}
    >
      {children}
    </span>
  );
}

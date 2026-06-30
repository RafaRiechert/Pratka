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
        "glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-offwhite/90 shadow-[0_0_20px_-6px_rgba(123,111,224,0.6)]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Tag({
  children,
  variant = "lime",
  className,
}: {
  children: ReactNode;
  variant?: "lime" | "purple";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variant === "lime" && "bg-lime/15 text-lime",
        variant === "purple" && "bg-purple/20 text-purple-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

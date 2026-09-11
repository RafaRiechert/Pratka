import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A pílula <Badge> do herói saiu nesta rodada — sobrou a <Tag>, o rótulo
 * discreto de metadado (setor, tipo, "Remunerado") usado nos cards.
 */
export function Tag({
  children,
  variant = "accent",
  className,
}: {
  children: ReactNode;
  variant?: "accent" | "ink";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",
        variant === "accent" && "bg-accent/15 text-accent-deep",
        variant === "ink" && "bg-ink/10 text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

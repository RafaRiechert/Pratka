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
        // Metadado é dado: mono, caixa alta, caixa de 1px. Nada de pílula.
        "label-meta inline-flex items-center rounded-tag border px-2 py-0.5",
        variant === "accent" && "border-accent-deep/40 bg-accent-deep/10 text-accent-deep",
        variant === "ink" && "border-line bg-surface-inset text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

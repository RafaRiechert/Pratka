import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A pílula <Badge> do herói saiu nesta rodada — sobrou a <Tag>, o rótulo
 * discreto de metadado (setor, tipo, "Remunerado") usado nos cards.
 *
 * No dossiê ela não é cápsula colorida: é uma etiqueta retangular de borda
 * fina com o texto em caixa alta espaçada, como a marcação de seção de uma
 * ficha catalográfica. A cor sobrou só no fio e na tinta da letra.
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
        "label-meta inline-flex items-center rounded-tag border px-2 py-[0.3rem]",
        variant === "accent" && "border-accent-deep/45 text-accent-deep",
        variant === "ink" && "border-line-strong text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

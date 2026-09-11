import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Formulário de dossiê: o rótulo é metadado em caixa alta e o campo é uma
 * caixa de fio, não uma superfície flutuante de vidro. A borda inferior é
 * mais pesada que as outras três — a linha em que se escreve num formulário
 * impresso.
 */
export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label-meta mb-2 block text-ink-soft">{label}</label>
      {children}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-input border border-line-strong border-b-2 border-b-ink bg-surface-2 px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-ink",
        className
      )}
      {...props}
    />
  );
}

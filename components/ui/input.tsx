import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

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
        // Campo de papel com fio de tinta e canto de cápsula — a mesma forma
        // do botão e do filtro, para que um formulário pareça feito das
        // mesmas peças que o resto do site.
        "focus-ring w-full rounded-input border-2 border-line-strong bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-colors hover:border-ink/45 focus:border-accent-deep",
        className
      )}
      {...props}
    />
  );
}

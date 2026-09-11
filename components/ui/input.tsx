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
      <label className="label-meta mb-2 block text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        // Borda de controle real (line-strong passa 3.8:1), foco em verde.
        "w-full rounded-input border border-line-strong bg-surface-inset px-3 py-2.5 font-mono text-sm text-ink outline-none transition-colors placeholder:text-ink-soft focus:border-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        className
      )}
      {...props}
    />
  );
}

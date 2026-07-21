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
      <label className="mb-1.5 block font-mono text-xs font-medium uppercase tracking-wide text-mist">
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
        "w-full rounded-md border border-ink/20 bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-colors duration-150 placeholder:text-mist-2 focus:border-signal",
        className
      )}
      {...props}
    />
  );
}

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
      <label className="mb-1.5 block text-sm font-bold text-ink/80">
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
        "w-full rounded-xl border-[3px] border-ink bg-paper px-4 py-2.5 text-sm text-ink outline-none transition-shadow duration-150 placeholder:text-ink/40 focus:shadow-[4px_4px_0_0_var(--color-lavender-deep)]",
        className
      )}
      {...props}
    />
  );
}

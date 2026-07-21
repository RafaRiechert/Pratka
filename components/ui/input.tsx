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
      <label className="mb-1.5 block text-sm font-medium text-offwhite/70">
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
        "glass w-full rounded-xl border-0 bg-transparent px-4 py-2.5 text-sm text-offwhite outline-none focus:ring-2 focus:ring-lime/50",
        className
      )}
      {...props}
    />
  );
}

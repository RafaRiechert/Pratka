import type { ReactNode } from "react";

export function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-offwhite/75">
        {label} {required && <span className="text-lime">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-offwhite/40">{hint}</span>}
    </label>
  );
}

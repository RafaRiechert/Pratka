import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function NavLink({
  href,
  children,
  onClick,
  onDark = false,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
  /** Inverted palette while the header sits over a dark section. */
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      // Rótulo de sumário: caixa alta espaçada, e o hover puxa um fio por
      // baixo em vez de acender uma pastilha.
      className={cn(
        "focus-ring label-meta group relative rounded-input px-3 py-2 transition-colors duration-500",
        onDark ? "text-on-inverse/80 hover:text-on-inverse" : "text-ink-soft hover:text-ink"
      )}
    >
      {children}
      <span
        className={cn(
          "absolute left-3 right-3 bottom-0 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
          onDark ? "bg-signal" : "bg-ink"
        )}
      />
    </Link>
  );
}

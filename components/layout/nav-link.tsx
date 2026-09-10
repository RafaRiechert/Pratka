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
      className={cn(
        "focus-ring group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-500",
        onDark ? "text-cream/75 hover:text-cream" : "text-ink/75 hover:text-ink"
      )}
    >
      {children}
      <span
        className={cn(
          "absolute left-3 right-3 -bottom-0.5 h-[2px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
          onDark ? "bg-sol" : "bg-tangerine"
        )}
      />
    </Link>
  );
}

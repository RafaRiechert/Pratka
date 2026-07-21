import Link from "next/link";
import type { ReactNode } from "react";

export default function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative px-3 py-2 font-mono text-xs font-medium uppercase tracking-wide text-ink/70 transition-colors duration-150 hover:text-ink"
    >
      {children}
      <span className="absolute left-3 right-3 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-signal transition-transform duration-150 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-x-100" />
    </Link>
  );
}

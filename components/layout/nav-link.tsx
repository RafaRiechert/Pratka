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
      className="group relative px-3 py-2 text-sm font-bold text-ink/75 transition-colors hover:text-ink"
    >
      {children}
      <span className="absolute left-3 right-3 -bottom-0.5 h-[3px] origin-left scale-x-0 rounded-full bg-pink-deep transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

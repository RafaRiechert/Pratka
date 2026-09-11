import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Sem prop de tema. A barra inteira troca de polo entrando em
 * `read-surface`, então `text-ink` / `text-accent-deep` já resolvem para o
 * fundo corrente — um link de navegação não precisa saber onde está.
 */
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
      className={cn(
        "focus-ring group relative rounded-input px-3 py-2 text-sm font-medium",
        // Sem transição de cor, pelo mesmo motivo da barra (ver navbar.tsx):
        // a inversão muda o valor da variável, não a declaração, e a
        // transição do Chrome trava. O movimento fica por conta da régua.
        "text-ink-2 hover:text-ink"
      )}
    >
      {children}
      {/* Régua verde de 2px. Um só acento, nos dois estados: a inversão
          troca o fundo, não a cor de ênfase. */}
      <span
        aria-hidden="true"
        className="absolute left-3 right-3 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-accent-deep transition-transform duration-200 ease-out group-hover:scale-x-100"
      />
    </Link>
  );
}

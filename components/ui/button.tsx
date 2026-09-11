"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "support"
  | "signal"
  | "outline"
  | "ghost"
  | "danger";
type Size = "sm" | "md" | "lg";

/*
 * Nenhuma cor aqui é escolhida: cada variante nomeia um PAPEL do sistema de
 * tokens. O contrato de contraste vive em globals.css — `accent` é
 * superfície e carrega `ink`; `accent-deep` é preenchimento e carrega
 * `on-accent`. Trocar a identidade não deve exigir tocar neste arquivo.
 *
 * Na direção "Verão" o botão é uma CÁPSULA (--radius-control: 999px) de cor
 * chapada, e o hover troca o tom em vez de acender um halo: o halo é um
 * gradiente difuso, que é o que esta rodada aposentou. O primário em
 * repouso é o laranja escuro com texto areia (5.36); no hover ele abre para
 * o laranja cheio com texto tinta (4.68) — o mesmo gesto de "esquentar",
 * sem borrão.
 */
const variantClasses: Record<Variant, string> = {
  primary: "bg-accent-deep text-on-accent hover:bg-accent hover:text-ink",
  secondary: "bg-inverse text-on-inverse hover:bg-inverse-2",
  support: "bg-support text-on-support hover:bg-support-deep",
  signal: "bg-signal text-on-signal hover:bg-signal-deep",
  outline:
    "border-2 border-ink/30 text-ink bg-transparent hover:border-accent-deep hover:bg-accent/12 hover:text-accent-deep",
  ghost: "bg-transparent text-ink hover:bg-ink/8",
  danger:
    "bg-danger/10 text-danger border-2 border-danger/40 hover:bg-danger/20",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-7 py-3 text-base",
  lg: "px-9 py-4 text-base",
};

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external = false,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "pop focus-ring inline-flex items-center justify-center gap-2 rounded-control font-semibold leading-none tracking-tight disabled:opacity-50 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

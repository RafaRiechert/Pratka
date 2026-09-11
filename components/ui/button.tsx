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
 */
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent-deep text-on-accent hover:shadow-glow-accent",
  secondary: "bg-inverse text-on-inverse hover:bg-inverse-2 hover:shadow-card",
  support: "bg-support text-on-support hover:bg-support-deep hover:shadow-glow-support",
  signal: "bg-signal text-on-signal hover:shadow-glow-signal",
  outline:
    "border border-ink/25 text-ink bg-transparent hover:border-accent-deep hover:text-accent-deep",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  danger:
    "bg-danger/10 text-danger border border-danger/40 hover:bg-danger/20",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
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
    "pop focus-ring inline-flex items-center justify-center gap-2 rounded-control font-semibold tracking-tight disabled:opacity-50 disabled:pointer-events-none",
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

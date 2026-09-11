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
 * tokens. O contrato de contraste vive em globals.css.
 *
 * Nota da identidade "Terminal": `accent` deixou de carregar `ink` e passou
 * a carregar `on-accent` (ver o cabeçalho de globals.css). E o hover deixou
 * de ser sombra difusa — virou BORDA, que é como um terminal marca o que
 * está sob o cursor.
 */
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent-deep text-on-accent border border-accent-deep hover:bg-accent",
  secondary:
    "bg-inverse text-on-inverse border border-inverse hover:bg-inverse-2 hover:border-inverse-2",
  support:
    "bg-support text-on-support border border-support hover:bg-support-deep hover:border-support-deep",
  signal: "bg-signal text-on-signal border border-signal hover:bg-signal-deep",
  outline:
    "border border-line-strong text-ink bg-transparent hover:border-accent-deep hover:text-accent-deep",
  ghost: "border border-transparent bg-transparent text-ink-2 hover:text-ink hover:border-line",
  danger:
    "bg-transparent text-danger border border-danger/60 hover:border-danger",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
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

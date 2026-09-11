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
/*
 * Dossiê: botão é bloco impresso. Todo variante carrega uma borda de 1px do
 * mesmo tom do preenchimento, para que o contorno da caixa exista mesmo
 * quando ela é chapada — é o que faz o conjunto parecer tipografia
 * enquadrada em vez de widget. O hover troca tinta, nunca acende halo.
 */
const variantClasses: Record<Variant, string> = {
  primary:
    "border border-accent-deep bg-accent-deep text-on-accent hover:border-ink hover:bg-ink hover:text-on-inverse",
  secondary:
    "border border-ink bg-inverse text-on-inverse hover:border-accent-deep hover:bg-accent-deep hover:text-on-accent",
  support:
    "border border-support bg-support text-on-support hover:border-support-deep hover:bg-support-deep",
  signal:
    "border border-signal-deep bg-signal text-on-signal hover:bg-signal-deep hover:text-on-accent",
  outline:
    "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-on-inverse",
  ghost:
    "border border-transparent bg-transparent text-ink hover:border-line-strong",
  danger:
    "border border-danger bg-transparent text-danger hover:bg-danger hover:text-on-accent",
};

/*
 * Rótulo de botão em caixa alta espaçada: o mesmo tom de voz dos metadados
 * do dossiê, e o que impede a caixa reta de parecer um input.
 */
const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.6875rem]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-xs",
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
    "pop focus-ring inline-flex items-center justify-center gap-2 rounded-control font-semibold uppercase tracking-[0.14em] leading-none disabled:opacity-50 disabled:pointer-events-none",
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

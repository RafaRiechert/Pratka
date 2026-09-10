"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "secondary"
  | "petroleo"
  | "sol"
  | "outline"
  | "ghost"
  | "danger";
type Size = "sm" | "md" | "lg";

/*
 * Every combination below clears WCAG AA (4.5:1) for its own text, which is
 * why the filled orange is tangerine-deep and not tangerine: cream on
 * #ff5a1f is 3.1:1 and fails. Tangerine survives as a surface with ink text
 * (5.5:1) and as decoration — see the palette rule in globals.css.
 */
const variantClasses: Record<Variant, string> = {
  primary:
    "bg-tangerine-deep text-cream hover:shadow-glow-tangerine",
  secondary: "bg-ink text-cream hover:bg-ink-2 hover:shadow-card",
  petroleo: "bg-petroleo text-cream hover:bg-petroleo-deep hover:shadow-glow-petroleo",
  sol: "bg-sol text-ink hover:shadow-glow-sol",
  outline:
    "border border-ink/25 text-ink bg-transparent hover:border-tangerine-deep hover:text-tangerine-deep",
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
    "pop focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tight disabled:opacity-50 disabled:pointer-events-none",
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

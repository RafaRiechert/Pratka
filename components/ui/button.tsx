"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-signal text-paper border border-signal hover:bg-signal-2 hover:border-signal-2 hover:-translate-y-[1px]",
  secondary:
    "bg-ink text-paper border border-ink hover:bg-ink-2 hover:-translate-y-[1px]",
  outline:
    "border border-ink/25 text-ink bg-transparent hover:border-signal hover:text-signal",
  ghost: "bg-transparent text-ink hover:bg-paper-2",
  danger:
    "bg-transparent text-danger border border-danger/40 hover:bg-danger/10",
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
    "inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold tracking-tight transition-all duration-150 ease-[cubic-bezier(0.2,0,0,1)] active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none disabled:translate-y-0",
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

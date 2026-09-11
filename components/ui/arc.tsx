import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * VOCABULÁRIO DE FORMA DA DIREÇÃO "VERÃO".
 *
 * Modernismo brasileiro é curva grande e cor chapada — a marquise, o arco,
 * o disco. Estas três primitivas são tudo o que o site precisa para falar
 * essa língua, e todas obedecem às mesmas três regras:
 *
 *   1. São DECORATIVAS: `aria-hidden`, `pointer-events-none`, nunca em
 *      fluxo — jamais empurram conteúdo.
 *   2. Vivem dentro de <ArcField>, que é `absolute inset-0 overflow-hidden`.
 *      O recorte é do próprio campo, então a seção que o hospeda não precisa
 *      de `overflow-hidden` e NENHUM arco pode criar rolagem horizontal —
 *      que é o risco real de uma direção feita de formas gigantes.
 *   3. Não escolhem cor: recebem um PAPEL do sistema de tokens.
 */

type Tone =
  | "accent"
  | "accent-soft"
  | "support"
  | "support-deep"
  | "signal"
  | "inverse"
  | "inverse-2"
  | "surface"
  | "surface-2"
  | "surface-3";

const fillClass: Record<Tone, string> = {
  accent: "bg-accent",
  "accent-soft": "bg-accent-soft",
  support: "bg-support",
  "support-deep": "bg-support-deep",
  signal: "bg-signal",
  inverse: "bg-inverse",
  "inverse-2": "bg-inverse-2",
  surface: "bg-surface",
  "surface-2": "bg-surface-2",
  "surface-3": "bg-surface-3",
};

const strokeClass: Record<Tone, string> = {
  accent: "border-accent",
  "accent-soft": "border-accent-soft",
  support: "border-support",
  "support-deep": "border-support-deep",
  signal: "border-signal",
  inverse: "border-inverse",
  "inverse-2": "border-inverse-2",
  surface: "border-surface",
  "surface-2": "border-surface-2",
  "surface-3": "border-surface-3",
};

/** O campo decorativo. Recorta tudo o que está dentro dele. */
export function ArcField({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Disco cheio — o sol. */
export function Disc({
  tone,
  className,
}: {
  tone: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "absolute block aspect-square rounded-full",
        fillClass[tone],
        className
      )}
    />
  );
}

/** Anel — o mesmo sol, só o contorno. Espessura em múltiplos de 4px. */
export function Ring({
  tone,
  weight = 8,
  className,
}: {
  tone: Tone;
  weight?: 4 | 8 | 12 | 16;
  className?: string;
}) {
  const weightClass = {
    4: "border-4",
    8: "border-8",
    12: "border-[12px]",
    16: "border-[16px]",
  }[weight];

  return (
    <span
      className={cn(
        "absolute block aspect-square rounded-full",
        weightClass,
        strokeClass[tone],
        className
      )}
    />
  );
}

/**
 * Arco — meio disco. `side` diz de que lado fica a aresta reta, que é o que
 * transforma o mesmo círculo em marquise, em pôr do sol ou em rodapé curvo.
 */
export function Arch({
  tone,
  side = "bottom",
  className,
}: {
  tone: Tone;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}) {
  const shape = {
    top: "rounded-t-full",
    bottom: "rounded-b-full",
    left: "rounded-l-full",
    right: "rounded-r-full",
  }[side];

  return (
    <span className={cn("absolute block", shape, fillClass[tone], className)} />
  );
}

"use client";

import { seasonEntries, seasonLabels } from "@/lib/season";

/**
 * A fita de cotação do herói.
 *
 * Lê exatamente o mesmo dado do painel de prazos — nome da empresa e status,
 * nada inventado — e o faz passar de ponta a ponta como um terminal de
 * mercado. É o único movimento contínuo da identidade, e por isso é o único
 * que precisa de guarda explícita:
 *
 *  - A faixa é duplicada e desliza -50%, então a emenda nunca aparece.
 *  - Sob `prefers-reduced-motion`, `.ticker-track` recebe `animation: none`
 *    em globals.css (não uma animação acelerada, que pararia no fim) e o
 *    viewport vira `overflow-x: auto` — a mesma informação, rolável à mão.
 *  - O hover pausa a fita, para quem quer ler um nome específico.
 *
 * A cópia duplicada é `aria-hidden`; leitores de tela recebem a lista uma
 * vez só.
 */
export default function SeasonTicker() {
  const items = seasonEntries;

  const run = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((entry) => {
        const isOpen = entry.status === "aberta";
        return (
          <li
            key={`${hidden ? "b" : "a"}-${entry.id}`}
            className="flex items-center gap-2.5 whitespace-nowrap px-5 py-2.5"
          >
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 shrink-0 ${
                isOpen ? "bg-accent-deep" : "bg-signal"
              }`}
            />
            <span className="font-mono text-xs font-medium tracking-wide text-ink">
              {entry.company}
            </span>
            <span
              className={`label-meta ${isOpen ? "text-accent-deep" : "text-signal"}`}
            >
              {isOpen ? seasonLabels.statusOpen : seasonLabels.statusSoon}
            </span>
            <span aria-hidden="true" className="pl-3 text-line-strong">
              /
            </span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className="ticker-viewport border-y border-line bg-surface-3"
      aria-label={seasonLabels.heading}
    >
      <div className="ticker-track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}

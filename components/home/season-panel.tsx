"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { duration as dur, ease, stagger } from "@/lib/motion";
import {
  seasonEntries,
  seasonHasDates,
  seasonLabels,
  type SeasonEntry,
} from "@/lib/season";

/**
 * PAINEL DE PRAZOS DO HERÓI — o objeto central da home.
 *
 * Substitui a antiga pilha de cards de empresa, que repetia a listagem logo
 * abaixo. Aqui o assunto é outro: QUANDO cada programa abre. É a dor real do
 * estudante e não duplica nada.
 *
 * O componente é deliberadamente sem opinião visual. Ele resolve dado,
 * ordem, acessibilidade e a pendência de datas; a pele vem de fora, por
 * `classNames` (cada parte nomeada) ou, quando a direção quer um layout
 * completamente diferente, por `renderRow` / `renderHeader` / `renderFooter`.
 * Assim as três identidades compartilham um só comportamento.
 */

export interface SeasonPanelSlots {
  root: string;
  header: string;
  eyebrow: string;
  heading: string;
  columns: string;
  list: string;
  row: string;
  rowLink: string;
  index: string;
  company: string;
  programme: string;
  window: string;
  status: string;
  statusOpen: string;
  statusSoon: string;
  footnote: string;
}

export interface SeasonPanelProps {
  /** Padrão: todas as entradas da temporada, abertas primeiro. */
  entries?: SeasonEntry[];
  /** Quantas linhas mostrar. `undefined` = todas. */
  limit?: number;
  /** Sobrescreve os rótulos pt-BR de `lib/season.ts`. */
  labels?: Partial<typeof seasonLabels>;
  /** Mostra a numeração de índice (01, 02, …) à esquerda da linha. */
  showIndex?: boolean;
  /** Mostra a linha de cabeçalho de colunas. */
  showColumns?: boolean;
  /** Mostra o rodapé sobre datas pendentes. */
  showFootnote?: boolean;
  /** Anima a entrada das linhas em cascata. */
  animate?: boolean;
  className?: string;
  classNames?: Partial<SeasonPanelSlots>;
  /** Troca a linha inteira — para tickers, timelines, tabelas densas. */
  renderRow?: (entry: SeasonEntry, index: number) => ReactNode;
  /** Troca o cabeçalho inteiro. */
  renderHeader?: () => ReactNode;
  /** Conteúdo extra no fim do painel (contadores, ticker, legenda). */
  renderFooter?: () => ReactNode;
}

/** Rótulo da janela de inscrição, ou o marcador de dado pendente. */
export function windowLabel(
  entry: SeasonEntry,
  labels: typeof seasonLabels = seasonLabels
): string {
  if (entry.window?.opens || entry.window?.closes) {
    const fmt = (iso: string) =>
      new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(
        new Date(`${iso}T12:00:00`)
      );
    const { opens, closes } = entry.window;
    if (opens && closes) return `${fmt(opens)} – ${fmt(closes)}`;
    return fmt((opens ?? closes) as string);
  }
  // Sem data no dataset: o texto da própria empresa é o melhor que temos.
  return entry.opensWhen ?? entry.duration ?? labels.windowPending;
}

/** `true` quando a linha está exibindo pendência, não uma data real. */
export function isWindowPending(entry: SeasonEntry): boolean {
  return !entry.window?.opens && !entry.window?.closes;
}

export default function SeasonPanel({
  entries = seasonEntries,
  limit,
  labels: labelOverrides,
  showIndex = true,
  showColumns = true,
  showFootnote = true,
  animate = true,
  className,
  classNames: s = {},
  renderRow,
  renderHeader,
  renderFooter,
}: SeasonPanelProps) {
  const labels = { ...seasonLabels, ...labelOverrides };
  const reduced = useReducedMotion() ?? false;
  const rows = limit ? entries.slice(0, limit) : entries;
  const shouldAnimate = animate && !reduced;

  return (
    <section
      aria-label={labels.heading}
      className={cn("w-full", s.root, className)}
    >
      {renderHeader ? (
        renderHeader()
      ) : (
        <header className={cn("flex flex-col gap-1", s.header)}>
          <p className={cn("label-meta text-ink-soft", s.eyebrow)}>{labels.eyebrow}</p>
          <h2 className={cn("font-display text-xl font-bold text-ink", s.heading)}>
            {labels.heading}
          </h2>
        </header>
      )}

      {showColumns && !renderRow && (
        <div
          aria-hidden="true"
          className={cn(
            "label-meta mt-6 grid grid-cols-[1fr_auto] gap-4 border-b border-line pb-2 text-ink-soft",
            s.columns
          )}
        >
          <span>{labels.columnProgramme}</span>
          <span>{labels.columnWindow}</span>
        </div>
      )}

      <ol className={cn("mt-1", s.list)}>
        {rows.map((entry, i) => {
          const body = renderRow ? (
            renderRow(entry, i)
          ) : (
            <DefaultRow
              entry={entry}
              index={i}
              labels={labels}
              showIndex={showIndex}
              slots={s}
            />
          );

          return shouldAnimate ? (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: dur.base,
                delay: 0.3 + i * stagger.tight,
                ease: ease.soft,
              }}
            >
              {body}
            </motion.li>
          ) : (
            <li key={entry.id}>{body}</li>
          );
        })}
      </ol>

      {renderFooter?.()}

      {showFootnote && !seasonHasDates && (
        <p className={cn("mt-4 text-xs leading-relaxed text-ink-soft", s.footnote)}>
          {labels.footnote}
        </p>
      )}
    </section>
  );
}

function DefaultRow({
  entry,
  index,
  labels,
  showIndex,
  slots: s,
}: {
  entry: SeasonEntry;
  index: number;
  labels: typeof seasonLabels;
  showIndex: boolean;
  slots: Partial<SeasonPanelSlots>;
}) {
  const isOpen = entry.status === "aberta";
  const inner = (
    <>
      {showIndex && (
        <span
          aria-hidden="true"
          className={cn("label-meta tabular-nums text-ink-soft", s.index)}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <span className="min-w-0">
        <span className={cn("block truncate font-semibold text-ink", s.company)}>
          {entry.company}
        </span>
        <span className={cn("block truncate text-sm text-ink-soft", s.programme)}>
          {entry.programme}
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1 text-right">
        <span className={cn("text-sm text-ink-soft", s.window)}>
          {windowLabel(entry, labels)}
        </span>
        <span
          className={cn(
            "label-meta",
            s.status,
            isOpen
              ? cn("text-accent-deep", s.statusOpen)
              : cn("text-ink-soft", s.statusSoon)
          )}
        >
          {isOpen ? labels.statusOpen : labels.statusSoon}
        </span>
      </span>
    </>
  );

  const layout = cn(
    "grid w-full items-center gap-4 border-b border-line py-3 text-left",
    showIndex ? "grid-cols-[2rem_1fr_auto]" : "grid-cols-[1fr_auto]",
    s.row
  );

  // Só vira link quando existe link real de inscrição. "Em breve" não tem.
  return entry.href ? (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(layout, "focus-ring transition-colors hover:text-accent-deep", s.rowLink)}
    >
      {inner}
    </a>
  ) : (
    <div className={layout}>{inner}</div>
  );
}

"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import SeasonPanel, { windowLabel } from "@/components/home/season-panel";
import SeasonTicker from "@/components/home/season-ticker";
import AnimatedWords from "@/components/home/animated-words";
import { cities, sectors } from "@/lib/companies";
import {
  seasonHasDates,
  seasonLabels,
  seasonOpenCount,
  seasonSoonCount,
  type SeasonEntry,
} from "@/lib/season";
import { duration, ease } from "@/lib/motion";

/** Entrance beats. The whole sequence is done in under a second. */
const BEAT = {
  headline: 0.04,
  italic: 0.3,
  support: 0.42,
  cta: 0.52,
  panel: 0.6,
} as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.base, delay, ease: ease.soft },
});

/**
 * OS CONTADORES DO PAINEL.
 *
 * Cada um é derivado de `lib/companies` / `lib/season` — número de programas
 * abertos, em breve, cidades cobertas e setores mapeados. Nenhum é afirmado,
 * nenhum é estimado: se a lista de empresas mudar, os quatro mudam junto.
 *
 * Eles existem justamente porque a contagem regressiva NÃO existe (ver o
 * slot "Próximo prazo" mais abaixo): o painel precisa de números vivos, e
 * estes são os números que o dataset realmente tem.
 */
const counters = [
  { value: seasonOpenCount, label: "abertas", tone: "accent" as const },
  { value: seasonSoonCount, label: "em breve", tone: "signal" as const },
  { value: cities.length, label: "cidades", tone: "ink" as const },
  { value: sectors.length, label: "setores", tone: "ink" as const },
];

const toneClass = {
  accent: "text-accent-deep",
  signal: "text-signal",
  ink: "text-ink",
};

function PanelHeader() {
  return (
    <header className="border-b border-line">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <p className="flex items-center gap-2 label-meta text-ink-soft">
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent-deep" />
          {seasonLabels.eyebrow}
        </p>
      </div>

      <h2 className="px-4 pb-4 font-display text-xl font-bold tracking-tight text-ink sm:px-6">
        {seasonLabels.heading}
      </h2>

      {/* Contadores: dado real, em mono tabular. */}
      <dl className="grid grid-cols-4 border-t border-line">
        {counters.map((c, i) => (
          <div
            key={c.label}
            className={`px-1.5 py-3.5 text-center sm:px-4 ${
              i > 0 ? "border-l border-line" : ""
            }`}
          >
            <dd
              className={`data-figure text-2xl leading-none sm:text-[28px] ${toneClass[c.tone]}`}
            >
              {String(c.value).padStart(2, "0")}
            </dd>
            <dt className="label-meta mt-2 text-[10px] text-ink-soft">{c.label}</dt>
          </div>
        ))}
      </dl>

      {/* Cabeçalho de colunas da tabela densa. */}
      <div
        aria-hidden="true"
        className="label-meta grid grid-cols-[1fr_auto] items-center gap-4 border-t border-line bg-surface-3 px-4 py-2 text-ink-soft sm:px-6"
      >
        <span>{seasonLabels.columnProgramme}</span>
        <span>{seasonLabels.columnWindow}</span>
      </div>
    </header>
  );
}

function PanelRow({ entry }: { entry: SeasonEntry }) {
  const isOpen = entry.status === "aberta";

  const inner = (
    <>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-ink">
          {entry.company}
        </span>
        <span className="mt-0.5 block truncate font-mono text-[11px] text-ink-soft">
          {entry.programme}
        </span>
      </span>

      {/*
        `opensWhen` é texto livre e pode ser longo ("Inscrições abrem em
        outubro de 2026"). Abaixo de 640px o painel é estreito e esse texto
        empurrava o nome da empresa para fora, então ele ganha um teto fixo e
        quebra em duas linhas. De sm para cima o painel é largo o bastante e
        o teto sai do caminho. (Teto em rem, não em %: percentual dentro de
        uma coluna `auto` do grid resolve contra a própria coluna e colapsa.)
      */}
      <span className="flex max-w-[8.5rem] shrink-0 flex-col items-end gap-1 text-right sm:max-w-none">
        <span className="font-mono text-[11px] leading-snug text-ink-2">
          {windowLabel(entry, seasonLabels)}
        </span>
        <span
          className={`label-meta border px-1.5 py-px ${
            isOpen
              ? "border-accent-deep/45 bg-accent-deep/12 text-accent-deep"
              : "border-signal/40 bg-signal/10 text-signal"
          }`}
        >
          {isOpen ? seasonLabels.statusOpen : seasonLabels.statusSoon}
        </span>
      </span>
    </>
  );

  const layout =
    "grid w-full grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 text-left sm:gap-4 sm:px-6";

  // Só vira link quando existe link real de inscrição. "Em breve" não tem.
  return entry.href ? (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${layout} focus-ring transition-colors hover:bg-surface-inset`}
    >
      {inner}
    </a>
  ) : (
    <div className={layout}>{inner}</div>
  );
}

/**
 * SLOT DE CONTAGEM REGRESSIVA — preparado, e honestamente vazio.
 *
 * A direção pede contagem regressiva. `lib/companies.ts` não tem campo de
 * data, então não existe nada para contar, e inventar um número aqui seria
 * mentir para um estudante sobre um prazo de inscrição — o pior erro
 * possível neste produto.
 *
 * A solução é mostrar o slot no lugar onde a contagem vai morar, com os
 * dígitos zerados em `--`, marcado como pendente. No dia em que
 * `SeasonEntry.window` for preenchido em lib/season.ts, `seasonHasDates`
 * vira `true`, este bloco troca para o relógio real e a nota de pendência do
 * próprio painel some sozinha.
 */
function PanelFooter() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-line bg-surface-3 px-4 py-3 sm:px-6">
      <span className="label-meta text-ink-soft">Próximo prazo</span>
      {seasonHasDates ? null : (
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="data-figure text-lg leading-none text-line-strong"
          >
            --:--:--
          </span>
          <span className="label-meta border border-signal/40 bg-signal/10 px-1.5 py-px text-signal">
            {seasonLabels.windowPending}
          </span>
        </span>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    // Fundo chapado + malha de fios de 1px. Zero gradiente, zero orb: a
    // profundidade desta identidade vem de borda e superfície.
    <section className="relative overflow-hidden bg-hero">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-16">
        <div className="text-center lg:text-left">
          <h1 className="font-display text-5xl font-bold leading-[1.02] text-ink sm:text-6xl lg:text-[68px]">
            <AnimatedWords text="Seu summer internship" baseDelay={BEAT.headline} />
            <br />
            {/* Segunda linha na mono: lê como a saída de um comando, que é
                exatamente a promessa da direção — o dado responde. */}
            <span className="inline-block overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom">
              <motion.span
                className="text-accent-emphasis inline-block font-mono text-[0.78em] font-bold tracking-tighter"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: duration.slow,
                  delay: BEAT.italic,
                  ease: ease.soft,
                }}
              >
                começa aqui.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="measure mx-auto mt-6 text-lg leading-relaxed text-ink-2 sm:text-xl lg:mx-0"
            {...rise(BEAT.support)}
          >
            O guia definitivo de summer internships no Brasil: todos os
            programas num lugar só, com link direto para se candidatar.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            {...rise(BEAT.cta)}
          >
            <Magnetic>
              <Button href="/#empresas" size="lg">
                Ver programas
                <ArrowDown size={18} className="pop-nudge" />
              </Button>
            </Magnetic>

            <Button href="/quiz" variant="outline" size="lg">
              Fazer o quiz
            </Button>

            {/* Era manuscrita; virou etiqueta de terminal. */}
            <span className="label-meta w-full text-center text-accent-deep sm:w-auto lg:text-left">
              grátis para estudantes
            </span>
          </motion.div>
        </div>

        <motion.div {...rise(BEAT.panel)}>
          {/*
            O painel deixa de ser um card decorativo e vira MONITOR: cabeçalho
            com contadores derivados, tabela densa de prazos e o slot de
            contagem regressiva. Nada disso reescreve a lógica do SeasonPanel
            — tudo entra por renderHeader / renderRow / renderFooter, e a
            resolução de dado, ordem, acessibilidade e pendência continua
            sendo dele.
          */}
          <SeasonPanel
            limit={6}
            className="panel overflow-hidden rounded-card shadow-card"
            classNames={{
              list: "mt-0 divide-y divide-line",
              footnote:
                "mt-0 border-t border-line px-4 py-3 font-mono text-[11px] leading-relaxed text-ink-soft sm:px-6",
            }}
            renderHeader={() => <PanelHeader />}
            renderRow={(entry) => <PanelRow entry={entry} />}
            renderFooter={() => <PanelFooter />}
          />
        </motion.div>
      </div>

      {/* A fita de cotação fecha o herói de ponta a ponta. */}
      <SeasonTicker />
    </section>
  );
}

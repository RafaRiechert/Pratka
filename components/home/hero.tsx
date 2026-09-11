"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import { Arch, ArcField, Disc, Ring } from "@/components/ui/arc";
import SeasonPanel, {
  isWindowPending,
  windowLabel,
} from "@/components/home/season-panel";
import AnimatedWords from "@/components/home/animated-words";
import { seasonLabels, type SeasonEntry } from "@/lib/season";
import { duration, ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

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
 * Uma parada da linha do tempo.
 *
 * ⚠️ Nada aqui posiciona por data: `lib/companies.ts` não tem campo de data
 * (ver IDENTIDADE.md). A ordem do trilho é a ordem que `lib/season.ts` já
 * resolve — abertas primeiro, depois a ordem do dataset — e a janela de
 * inscrição aparece como o texto da própria empresa. Quando ela é PENDENTE,
 * o rótulo ganha o sublinhado tracejado, que é a marca visual de "isto ainda
 * não é uma data". No dia em que o dataset ganhar prazo real, `window` deixa
 * de ser null, o tracejado some sozinho e o rodapé de pendência também.
 */
function TimelineStop({ entry }: { entry: SeasonEntry }) {
  const isOpen = entry.status === "aberta";
  const pending = isWindowPending(entry);

  const body = (
    <div className="relative pl-7 lg:pl-0 lg:pr-5 lg:pt-8">
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 block h-3 w-3 rounded-full border-2",
          isOpen
            ? "border-accent-deep bg-accent"
            : "border-line-strong bg-surface"
        )}
      />

      <p
        className={cn(
          // A altura mínima em lg é o que alinha os nomes das empresas na
          // horizontal quando um rótulo ocupa duas linhas e o vizinho, uma.
          "font-mono text-[11px] uppercase leading-snug tracking-wider text-ink-soft lg:min-h-[2.25rem]",
          pending && "inline-block border-b border-dashed border-line-strong"
        )}
      >
        {windowLabel(entry)}
      </p>

      <p className="mt-1.5 font-display text-base font-bold leading-tight text-ink">
        {entry.company}
      </p>
      <p className="mt-0.5 text-xs leading-snug text-ink-soft">
        {entry.programme}
      </p>

      <span
        className={cn(
          "mt-2.5 inline-flex rounded-pill px-2.5 py-0.5 text-[11px] font-semibold",
          isOpen ? "bg-signal text-on-signal" : "bg-ink/10 text-ink-soft"
        )}
      >
        {isOpen ? seasonLabels.statusOpen : seasonLabels.statusSoon}
      </span>
    </div>
  );

  // Só vira link quando existe link real de inscrição — mesma regra do painel.
  return entry.href ? (
    <a
      href={entry.href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring block rounded-panel transition-colors hover:text-accent-deep"
    >
      {body}
    </a>
  ) : (
    body
  );
}

export default function Hero() {
  return (
    // Bloco de areia chapado. A curva não é fundo: é forma. O antigo mesh de
    // gradiente e os orbs desfocados saíram — a textura do site é o grão.
    <section className="relative overflow-hidden bg-hero">
      {/*
        O SOL. Disco laranja cortado pela borda direita + um anel azul
        concêntrico: a geometria de marquise que a direção pede, em cor
        chapada. Tudo dentro do ArcField, que recorta — nenhum arco pode
        abrir rolagem horizontal no mobile.
      */}
      <ArcField>
        {/*
          No mobile o sol não cabe sem cair em cima da manchete, então ele
          vira HORIZONTE: uma faixa laranja de aresta inferior curva, no topo
          absoluto da seção, com o conteúdo começando abaixo dela. Mesma
          gramática (cor chapada + curva grande), zero colisão.
        */}
        <Arch tone="accent" side="bottom" className="inset-x-0 top-0 h-24 lg:hidden" />

        {/*
          Só a partir de lg, onde a manchete fica travada à esquerda em
          max-w-2xl: aí a metade direita do herói é vazia e o disco cabe
          inteiro sem encostar em nenhum texto. Isso importa porque
          `ink-soft` sobre laranja dá 1.94 — a régua aqui não é estética, é
          o contraste do parágrafo de apoio.
        */}
        <Disc
          tone="accent"
          className="hidden lg:block lg:-right-[8%] lg:-top-[18%] lg:w-[42vw] lg:max-w-[34rem]"
        />
        {/* O anel concêntrico dentro do disco — o sol com dois aros. Em areia,
            não em azul: azul sobre laranja dá 1.65 e o aro sumia. */}
        <Ring
          tone="surface"
          weight={12}
          className="hidden lg:block lg:right-[4%] lg:top-[4%] lg:w-[19vw] lg:max-w-[15rem]"
        />
      </ArcField>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-28 lg:pb-24 lg:pt-24">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="font-display text-[2.6rem] font-bold leading-[1.02] text-ink sm:text-6xl lg:text-[4.5rem]">
            <AnimatedWords text="Seu summer internship" baseDelay={BEAT.headline} />
            <br />
            {/*
              A frase-âncora vira BLOCO DE COR: laranja chapado com texto
              tinta (4.68). É o gesto gráfico do modernismo brasileiro — a
              palavra dentro do campo de cor — e substitui o itálico
              serifado da identidade anterior, que era a voz errada aqui.
            */}
            <span className="mt-2 inline-block overflow-hidden pb-[0.22em] mb-[-0.22em] align-bottom">
              <motion.span
                className="inline-block rounded-panel bg-accent px-4 pb-1 pt-0.5 text-ink sm:px-5"
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

          {/* A badge "O guia definitivo…" saiu; o posicionamento dela foi
              absorvido pela abertura deste parágrafo. */}
          <motion.p
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl lg:mx-0"
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

            {/* Era manuscrita; agora é etiqueta de dado — mesma informação,
                registro adulto. */}
            <span className="label-meta w-full text-center text-accent-deep sm:w-auto lg:text-left">
              grátis para estudantes
            </span>
          </motion.div>
        </div>

        {/*
          A LINHA DO TEMPO DA TEMPORADA.

          O painel continua dono do dado, da ordem e da pendência: só a pele
          vem daqui, via renderHeader / renderRow / renderFooter. No desktop
          o trilho é um fio horizontal atravessando a largura inteira do
          herói — a temporada como eixo; no mobile ele gira 90° e vira um
          fio vertical, que é a única forma de caber em 360px sem inventar
          uma barra de rolagem lateral.
        */}
        <motion.div className="mt-16 lg:mt-20" {...rise(BEAT.panel)}>
          <SeasonPanel
            limit={6}
            showColumns={false}
            showIndex={false}
            classNames={{
              list: cn(
                "relative mt-8 grid gap-y-8 pl-0",
                "before:absolute before:left-[5px] before:top-1.5 before:bottom-1.5 before:w-[2px] before:rounded-pill before:bg-line",
                "sm:grid-cols-2 sm:gap-x-10",
                "lg:grid-cols-6 lg:gap-x-2 lg:before:left-0 lg:before:right-0 lg:before:top-[5px] lg:before:bottom-auto lg:before:h-[2px] lg:before:w-auto"
              ),
              footnote:
                "mt-8 max-w-2xl border-l-2 border-accent pl-4 text-xs leading-relaxed text-ink-soft",
            }}
            renderHeader={() => (
              <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b-2 border-ink pb-4">
                <h2 className="font-display text-2xl font-bold leading-none text-ink sm:text-3xl">
                  {seasonLabels.heading}
                </h2>
                <p className="label-meta text-accent-deep">
                  {seasonLabels.eyebrow}
                </p>
              </header>
            )}
            renderRow={(entry) => <TimelineStop entry={entry} />}
            renderFooter={() => (
              // Legenda dos marcadores do trilho. Usa exatamente os rótulos
              // que já existem em lib/season.ts — nenhum texto novo.
              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                <li className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="block h-3 w-3 rounded-full border-2 border-accent-deep bg-accent"
                  />
                  {seasonLabels.statusOpen}
                </li>
                <li className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="block h-3 w-3 rounded-full border-2 border-line-strong bg-surface"
                  />
                  {seasonLabels.statusSoon}
                </li>
              </ul>
            )}
          />
        </motion.div>
      </div>
    </section>
  );
}

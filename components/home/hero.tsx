"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Magnetic from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import SeasonPanel from "@/components/home/season-panel";
import AnimatedWords from "@/components/home/animated-words";
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
 * ABERTURA DO DOSSIÊ.
 *
 * Composição editorial de duas colunas separadas por um fio vertical: à
 * esquerda a manchete serifada em corpo de capa, à direita o painel de
 * prazos apresentado como o SUMÁRIO da temporada — numeração de índice,
 * linhas separadas por fio fino, data em mono, status em caixa alta.
 *
 * O fundo é papel chapado: nenhum gradiente, nenhum orb. O único relevo é a
 * régua grossa que abre a página, como o fio de uma capa impressa.
 */
export default function Hero() {
  return (
    <section className="bg-hero">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rule-section grid gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-0 lg:py-24">
          <div className="lg:pr-14">
            <h1 className="font-display text-[clamp(2.75rem,8.5vw,4.75rem)] font-semibold leading-[1.02] tracking-tight text-ink">
              <AnimatedWords text="Seu summer internship" baseDelay={BEAT.headline} />
              <br />
              <span className="inline-block overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom">
                <motion.span
                  className="text-accent-emphasis font-editorial inline-block italic"
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
                absorvido pela abertura deste parágrafo. Medida de coluna de
                revista: o texto para antes de virar bloco de site. */}
            <motion.p
              className="mt-8 max-w-[46ch] border-l-2 border-line-strong pl-5 text-lg leading-relaxed text-ink-2 sm:text-xl"
              {...rise(BEAT.support)}
            >
              O guia definitivo de summer internships no Brasil: todos os
              programas num lugar só, com link direto para se candidatar.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              {...rise(BEAT.cta)}
            >
              <Magnetic>
                <Button href="/#empresas" size="lg">
                  Ver programas
                  <ArrowDown size={16} className="pop-nudge" />
                </Button>
              </Magnetic>

              <Button href="/quiz" variant="outline" size="lg">
                Fazer o quiz
              </Button>

              {/* Era a voz manuscrita (Caveat). Numa publicação séria esse
                  aparte vira nota de margem: caixa alta, fio à esquerda. */}
              <span className="label-meta w-full border-l border-line-strong py-1 pl-3 text-accent-deep sm:w-auto">
                grátis para estudantes
              </span>
            </motion.div>
          </div>

          {/*
            O sumário. O fio vertical no lg: é o que separa as duas colunas —
            a "gutter" da página dupla — e some no mobile, onde a régua
            horizontal faz o mesmo trabalho.
          */}
          <motion.div
            className="border-t-2 border-ink pt-8 lg:border-t-0 lg:border-l lg:border-line-strong lg:pt-0 lg:pl-14"
            {...rise(BEAT.panel)}
          >
            <SeasonPanel
              limit={6}
              classNames={{
                header: "gap-2",
                eyebrow: "text-accent-deep",
                heading:
                  "font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-[1.75rem]",
                columns: "mt-7 border-b-2 border-ink pb-2 text-ink",
                list: "mt-0",
                row: "gap-x-5 gap-y-0 border-line py-4",
                index: "index-numeral self-start pt-1 text-ink-soft",
                company:
                  "font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink",
                programme: "mt-0.5 text-[0.8125rem] leading-snug text-ink-soft",
                window: "font-mono text-[0.75rem] tabular-nums text-ink-soft",
                status: "mt-1",
                statusOpen: "text-accent-deep",
                statusSoon: "text-ink-soft",
                footnote:
                  "mt-5 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink-soft",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

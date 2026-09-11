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

export default function Hero() {
  return (
    // Fundo chapado. A antiga malha de gradiente e os orbs desfocados saíram:
    // a textura do site agora é o grão de .grain-overlay, não cor difusa.
    <section className="relative overflow-hidden bg-hero">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:py-28">
        <div className="text-center lg:text-left">
          <h1 className="font-display text-5xl font-bold leading-[1.03] text-ink sm:text-6xl lg:text-[68px]">
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
              absorvido pela abertura deste parágrafo. */}
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-ink-soft sm:text-xl lg:mx-0"
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

            {/* The script accent, rationed to three words. */}
            <span className="w-full text-center font-script text-2xl leading-none text-accent-deep sm:w-auto lg:text-left">
              grátis para estudantes
            </span>
          </motion.div>
        </div>

        <motion.div {...rise(BEAT.panel)}>
          <SeasonPanel
            className="panel rounded-card p-6 shadow-card sm:p-8"
            limit={6}
          />
        </motion.div>
      </div>
    </section>
  );
}

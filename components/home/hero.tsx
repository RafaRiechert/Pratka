"use client";

import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/badge";
import Magnetic from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import HeroOrbs from "@/components/home/hero-orbs";
import HeroCardStack from "@/components/home/hero-card-stack";
import AnimatedWords from "@/components/home/animated-words";
import { duration, ease } from "@/lib/motion";

/** Entrance beats. The whole sequence is done in under a second. */
const BEAT = {
  badge: 0,
  headline: 0.08,
  italic: 0.34,
  support: 0.46,
  cta: 0.56,
} as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.base, delay, ease: ease.soft },
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh">
      <HeroOrbs />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:py-28">
        <div className="text-center lg:text-left">
          <motion.div {...rise(BEAT.badge)}>
            <Badge>O guia definitivo de summer internships no Brasil</Badge>
          </motion.div>

          <h1 className="mt-7 font-display text-5xl font-bold leading-[1.03] text-ink sm:text-6xl lg:text-[68px]">
            <AnimatedWords text="Seu summer internship" baseDelay={BEAT.headline} />
            <br />
            <span className="inline-block overflow-hidden pb-[0.14em] mb-[-0.14em] align-bottom">
              <motion.span
                className="text-gradient-solar font-editorial inline-block italic"
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
            className="mx-auto mt-6 max-w-xl text-lg text-ink-soft sm:text-xl lg:mx-0"
            {...rise(BEAT.support)}
          >
            O único lugar onde você encontra todos os programas de summer
            internship do Brasil, com link direto para se candidatar.
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
            <span className="w-full text-center font-script text-2xl leading-none text-tangerine-deep sm:w-auto lg:text-left">
              grátis para estudantes
            </span>
          </motion.div>
        </div>

        <HeroCardStack />
      </div>
    </section>
  );
}

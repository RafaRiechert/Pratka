"use client";

import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/badge";
import Magnetic from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import HeroOrbs from "@/components/home/hero-orbs";
import AnimatedWords from "@/components/home/animated-words";

export default function Hero() {
  return (
    <section className="bg-grid relative flex min-h-[92vh] items-center overflow-hidden">
      <HeroOrbs />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Badge>
            <Sparkles size={14} className="text-signal" />
            O guia definitivo de summer internships no Brasil
          </Badge>
        </motion.div>

        <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[80px]">
          <AnimatedWords text="Seu summer internship" />
          <br />
          <motion.span
            className="text-signal inline-block"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: [0.2, 0, 0, 1] }}
          >
            começa aqui.
          </motion.span>
        </h1>

        <motion.p
          className="mx-auto mt-7 max-w-2xl text-lg text-mist sm:text-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
        >
          O único lugar onde você encontra todos os programas de summer
          internship do Brasil para universitários, com link direto para se
          candidatar.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.65 }}
        >
          <Magnetic>
            <Button href="/#empresas" size="lg">
              Ver programas
              <ArrowDown size={18} />
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

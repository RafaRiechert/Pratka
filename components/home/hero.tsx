"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Badge from "@/components/ui/badge";
import Magnetic from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import HeroOrbs from "@/components/home/hero-orbs";
import AnimatedWords from "@/components/home/animated-words";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-mesh">
      <HeroOrbs />
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge>
            <Sparkles size={14} className="text-lime" />
            Startup brasileira • Summer internship
          </Badge>
        </motion.div>

        <h1 className="mt-8 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-offwhite sm:text-6xl lg:text-[80px]">
          <AnimatedWords text="Todas as vagas de summer." />
          <br />
          <motion.span
            className="text-gradient-lime inline-block"
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ textShadow: "0 0 40px rgba(200,255,0,0.35)" }}
          >
            Um só lugar.
          </motion.span>
        </h1>

        <motion.p
          className="mx-auto mt-7 max-w-2xl text-lg text-offwhite/70 sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Conectamos universitários brasileiros às melhores empresas com
          programas de summer internship.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
        >
          <Magnetic>
            <Button href="/cadastro/aluno" size="lg">
              Sou estudante
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href="/cadastro/empresa" variant="outline" size="lg">
              Sou empresa
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

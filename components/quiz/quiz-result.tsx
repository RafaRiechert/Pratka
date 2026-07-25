"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Share2, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quizResults, type QuizAreaCode } from "@/lib/quiz";

export default function QuizResult({
  primary,
  secondary,
  onRetake,
}: {
  primary: QuizAreaCode;
  secondary: QuizAreaCode | null;
  onRetake: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const primaryInfo = quizResults[primary];
  const secondaryInfo = secondary ? quizResults[secondary] : null;

  const companiesHref = primaryInfo.sector
    ? `/?sector=${encodeURIComponent(primaryInfo.sector)}#empresas`
    : "/#empresas";

  async function handleShare() {
    const text = secondaryInfo
      ? `Fiz o quiz da Pratka e meu perfil é ${primaryInfo.name} (com pegada de ${secondaryInfo.name} também). Descubra o seu: https://pratka.app/quiz`
      : `Fiz o quiz da Pratka e meu perfil é ${primaryInfo.name}. Descubra o seu: https://pratka.app/quiz`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silently ignore, nothing to recover from here
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-2xl text-center"
    >
      <span className="text-sm font-semibold uppercase tracking-widest text-tangerine-deep">
        Seu resultado
      </span>
      <motion.h2
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 text-balance font-display text-4xl font-bold text-ink sm:text-5xl"
      >
        <span className="text-gradient-solar">{primaryInfo.name}</span>
      </motion.h2>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
        {primaryInfo.description}
      </p>

      {secondaryInfo && (
        <div className="mx-auto mt-8 max-w-md rounded-2xl border border-sand bg-paper/60 p-5">
          <p className="text-sm text-ink-soft">
            Você também tem perfil para{" "}
            <span className="font-semibold text-ink">{secondaryInfo.name}</span>.
          </p>
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button href={companiesHref} variant="primary" size="md">
          Ver empresas dessa área
          <ArrowUpRight size={16} />
        </Button>
        <Button variant="outline" size="md" onClick={onRetake}>
          <RotateCcw size={16} />
          Refazer quiz
        </Button>
        <Button variant="ghost" size="md" onClick={handleShare}>
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          {copied ? "Copiado!" : "Compartilhar resultado"}
        </Button>
      </div>
    </motion.div>
  );
}

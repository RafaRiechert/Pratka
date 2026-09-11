"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Share2, ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quizResults, insightRules, type QuizAreaCode } from "@/lib/quiz";

const MAX_INSIGHTS = 4;

export default function QuizResult({
  primary,
  secondary,
  tertiary,
  answers,
  onRetake,
}: {
  primary: QuizAreaCode;
  secondary: QuizAreaCode | null;
  tertiary: QuizAreaCode | null;
  answers: string[];
  onRetake: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const primaryInfo = quizResults[primary];
  const secondaryInfo = secondary ? quizResults[secondary] : null;
  const tertiaryInfo = tertiary ? quizResults[tertiary] : null;

  const insights = useMemo(() => {
    const matched = insightRules
      .filter((rule) => rule.test(answers))
      .map((rule) => rule.text(primaryInfo.name));
    const combined = [...matched];
    for (const generic of primaryInfo.genericInsights) {
      if (combined.length >= MAX_INSIGHTS) break;
      combined.push(generic);
    }
    return combined;
  }, [answers, primaryInfo]);

  const companiesHref = primaryInfo.sector
    ? `/?sector=${encodeURIComponent(primaryInfo.sector)}#empresas`
    : "/#empresas";

  async function handleShare() {
    const text = `Fiz o quiz da Pratka e meu perfil é ${primaryInfo.name}! Descubra o seu: https://pratka.app/quiz`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — nothing to recover from here
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-2xl text-center"
    >
      <span className="label-meta inline-flex items-center gap-2 text-accent-deep">
        <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent-deep" />
        Seu resultado
      </span>
      <motion.h2
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-3 text-balance font-display text-4xl font-bold text-ink sm:text-5xl"
      >
        <span className="text-accent-emphasis">{primaryInfo.name}</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="measure mx-auto mt-5 text-lg leading-[1.75] text-ink-2"
      >
        {primaryInfo.description}
      </motion.p>

      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mt-8 max-w-xl rounded-card border border-line bg-surface-2 p-6 text-left"
        >
          <h3 className="font-display text-base font-bold text-ink">
            Por que essa área combina com você
          </h3>
          <ul className="mt-3 space-y-2.5">
            {insights.map((sentence, i) => (
              <li key={i} className="text-sm leading-relaxed text-ink-2">
                {sentence}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
      >
        {secondaryInfo && (
          <div className="flex-1 rounded-panel border border-line bg-surface-2 p-5 text-left">
            <p className="text-sm text-ink-soft">
              Você também tem perfil para{" "}
              <span className="font-semibold text-ink">{secondaryInfo.name}</span>.
            </p>
            <p className="mt-1.5 font-mono text-xs text-ink-soft">
              {secondaryInfo.description.split(".")[0]}.
            </p>
          </div>
        )}
        {tertiaryInfo && (
          <div className="flex-1 rounded-panel border border-line bg-surface-3 p-5 text-left">
            <p className="text-sm text-ink-soft">
              Outra área para ficar de olho:{" "}
              <span className="font-semibold text-ink">{tertiaryInfo.name}</span>.
            </p>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <Button href={companiesHref} variant="primary" size="md">
          Ver programas nessa área
          <ArrowUpRight size={15} />
        </Button>
        <Button variant="outline" size="md" onClick={onRetake}>
          <RotateCcw size={16} />
          Refazer quiz
        </Button>
        <Button variant="ghost" size="md" onClick={handleShare}>
          {copied ? <Check size={16} /> : <Share2 size={16} />}
          {copied ? "Copiado!" : "Compartilhar resultado"}
        </Button>
      </motion.div>
    </motion.div>
  );
}

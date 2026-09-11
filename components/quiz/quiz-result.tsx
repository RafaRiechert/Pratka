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
      className="mx-auto w-full max-w-2xl"
    >
      <span className="label-meta rule-section block pt-6 text-accent-deep">
        Seu resultado
      </span>
      <motion.h2
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-balance font-display text-[clamp(2.5rem,8vw,4rem)] font-semibold leading-[1.03] tracking-tight text-ink"
      >
        <span className="text-accent-emphasis">{primaryInfo.name}</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 max-w-xl text-lg leading-relaxed text-ink-2"
      >
        {primaryInfo.description}
      </motion.p>

      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 max-w-xl border-t-2 border-t-ink bg-surface-3 p-6 text-left"
        >
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
            Por que essa área combina com você
          </h3>
          <ul className="mt-4 space-y-3">
            {insights.map((sentence, i) => (
              <li key={i} className="border-t border-line pt-3 text-sm leading-relaxed text-ink-2 first:border-t-0 first:pt-0">
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
        className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
      >
        {secondaryInfo && (
          <div className="flex-1 border border-line-strong p-5 text-left">
            <p className="text-sm text-ink-soft">
              Você também tem perfil para{" "}
              <span className="font-semibold text-ink">{secondaryInfo.name}</span>.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              {secondaryInfo.description.split(".")[0]}.
            </p>
          </div>
        )}
        {tertiaryInfo && (
          <div className="flex-1 border border-line-strong p-5 text-left">
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
        className="mt-12 flex flex-wrap items-center gap-3 border-t border-line pt-8"
      >
        <Button href={companiesHref} variant="primary" size="md">
          Ver programas nessa área
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
      </motion.div>
    </motion.div>
  );
}

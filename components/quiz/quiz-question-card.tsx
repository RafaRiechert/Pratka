"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizOption, QuizQuestion } from "@/lib/quiz";

const variants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -32 : 32 }),
};

export default function QuizQuestionCard({
  question,
  direction,
  selectedOptionId,
  onAnswer,
  onBack,
}: {
  question: QuizQuestion;
  direction: number;
  selectedOptionId: string | null;
  onAnswer: (option: QuizOption) => void;
  onBack?: () => void;
}) {
  const [justClicked, setJustClicked] = useState<string | null>(null);
  const highlighted = justClicked ?? selectedOptionId;

  function handleSelect(option: QuizOption) {
    if (justClicked) return;
    setJustClicked(option.id);
    setTimeout(() => onAnswer(option), 320);
  }

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-2xl"
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="focus-ring label-meta mb-8 inline-flex items-center gap-1.5 rounded-input py-1 text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Voltar
        </button>
      )}

      <h2 className="rule-section text-balance pt-6 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
        {question.question}
      </h2>

      <div className="mt-10 border-t border-line">
        {question.options.map((option, i) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option)}
            disabled={justClicked !== null}
            className={cn(
              // Cada alternativa é uma linha de formulário impresso: fio
              // embaixo, numeral fora, e a marcação de escolhida chapa a
              // tinta em vez de acender um preenchimento colorido.
              "focus-ring flex w-full items-baseline gap-4 border-b border-line px-2 py-4 text-left text-base transition-colors duration-200",
              highlighted === option.id
                ? "bg-inverse text-on-inverse"
                : "text-ink hover:bg-surface-3",
              justClicked !== null && "disabled:pointer-events-none",
              justClicked !== null && justClicked !== option.id && "opacity-40"
            )}
          >
            <span
              aria-hidden="true"
              className={`index-numeral shrink-0 ${
                highlighted === option.id ? "text-on-inverse/70" : "text-ink-soft"
              }`}
            >
              {String.fromCharCode(65 + i)}
            </span>
            <span className="min-w-0 flex-1">{option.text}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}

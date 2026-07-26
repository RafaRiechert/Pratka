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
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition-colors hover:text-tangerine-deep"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      )}

      <h2 className="text-balance font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {question.question}
      </h2>

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option)}
            disabled={justClicked !== null}
            className={cn(
              "glass glass-border-glow rounded-2xl px-6 py-4 text-left text-base text-ink shadow-card transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-glow-tangerine disabled:pointer-events-none",
              highlighted === option.id && "border-2 border-tangerine bg-tangerine/10",
              justClicked !== null && justClicked !== option.id && "opacity-40"
            )}
          >
            {option.text}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

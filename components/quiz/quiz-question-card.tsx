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
          className="focus-ring mb-6 inline-flex items-center gap-1.5 rounded-control label-meta text-ink-soft transition-colors hover:text-accent-deep"
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
              "panel panel-glow focus-ring rounded-panel px-5 py-3.5 text-left text-[15px] text-ink-2 transition-colors duration-200",
              "hover:border-accent-deep hover:text-ink disabled:pointer-events-none",
              highlighted === option.id &&
                "border-accent-deep bg-accent-deep/10 text-ink",
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

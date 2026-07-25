"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { QuizAreaCode, QuizQuestion } from "@/lib/quiz";

export default function QuizQuestionCard({
  question,
  onAnswer,
}: {
  question: QuizQuestion;
  onAnswer: (areas: QuizAreaCode[]) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSelect(index: number, areas: QuizAreaCode[]) {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => onAnswer(areas), 320);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-2xl"
    >
      <h2 className="text-balance font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
        {question.question}
      </h2>

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option, i) => (
          <button
            key={option.text}
            type="button"
            onClick={() => handleSelect(i, option.areas)}
            disabled={selected !== null}
            className={cn(
              "glass glass-border-glow rounded-2xl px-6 py-4 text-left text-base text-ink shadow-card transition-all duration-200",
              "hover:-translate-y-0.5 hover:shadow-glow-tangerine disabled:pointer-events-none",
              selected === i && "border-2 border-tangerine bg-tangerine/10",
              selected !== null && selected !== i && "opacity-40"
            )}
          >
            {option.text}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

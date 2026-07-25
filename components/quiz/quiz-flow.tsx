"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import QuizProgress from "@/components/quiz/quiz-progress";
import QuizQuestionCard from "@/components/quiz/quiz-question-card";
import QuizResult from "@/components/quiz/quiz-result";
import { quizQuestions, type QuizAreaCode } from "@/lib/quiz";

const AREA_ORDER: QuizAreaCode[] = [
  "IB",
  "Trading",
  "Research",
  "Corporate",
  "Consultoria",
  "Fintech",
  "Marketing",
  "RH",
];

type Phase = "question" | "calculating" | "result";

function emptyScores(): Record<QuizAreaCode, number> {
  return AREA_ORDER.reduce(
    (acc, area) => ({ ...acc, [area]: 0 }),
    {} as Record<QuizAreaCode, number>
  );
}

export default function QuizFlow() {
  const [phase, setPhase] = useState<Phase>("question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<QuizAreaCode, number>>(emptyScores);
  const [ranking, setRanking] = useState<QuizAreaCode[]>([]);

  function handleAnswer(areas: QuizAreaCode[]) {
    const nextScores = { ...scores };
    areas.forEach((area) => {
      nextScores[area] = (nextScores[area] ?? 0) + 1;
    });
    setScores(nextScores);

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    setPhase("calculating");
    setTimeout(() => {
      const sorted = [...AREA_ORDER].sort(
        (a, b) => nextScores[b] - nextScores[a]
      );
      setRanking(sorted);
      setPhase("result");
    }, 1400);
  }

  function handleRetake() {
    setPhase("question");
    setCurrentIndex(0);
    setScores(emptyScores());
    setRanking([]);
  }

  if (phase === "calculating") {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-tangerine/15 text-tangerine-deep"
        >
          <Sparkles size={22} />
        </motion.div>
        <p className="font-display text-xl font-semibold text-ink">
          Analisando seu perfil...
        </p>
      </div>
    );
  }

  if (phase === "result") {
    const primary = ranking[0];
    const secondary = ranking[1] && scores[ranking[1]] > 0 ? ranking[1] : null;
    return <QuizResult primary={primary} secondary={secondary} onRetake={handleRetake} />;
  }

  const question = quizQuestions[currentIndex];

  return (
    <div>
      <QuizProgress current={currentIndex + 1} total={quizQuestions.length} />
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <QuizQuestionCard
            key={currentIndex}
            question={question}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import QuizProgress from "@/components/quiz/quiz-progress";
import QuizQuestionCard from "@/components/quiz/quiz-question-card";
import QuizResult from "@/components/quiz/quiz-result";
import { quizQuestions, type QuizAreaCode, type QuizOption, type QuizQuestion } from "@/lib/quiz";

const AREA_ORDER: QuizAreaCode[] = [
  "IB",
  "Trading",
  "Research",
  "Asset",
  "Corporate",
  "Consultoria",
  "Fintech",
  "Marketing",
  "RH",
  "Varejo",
  "PEVC",
  "Risco",
];

type Phase = "question" | "calculating" | "result";

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function shuffleQuestions(): QuizQuestion[] {
  return quizQuestions.map((q) => ({ ...q, options: shuffleArray(q.options) }));
}

export default function QuizFlow() {
  // Start with the unshuffled order so the initial client render matches the
  // statically-exported HTML exactly (this site has no per-request server —
  // shuffling in the useState initializer would run once at build time for
  // the static HTML and again, differently, during client hydration, causing
  // a hydration mismatch). Shuffle for real right after mount instead.
  const [questions, setQuestions] = useState<QuizQuestion[]>(quizQuestions);
  const [phase, setPhase] = useState<Phase>("question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<(QuizOption | null)[]>(
    () => Array(quizQuestions.length).fill(null)
  );
  const [ranking, setRanking] = useState<QuizAreaCode[]>([]);
  const [scores, setScores] = useState<Record<QuizAreaCode, number>>(
    () => ({}) as Record<QuizAreaCode, number>
  );

  useEffect(() => {
    setQuestions(shuffleQuestions());
    // Runs once on mount, client-only, after hydration is already settled.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAnswer(option: QuizOption) {
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = option;
    setAnswers(nextAnswers);

    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex((i) => i + 1);
      return;
    }

    const finalScores = AREA_ORDER.reduce(
      (acc, area) => ({ ...acc, [area]: 0 }),
      {} as Record<QuizAreaCode, number>
    );
    nextAnswers.forEach((answer) => {
      answer?.areas.forEach((area) => {
        finalScores[area] = (finalScores[area] ?? 0) + 1;
      });
    });

    setDirection(1);
    setPhase("calculating");
    setTimeout(() => {
      const sorted = [...AREA_ORDER].sort((a, b) => finalScores[b] - finalScores[a]);
      setScores(finalScores);
      setRanking(sorted);
      setPhase("result");
    }, 2000);
  }

  function handleBack() {
    if (currentIndex === 0) return;
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  }

  function handleRetake() {
    setQuestions(shuffleQuestions());
    setPhase("question");
    setCurrentIndex(0);
    setDirection(1);
    setAnswers(Array(quizQuestions.length).fill(null));
    setRanking([]);
    setScores({} as Record<QuizAreaCode, number>);
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
          Analisando suas respostas...
        </p>
      </div>
    );
  }

  if (phase === "result") {
    const primary = ranking[0];
    const secondary = ranking[1] && scores[ranking[1]] > 0 ? ranking[1] : null;
    const tertiary = ranking[2] && scores[ranking[2]] > 0 ? ranking[2] : null;
    const answerTexts = answers.map((a) => a?.text ?? "");
    return (
      <QuizResult
        primary={primary}
        secondary={secondary}
        tertiary={tertiary}
        answers={answerTexts}
        onRetake={handleRetake}
      />
    );
  }

  const question = questions[currentIndex];

  return (
    <div>
      <QuizProgress current={currentIndex + 1} total={questions.length} />
      <div className="mt-10">
        <AnimatePresence mode="wait" custom={direction}>
          <QuizQuestionCard
            key={currentIndex}
            question={question}
            direction={direction}
            selectedOptionId={answers[currentIndex]?.id ?? null}
            onAnswer={handleAnswer}
            onBack={currentIndex > 0 ? handleBack : undefined}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}

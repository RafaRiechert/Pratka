import type { Metadata } from "next";
import PageHero from "@/components/ui/page-hero";
import QuizFlow from "@/components/quiz/quiz-flow";

export const metadata: Metadata = {
  title: "Descubra sua área — Pratka",
};

export default function QuizPage() {
  return (
    <>
      <PageHero
        eyebrow="Opcional"
        title="Descubra sua área"
        description="Responda 15 perguntas rápidas e descubra qual área do mercado financeiro mais combina com você."
      />
      <section className="mx-auto max-w-3xl px-6 pb-28">
        <QuizFlow />
      </section>
    </>
  );
}

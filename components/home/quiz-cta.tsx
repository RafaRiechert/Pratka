import { Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import GlassCard from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function QuizCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-4">
      <AnimatedSection>
        <GlassCard className="flex flex-col items-center gap-5 p-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-tangerine/15 text-tangerine-deep">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Não sabe por onde começar?
              </h3>
              <p className="mt-1.5 text-ink-soft">
                Descubra qual área do mercado combina com você.
              </p>
            </div>
          </div>
          <Button href="/quiz" variant="primary" size="md" className="shrink-0">
            Fazer o quiz
          </Button>
        </GlassCard>
      </AnimatedSection>
    </section>
  );
}

import { Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import PanelCard from "@/components/ui/panel-card";
import { Button } from "@/components/ui/button";

export default function QuizCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-20">
      <AnimatedSection>
        <PanelCard className="flex flex-col items-center gap-5 p-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control border border-accent-deep/40 bg-accent-deep/10 text-accent-deep">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                Não sabe por onde começar?
              </h3>
              <p className="mt-1.5 text-sm text-ink-2">
                Descubra qual área do mercado combina com você.
              </p>
            </div>
          </div>
          <Button href="/quiz" variant="primary" size="md" className="shrink-0">
            Fazer o quiz
          </Button>
        </PanelCard>
      </AnimatedSection>
    </section>
  );
}

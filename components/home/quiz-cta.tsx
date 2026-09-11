import AnimatedSection from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";

/**
 * Chamada de margem. Numa revista, o box que interrompe a leitura para
 * oferecer outra coisa é uma faixa de fundo de encarte com fio em cima e
 * embaixo — não um cartão flutuante. O ícone de sparkle saiu: é o mesmo
 * vocabulário de "IA mágica" que a badge do herói levou embora.
 */
export default function QuizCta() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <AnimatedSection>
        <div className="flex flex-col gap-6 border-y-2 border-ink bg-surface-3 px-6 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
              Não sabe por onde começar?
            </h3>
            <p className="mt-2 text-ink-2">
              Descubra qual área do mercado combina com você.
            </p>
          </div>
          <Button href="/quiz" variant="primary" size="md" className="shrink-0 self-start sm:self-auto">
            Fazer o quiz
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
}

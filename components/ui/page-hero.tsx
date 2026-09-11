import AnimatedSection from "@/components/ui/animated-section";

/**
 * Cabeça de caderno. Em vez de um herói centralizado, o dossiê abre cada
 * página interna como abre uma seção impressa: régua grossa no topo, o
 * metadado em caixa alta, a manchete serifada alinhada à esquerda e um fio
 * fino fechando o bloco antes do conteúdo.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-hero">
      <div className="mx-auto max-w-5xl px-6">
        <AnimatedSection className="rule-section border-b border-line py-14 sm:py-20">
          {eyebrow && (
            <span className="label-meta block text-accent-deep">{eyebrow}</span>
          )}
          <h1 className="mt-4 font-display text-[clamp(2.5rem,9vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-ink">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

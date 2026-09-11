import AnimatedSection from "@/components/ui/animated-section";

/**
 * Cabeçalho das páginas internas. Mesma gramática do herói da home: fundo
 * chapado com a malha de fios, sobrelinha em mono e caixa alta, título na
 * grotesca estreita. Sem gradiente, sem cartão.
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
    <section className="relative overflow-hidden bg-hero py-20 sm:py-24">
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <AnimatedSection>
          {eyebrow && (
            <span className="label-meta inline-flex items-center gap-2 text-accent-deep">
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent-deep" />
              {eyebrow}
            </span>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="measure mx-auto mt-5 text-lg leading-relaxed text-ink-2">
              {description}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}

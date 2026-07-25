import { CircleAlert, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";

const problemParagraphs = [
  "Programas de summer internship são uma das experiências mais transformadoras que um universitário pode ter. Em poucas semanas, você ganha exposição real ao mercado de trabalho, constrói um network que pode definir sua carreira e descobre na prática se aquela área é realmente para você. Mas existe um problema fundamental: encontrar esses programas é absurdamente difícil.",
  "Cada empresa divulga suas vagas de forma isolada — no próprio site, em portais de carreira diferentes, com prazos que mudam a cada ano. Não existe um lugar centralizado onde o estudante possa ver todas as opções de uma vez. O resultado? Quem tem acesso à informação certa, no momento certo, se candidata. Quem não tem, perde a oportunidade, muitas vezes sem nem saber que ela existia.",
  "E esse é o ponto mais injusto: o acesso à informação não deveria ser um privilégio. Um estudante em Recife, em Belo Horizonte ou em Lisboa deveria ter a mesma chance de descobrir essas oportunidades que um estudante na Faria Lima.",
];

const solutionParagraphs = [
  "A Pratka existe para resolver isso da forma mais direta possível. Sem plataforma complexa, sem cadastro obrigatório, sem processo seletivo próprio. Apenas uma página completa, atualizada e bem organizada com todos os programas de summer internship disponíveis no Brasil — e um link direto para você se candidatar.",
  "Acreditamos que a melhor tecnologia é aquela que sai do caminho. Você não precisa de mais uma conta, mais uma senha, mais um formulário. Você precisa da informação certa, no formato certo, na hora certa. É exatamente isso que a Pratka entrega.",
];

export default function ProblemSolution() {
  return (
    <section id="problema-solucao" className="scroll-mt-24">
      <div className="border-b border-cream/5 bg-ink py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cream/10 text-cream/60">
              <CircleAlert size={20} />
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-cream/90 sm:text-4xl">
              O Problema
            </h2>
          </AnimatedSection>
          <div className="space-y-5">
            {problemParagraphs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-cream/65">{p}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-cream py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,90,31,0.1),transparent_70%)]"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tangerine/15 text-tangerine-deep">
              <Sparkles size={20} />
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              A <span className="text-gradient-solar">Solução</span>
            </h2>
          </AnimatedSection>
          <div className="space-y-5">
            {solutionParagraphs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-ink/80">{p}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

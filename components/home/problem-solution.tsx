import { CircleAlert } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import BenefitPills from "@/components/ui/benefit-pills";

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
    <section id="problema-solucao" className="scroll-mt-20">
      {/*
        A ÚNICA virada de tinta no corpo do documento. O conceito pede
        parcimônia, então das três seções que eram escuras só esta continua:
        é o argumento da publicação, a "página preta" que interrompe a
        leitura. O CTA final voltou para o papel; o rodapé segue em tinta
        porque é colofão, e colofão escuro é convenção, não efeito.
      */}
      <div data-nav-theme="dark" className="bg-inverse py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 border-t-2 border-on-inverse pt-6">
            <CircleAlert
              size={18}
              aria-hidden="true"
              className="text-signal"
            />
            <h2 className="mt-4 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-on-inverse">
              O Problema
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {problemParagraphs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-on-inverse/75">{p}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Sem o amarelo emprestado e sem o gradiente radial: a seção agora
          usa uma superfície do próprio sistema. O ícone de sparkle saiu
          junto com a badge do herói — mesmo motivo. */}
      <div className="bg-surface py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10">
            <h2 className="rule-section pt-6 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
              A Solução
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {solutionParagraphs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <p className="text-lg leading-relaxed text-ink-2">{p}</p>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.1}>
            <BenefitPills className="mt-10" />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

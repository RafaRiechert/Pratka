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

/**
 * A ZONA DE LEITURA MAIS LONGA DO SITE — cinco parágrafos densos.
 *
 * É aqui que a identidade escura teria quebrado. A decisão da direção:
 * terminal onde há dado, papel onde há leitura. A seção inteira entra em
 * `read-surface`, que recalcula os tokens para claro sem que nenhum
 * componente filho precise saber, e marca `data-nav-theme="light"` para o
 * header flutuante acompanhar.
 *
 * Dentro do claro, `inverse` volta a significar "o escuro" — por isso as
 * pílulas de benefício continuam funcionando sem tocar em nada.
 *
 * A medida de linha (`.measure`, 68ch) e a entrelinha relaxada são o resto
 * do trabalho: 60–75 caracteres é onde o olho acha a linha seguinte sozinho.
 */
export default function ProblemSolution() {
  return (
    <section
      id="problema-solucao"
      data-nav-theme="light"
      className="read-surface bg-surface scroll-mt-24 border-y border-line"
    >
      <div className="border-b border-line bg-surface-3 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-control border border-line-strong/40 bg-surface text-ink-soft">
              <CircleAlert size={19} />
            </div>
            <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
              O Problema
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {problemParagraphs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <p className="measure text-lg leading-[1.75] text-ink-2">{p}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Sem gradiente radial e sem o amarelo emprestado: a virada de
          Problema para Solução é uma troca de superfície e um fio verde. */}
      <div className="relative overflow-hidden bg-surface-2 py-24">
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10">
            <span
              aria-hidden="true"
              className="mb-5 block h-0.5 w-12 bg-accent-deep"
            />
            <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
              A Solução
            </h2>
          </AnimatedSection>
          <div className="space-y-6">
            {solutionParagraphs.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <p className="measure text-lg leading-[1.75] text-ink-2">{p}</p>
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

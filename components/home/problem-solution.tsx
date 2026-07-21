import { CircleAlert, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";

export default function ProblemSolution() {
  return (
    <section id="problema-solucao" className="scroll-mt-24">
      <div className="border-y-4 border-ink bg-paper-2 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink bg-paper text-ink/60">
              <CircleAlert size={20} />
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              O Problema
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-lg leading-relaxed text-ink/70">
              Programas de summer internship existem no Brasil — mas quase
              ninguém sabe. As oportunidades estão espalhadas por dezenas de
              sites diferentes, cada empresa com seu próprio processo e
              prazos. Para o universitário que quer participar, a busca é
              exaustiva: são horas navegando entre páginas de carreiras,
              LinkedIn e grupos de WhatsApp tentando descobrir quais empresas
              oferecem esse tipo de programa. Muitos desistem antes de
              encontrar. Outros nem sabem que a oportunidade existe.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <div className="relative overflow-hidden py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(163,239,196,0.5),transparent_70%)]"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <AnimatedSection className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-ink bg-mint text-ink">
              <Sparkles size={20} />
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              A <span className="text-gradient-pop">Solução</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-lg leading-relaxed text-ink/80">
              A Pratka resolve isso da forma mais simples possível: reunimos
              todas as empresas que oferecem summer internship para
              undergrads no Brasil em uma única página, com informações
              claras e link direto para o formulário de inscrição. Sem
              cadastro, sem intermediário. Você entra, encontra e se
              candidata. Pronto.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

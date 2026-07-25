import { Compass, Search, MousePointerClick } from "lucide-react";
import AnimatedSection, {
  Stagger,
  StaggerItem,
} from "@/components/ui/animated-section";
import GlassCard from "@/components/ui/glass-card";

const steps = [
  {
    icon: Compass,
    title: "Explore as oportunidades",
    text: "Navegue pela nossa curadoria completa de programas de summer internship no Brasil. Filtre por setor — de bancos de investimento a consultorias estratégicas, de fintechs a empresas de entretenimento. Filtre por cidade, por temporada ou por público-alvo. Cada programa foi verificado e atualizado pela nossa equipe para garantir que você tenha informações precisas e confiáveis.",
  },
  {
    icon: Search,
    title: "Descubra os detalhes",
    text: "Clique em \"Mais informações\" e mergulhe nos detalhes de cada programa: o que o estagiário realmente faz no dia a dia, qual a duração, quais são os benefícios, quais áreas estão disponíveis e quais são os pré-requisitos. Nada de descrições genéricas — aqui você encontra o que precisa saber para tomar uma decisão informada.",
  },
  {
    icon: MousePointerClick,
    title: "Candidate-se",
    text: "Encontrou o programa ideal? Clique em \"Aplicar\" e vá direto para o formulário de inscrição no site oficial da empresa. A Pratka não é intermediária — somos o atalho. Você se candidata diretamente, sem burocracia adicional, sem criar mais uma conta em mais uma plataforma.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Como <span className="text-gradient-solar">funciona</span>
        </h2>
      </AnimatedSection>

      <Stagger className="mt-16 grid gap-6 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <StaggerItem key={title}>
            <GlassCard className="flex h-full flex-col gap-4 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tangerine/15 text-tangerine-deep">
                  <Icon size={20} />
                </div>
                <span className="font-display text-2xl font-extrabold text-coral">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-ink">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">{text}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

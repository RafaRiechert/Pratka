import { Compass, Search, MousePointerClick } from "lucide-react";
import AnimatedSection, {
  Stagger,
  StaggerItem,
} from "@/components/ui/animated-section";
import GlassCard from "@/components/ui/glass-card";

const steps = [
  {
    icon: Compass,
    title: "Explore",
    text: "Navegue pela lista completa de empresas que oferecem programas de summer internship no Brasil. Filtre por setor, cidade ou público-alvo.",
  },
  {
    icon: Search,
    title: "Descubra",
    text: "Clique em \"Mais informações\" e conheça os detalhes de cada programa: o que o estagiário faz, duração, benefícios, pré-requisitos e áreas de atuação.",
  },
  {
    icon: MousePointerClick,
    title: "Candidate-se",
    text: "Clique em \"Aplicar\" e vá direto para o formulário de inscrição no site oficial da empresa. Sem intermediários, sem complicação.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-offwhite sm:text-5xl">
          Como <span className="text-gradient-lime">funciona</span>
        </h2>
      </AnimatedSection>

      <Stagger className="mt-16 grid gap-6 sm:grid-cols-3">
        {steps.map(({ icon: Icon, title, text }, i) => (
          <StaggerItem key={title}>
            <GlassCard className="flex h-full flex-col gap-4 p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/15 text-lime">
                  <Icon size={20} />
                </div>
                <span className="font-display text-2xl font-extrabold text-purple-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-offwhite">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-offwhite/65">{text}</p>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

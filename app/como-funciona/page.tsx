import type { Metadata } from "next";
import PageHero from "@/components/ui/page-hero";
import AnimatedSection, {
  Stagger,
  StaggerItem,
} from "@/components/ui/animated-section";
import GlassCard from "@/components/ui/glass-card";

export const metadata: Metadata = {
  title: "Como funciona — Pratka",
};

const studentSteps = [
  {
    title: "Crie seu perfil",
    text: "Cadastre-se gratuitamente e monte seu perfil em minutos. Adicione suas informações acadêmicas, experiências, habilidades e faça o upload do seu currículo. Você só precisa fazer isso uma vez.",
  },
  {
    title: "Explore as oportunidades",
    text: "Navegue pelas empresas que oferecem programas de summer internship e filtre por área de atuação, cidade ou período. Todas as oportunidades reunidas em um só lugar, atualizadas em tempo real.",
  },
  {
    title: "Candidate-se com um clique",
    text: "Encontrou uma vaga que faz sentido para você? Candidate-se diretamente pela Pratka, sem precisar acessar outros sites ou preencher formulários diferentes para cada empresa.",
  },
  {
    title: "Acompanhe suas candidaturas",
    text: "Monitore o status de cada aplicação diretamente no seu painel. Quando uma empresa demonstrar interesse, você recebe uma notificação e o processo segue de lá.",
  },
];

const companySteps = [
  {
    title: "Cadastre sua empresa",
    text: "Crie sua conta, complete o perfil da sua empresa e apresente sua cultura, seus valores e o que torna o seu programa de summer especial para os candidatos.",
  },
  {
    title: "Publique seu programa",
    text: "Divulgue as vagas do seu programa de summer internship com todos os detalhes — área de atuação, período, requisitos e remuneração. Em poucos minutos, sua oportunidade já está visível para milhares de universitários.",
  },
  {
    title: "Receba candidaturas qualificadas",
    text: "Acesse os perfis dos candidatos interessados, filtre por curso, universidade ou habilidades e identifique os talentos mais alinhados com o que você busca — tudo em um painel simples e organizado.",
  },
  {
    title: "Conecte-se com os candidatos",
    text: "Entre em contato diretamente com os estudantes selecionados pela própria plataforma e conduza o processo seletivo do jeito que funciona melhor para a sua empresa.",
  },
];

function StepGrid({
  steps,
  accent,
}: {
  steps: { title: string; text: string }[];
  accent: "lime" | "purple";
}) {
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2">
      {steps.map((s, i) => (
        <StaggerItem key={s.title}>
          <GlassCard interactive className="flex h-full flex-col gap-4 p-7">
            <span
              className={`font-display text-3xl font-extrabold ${
                accent === "lime" ? "text-lime" : "text-purple-soft"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-lg font-bold text-offwhite">
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-offwhite/65">{s.text}</p>
          </GlassCard>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        eyebrow="Passo a passo"
        title="Como funciona"
        description="Veja como a Pratka simplifica o processo para estudantes e empresas."
      />

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <AnimatedSection className="mb-10">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
            Para <span className="text-gradient-lime">estudantes</span>
          </h2>
        </AnimatedSection>
        <StepGrid steps={studentSteps} accent="lime" />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <AnimatedSection className="mb-10">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-offwhite sm:text-4xl">
            Para <span className="text-purple-soft">empresas</span>
          </h2>
        </AnimatedSection>
        <StepGrid steps={companySteps} accent="purple" />
      </section>
    </>
  );
}

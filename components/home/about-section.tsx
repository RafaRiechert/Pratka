import Link from "next/link";
import { Building2, Compass, Lightbulb, Users } from "lucide-react";
import AnimatedSection, {
  Stagger,
  StaggerItem,
} from "@/components/ui/animated-section";
import GlassCard from "@/components/ui/glass-card";

const cards = [
  {
    href: "/quem-somos-nos",
    icon: Users,
    title: "Quem somos nós",
    teaser: "Conheça a história e a missão por trás da Pratka.",
  },
  {
    href: "/como-funciona",
    icon: Compass,
    title: "Como funciona",
    teaser: "Veja o passo a passo para estudantes e empresas.",
  },
  {
    href: "/problema-solucao",
    icon: Lightbulb,
    title: "Problema & Solução",
    teaser: "Entenda o problema que resolvemos e como.",
  },
  {
    href: "/empresas",
    icon: Building2,
    title: "Empresas",
    teaser: "Explore os programas de summer disponíveis.",
  },
];

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-28">
      <AnimatedSection className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-offwhite sm:text-5xl">
          O que é a <span className="text-gradient-lime">Pratka</span>
        </h2>
        <p className="mt-5 text-lg text-offwhite/65">
          Uma plataforma que centraliza todas as oportunidades de summer
          internship do Brasil — para que estudantes encontrem empresas, e
          empresas encontrem talentos, em um só lugar.
        </p>
      </AnimatedSection>

      <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ href, icon: Icon, title, teaser }) => (
          <StaggerItem key={href}>
            <Link href={href} className="block h-full">
              <GlassCard interactive className="flex h-full flex-col gap-4 p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple/20 text-purple-soft">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-bold text-offwhite">
                  {title}
                </h3>
                <p className="text-sm text-offwhite/60">{teaser}</p>
              </GlassCard>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

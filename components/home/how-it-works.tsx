"use client";

import { useRef, useState, useEffect } from "react";
import { Compass, Search, MousePointerClick } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import AnimatedSection, {
  Stagger,
  StaggerItem,
} from "@/components/ui/animated-section";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    icon: Compass,
    title: "Explore as oportunidades",
    text: "Navegue pela nossa curadoria completa de programas de summer internship no Brasil. Filtre por setor — de bancos de investimento a consultorias estratégicas, de fintechs a empresas de entretenimento. Filtre por cidade, por temporada ou por público-alvo. Cada programa foi verificado e atualizado pela nossa equipe para garantir que você tenha informações precisas e confiáveis.",
    /*
     * Um acento por painel. A seção inteira é um bloco de verde folha, então
     * o verde sai da rotação dos acentos — sobraram os três que ainda
     * cantam contra o papel de areia do cartão: laranja, azul e tinta.
     * Cada par abaixo é um contrato do sistema, não uma cor escolhida.
     */
    accent: {
      chip: "bg-accent text-ink",
      number: "text-accent",
      edge: "before:bg-accent",
    },
  },
  {
    icon: Search,
    title: "Descubra os detalhes",
    text: "Clique em \"Mais informações\" e mergulhe nos detalhes de cada programa: o que o estagiário realmente faz no dia a dia, qual a duração, quais são os benefícios, quais áreas estão disponíveis e quais são os pré-requisitos. Nada de descrições genéricas — aqui você encontra o que precisa saber para tomar uma decisão informada.",
    accent: {
      chip: "bg-support text-on-support",
      number: "text-support",
      edge: "before:bg-support",
    },
  },
  {
    icon: MousePointerClick,
    title: "Candidate-se",
    text: "Encontrou o programa ideal? Clique em \"Aplicar\" e vá direto para o formulário de inscrição no site oficial da empresa. A Pratka não é intermediária — somos o atalho. Você se candidata diretamente, sem burocracia adicional, sem criar mais uma conta em mais uma plataforma.",
    accent: {
      chip: "bg-inverse text-on-inverse",
      number: "text-ink",
      edge: "before:bg-inverse",
    },
  },
];

/**
 * True only where a pinned horizontal scroll makes sense: a wide viewport
 * with a real pointer, and no reduced-motion preference. Everywhere else
 * the three steps stack, which is the whole fallback.
 */
function useHorizontalMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const queries = [
      window.matchMedia("(min-width: 1024px)"),
      window.matchMedia("(hover: hover) and (pointer: fine)"),
      window.matchMedia("(prefers-reduced-motion: no-preference)"),
    ];
    const update = () => setEnabled(queries.every((q) => q.matches));
    update();
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  return enabled;
}

function StepPanel({
  step,
  index,
  horizontal,
}: {
  step: (typeof steps)[number];
  index: number;
  horizontal: boolean;
}) {
  const { icon: Icon, title, text, accent } = step;

  return (
    <article
      className={`panel relative flex flex-col justify-center overflow-hidden rounded-card shadow-block before:absolute before:inset-y-0 before:left-0 before:w-2.5 ${
        accent.edge
      } ${
        horizontal
          ? // Sized so the full paragraph sits at a comfortable reading
            // measure without ever being scrolled or clipped.
            "h-[clamp(24rem,62vh,34rem)] w-[var(--panel-w)] shrink-0 px-14 py-12"
          : "p-8"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-6 right-4 font-display text-[8rem] font-bold leading-none opacity-12 ${accent.number}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={`relative flex items-center justify-center rounded-pill ${accent.chip} ${
          horizontal ? "h-14 w-14" : "h-11 w-11"
        }`}
      >
        <Icon size={horizontal ? 24 : 20} />
      </div>

      <h3
        className={`relative mt-6 font-display font-bold text-ink ${
          horizontal ? "text-3xl sm:text-4xl" : "text-xl"
        }`}
      >
        {title}
      </h3>

      <p
        className={`relative mt-5 max-w-[52ch] text-ink-soft ${
          horizontal ? "text-lg leading-relaxed sm:text-xl" : "text-sm leading-relaxed"
        }`}
      >
        {text}
      </p>
    </article>
  );
}

export default function HowItWorks() {
  const horizontal = useHorizontalMode();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Lenis drives the scroll position, so ScrollTrigger has to be told to
  // re-read it on every Lenis frame or the pin lags behind the content.
  useLenis(() => ScrollTrigger.update());

  useGSAP(
    () => {
      if (!horizontal || !trackRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>(".panel", trackRef.current);
      if (panels.length === 0) return;

      // Travel exactly one panel-step per panel, so each one comes to rest
      // dead centre in the viewport rather than drifting to an arbitrary
      // stop — that's what makes it read as "one box at a time".
      const step = () =>
        panels.length > 1 ? panels[1].offsetLeft - panels[0].offsetLeft : 0;

      // Explicit holds between moves. A plain scrub spends more scroll in
      // transit than at rest, which is exactly how a paragraph slides past
      // before it can be read; DWELL buys each panel a still moment.
      const MOVE = 1;
      const DWELL = 0.6;
      const units = (panels.length - 1) * (MOVE + DWELL) + DWELL;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          pin: true,
          scrub: 0.6,
          end: () => `+=${units * window.innerHeight * 0.8}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to({}, { duration: DWELL });
        tl.to(panels, {
          x: () => -step() * i,
          duration: MOVE,
          ease: "none",
        });
        // Slight entrance so the incoming panel arrives rather than slides.
        tl.fromTo(
          panel,
          { opacity: 0.4, scale: 0.94 },
          { opacity: 1, scale: 1, duration: MOVE, ease: "none" },
          "<"
        );
        // …and the outgoing one recedes, so only one panel is ever at full
        // strength. Without this the three read as equally present, which
        // is the continuous-carousel feel we're avoiding.
        tl.to(
          panels[i - 1],
          { opacity: 0.4, scale: 0.94, duration: MOVE, ease: "none" },
          "<"
        );
      });

      tl.to({}, { duration: DWELL });
    },
    { scope: rootRef, dependencies: [horizontal], revertOnUpdate: true }
  );

  return (
    // O bloco de verde folha. Um campo de cor inteiro em que os três painéis
    // de papel deslizam — a cor é a seção, não um detalhe dentro dela. Só a
    // manchete pousa direto no verde, em areia (4.51 AA).
    <section
      id="como-funciona"
      ref={rootRef}
      data-nav-theme="dark"
      className={
        horizontal
          ? "relative scroll-mt-24 overflow-hidden bg-signal"
          : "relative scroll-mt-24 bg-signal"
      }
    >
      <div
        className={
          horizontal
            ? "relative z-10 flex h-screen flex-col justify-center"
            : "relative z-10 mx-auto max-w-6xl px-6 py-28"
        }
        style={
          horizontal
            ? ({ "--panel-w": "min(46rem, 78vw)" } as React.CSSProperties)
            : undefined
        }
      >
        <AnimatedSection
          className={
            horizontal
              ? "mx-auto max-w-2xl px-6 text-center"
              : "mx-auto max-w-2xl text-center"
          }
        >
          <h2 className="font-display text-4xl font-bold text-on-signal sm:text-5xl">
            Como{" "}
            <span className="rounded-panel bg-surface px-3 pb-1 text-ink">
              funciona
            </span>
          </h2>
        </AnimatedSection>

        {horizontal ? (
          <div
            ref={trackRef}
            className="mt-12 flex gap-10"
            style={{
              // Half the leftover viewport on each side, so panel 1 starts
              // centred and panel 3 ends centred.
              paddingLeft: "calc((100vw - var(--panel-w)) / 2)",
              paddingRight: "calc((100vw - var(--panel-w)) / 2)",
            }}
          >
            {steps.map((step, i) => (
              <StepPanel key={step.title} step={step} index={i} horizontal />
            ))}
          </div>
        ) : (
          <Stagger className="mt-16 grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <StaggerItem key={step.title} className="h-full">
                <StepPanel step={step} index={i} horizontal={false} />
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}

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
    /**
     * Um acento por painel — a marca de seção de uma revista, que muda de
     * caderno para caderno. Cada um é tinta sobre papel (todos ≥ 6,6:1),
     * nunca preenchimento colorido.
     */
    accent: {
      chip: "border-signal-deep text-signal-deep",
      number: "text-signal-deep",
      edge: "border-t-signal-deep",
    },
  },
  {
    icon: Search,
    title: "Descubra os detalhes",
    text: "Clique em \"Mais informações\" e mergulhe nos detalhes de cada programa: o que o estagiário realmente faz no dia a dia, qual a duração, quais são os benefícios, quais áreas estão disponíveis e quais são os pré-requisitos. Nada de descrições genéricas — aqui você encontra o que precisa saber para tomar uma decisão informada.",
    accent: {
      chip: "border-accent-deep text-accent-deep",
      number: "text-accent-deep",
      edge: "border-t-accent-deep",
    },
  },
  {
    icon: MousePointerClick,
    title: "Candidate-se",
    text: "Encontrou o programa ideal? Clique em \"Aplicar\" e vá direto para o formulário de inscrição no site oficial da empresa. A Pratka não é intermediária — somos o atalho. Você se candidata diretamente, sem burocracia adicional, sem criar mais uma conta em mais uma plataforma.",
    accent: {
      chip: "border-support text-support",
      number: "text-support",
      edge: "border-t-support",
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
    // Capítulo do dossiê: régua grossa colorida no topo (a marca de seção),
    // numeral de índice na régua, fio fino fechando os outros três lados.
    // A antiga barra vertical e a sombra saíram — papel não levita.
    <article
      className={`panel relative flex flex-col justify-center border-t-2 bg-surface-2 ${accent.edge} ${
        horizontal
          ? // Sized so the full paragraph sits at a comfortable reading
            // measure without ever being scrolled or clipped.
            "h-[clamp(24rem,62vh,34rem)] w-[var(--panel-w)] shrink-0 px-12 py-12"
          : "p-8"
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`index-numeral shrink-0 text-[0.8125rem] ${accent.number}`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        <div
          className={`flex shrink-0 items-center justify-center rounded-control border ${accent.chip} ${
            horizontal ? "h-11 w-11" : "h-9 w-9"
          }`}
        >
          <Icon size={horizontal ? 20 : 17} aria-hidden="true" />
        </div>
      </div>

      <h3
        className={`mt-7 font-display font-semibold leading-tight tracking-tight text-ink ${
          horizontal ? "text-3xl sm:text-[2.5rem]" : "text-2xl"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-5 max-w-[56ch] text-ink-2 ${
          horizontal ? "text-lg leading-relaxed" : "text-[0.9375rem] leading-relaxed"
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
    <section
      id="como-funciona"
      ref={rootRef}
      className={horizontal ? "scroll-mt-24 overflow-hidden" : "scroll-mt-24"}
    >
      <div
        className={
          horizontal
            ? "flex h-screen flex-col justify-center"
            : "mx-auto max-w-6xl px-6 py-24"
        }
        style={
          horizontal
            ? ({ "--panel-w": "min(46rem, 78vw)" } as React.CSSProperties)
            : undefined
        }
      >
        {/* Abertura de caderno: régua grossa, manchete à esquerda. O mesmo
            gesto se repete em toda seção do documento. */}
        <AnimatedSection
          className={
            horizontal
              ? "mx-auto w-full max-w-7xl px-6"
              : "mx-auto w-full max-w-6xl"
          }
        >
          <h2 className="rule-section pt-6 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
            Como <span className="text-accent-emphasis italic">funciona</span>
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
          <Stagger className="mt-14 grid gap-10 sm:grid-cols-3">
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

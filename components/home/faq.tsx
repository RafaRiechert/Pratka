"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import AnimatedSection, {
  Stagger,
  StaggerItem,
} from "@/components/ui/animated-section";
import { duration, ease, springPop, springSoft } from "@/lib/motion";

/**
 * PLACEHOLDER COPY — flagged for review.
 *
 * Every answer below is derived from a claim the site already makes (the
 * Solução section, the company data, the audience filter) rather than
 * invented, but the questions themselves are my guess at what a student
 * would ask. They should be replaced with questions people actually send.
 */
const faqs = [
  {
    q: "O que é um summer internship?",
    a: "É um estágio de férias, curto e intensivo, que acontece durante o verão. Os programas listados aqui duram de algumas semanas a alguns meses e são a porta de entrada de muitas empresas para os seus programas de trainee e efetivação.",
  },
  {
    q: "Preciso estudar fora do Brasil para me candidatar?",
    a: "Não. Alguns programas são voltados para brasileiros em universidades no exterior e outros para universitários no Brasil — o filtro de público mostra quais são quais, e cada card diz para quem o programa é.",
  },
  {
    q: "A Pratka cobra alguma coisa?",
    a: "Não. A Pratka é gratuita para estudantes. Não cobramos nada para você ver os programas nem para se candidatar.",
  },
  {
    q: "Preciso criar uma conta para me candidatar?",
    a: "Não. O botão \"Aplicar\" leva direto para o formulário oficial da empresa. Sem cadastro obrigatório, sem intermediário — a Pratka é o atalho, não mais uma plataforma entre você e a vaga.",
  },
  {
    q: "A Pratka participa do processo seletivo?",
    a: "Não. Não temos processo seletivo próprio e não interferimos na seleção das empresas. Reunimos as oportunidades, explicamos o que cada uma envolve e mandamos você direto para a fonte.",
  },
  {
    q: "Como sei se as informações estão atualizadas?",
    a: "Cada programa é verificado pela nossa equipe antes de entrar na lista, e revisamos os links a cada temporada. Se encontrar algo desatualizado ou uma empresa que falta, nos avise — a lista cresce assim.",
  },
];

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div
      className={`overflow-hidden rounded-card border-2 transition-colors duration-300 ${
        open
          ? "border-accent bg-surface-2"
          : "border-line bg-surface-2 hover:border-line-strong"
      }`}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="focus-ring flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-display text-lg font-bold text-ink sm:text-xl">
            {q}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={springPop}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-pill transition-colors duration-300 ${
              open ? "bg-accent text-ink" : "bg-ink/10 text-ink-soft"
            }`}
          >
            <Plus size={17} />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: springSoft,
              opacity: { duration: duration.fast, ease: ease.soft },
            }}
          >
            <p className="px-6 pb-6 text-base leading-relaxed text-ink-soft">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28">
      <AnimatedSection className="text-center">
        <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Perguntas frequentes
        </h2>
        <span
          aria-hidden="true"
          className="mx-auto mt-6 block h-1.5 w-20 rounded-pill bg-accent"
        />
      </AnimatedSection>

      <Stagger className="mt-12 space-y-3">
        {faqs.map((faq) => (
          <StaggerItem key={faq.q}>
            <FaqRow {...faq} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

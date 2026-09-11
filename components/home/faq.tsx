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
    // Linha de índice, não cartão: o fio embaixo é a única moldura, e o
    // estado aberto se marca com a folha de encarte por trás do bloco.
    <div
      className={`overflow-hidden border-b border-line transition-colors duration-300 ${
        open ? "bg-surface-3" : "hover:bg-surface-2"
      }`}
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="focus-ring flex w-full items-center justify-between gap-6 px-4 py-5 text-left sm:px-6"
        >
          <span className="font-display text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
            {q}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={springPop}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-tag border transition-colors duration-300 ${
              open ? "border-ink bg-inverse text-on-inverse" : "border-line-strong text-ink-soft"
            }`}
          >
            <Plus size={15} />
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
            <p className="max-w-[68ch] px-4 pb-6 text-base leading-relaxed text-ink-2 sm:px-6">
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
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-24">
      <AnimatedSection>
        <h2 className="rule-section pt-6 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
          Perguntas frequentes
        </h2>
      </AnimatedSection>

      <Stagger className="mt-12 border-t-2 border-ink">
        {faqs.map((faq) => (
          <StaggerItem key={faq.q}>
            <FaqRow {...faq} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

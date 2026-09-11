"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, MapPin } from "lucide-react";
import { areaProgrammes, type AreaProgrammes } from "@/lib/area-programmes";
import AnimatedSection from "@/components/ui/animated-section";
import { useSectorFilter } from "@/components/home/sector-filter-context";
import { duration, ease, springPop, stagger } from "@/lib/motion";

/**
 * Discovery through hover, adapted from the reference's genre hover.
 *
 * Hovering an área lifts its label into the accent colour, writes its
 * personality line beside it in the script face, and floats in the
 * programmes that match. Activating it drives the listing's own sector
 * filter and travels back up to the (now filtered) list.
 *
 * Where faithful-to-Aardvark and sober-for-a-careers-product disagreed:
 *
 *   - The floating cards are anchored to the row rather than chasing the
 *     cursor. Keyboard focus then produces exactly the same reveal, which a
 *     cursor-tethered panel can never do.
 *   - On coarse pointers nothing hides behind hover: every personality line
 *     is permanently visible, and a tap does what a click does.
 */

function useFinePointer() {
  // Starts false so SSR and the first client render agree, then upgrades.
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(query.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return fine;
}

function FloatingProgrammes({
  area,
  reduced,
}: {
  area: AreaProgrammes;
  reduced: boolean;
}) {
  return (
    <motion.ul
      // Decorative: the same programmes are a click away in the listing
      // above, and the button already says where it goes.
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 right-0 z-20 hidden w-72 -translate-y-1/2 space-y-2 lg:block"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={{ duration: duration.fast, ease: ease.soft }}
    >
      {area.matches.slice(0, 3).map((company, i) => (
        <motion.li
          key={company.id}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springPop, delay: reduced ? 0 : i * stagger.tight }}
          className="border border-line-strong border-t-2 border-t-ink bg-surface-2 p-4"
        >
          <p className="font-display text-[0.9375rem] font-semibold leading-snug tracking-tight text-ink">
            {company.name}
          </p>
          <p className="mt-2 flex items-center gap-1.5 font-mono text-[0.6875rem] text-ink-soft">
            <MapPin size={11} aria-hidden="true" />
            {company.cities.join(", ")}
          </p>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function AreaRow({
  area,
  finePointer,
  reduced,
  index,
  active,
  onActivate,
  onHoverChange,
}: {
  area: AreaProgrammes;
  finePointer: boolean;
  reduced: boolean;
  /** Posição na lista — vira o numeral de índice do sumário. */
  index: number;
  active: boolean;
  onActivate: () => void;
  onHoverChange: (hovering: boolean) => void;
}) {
  const showPitch = !finePointer || active;

  const label = (
    <span className="relative z-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      {/* Numeral de sumário: decorativo, então fica fora da árvore de
          acessibilidade — a ordem já é dada pela própria lista. */}
      <span
        aria-hidden="true"
        className={`index-numeral w-7 shrink-0 self-center transition-colors duration-300 ${
          active ? "text-accent-deep" : "text-ink-soft"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <span
        className={`font-display text-2xl font-semibold tracking-tight transition-colors duration-300 sm:text-[1.75rem] ${
          active ? "text-accent-deep" : "text-ink"
        }`}
      >
        {area.info.name}
      </span>

      {/* A linha de personalidade. Era a voz manuscrita (Caveat); no dossiê
          é o itálico da serifada — o mesmo aparte editorial que o herói usa,
          e permanentemente visível onde hover não existe. */}
      <AnimatePresence initial={false}>
        {showPitch && (
          <motion.span
            key="pitch"
            initial={reduced || !finePointer ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: duration.fast, ease: ease.soft }}
            className="font-editorial text-lg italic leading-snug text-accent-deep sm:text-xl"
          >
            {area.pitch}
          </motion.span>
        )}
      </AnimatePresence>

      {!area.interactive && (
        <span className="label-meta rounded-tag border border-line-strong px-2 py-[0.3rem] text-ink-soft">
          Em breve
        </span>
      )}
    </span>
  );

  // Áreas with nothing to filter stay static text: a focusable control that
  // does nothing is worse for keyboard users than no control at all.
  if (!area.interactive) {
    return (
      <li className="border-b border-line">
        <div className="min-w-0 py-5 opacity-70 lg:pr-[20rem]">{label}</div>
      </li>
    );
  }

  return (
    <li className="relative border-b border-line">
      <button
        type="button"
        onClick={onActivate}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onFocus={() => onHoverChange(true)}
        onBlur={() => onHoverChange(false)}
        aria-label={`Ver programas de ${area.info.name} na lista`}
        className="focus-ring group flex w-full min-w-0 items-center justify-between gap-4 py-5 text-left lg:pr-[20rem]"
      >
        {label}
        <ArrowUp
          size={20}
          aria-hidden="true"
          className={`pop-nudge relative z-10 shrink-0 transition-colors duration-300 ${
            active ? "text-accent-deep" : "text-ink-soft"
          }`}
        />
      </button>

      <AnimatePresence>
        {active && finePointer && (
          <FloatingProgrammes area={area} reduced={reduced} />
        )}
      </AnimatePresence>
    </li>
  );
}

export default function AreaDiscovery() {
  const finePointer = useFinePointer();
  const reduced = useReducedMotion() ?? false;
  const { selectSectorAndReveal } = useSectorFilter();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="areas" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <AnimatedSection>
        <h2 className="rule-section pt-6 font-display text-[clamp(2.25rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
          Descubra por área
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
          Doze áreas do mercado, os programas que combinam com cada uma.
        </p>
      </AnimatedSection>

      <ul className="mt-12 min-w-0 border-t-2 border-ink">
        {areaProgrammes.map((area, i) => (
          <AreaRow
            key={area.code}
            area={area}
            index={i}
            finePointer={finePointer}
            reduced={reduced}
            active={hovered === area.code}
            onHoverChange={(hovering) =>
              setHovered(hovering ? area.code : null)
            }
            onActivate={() => {
              if (area.sector) selectSectorAndReveal(area.sector);
            }}
          />
        ))}
      </ul>
    </section>
  );
}

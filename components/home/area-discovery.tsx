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
          initial={reduced ? false : { opacity: 0, y: 14, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -2 : 2.5 }}
          transition={{ ...springPop, delay: reduced ? 0 : i * stagger.tight }}
          className="rounded-panel border border-ink/8 bg-surface-2 p-4 shadow-card"
        >
          <p className="font-display text-sm font-bold leading-tight text-ink">
            {company.name}
          </p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-soft">
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
  active,
  onActivate,
  onHoverChange,
}: {
  area: AreaProgrammes;
  finePointer: boolean;
  reduced: boolean;
  active: boolean;
  onActivate: () => void;
  onHoverChange: (hovering: boolean) => void;
}) {
  const showPitch = !finePointer || active;

  const label = (
    <span className="relative z-10 flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <span
        className={`font-display text-2xl font-bold transition-colors duration-300 sm:text-3xl ${
          active ? "text-accent-deep" : "text-ink"
        }`}
      >
        {area.info.name}
      </span>

      {/* The personality line in the script face — the one "handwritten"
          moment, and permanently visible where hover doesn't exist. */}
      <AnimatePresence initial={false}>
        {showPitch && (
          <motion.span
            key="pitch"
            initial={reduced || !finePointer ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduced ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: duration.fast, ease: ease.soft }}
            className="font-script text-xl leading-none text-accent-deep sm:text-2xl"
          >
            {area.pitch}
          </motion.span>
        )}
      </AnimatePresence>

      {!area.interactive && (
        <span className="rounded-full bg-ink/8 px-2.5 py-1 text-xs font-semibold text-ink-soft">
          Em breve
        </span>
      )}
    </span>
  );

  // Áreas with nothing to filter stay static text: a focusable control that
  // does nothing is worse for keyboard users than no control at all.
  if (!area.interactive) {
    return (
      <li className="border-b border-ink/10">
        <div className="min-w-0 py-5 opacity-70 lg:pr-[20rem]">{label}</div>
      </li>
    );
  }

  return (
    <li className="relative border-b border-ink/10">
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
    <section id="areas" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-28">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Descubra por área
        </h2>
        <p className="mt-5 text-lg text-ink-soft">
          Doze áreas do mercado, os programas que combinam com cada uma.
        </p>
      </AnimatedSection>

      <ul className="mt-14 min-w-0 border-t border-ink/10">
        {areaProgrammes.map((area) => (
          <AreaRow
            key={area.code}
            area={area}
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

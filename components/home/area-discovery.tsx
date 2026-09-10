"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { areaProgrammes, type AreaProgrammes } from "@/lib/area-programmes";
import AnimatedSection from "@/components/ui/animated-section";
import { duration, ease, springPop, springSoft, stagger } from "@/lib/motion";

/**
 * Discovery through hover — the section adapted from the reference's genre
 * hover. Hovering an área morphs its label into the área's own pitch and
 * floats in the programmes that actually match it.
 *
 * Two deliberate departures from the reference:
 *
 *   - The preview is anchored in its own column rather than following the
 *     cursor. Cursor-chasing panels can't be reached by keyboard and read
 *     as a gimmick to the recruiters and universities judging this page;
 *     an anchored panel gives hover, focus and touch the identical result.
 *   - On coarse pointers there is no hidden state at all: every row shows
 *     its pitch and its matches inline, because hover doesn't exist there.
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

/** Where an área row should take you: its filtered listing, or the quiz. */
function hrefFor(area: AreaProgrammes) {
  return area.info.sector
    ? `/?sector=${encodeURIComponent(area.info.sector)}#empresas`
    : "/quiz";
}

function ProgrammeCard({ company, index }: { company: AreaProgrammes["matches"][number]; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springPop, delay: index * stagger.tight }}
      className="rounded-2xl border border-ink/8 bg-paper p-4 shadow-card"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-base font-bold leading-tight text-ink">
          {company.name}
        </h4>
        <span className="mt-0.5 shrink-0 rounded-full bg-sol px-2 py-0.5 text-[10px] font-semibold text-ink">
          {company.type}
        </span>
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
        <MapPin size={12} aria-hidden="true" />
        {company.cities.join(", ")}
      </p>
    </motion.li>
  );
}

/** Shown for áreas we don't list programmes for yet. Says so, plainly. */
function EmptyPreview() {
  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springPop}
      className="list-none rounded-2xl border border-dashed border-ink/20 bg-cream-deep/40 p-5"
    >
      <p className="text-sm leading-relaxed text-ink-soft">
        Ainda não mapeamos programas dessa área. O quiz te mostra o caminho —
        e a gente inclui novas empresas toda temporada.
      </p>
    </motion.li>
  );
}

export default function AreaDiscovery() {
  const finePointer = useFinePointer();
  // `hovered` drives the row morph, `active` drives the preview. Keeping
  // them separate means the list rests with every name legible while the
  // panel still has something to show before the first hover.
  const [hovered, setHovered] = useState<number | null>(null);
  const active = areaProgrammes[hovered ?? 0];

  return (
    <section id="areas" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-28">
      <AnimatedSection className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
          Descubra por área
        </h2>
        <p className="mt-5 text-lg text-ink-soft">
          Doze áreas do mercado, os programas que combinam com cada uma.
        </p>
      </AnimatedSection>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <ul className="min-w-0 border-t border-ink/10">
          {areaProgrammes.map((area, i) => {
            const isActive = finePointer && i === hovered;

            return (
              <li key={area.code} className="border-b border-ink/10">
                <Link
                  href={hrefFor(area)}
                  className="focus-ring group flex items-center justify-between gap-4 py-5"
                  onMouseEnter={() => setHovered(i)}
                  onFocus={() => setHovered(i)}
                >
                  <span className="min-w-0">
                    {finePointer ? (
                      // The text morph: name and pitch ride the same rail,
                      // one clipped box, so the label swaps rather than
                      // pushing the row's height around.
                      <span className="relative block h-9 overflow-hidden sm:h-11">
                        <motion.span
                          className="block"
                          animate={{ y: isActive ? "-100%" : "0%" }}
                          transition={{ duration: duration.base, ease: ease.soft }}
                        >
                          <span className="block truncate font-display text-2xl font-bold leading-9 text-ink sm:text-3xl sm:leading-11">
                            {area.info.name}
                          </span>
                          <span className="block truncate text-base leading-9 text-tangerine-deep sm:leading-11">
                            {area.pitch}
                          </span>
                        </motion.span>
                      </span>
                    ) : (
                      <>
                        <span className="block font-display text-2xl font-bold text-ink">
                          {area.info.name}
                        </span>
                        <span className="mt-1 block text-sm text-ink-soft">
                          {area.pitch}
                        </span>
                        <span className="mt-2 block text-xs font-semibold text-tangerine-deep">
                          {area.matches.length > 0
                            ? `${area.matches.length} ${
                                area.matches.length === 1
                                  ? "programa"
                                  : "programas"
                              }`
                            : "Faça o quiz"}
                        </span>
                      </>
                    )}
                  </span>

                  <ArrowUpRight
                    size={20}
                    aria-hidden="true"
                    className="pop-nudge shrink-0 text-ink-soft group-hover:text-tangerine-deep"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Anchored preview. Desktop only — the coarse-pointer rows above
            already carry the same information inline. */}
        {finePointer && (
          <div className="hidden min-w-0 lg:block">
            <div className="sticky top-28">
              <motion.p
                key={`${active.code}-label`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.fast, ease: ease.soft }}
                className="flex items-center gap-2 text-sm font-semibold text-ink-soft"
              >
                <Sparkles size={14} className="text-tangerine-deep" aria-hidden="true" />
                {active.matches.length > 0
                  ? `${active.matches.length} ${
                      active.matches.length === 1 ? "programa" : "programas"
                    } em ${active.info.sector ?? active.info.name}`
                  : active.info.name}
              </motion.p>

              {/*
                A keyed remount rather than AnimatePresence. Exit-based swaps
                stalled here: per-card exits orphaned old cards in the panel,
                and mode="wait" never mounted the incoming group at all, so
                the preview froze on whichever área happened to be first.
                Changing the key re-mounts the list and the enter animation
                carries the swap — no exit to get stuck on.
              */}
              <motion.ul
                key={active.code}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springSoft}
                className="mt-4 space-y-3"
              >
                {active.matches.length > 0 ? (
                  active.matches.slice(0, 3).map((company, i) => (
                    <ProgrammeCard key={company.id} company={company} index={i} />
                  ))
                ) : (
                  <EmptyPreview />
                )}
              </motion.ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

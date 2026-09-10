"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { companies } from "@/lib/companies";
import { springPop, stagger } from "@/lib/motion";

/**
 * The hero object: a fanned stack of real programmes from lib/companies.
 * On-brand because it *is* the product — no abstract 3D prop standing in
 * for something we'd rather show.
 *
 * It assembles on mount and the fan opens as you scroll, each card moving
 * at its own rate so the stack has depth. Under reduced motion the scroll
 * work is skipped entirely and the stack renders in its resting position.
 */

/**
 * Resting fan, back to front. The offsets have to clear the card's own
 * footprint or the three just pile up in one spot — each step down the
 * stack moves a full ~72px and tilts further, so every card keeps a
 * readable edge.
 */
const LAYOUT = [
  { rotate: -8, x: -34, y: -104, scale: 0.9, drift: 64 },
  { rotate: 5, x: 30, y: 0, scale: 0.95, drift: 32 },
  { rotate: -2, x: -12, y: 104, scale: 1, drift: 0 },
];

function Card({
  company,
  index,
  progress,
  reduced,
}: {
  company: (typeof companies)[number];
  index: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const layout = LAYOUT[index];

  // Cards further back travel further as you scroll: the fan opens. The
  // resting offset is folded into the scroll range rather than set through
  // `animate`, because a `style` motion value and an `animate` target for
  // the same axis fight each other and the motion value always wins.
  const y = useTransform(progress, [0, 1], [layout.y, layout.y - layout.drift]);
  const rotate = useTransform(progress, [0, 1], [layout.rotate, layout.rotate * 1.7]);

  return (
    <motion.div
      className="absolute inset-x-0 top-1/2 mx-auto -mt-26 w-[min(92%,20rem)]"
      style={{
        zIndex: index,
        y: reduced ? layout.y : y,
        rotate: reduced ? layout.rotate : rotate,
        x: layout.x,
        scale: layout.scale,
      }}
    >
      {/* Entrance lives on its own element so it never collides with the
          scroll transform above. */}
      <motion.div
        className="flex h-52 flex-col rounded-3xl border border-ink/8 bg-paper p-6 shadow-card"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springPop, delay: 0.25 + index * stagger.loose }}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-display text-lg font-bold leading-tight text-ink">
            {company.name}
          </h3>
          <span className="mt-0.5 shrink-0 rounded-full bg-sol px-2.5 py-1 text-[11px] font-semibold text-ink">
            {company.type}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {company.shortDescription}
        </p>

        <div className="mt-auto flex items-center gap-1.5 text-xs text-ink-soft">
          <MapPin size={13} aria-hidden="true" />
          {company.cities.join(", ")}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroCardStack() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Smooth the raw scroll value so the fan drifts rather than tracks.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.7,
  });

  const featured = companies.slice(0, LAYOUT.length);

  return (
    <div
      ref={ref}
      // Decorative duplicate of the listing below — the real, linkable
      // programmes live in #empresas, so this doesn't repeat them to AT.
      aria-hidden="true"
      className="relative mx-auto h-[22rem] w-full max-w-md scale-[0.82] sm:h-[30rem] sm:scale-100"
    >
      {featured.map((company, i) => (
        <Card
          key={company.id}
          company={company}
          index={i}
          progress={progress}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

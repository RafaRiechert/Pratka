import type { Transition, Variants } from "framer-motion";

/**
 * Motion tokens — the whole site's movement comes from this small set, so
 * everything feels like one hand made it. Mirrors the CSS custom properties
 * in globals.css (--ease-pop, --dur-*); change a value here and there.
 *
 * Rule of thumb borrowed from the reference: confident but quick. Anything a
 * user is waiting on stays under ~400ms; only decorative reveals go slower.
 */

/** Ear-popping overshoot. Buttons, pills, anything that should feel springy. */
export const springPop: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 16,
  mass: 0.6,
};

/** Settles without overshoot. Panels, accordions, anything containing text. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

/** Slower, heavier — for large blocks entering on scroll. */
export const springReveal: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 22,
  mass: 1,
};

export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.62,
} as const;

/** Matches --ease-pop / --ease-soft in globals.css. */
export const ease = {
  pop: [0.34, 1.56, 0.64, 1],
  soft: [0.22, 1, 0.36, 1],
} as const;

/** How far things travel when they reveal. Kept small — drift, not flight. */
export const revealDistance = {
  sm: 16,
  md: 28,
  lg: 44,
} as const;

export const stagger = {
  tight: 0.05,
  base: 0.08,
  loose: 0.14,
} as const;

/** Shared viewport config so every section triggers at the same point. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: revealDistance.md },
  show: { opacity: 1, y: 0, transition: springReveal },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger.base } },
};

/**
 * Hover/tap feedback for interactive surfaces. Applied through Framer only
 * where a real pointer exists — on touch, `whileHover` never fires and
 * `whileTap` carries the feedback instead.
 */
export const hoverPop = {
  whileHover: { scale: 1.03, y: -2 },
  whileTap: { scale: 0.97 },
  transition: springPop,
} as const;

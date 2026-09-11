"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Matches the IntersectionObserver margin below: start counting off-screen. */
const PRELOAD_PX = 200;

/**
 * Counts up to a number — as an enhancement, never as the source of truth.
 *
 * The state starts at the real value, so that is what the server renders,
 * what someone with JS disabled reads, and what stays on screen if the
 * observer never fires (a hidden tab delivers no IntersectionObserver
 * callbacks at all). The old version started at 0 and only ever left 0 when
 * the observer fired, which is how "0+ empresas mapeadas" reached the page.
 *
 * The reset to 0 happens before the first paint when the element is already
 * on screen, and 200px early otherwise, so the digits are never seen
 * jumping backwards.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: `${PRELOAD_PX}px` });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  // Flips false→true exactly once, then never changes. Arming is kept apart
  // from running so the tween effect stays idempotent: a remount (React
  // StrictMode does one in development) re-runs it from the top instead of
  // being locked out by a ref that survived the unmount — which is how the
  // counter got stuck reading 0.
  const [armed, setArmed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (armed || reduceMotion || value === 0) return;

    const el = ref.current;
    if (!el) return;

    // The observer only reports after a paint, so on the first pass ask the
    // element directly — that keeps the reset to 0 ahead of the first frame.
    const rect = el.getBoundingClientRect();
    const onScreen =
      rect.top < window.innerHeight + PRELOAD_PX && rect.bottom > -PRELOAD_PX;

    if (onScreen || isInView) setArmed(true);
  }, [armed, isInView, reduceMotion, value]);

  useIsomorphicLayoutEffect(() => {
    if (!armed || reduceMotion || value === 0) return;

    setDisplay(0);

    // A plain rAF tween rather than framer's animate(): the library call
    // never fired onUpdate here, and a counter that silently stays on 0 is
    // the exact failure this component exists to prevent. Ten lines we can
    // reason about beat a black box for a number users are asked to trust.
    const startedAt = performance.now();
    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - startedAt) / (duration * 1000), 1);
      setDisplay(Math.round(easeOutExpo(t) * value));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [armed, value, duration, reduceMotion]);

  const finalLabel = `${value.toLocaleString("pt-BR")}${suffix}`;

  return (
    // The animated digits are decorative; assistive tech reads the real value.
    <span ref={ref} aria-label={finalLabel}>
      <span aria-hidden="true">
        {display.toLocaleString("pt-BR")}
        {suffix}
      </span>
    </span>
  );
}

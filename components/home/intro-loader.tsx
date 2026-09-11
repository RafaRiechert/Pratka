"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { duration, ease } from "@/lib/motion";

const SPLASH_KEY = "pratka_splash_shown";
/** Wordmark settles, holds a beat, then the curtain leaves. Total < 1.2s. */
const HOLD_MS = 760;

/**
 * Branded intro. Four things make it safe to ship:
 *
 * 1. It's an *overlay*, not a gate. The hero renders underneath from the
 *    first frame, so the LCP element paints on schedule and the page is
 *    already there the instant the curtain lifts. (The previous splash
 *    gated the whole page mount, which is why a slow exit left a blank
 *    page behind it.)
 * 2. It's portalled to <body>. app/template.tsx wraps every page in an
 *    animated div, and a transformed ancestor becomes the containing block
 *    for position:fixed — inline, the curtain was clipped to the page box
 *    and sat under the header instead of covering the viewport.
 * 3. Once per session, and it starts hidden, so a returning visitor never
 *    sees a flash of it while we read sessionStorage.
 * 4. Under reduced motion it never mounts at all.
 */
export default function IntroLoader() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;
    if (sessionStorage.getItem(SPLASH_KEY)) return;

    setVisible(true);

    // The "already seen it" flag is written when the intro *finishes*, not
    // when it starts. Writing it up front makes the effect non-idempotent:
    // StrictMode's double-invoke (and any remount) sees the flag on the
    // second run, bails out, and the loader never plays.
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SPLASH_KEY, "1");
      setVisible(false);
    }, HOLD_MS);

    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          // Decorative: the hero underneath is the real content, and a
          // screen reader should never be held behind a curtain.
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-inverse"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: duration.slow, ease: ease.soft }}
        >
          <motion.span
            className="font-display text-6xl font-semibold tracking-tight text-on-inverse sm:text-8xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.base, ease: ease.soft }}
          >
            Pratka
            <motion.span
              className="text-signal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: duration.fast }}
            >
              .
            </motion.span>
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

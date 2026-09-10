"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { duration, ease, revealDistance } from "@/lib/motion";

/**
 * Route transition. Next's App Router remounts this on every navigation,
 * which is why the outgoing page can't be animated from here — it has
 * already unmounted. That's fine for the goal: client-side navigation keeps
 * the old page painted until the new one is ready, so there is no white
 * flash to cover, and a quick enter is all this needs.
 *
 * Note for anything rendered inside a page: while this animation runs, the
 * wrapper carries a transform, and a transformed ancestor becomes the
 * containing block for `position: fixed`. Full-screen overlays belong in a
 * portal (see components/home/intro-loader.tsx).
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: revealDistance.sm }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: duration.base, ease: ease.soft }}
    >
      {children}
    </motion.div>
  );
}

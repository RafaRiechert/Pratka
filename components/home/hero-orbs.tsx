"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function HeroOrbs() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!isFinePointer || prefersReducedMotion) return;

    setEnabled(true);
    const handler = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-grid animate-grid-drift pointer-events-none absolute inset-0 overflow-hidden opacity-70"
    >
      {enabled && (
        <motion.div
          className="pointer-events-none absolute left-0 top-0 h-10 w-10"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        >
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-signal/50" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-signal/50" />
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
        </motion.div>
      )}
    </div>
  );
}

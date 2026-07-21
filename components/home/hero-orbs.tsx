"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroOrbs() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const x1 = useTransform(sx, (v) => v * 30);
  const y1 = useTransform(sy, (v) => v * 30);
  const x2 = useTransform(sx, (v) => v * -20);
  const y2 = useTransform(sy, (v) => v * -20);
  const x3 = useTransform(sx, (v) => v * 15);
  const y3 = useTransform(sy, (v) => v * -15);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const handler = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mx, my]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        style={{ x: x1, y: y1 }}
        className="absolute -top-32 -left-20 h-[460px] w-[460px] rounded-full bg-tangerine/30 blur-[110px] animate-float-slow"
      />
      <motion.div
        style={{ x: x2, y: y2 }}
        className="absolute top-10 right-[-140px] h-[380px] w-[380px] rounded-full bg-gold/30 blur-[120px] animate-float-slower"
      />
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute bottom-[-200px] left-1/4 h-[500px] w-[500px] rounded-full bg-coral/25 blur-[130px] animate-float-slow"
      />
    </div>
  );
}

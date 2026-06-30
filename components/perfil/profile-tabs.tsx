"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
}

export default function ProfileTabs({
  tabs,
  active,
  onChange,
  layoutId,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (id: string) => void;
  layoutId: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap gap-1 border-b border-white/10">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={cn(
            "relative px-4 py-3 text-sm font-medium transition-colors",
            active === t.id
              ? "text-lime"
              : "text-offwhite/55 hover:text-offwhite"
          )}
        >
          {t.label}
          {active === t.id && (
            <motion.div
              layoutId={layoutId}
              className="absolute inset-x-0 -bottom-px h-0.5 bg-lime"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

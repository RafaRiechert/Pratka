"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";

export interface ToastState {
  message: string;
  id: number;
}

export default function Toast({
  toast,
  onClose,
}: {
  toast: ToastState | null;
  onClose: () => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="glass pointer-events-auto flex max-w-md items-start gap-3 rounded-2xl px-5 py-4 shadow-card"
          >
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-lime" />
            <p className="text-sm text-offwhite/90">{toast.message}</p>
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="ml-1 shrink-0 text-offwhite/40 hover:text-offwhite"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  loading,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy-deep/80 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCancel}
        >
          <motion.div
            className="glass w-full max-w-sm rounded-2xl p-7 shadow-card"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-danger/15 text-danger">
              <AlertTriangle size={20} />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-offwhite">
              {title}
            </h3>
            <p className="mt-2 text-sm text-offwhite/65">{description}</p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onCancel}>
                Cancelar
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                disabled={loading}
                onClick={onConfirm}
              >
                {loading ? "Aguarde..." : confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

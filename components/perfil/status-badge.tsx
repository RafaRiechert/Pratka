import type { ApplicationStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<ApplicationStatus, { label: string; className: string }> = {
  enviada: { label: "Enviada", className: "bg-purple/20 text-purple-soft" },
  em_analise: { label: "Em análise", className: "bg-lime/15 text-lime" },
  nao_selecionado: { label: "Não selecionado", className: "bg-danger/15 text-danger" },
  programa_encerrado: {
    label: "Programa encerrado",
    className: "bg-white/10 text-offwhite/50",
  },
};

export default function StatusBadge({ status }: { status: ApplicationStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

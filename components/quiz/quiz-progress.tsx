import { motion } from "framer-motion";

export default function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = (current / total) * 100;

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="label-meta flex items-center justify-between text-ink-soft">
        <span>Pergunta {current} de {total}</span>
        <span className="text-accent-deep">{Math.round(percent)}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden border border-line bg-surface-inset">
        <motion.div
          className="h-full bg-accent-deep"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

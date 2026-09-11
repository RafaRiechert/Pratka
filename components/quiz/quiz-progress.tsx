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
      <div className="label-meta flex items-baseline justify-between text-ink-soft">
        <span>Pergunta <span className="font-mono tabular-nums text-ink">{current}</span> de <span className="font-mono tabular-nums">{total}</span></span>
        <span className="font-mono tabular-nums text-ink">{Math.round(percent)}%</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden bg-surface-inset">
        <motion.div
          className="h-full bg-ink"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

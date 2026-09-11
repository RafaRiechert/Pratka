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
        <span className="font-mono tabular-nums">{Math.round(percent)}%</span>
      </div>
      <div className="mt-2.5 h-3 w-full overflow-hidden rounded-pill bg-ink/10">
        <motion.div
          className="h-full rounded-pill bg-accent"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

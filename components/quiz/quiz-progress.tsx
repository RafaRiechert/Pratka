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
      <div className="flex items-center justify-between text-sm font-medium text-ink-soft">
        <span>Pergunta {current} de {total}</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10">
        <motion.div
          className="h-full rounded-full bg-tangerine"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}

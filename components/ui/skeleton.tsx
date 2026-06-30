import { cn } from "@/lib/utils";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-navy-card-2/60",
        className
      )}
    >
      <div className="absolute inset-0 shimmer-bg animate-shimmer" />
    </div>
  );
}

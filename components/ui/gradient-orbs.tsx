export default function GradientOrbs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-grid-dark opacity-40 ${className ?? ""}`}
    >
      <span className="absolute left-[12%] top-[20%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 animate-pulse-dot rounded-full bg-signal" />
      <span className="absolute right-[16%] bottom-[24%] h-1.5 w-1.5 translate-x-1/2 translate-y-1/2 animate-pulse-dot rounded-full bg-signal [animation-delay:0.6s]" />
    </div>
  );
}

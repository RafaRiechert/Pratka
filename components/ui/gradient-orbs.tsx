export default function GradientOrbs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-purple/30 blur-[100px] animate-float-slow" />
      <div className="absolute top-1/3 right-[-120px] h-[360px] w-[360px] rounded-full bg-lime/10 blur-[110px] animate-float-slower" />
      <div className="absolute bottom-[-160px] left-1/3 h-[480px] w-[480px] rounded-full bg-purple/20 blur-[120px] animate-float-slow" />
    </div>
  );
}

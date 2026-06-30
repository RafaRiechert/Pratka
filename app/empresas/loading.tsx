import Skeleton from "@/components/ui/skeleton";

export default function EmpresasLoading() {
  return (
    <>
      <div className="relative overflow-hidden bg-mesh py-24 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <Skeleton className="mx-auto h-4 w-32" />
          <Skeleton className="mx-auto mt-4 h-12 w-64" />
          <Skeleton className="mx-auto mt-5 h-5 w-96 max-w-full" />
        </div>
      </div>
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-10 flex gap-3">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </section>
    </>
  );
}

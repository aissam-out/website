import { stats } from "@/lib/site";

export function StatRow() {
  return (
    <div className="grid grid-cols-2 gap-8 border-y border-line py-12 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-display text-5xl italic text-cream md:text-6xl">
            {stat.value}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

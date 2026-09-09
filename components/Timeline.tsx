import { timeline } from "@/lib/site";

export function Timeline() {
  return (
    <ol className="space-y-8">
      {timeline.map((item, index) => (
        <li
          key={item.title}
          className="grid gap-4 border-t border-line pt-8 md:grid-cols-[140px_1fr]"
        >
          <p className="font-display text-2xl italic text-gold">
            {String(index + 1).padStart(2, "0")}
          </p>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {item.period} · {item.place}
            </p>
            <h3 className="mt-2 font-display text-2xl italic text-cream">
              {item.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

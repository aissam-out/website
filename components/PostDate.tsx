import { parsePostDate } from "@/lib/dates";

export function PostDate({
  date,
  variant = "hero",
  className = "",
}: {
  date: string;
  variant?: "hero" | "compact" | "inline";
  className?: string;
}) {
  const value = parsePostDate(date);
  if (!value) return null;

  const day = value.getDate();
  const month = value.toLocaleDateString("en-GB", { month: "long" });
  const monthShort = value.toLocaleDateString("en-GB", { month: "short" });
  const year = value.getFullYear();

  if (variant === "inline") {
    return (
      <time
        dateTime={date}
        className={`tabular-nums text-muted ${className}`.trim()}
      >
        {day} {monthShort} {year}
      </time>
    );
  }

  if (variant === "compact") {
    return (
      <time
        dateTime={date}
        className={`inline-flex items-baseline gap-1.5 ${className}`.trim()}
      >
        <span className="font-display text-lg italic leading-none text-gold">
          {day}
        </span>
        <span className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          {monthShort} {year}
        </span>
      </time>
    );
  }

  return (
    <time
      dateTime={date}
      className={`inline-flex items-stretch gap-3 ${className}`.trim()}
    >
      <span className="flex min-w-[3.25rem] flex-col items-center justify-center rounded-xl border border-line bg-canvas-2 px-2.5 py-2">
        <span className="font-display text-3xl italic leading-none text-cream">
          {day}
        </span>
        <span className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-gold">
          {monthShort}
        </span>
      </span>
      <span className="flex flex-col justify-center">
        <span className="font-display text-xl italic leading-tight text-cream">
          {month}
        </span>
        <span className="mt-0.5 text-xs tracking-[0.12em] text-muted">
          {year}
        </span>
      </span>
    </time>
  );
}

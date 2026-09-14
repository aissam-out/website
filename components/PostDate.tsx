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
      className={`inline-flex items-baseline gap-2 ${className}`.trim()}
    >
      <span className="font-display text-3xl italic leading-none text-cream">
        {day}
      </span>
      <span className="text-sm tracking-[0.04em] text-muted">
        {monthShort} {year}
      </span>
    </time>
  );
}

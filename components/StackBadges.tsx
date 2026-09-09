import { stackGroups } from "@/lib/site";

function iconUrl(slug: string) {
  return `https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/${slug}.svg`;
}

export function StackBadges() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line">
      {stackGroups.map((group, groupIndex) => (
        <section
          key={group.label}
          className={groupIndex > 0 ? "border-t border-line" : ""}
        >
          <div className="flex items-baseline justify-between gap-4 bg-canvas-2 px-5 py-3 sm:px-6">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
              {group.label}
            </p>
            <p className="font-display text-lg italic tabular-nums text-muted">
              {String(group.items.length).padStart(2, "0")}
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {group.items.map((item, index) => (
              <li
                key={item.name}
                className="group relative flex min-h-[7.75rem] flex-col items-center justify-center gap-3 bg-canvas px-3 py-6 text-center transition hover:bg-canvas-2"
              >
                <span
                  aria-hidden
                  className="absolute left-3 top-3 font-display text-xs italic text-muted/45"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={iconUrl(item.icon)}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain opacity-70 brightness-0 transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-110 group-hover:opacity-100 dark:invert"
                  loading="lazy"
                  decoding="async"
                />
                <span className="max-w-[7.5rem] text-[0.68rem] font-medium uppercase leading-snug tracking-[0.14em] text-cream transition group-hover:text-gold">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

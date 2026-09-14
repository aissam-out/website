import { stackCapabilities, stackGroups, stackIntro } from "@/lib/site";

function iconSrc(icon: string) {
  if (icon.startsWith("/") || icon.startsWith("http")) return icon;
  return `https://cdn.simpleicons.org/${icon}`;
}

export function StackBadges() {
  return (
    <div>
      <p className="max-w-3xl text-base leading-relaxed text-muted">
        {stackIntro}
      </p>
      <p className="mt-4 text-[0.7rem] uppercase tracking-[0.18em] text-muted/80">
        {stackCapabilities.join(" · ")}
      </p>

      <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-line">
        {stackGroups.map((group, groupIndex) => (
          <section
            key={group.label}
            className={groupIndex > 0 ? "border-t border-line" : ""}
          >
            <div className="bg-canvas-2 px-5 py-3 sm:px-6">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                {group.label}
              </p>
            </div>

            <ul className="grid grid-cols-2 border-t border-line sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="group flex min-h-[7.75rem] flex-col items-center justify-center gap-3 border-b border-r border-line bg-canvas px-3 py-6 text-center transition hover:bg-canvas-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={iconSrc(item.icon)}
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
    </div>
  );
}

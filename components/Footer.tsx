import Link from "next/link";
import { nav, site } from "@/lib/site";

const socials = [
  { href: site.socials.github, label: "GitHub" },
  { href: site.socials.linkedin, label: "LinkedIn" },
  { href: site.socials.x, label: "X" },
  { href: site.socials.medium, label: "Medium" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-canvas-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-display text-3xl italic text-cream">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {site.tagline}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Writing and work by {site.author}.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Rooms</p>
          <div className="mt-4 flex flex-col gap-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-cream/80 hover:text-gold">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Elsewhere</p>
          <div className="mt-4 flex flex-col gap-2">
            {socials.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-cream/80 hover:text-gold"
              >
                {item.label}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="text-sm text-cream/80 hover:text-gold">
              {site.email}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted md:px-8">
          © {new Date().getFullYear()} {site.author}. Canonical home for notes, essays, and projects.
        </p>
      </div>
    </footer>
  );
}

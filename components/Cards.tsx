import type { ReactNode } from "react";
import Link from "next/link";
import type { Post } from "@/lib/content";

export function SectionHeader({
  eyebrow,
  title,
  emphasis,
  after,
  description,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  emphasis?: string;
  after?: string;
  description?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-gold">{eyebrow}</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl italic leading-[1.05] text-cream md:text-5xl">
          {title}{" "}
          {emphasis ? <em className="gold-em not-italic">{emphasis}</em> : null}
          {after ? ` ${after}` : null}
        </h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {href && cta ? (
        <Link href={href} className="shrink-0 text-sm text-gold hover:underline">
          {cta} →
        </Link>
      ) : null}
    </div>
  );
}

export function RoomCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group min-w-[260px] snap-start rounded-3xl border border-line bg-canvas-2 p-6 transition hover:border-gold/50"
    >
      <p className="text-xs tracking-[0.2em] text-gold">{eyebrow}</p>
      <h3 className="mt-6 font-display text-3xl italic text-cream group-hover:text-gold">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
      <p className="mt-8 text-sm text-gold">Open →</p>
    </Link>
  );
}

export function PostCard({
  post,
  href,
  chip,
}: {
  post: Post;
  href: string;
  chip?: string;
}) {
  const dateLabel = (() => {
    if (!post.date) return null;
    const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(post.date);
    const value = parts
      ? new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]))
      : new Date(post.date);
    if (Number.isNaN(value.getTime())) return null;
    return value.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  })();

  return (
    <Link
      href={href}
      className="group flex min-w-[280px] max-w-sm snap-start flex-col rounded-3xl border border-line bg-canvas-2 p-6 transition hover:border-gold/50"
    >
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-gold">
        <span>{chip ?? post.category ?? post.kind}</span>
        {post.readingTime ? <span>{post.readingTime}</span> : null}
      </div>
      <h3 className="mt-5 font-display text-2xl italic leading-snug text-cream group-hover:text-gold">
        {post.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
        {post.description}
      </p>
      {dateLabel ? (
        <time dateTime={post.date} className="mt-auto pt-6 text-xs font-medium text-cream/70">
          {dateLabel}
        </time>
      ) : null}
    </Link>
  );
}

export function CardRail({ children }: { children: ReactNode }) {
  return (
    <div className="rail -mx-5 flex gap-5 overflow-x-auto px-5 pb-4 snap-x snap-mandatory md:mx-0 md:px-0">
      {children}
    </div>
  );
}

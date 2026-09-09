import Link from "next/link";
import Image from "next/image";
import { PostBody } from "@/lib/mdx";
import { PostCloser } from "@/components/PostCloser";
import { PostDate } from "@/components/PostDate";
import {
  getRelatedPosts,
  getSeriesForPost,
  hrefForPost,
  hrefForSeries,
  type Post,
  type Series,
  type ListingItem,
} from "@/lib/content";
import { formatDateLong } from "@/lib/dates";
import { seriesCopy, site } from "@/lib/site";

export function PostLayout({
  post,
  eyebrow,
  backHref,
  backLabel,
}: {
  post: Post;
  eyebrow: string;
  backHref: string;
  backLabel: string;
}) {
  const series = getSeriesForPost(post);
  const chapterIndex =
    series?.chapters.findIndex((chapter) => chapter.slug === post.slug) ?? -1;
  const prev = chapterIndex > 0 ? series?.chapters[chapterIndex - 1] : undefined;
  const next =
    series && chapterIndex >= 0 && chapterIndex < series.chapters.length - 1
      ? series.chapters[chapterIndex + 1]
      : undefined;

  const resolvedBackHref = series ? hrefForSeries(series) : backHref;
  const resolvedBackLabel = series ? series.title : backLabel;
  const resolvedEyebrow = series
    ? `${series.title} · Part ${post.seriesOrder} of ${series.chapters.length}`
    : eyebrow;

  const related = getRelatedPosts(post, 2).filter(
    (item) => item.slug !== prev?.slug && item.slug !== next?.slug,
  );

  return (
    <article className="mx-auto max-w-3xl px-5 pb-24 pt-16 md:px-8">
      <Link href={resolvedBackHref} className="text-sm text-gold hover:underline">
        ← {resolvedBackLabel}
      </Link>
      {series ? (
        <Link
          href={hrefForSeries(series)}
          className="mt-8 block text-xs uppercase tracking-[0.22em] text-gold hover:underline"
        >
          {resolvedEyebrow}
          {post.readingTime ? ` · ${post.readingTime}` : ""}
        </Link>
      ) : (
        <p className="mt-8 text-xs uppercase tracking-[0.22em] text-gold">
          {resolvedEyebrow}
          {post.readingTime ? ` · ${post.readingTime}` : ""}
        </p>
      )}
      <h1 className="mt-4 font-display text-4xl italic leading-[1.08] text-cream md:text-6xl">
        {post.title}
      </h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-4">
        <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
          {post.date ? <PostDate date={post.date} variant="hero" /> : null}
          {post.sourceUrl ? (
            <a
              href={post.sourceUrl}
              className="mb-1 text-sm text-gold hover:underline"
            >
              Originally on {post.source ?? "Medium"}
            </a>
          ) : null}
        </div>

        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-line bg-canvas-2 py-1.5 pl-1.5 pr-4 transition hover:border-gold/45"
        >
          <Image
            src="/media/aissam.jpeg"
            alt={site.author}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="min-w-0">
            <span className="block text-[0.65rem] uppercase tracking-[0.16em] text-muted">
              Author
            </span>
            <span className="block text-sm font-medium text-cream transition group-hover:text-gold">
              {site.author}
            </span>
          </span>
        </a>
      </div>

      {series ? (
        <nav
          aria-label="Series chapters"
          className="mt-8 flex flex-wrap gap-2 border-y border-line py-4"
        >
          {series.chapters.map((chapter) => {
            const active = chapter.slug === post.slug;
            return (
              <Link
                key={chapter.slug}
                href={hrefForPost(chapter)}
                className={`rounded-full px-3 py-1 text-xs tracking-wide transition ${
                  active
                    ? "bg-gold text-canvas"
                    : "border border-line text-muted hover:border-gold hover:text-gold"
                }`}
              >
                {chapter.seriesOrder}
              </Link>
            );
          })}
        </nav>
      ) : null}

      <div className="mt-10">
        <PostBody source={post.content} />
      </div>

      {series && (prev || next) ? (
        <div className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={hrefForPost(prev)}
              className="rounded-2xl border border-line bg-canvas-2 p-5 transition hover:border-gold/50"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-gold">
                Previous
              </p>
              <p className="mt-2 font-display text-xl italic text-cream">
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={hrefForPost(next)}
              className="rounded-2xl border border-line bg-canvas-2 p-5 text-right transition hover:border-gold/50 sm:justify-self-end"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-gold">
                Next
              </p>
              <p className="mt-2 font-display text-xl italic text-cream">
                {next.title}
              </p>
            </Link>
          ) : null}
        </div>
      ) : null}

      <PostCloser
        post={post}
        related={related}
        backHref={backHref}
        backLabel={backLabel}
      />
    </article>
  );
}

export function SeriesCard({ series }: { series: Series }) {
  const copy = seriesCopy[series.slug];
  const firstDate = formatDateLong(series.chapters[0]?.date ?? series.date);
  const lastDate = formatDateLong(
    series.chapters[series.chapters.length - 1]?.date ?? series.date,
  );
  const dateLabel =
    firstDate && lastDate && firstDate !== lastDate
      ? `${firstDate} – ${lastDate}`
      : firstDate;
  const hubHref = hrefForSeries(series);

  return (
    <div className="flex flex-col rounded-3xl border border-line bg-canvas-2 p-6 sm:col-span-2 lg:col-span-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">Series</p>
        <p className="text-xs text-muted">
          {series.chapters.length} chapters
          {dateLabel ? ` · ${dateLabel}` : ""}
        </p>
      </div>
      <Link href={hubHref} className="mt-4 block">
        <h2 className="font-display text-3xl italic text-cream transition hover:text-gold md:text-4xl">
          {series.title}
        </h2>
      </Link>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
        {copy?.blurb ?? series.description}
      </p>
      <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {series.chapters.map((chapter) => (
          <li key={chapter.slug}>
            <Link
              href={hrefForPost(chapter)}
              className="block rounded-xl border border-line/80 bg-canvas px-3 py-2 text-sm text-cream/80 transition hover:border-gold hover:text-gold"
            >
              <span className="text-gold">{chapter.seriesOrder}.</span>{" "}
              {chapter.title.replace(/^.*?:\s*/, "")}
              {chapter.date ? (
                <span className="mt-1 block">
                  <PostDate date={chapter.date} variant="inline" />
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ol>
      <Link href={hubHref} className="mt-6 text-sm text-gold hover:underline">
        Open series →
      </Link>
    </div>
  );
}

export function ListingGrid({
  items,
  hrefFor,
  chip,
}: {
  items: ListingItem[];
  hrefFor: (post: Post) => string;
  chip?: (post: Post) => string;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        if (item.type === "series") {
          return <SeriesCard key={item.series.slug} series={item.series} />;
        }
        const post = item.post;
        return (
          <Link
            key={post.slug}
            href={hrefFor(post)}
            className="group flex flex-col rounded-3xl border border-line bg-canvas-2 p-6 transition hover:border-gold/50"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.16em] text-gold">
                {chip ? chip(post) : post.category ?? post.kind}
              </span>
              {post.date ? (
                <PostDate date={post.date} variant="compact" />
              ) : null}
            </div>
            <h2 className="mt-4 font-display text-2xl italic text-cream group-hover:text-gold">
              {post.title}
            </h2>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
              {post.description}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export function SeriesHub({
  series,
  kindLabel,
}: {
  series: Series;
  kindLabel: string;
}) {
  const copy = seriesCopy[series.slug];
  const first = series.chapters[0];

  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-16 md:px-8">
      <Link
        href={`/${series.kind}`}
        className="text-sm text-gold hover:underline"
      >
        ← All {kindLabel}
      </Link>
      <p className="mt-8 text-xs uppercase tracking-[0.22em] text-gold">
        Series · {series.chapters.length} chapters
      </p>
      <h1 className="mt-4 font-display text-4xl italic leading-[1.08] text-cream md:text-6xl">
        {series.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        {copy?.blurb ?? series.description}
      </p>
      {first ? (
        <Link
          href={hrefForPost(first)}
          className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-medium text-canvas hover:opacity-90"
        >
          {copy?.startLabel ?? "Start with chapter 1"}
        </Link>
      ) : null}

      <ol className="mt-14 space-y-4">
        {series.chapters.map((chapter) => (
          <li key={chapter.slug}>
            <Link
              href={hrefForPost(chapter)}
              className="group flex gap-5 rounded-2xl border border-line bg-canvas-2 p-5 transition hover:border-gold/50"
            >
              <span className="font-display text-3xl italic text-gold">
                {String(chapter.seriesOrder).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-display text-2xl italic text-cream group-hover:text-gold">
                  {chapter.title}
                </h2>
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {chapter.description}
                </p>
                {chapter.date ? (
                  <div className="mt-3">
                    <PostDate date={chapter.date} variant="compact" />
                  </div>
                ) : null}
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

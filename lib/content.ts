import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ContentKind = "reads" | "thoughts" | "articles" | "projects";

export type RelatedLink = {
  href: string;
  label: string;
};

export type Post = {
  title: string;
  slug: string;
  date: string;
  description: string;
  content: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  source?: string;
  sourceUrl?: string;
  github?: string;
  live?: string;
  featured?: boolean;
  series?: string;
  seriesOrder?: number;
  /** Cross-room bridges shown in the post header. */
  related?: RelatedLink[];
  kind: ContentKind;
};

export type Series = {
  title: string;
  slug: string;
  kind: ContentKind;
  description: string;
  date: string;
  chapters: Post[];
};

export type ListingItem =
  | { type: "post"; post: Post }
  | { type: "series"; series: Series };

const contentRoot = path.join(process.cwd(), "content");

export function slugifySeries(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function parseRelated(value: unknown): RelatedLink[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;
  const links: RelatedLink[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const href = typeof record.href === "string" ? record.href : "";
    const label = typeof record.label === "string" ? record.label : "";
    if (!href || !label) continue;
    links.push({ href, label });
  }
  return links.length ? links : undefined;
}

function parseDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Date(value).toISOString().slice(0, 10);
  }
  if (typeof value !== "string") return "";
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toISOString().slice(0, 10);
}

function loadDir(kind: ContentKind): Post[] {
  const dir = path.join(contentRoot, kind);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const slug =
        (typeof data.slug === "string" && data.slug) ||
        file.replace(/\.mdx?$/, "");

      return {
        title: String(data.title ?? slug),
        slug,
        date: parseDate(data.date),
        description: String(data.description ?? ""),
        content,
        category: data.category ? String(data.category) : undefined,
        tags: Array.isArray(data.tags)
          ? data.tags.map(String)
          : undefined,
        readingTime: data.readingTime ? String(data.readingTime) : undefined,
        source: data.source ? String(data.source) : undefined,
        sourceUrl: data.sourceUrl ? String(data.sourceUrl) : undefined,
        github: data.github ? String(data.github) : undefined,
        live: data.live ? String(data.live) : undefined,
        featured: Boolean(data.featured),
        series: data.series ? String(data.series) : undefined,
        seriesOrder:
          typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
        related: parseRelated(data.related),
        kind,
      } satisfies Post;
    })
    .sort((a, b) => {
      if (a.seriesOrder != null && b.seriesOrder != null && a.series === b.series) {
        return a.seriesOrder - b.seriesOrder;
      }
      return +new Date(b.date) - +new Date(a.date);
    });
}

export function getPosts(kind: ContentKind): Post[] {
  return loadDir(kind);
}

export function getPost(kind: ContentKind, slug: string) {
  return getPosts(kind).find((post) => post.slug === slug);
}

export function getFeaturedProjects() {
  const projects = getPosts("projects");
  const featured = projects.filter((post) => post.featured);
  return featured.length ? featured : projects.slice(0, 5);
}

export function getSeries(kind: ContentKind): Series[] {
  const posts = getPosts(kind);
  const byTitle = new Map<string, Post[]>();

  for (const post of posts) {
    if (!post.series || post.seriesOrder == null) continue;
    const list = byTitle.get(post.series) ?? [];
    list.push(post);
    byTitle.set(post.series, list);
  }

  return [...byTitle.entries()]
    .map(([title, chapters]) => {
      const ordered = [...chapters].sort(
        (a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0),
      );
      const first = ordered[0];
      return {
        title,
        slug: slugifySeries(title),
        kind,
        description: first?.description ?? "",
        date: first?.date ?? "",
        chapters: ordered,
      } satisfies Series;
    })
    .filter((series) => series.chapters.length >= 2)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getSeriesBySlug(kind: ContentKind, seriesSlug: string) {
  return getSeries(kind).find((series) => series.slug === seriesSlug);
}

export function getSeriesForPost(post: Post) {
  if (!post.series || post.seriesOrder == null) return undefined;
  return getSeries(post.kind).find((series) => series.title === post.series);
}

export function collapseForListing(kind: ContentKind): ListingItem[] {
  const posts = getPosts(kind);
  const seriesList = getSeries(kind);
  const seriesByTitle = new Map(seriesList.map((s) => [s.title, s]));
  const seenSeries = new Set<string>();
  const items: ListingItem[] = [];

  for (const post of posts) {
    if (post.series && post.seriesOrder != null && seriesByTitle.has(post.series)) {
      if (seenSeries.has(post.series)) continue;
      seenSeries.add(post.series);
      items.push({ type: "series", series: seriesByTitle.get(post.series)! });
      continue;
    }
    items.push({ type: "post", post });
  }

  return items.sort((a, b) => {
    const dateA = a.type === "post" ? a.post.date : a.series.date;
    const dateB = b.type === "post" ? b.post.date : b.series.date;
    return +new Date(dateB) - +new Date(dateA);
  });
}

export function hrefForPost(post: Post) {
  return `/${post.kind}/${post.slug}`;
}

export function hrefForSeries(series: Series) {
  return `/${series.kind}/series/${series.slug}`;
}

function tagOverlap(a: Post, b: Post) {
  if (!a.tags?.length || !b.tags?.length) return 0;
  const set = new Set(a.tags.map((t) => t.toLowerCase()));
  return b.tags.reduce(
    (score, tag) => score + (set.has(tag.toLowerCase()) ? 1 : 0),
    0,
  );
}

/** Rank related posts for the article footer “Read next” section. */
export function getRelatedPosts(post: Post, limit = 2): Post[] {
  const pool = getPosts(post.kind).filter((candidate) => candidate.slug !== post.slug);
  if (!pool.length) return [];

  const scored = pool.map((candidate) => {
    let score = 0;
    if (post.series && candidate.series === post.series) score += 8;
    score += tagOverlap(post, candidate) * 3;
    if (post.category && candidate.category === post.category) score += 2;
    // Mild recency boost so empty-tag posts still surface something current
    const ageDays =
      (Date.now() - new Date(candidate.date).getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 2 - ageDays / 365);
    return { candidate, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return +new Date(b.candidate.date) - +new Date(a.candidate.date);
  });

  return scored.slice(0, limit).map((row) => row.candidate);
}


"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PostDate } from "@/components/PostDate";
import type { Post } from "@/lib/content";
import { noteCategories, noteStarters } from "@/lib/site";

type NoteCard = Omit<Post, "content">;

const APPLICATION_CATEGORIES = new Set([
  "applications",
  "marketing",
  "customer service",
  "healthcare",
  "business intelligence",
]);

function matchesCategory(post: NoteCard, categoryId: string) {
  if (categoryId === "all") return true;
  const cat = (post.category ?? "").toLowerCase();
  if (categoryId === "applications") return APPLICATION_CATEGORIES.has(cat);
  return cat === categoryId;
}

export function NotesIndex({ posts }: { posts: NoteCard[] }) {
  const [category, setCategory] = useState<string>("all");
  const [starterId, setStarterId] = useState<string | null>(null);

  const starter = noteStarters.find((item) => item.id === starterId);

  const visible = useMemo(() => {
    if (starter) {
      const bySlug = new Map(posts.map((post) => [post.slug, post]));
      return starter.slugs
        .map((slug) => bySlug.get(slug))
        .filter((post): post is NoteCard => Boolean(post));
    }
    return posts.filter((post) => matchesCategory(post, category));
  }, [posts, category, starter]);

  return (
    <div>
      <div className="mt-10 space-y-6">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Starter packs
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {noteStarters.map((pack) => {
              const active = starterId === pack.id;
              return (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => {
                    setStarterId(active ? null : pack.id);
                    if (!active) setCategory("all");
                  }}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-gold text-canvas"
                      : "border border-line text-cream/80 hover:border-gold hover:text-gold"
                  }`}
                >
                  {pack.label}
                </button>
              );
            })}
          </div>
          {starter ? (
            <p className="mt-3 max-w-2xl text-sm text-muted">
              {starter.description}
            </p>
          ) : null}
        </div>

        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Categories
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {noteCategories.map((item) => {
              const active = !starterId && category === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setStarterId(null);
                    setCategory(item.id);
                  }}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? "bg-gold text-canvas"
                      : "border border-line text-cream/80 hover:border-gold hover:text-gold"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "note" : "notes"}
        {starter ? ` in ${starter.label}` : null}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/reads/${post.slug}`}
            className="group flex flex-col rounded-3xl border border-line bg-canvas-2 p-6 transition hover:border-gold/50"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.16em] text-gold">
                {post.readingTime ?? "2 min"}
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
        ))}
      </div>
    </div>
  );
}

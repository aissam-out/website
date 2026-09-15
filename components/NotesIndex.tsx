"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PostDate } from "@/components/PostDate";
import type { Post } from "@/lib/content";
import { labelForCategory, noteCategories } from "@/lib/site";

type NoteCard = Omit<Post, "content">;

function matchesCategory(post: NoteCard, categoryId: string) {
  if (categoryId === "all") return true;
  return (post.category ?? "").toLowerCase() === categoryId;
}

export function NotesIndex({ posts }: { posts: NoteCard[] }) {
  const [category, setCategory] = useState<string>("all");

  const visible = useMemo(
    () => posts.filter((post) => matchesCategory(post, category)),
    [posts, category],
  );

  return (
    <div>
      <div className="mt-10">
        <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
          Topics
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {noteCategories.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCategory(item.id)}
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

      <p className="mt-8 text-sm text-muted">
        {visible.length} {visible.length === 1 ? "note" : "notes"}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/notes/${post.slug}`}
            className="group flex flex-col rounded-3xl border border-line bg-canvas-2 p-6 transition hover:border-gold/50"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-gold">
                {post.category ? labelForCategory(post.category) : (post.readingTime ?? "2 min")}
              </span>
              {post.date ? (
                <PostDate date={post.date} variant="compact" />
              ) : null}
            </div>
            <h2 className="mt-4 font-display text-2xl italic text-cream group-hover:text-gold">
              {post.title}
            </h2>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

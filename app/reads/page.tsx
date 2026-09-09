import type { Metadata } from "next";
import { ListingGrid } from "@/components/PostLayout";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "2-minute reads",
  description:
    "NLP Explained — foundations to advanced techniques, packed into a 2-minute read.",
};

export default function ReadsPage() {
  const posts = getPosts("reads");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">
        NLP Explained
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl italic text-cream md:text-7xl">
        Two minutes. Then you{" "}
        <em className="gold-em not-italic">know</em> a little more.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Demystifying natural language processing. From foundations to advanced
        techniques — boiled down, simplified, and packed into a short note.
      </p>
      <div className="mt-12">
        <ListingGrid
          items={posts.map((post) => ({ type: "post" as const, post }))}
          hrefFor={(post) => `/reads/${post.slug}`}
          chip={(post) => post.readingTime ?? "2 min"}
        />
      </div>
    </div>
  );
}

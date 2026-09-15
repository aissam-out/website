import type { Metadata } from "next";
import { NotesIndex } from "@/components/NotesIndex";
import { getPosts } from "@/lib/content";
import { kindLabels } from "@/lib/site";

export const metadata: Metadata = {
  title: kindLabels.reads.plural,
  description: kindLabels.reads.promise,
};

export default function ReadsPage() {
  const posts = getPosts("reads").map(
    ({ content: _content, ...post }) => post,
  );

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">
        {kindLabels.reads.plural}
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl italic text-cream md:text-7xl">
        Two minutes. Then you{" "}
        <em className="gold-em not-italic">know</em> a little more.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Short observations on building, evaluating, and operating AI systems.
      </p>
      <NotesIndex posts={posts} />
    </div>
  );
}

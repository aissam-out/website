import type { Metadata } from "next";
import { ListingGrid } from "@/components/PostLayout";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source Darija, production ML pipelines, chatbots, and voice assistants.",
};

export default function ProjectsPage() {
  const posts = getPosts("projects");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Projects</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl italic text-cream md:text-7xl">
        Things that <em className="gold-em not-italic">shipped</em>
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Datasets, libraries, APIs, chatbots, and voice skills — the public
        trail of work I can point to.
      </p>
      <div className="mt-12">
        <ListingGrid
          items={posts.map((post) => ({ type: "post" as const, post }))}
          hrefFor={(post) => `/projects/${post.slug}`}
          chip={() => "Project"}
        />
      </div>
    </div>
  );
}

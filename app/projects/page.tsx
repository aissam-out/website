import type { Metadata } from "next";
import { ListingGrid } from "@/components/PostLayout";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Darija, voice pipelines, chatbots, Alexa skills, and production AI systems.",
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
        From early chatbots and Alexa skills to Darija datasets, voice fraud
        pipelines, and long-form writeups of systems that actually ran.
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

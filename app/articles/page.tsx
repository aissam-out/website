import type { Metadata } from "next";
import { ListingGrid } from "@/components/PostLayout";
import { collapseForListing } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Deep technical writing: Alexa skills, production ML, WhatsApp chatbots, Flask, TensorFlow.",
};

export default function ArticlesPage() {
  const items = collapseForListing("articles");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Articles</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl italic text-cream md:text-7xl">
        Tutorials with the{" "}
        <em className="gold-em not-italic">working parts</em> left in.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Longer technical pieces originally published on Medium and Towards Data
        Science — Alexa, production ML, chatbots, deployment.
      </p>
      <div className="mt-12">
        <ListingGrid
          items={items}
          hrefFor={(post) => `/articles/${post.slug}`}
          chip={(post) => post.series ?? "Article"}
        />
      </div>
    </div>
  );
}

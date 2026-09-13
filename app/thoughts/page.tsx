import type { Metadata } from "next";
import { ListingGrid } from "@/components/PostLayout";
import { collapseForListing } from "@/lib/content";
import { kindLabels } from "@/lib/site";

export const metadata: Metadata = {
  title: kindLabels.thoughts.plural,
  description: kindLabels.thoughts.promise,
};

export default function ThoughtsPage() {
  const items = collapseForListing("thoughts");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">
        {kindLabels.thoughts.plural}
      </p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl italic text-cream md:text-7xl">
        You know <em className="gold-em not-italic">nothing</em>. Maybe. Maybe not.
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Longer writing. Less tutorial, more inspection. The Jon Snow series and
        other essays on knowledge, emergence, and what remains when certainty thins out.
      </p>
      <div className="mt-12">
        <ListingGrid
          items={items}
          hrefFor={(post) => `/thoughts/${post.slug}`}
          chip={() => kindLabels.thoughts.singular}
        />
      </div>
    </div>
  );
}

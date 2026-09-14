import type { Metadata } from "next";
import { ListingGrid, SeriesCard } from "@/components/PostLayout";
import { collapseForListing } from "@/lib/content";
import { kindLabels } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Shipped systems and long-form guides on assistants, voice, and Darija.",
};

export default function ProjectsPage() {
  const items = collapseForListing("projects");
  const projects = items.filter((item) => item.type === "post");
  const guides = items.filter((item) => item.type === "series");

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Projects</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl italic text-cream md:text-7xl">
        Things that <em className="gold-em not-italic">shipped</em>
      </h1>
      <p className="mt-6 max-w-2xl text-muted">
        Darija datasets, voice fraud pipelines, chatbots, and other systems that
        actually ran.
      </p>
      <div className="mt-12">
        <ListingGrid
          items={projects}
          hrefFor={(post) => `/projects/${post.slug}`}
          chip={() => kindLabels.projects.singular}
        />
      </div>

      {guides.length ? (
        <section id="guides" className="mt-24 scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Guides
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl italic text-cream md:text-5xl">
            Longer paths through a problem
          </h2>
          <p className="mt-5 max-w-2xl text-muted">
            Multi-part writeups that walk a system from the first constraints to
            the operational details.
          </p>
          <div className="mt-10 grid gap-5">
            {guides.map((item) =>
              item.type === "series" ? (
                <SeriesCard key={item.series.slug} series={item.series} />
              ) : null,
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}

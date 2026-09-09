import { ButtonLink } from "@/components/ButtonLink";
import { CardRail, PostCard, RoomCard, SectionHeader } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { SeriesCard } from "@/components/PostLayout";
import { StatRow } from "@/components/StatRow";
import { collapseForListing, getFeaturedProjects, getPosts } from "@/lib/content";
import { beliefs, rooms, site } from "@/lib/site";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const reads = getPosts("reads").slice(0, 8);
  const thoughtItems = collapseForListing("thoughts").slice(0, 4);

  return (
    <>
      <Hero />

      <Marquee />

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
        <SectionHeader
          eyebrow="The rooms"
          title="Four places to"
          emphasis="look"
          description="A personal site, not a brochure. Pick a room."
        />
        <CardRail>
          {rooms.map((room) => (
            <RoomCard key={room.href} {...room} />
          ))}
        </CardRail>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <SectionHeader
          eyebrow="Work"
          title="Things that"
          emphasis="shipped"
          href="/projects"
          cta="All projects"
          description="Datasets, libraries, pipelines, chatbots, and voice skills."
        />
        <CardRail>
          {projects.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              href={`/projects/${post.slug}`}
              chip="Project"
            />
          ))}
        </CardRail>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <SectionHeader
          eyebrow="NLP Explained"
          title="Notes you can"
          emphasis="read in two minutes"
          href="/reads"
          cta="All reads"
          description="From foundations to advanced techniques — boiled down, simplified, and packed tight."
        />
        <CardRail>
          {reads.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              href={`/reads/${post.slug}`}
              chip="2 min"
            />
          ))}
        </CardRail>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <SectionHeader
          eyebrow="Approach"
          title="How I actually"
          emphasis="think"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {beliefs.map((belief) => (
            <div
              key={belief.title}
              className="rounded-3xl border border-line bg-canvas-2 p-7"
            >
              <h3 className="font-display text-2xl italic text-cream">
                {belief.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{belief.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <StatRow />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <SectionHeader
          eyebrow="Thoughts"
          title="A little less"
          emphasis="certainty"
          href="/thoughts"
          cta="All essays"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {thoughtItems.map((item) => {
            if (item.type === "series") {
              return (
                <div key={item.series.slug} className="md:col-span-2">
                  <SeriesCard series={item.series} />
                </div>
              );
            }
            return (
              <PostCard
                key={item.post.slug}
                post={item.post}
                href={`/thoughts/${item.post.slug}`}
                chip={item.post.series ?? "Essay"}
              />
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8 pt-8 md:px-8">
        <div className="rounded-[2rem] border border-line bg-canvas-2 px-8 py-14 text-center md:px-16">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Write / collaborate</p>
          <h2 className="mt-4 font-display text-4xl italic text-cream md:text-6xl">
            If the question is still open,{" "}
            <em className="gold-em not-italic">write</em>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            Conversational AI, Darija, production NLP, or an essay that should exist.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`mailto:${site.email}`}>Email me</ButtonLink>
            <ButtonLink href={site.socials.linkedin} variant="ghost">
              LinkedIn
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

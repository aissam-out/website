import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CardRail, PostCard, RoomCard, SectionHeader } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { StatRow } from "@/components/StatRow";
import {
  getFeaturedProjects,
  getPosts,
  hrefForPost,
  type Post,
} from "@/lib/content";
import { beliefs, kindLabels, rooms, site } from "@/lib/site";

function recentWriting(limit = 6): Post[] {
  const pool = [
    ...getPosts("reads"),
    ...getPosts("thoughts"),
    ...getPosts("projects"),
  ];
  return pool
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit);
}

export default function HomePage() {
  const projects = getFeaturedProjects();
  const writing = recentWriting(6);

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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <RoomCard key={room.href} {...room} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <SectionHeader
          eyebrow="Work"
          title="Things that"
          emphasis="shipped"
          href="/projects"
          cta="All projects"
          description="Darija, voice pipelines, chatbots, and production AI systems."
        />
        <CardRail>
          {projects.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              href={`/projects/${post.slug}`}
              chip={kindLabels.projects.singular}
            />
          ))}
        </CardRail>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <SectionHeader
          eyebrow="Writing"
          title="Recent"
          emphasis="pages"
          href="/notes"
          cta="Browse notes"
          description="Notes, essays, and projects: the latest across the rooms."
        />
        <CardRail>
          {writing.map((post) => (
            <PostCard
              key={`${post.kind}-${post.slug}`}
              post={post}
              href={hrefForPost(post)}
              chip={kindLabels[post.kind].singular}
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
            <Link
              key={belief.title}
              href={belief.href}
              className="group rounded-3xl border border-line bg-canvas-2 p-7 transition hover:border-gold/45"
            >
              <h3 className="font-display text-2xl italic text-cream group-hover:text-gold">
                {belief.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {belief.body}
              </p>
              <p className="mt-5 text-sm text-gold">
                {belief.linkLabel} →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <StatRow />
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

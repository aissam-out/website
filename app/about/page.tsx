import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeader } from "@/components/Cards";
import { StackBadges } from "@/components/StackBadges";
import { Timeline } from "@/components/Timeline";
import { papers, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.author}, senior AI engineer working on conversational systems, Darija NLP, and writing at ${site.name}.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">About</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl italic leading-[1.02] text-cream md:text-7xl">
        AI engineer. Conversational systems. A bias toward{" "}
        <em className="gold-em not-italic">questions</em>.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
        I&apos;m {site.author}. I build conversational AI, publish open resources
        for Moroccan Darija, and write: sometimes two-minute notes on NLP,
        sometimes longer essays on what we think we know, sometimes long-form
        project writeups with the working parts left in.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={site.socials.github}>GitHub</ButtonLink>
        <ButtonLink href={site.socials.linkedin} variant="ghost">
          LinkedIn
        </ButtonLink>
      </div>

      <section className="mt-20">
        <SectionHeader
          eyebrow="Now"
          title="The short"
          emphasis="version"
        />
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-base leading-relaxed text-cream/80">
            I currently work as an AI specialist, after
            three years at Affiniti AI in London building conversational
            systems for mental health, and a stretch as head of R&amp;D at
            MonarkIT in Marrakech.
          </p>
          <p className="text-base leading-relaxed text-cream/80">
            I started Darija Open Dataset, still one of the largest open
            Darija ⇆ English resources for NLP. I&apos;m a certified TensorFlow
            Developer. I use Python. I keep a public trail of projects,
            papers, and notes.
          </p>
        </div>
      </section>

      <section className="mt-20">
        <SectionHeader
          eyebrow="Path"
          title="From cryptography to"
          emphasis="conversation"
        />
        <Timeline />
      </section>

      <section className="mt-20">
        <SectionHeader eyebrow="Stack" title="What I build" emphasis="with" />
        <div className="mt-8">
          <StackBadges />
        </div>
      </section>

      <section className="mt-20">
        <SectionHeader
          eyebrow="Papers"
          title="Selected"
          emphasis="publications"
          description="A compact list of the three most cited papers. Citation counts from Google Scholar (2026). Full texts live on arXiv and the journals."
          href={site.socials.scholar}
          cta="Google Scholar"
        />
        <div className="divide-y divide-line border-y border-line">
          {papers.map((paper) => (
            <a
              key={paper.href}
              href={paper.href}
              target="_blank"
              rel="noreferrer"
              className="grid gap-2 py-5 hover:text-gold md:grid-cols-[minmax(0,1fr)_auto] md:items-baseline md:gap-6"
            >
              <span className="max-w-3xl leading-snug">{paper.title}</span>
              <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-muted md:justify-end">
                <span className="tabular-nums text-cream">
                  {paper.citations.toLocaleString("en-US")}{" "}
                  {paper.citations === 1 ? "citation" : "citations"}
                </span>
                <span aria-hidden className="hidden text-line sm:inline">
                  ·
                </span>
                <span>
                  {paper.venue} · {paper.year}
                </span>
              </span>
            </a>
          ))}
        </div>
        <p className="mt-5 text-sm text-muted">
          <a
            href={site.socials.scholar}
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:underline"
          >
            See all publications on Google Scholar →
          </a>
        </p>
      </section>
    </div>
  );
}

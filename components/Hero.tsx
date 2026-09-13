"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/site";

const sentences = site.tagline.match(/[^.!?]+[.!?]/g) ?? [site.tagline];
const lineOne = (sentences[0] ?? "").trim().split(/\s+/).filter(Boolean);
const lineTwo = (sentences[1] ?? "").trim().split(/\s+/).filter(Boolean);

export function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReady(true);
      return;
    }
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const renderWords = (words: string[], startDelay: number) =>
    words.map((word, index) => {
      const punct = word.match(/[.!?]$/)?.[0] ?? "";
      const bare = word.replace(/[.!?]$/, "");
      const emphasize = bare.toLowerCase() === "struggle";
      return (
        <span key={`${bare}-${index}`}>
          <span
            className={`hero-word ${ready ? "is-in" : ""}`}
            style={{ transitionDelay: `${startDelay + index * 70}ms` }}
          >
            {emphasize ? <em className="gold-em not-italic">{bare}</em> : bare}
            {punct}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      );
    });

  return (
    <section className="hero-wash relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
        <div className="hero-grid" />

        <svg
          className={`hero-wave-noise absolute inset-x-0 top-8 h-[280px] w-full opacity-70 md:top-4 md:h-[360px] ${
            ready ? "" : "opacity-40"
          }`}
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--palette-gold)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="var(--palette-gold)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--palette-gold)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <path
            d="M0 180 C 80 120, 160 240, 240 180 S 400 100, 480 180 S 640 260, 720 180 S 880 90, 960 180 S 1120 240, 1200 180"
            fill="none"
            stroke="url(#waveGrad)"
            strokeWidth="2.5"
          />
          <path
            d="M0 200 C 60 150, 140 250, 220 200 S 380 130, 460 200 S 620 270, 700 200 S 860 110, 940 200 S 1100 250, 1200 200"
            fill="none"
            stroke="var(--palette-gold)"
            strokeOpacity="0.25"
            strokeWidth="1.25"
          />
          <g opacity="0.35">
            {Array.from({ length: 28 }).map((_, i) => {
              const x = 40 + i * 40;
              const y = 120 + ((i * 37) % 90);
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={1.4 + (i % 3) * 0.4}
                  fill="var(--palette-gold)"
                />
              );
            })}
          </g>
        </svg>

        <div className="hero-noise-field absolute inset-x-0 bottom-0 top-[42%]">
          {Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              className="hero-dot"
              style={{
                left: `${4 + ((i * 17) % 92)}%`,
                top: `${8 + ((i * 29) % 78)}%`,
                animationDelay: `${(i % 12) * 0.35}s`,
                animationDuration: `${4.5 + (i % 5) * 0.7}s`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pt-24">
        <p
          className={`hero-fade text-xs uppercase tracking-[0.28em] text-gold ${
            ready ? "is-in" : ""
          }`}
          style={{ transitionDelay: "40ms" }}
        >
          {site.name}
        </p>

        <h1 className="mt-6 max-w-5xl font-display text-5xl italic leading-[0.98] text-cream md:text-7xl lg:text-[5.25rem]">
          <span className="block">{renderWords(lineOne, 120)}</span>
          <span className="mt-2 block md:mt-3">
            {renderWords(lineTwo, 120 + lineOne.length * 70)}
          </span>
        </h1>

        <div className="relative mt-8 max-w-2xl">
          <div className="hero-bio-glow absolute -inset-x-6 -inset-y-4 rounded-[2rem]" />
          <p
            className={`hero-fade relative text-base leading-relaxed text-muted md:text-lg ${
              ready ? "is-in" : ""
            }`}
            style={{
              transitionDelay: `${120 + (lineOne.length + lineTwo.length) * 70 + 80}ms`,
            }}
          >
            I&apos;m {site.author}, an AI engineer working across language,
            speech, and intelligent systems. I use this space to share things I
            build, ideas I&apos;m exploring, and essays about uncertainty,
            perspective, intelligence, and the strange business of knowing
            things.
          </p>
        </div>

        <div
          className={`hero-fade mt-10 flex flex-wrap gap-3 ${ready ? "is-in" : ""}`}
          style={{
            transitionDelay: `${120 + (lineOne.length + lineTwo.length) * 70 + 260}ms`,
          }}
        >
          <ButtonLink href="/reads">Notes</ButtonLink>
          <ButtonLink href="/projects" variant="ghost">
            Projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

"use client";

import { engineeringTimeline } from "@/lib/charts/translategemma-data";

export function EngineeringTimeline({
  title = "From RunPod to Vast to a laptop",
  caption,
}: {
  title?: string;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      {title ? (
        <figcaption className="font-display text-2xl italic leading-snug text-cream md:text-[1.65rem]">
          {title}
        </figcaption>
      ) : null}

      {/* Mobile: vertical */}
      <ol className={`relative space-y-0 md:hidden ${title ? "mt-5" : ""}`}>
        <span
          aria-hidden
          className="absolute bottom-2 left-[0.55rem] top-2 w-px bg-line"
        />
        {engineeringTimeline.map((step, index) => (
          <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
            <span
              aria-hidden
              className="relative z-10 mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-gold bg-canvas"
            />
            <div className="min-w-0">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-cream">
                {step.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {step.note}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop: horizontal; six steps fit the article width */}
      <div className={`hidden md:block ${title ? "mt-5" : ""}`}>
        <ol className="flex gap-0">
          {engineeringTimeline.map((step, index) => (
            <li
              key={step.title}
              className="relative flex min-w-0 flex-1 flex-col px-1.5 first:pl-0 last:pr-0"
            >
              <div className="flex items-center">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 shrink-0 rounded-full border border-gold bg-canvas"
                />
                {index < engineeringTimeline.length - 1 ? (
                  <span aria-hidden className="mx-1 h-px flex-1 bg-line" />
                ) : null}
              </div>
              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-cream">
                {step.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {step.note}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {caption ? (
        <div className="post-caption mt-4">
          <span className="post-caption__body">{caption}</span>
        </div>
      ) : null}
    </figure>
  );
}

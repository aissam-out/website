"use client";

import { useCallback, useEffect, useId, useState } from "react";
import {
  emsiCourseSlides,
  slidePageSrc,
  type EmsiSlide,
} from "@/lib/emsi-course";

function sessionLabel(n: number) {
  return String(n).padStart(2, "0");
}

function Prefetch({ href }: { href: string }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = href;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [href]);
  return null;
}

function SlideViewer({
  deck,
  onClose,
}: {
  deck: EmsiSlide;
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const titleId = useId();

  const go = useCallback(
    (next: number) => {
      setPage(Math.min(deck.pageCount, Math.max(1, next)));
    },
    [deck.pageCount],
  );

  useEffect(() => {
    setPage(1);
  }, [deck.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        go(page + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(page - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [go, onClose, page]);

  const src = slidePageSrc(deck.id, page);
  const prefetch = [
    page > 1 ? slidePageSrc(deck.id, page - 1) : null,
    page < deck.pageCount ? slidePageSrc(deck.id, page + 1) : null,
  ].filter(Boolean) as string[];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/90 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      {prefetch.map((href) => (
        <Prefetch key={href} href={href} />
      ))}
      <div
        className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-line bg-canvas-2 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
              Session {sessionLabel(deck.session)} · {deck.area}
            </p>
            <h3
              id={titleId}
              className="mt-1 truncate font-display text-xl italic text-cream sm:text-2xl"
            >
              {deck.title}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={deck.pdf}
              download
              className="rounded-full border border-line px-3 py-1.5 text-xs text-cream transition hover:border-gold hover:text-gold"
            >
              PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-gold hover:text-gold"
            >
              Close
            </button>
          </div>
        </div>

        <div className="relative bg-canvas px-2 py-3 sm:px-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={src}
            src={src}
            alt={`${deck.title}, slide ${page} of ${deck.pageCount}`}
            className="mx-auto max-h-[min(70vh,720px)] w-auto max-w-full rounded-lg border border-line object-contain"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={() => go(page - 1)}
            disabled={page <= 1}
            className="rounded-full border border-line px-4 py-2 text-sm text-cream transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
          >
            Previous
          </button>
          <p className="text-sm tabular-nums text-muted">
            <span className="text-cream">{page}</span> / {deck.pageCount}
          </p>
          <button
            type="button"
            onClick={() => go(page + 1)}
            disabled={page >= deck.pageCount}
            className="rounded-full border border-line px-4 py-2 text-sm text-cream transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export function EmsiSlideGallery() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = emsiCourseSlides.find((slide) => slide.id === activeId);

  return (
    <section className="my-10" aria-labelledby="emsi-slides-heading">
      <div className="mb-5">
        <p
          id="emsi-slides-heading"
          className="text-[0.65rem] uppercase tracking-[0.18em] text-gold"
        >
          Original course decks
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Original EMSI materials for in-browser viewing. Slides load only when
          a session is opened. PDF downloads are available for offline reading.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="hidden grid-cols-[3rem_minmax(0,1fr)_7rem_4.5rem_auto] gap-3 border-b border-line bg-canvas-2 px-4 py-2.5 text-[0.6rem] uppercase tracking-[0.14em] text-muted sm:grid">
          <span>#</span>
          <span>Session</span>
          <span>Area</span>
          <span className="text-right">Slides</span>
          <span className="text-right">Open</span>
        </div>

        <ul className="divide-y divide-line bg-canvas">
          {emsiCourseSlides.map((slide) => (
            <li key={slide.id}>
              <div className="group grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-3 gap-y-2 px-4 py-3.5 transition hover:bg-canvas-2 sm:grid-cols-[3rem_minmax(0,1fr)_7rem_4.5rem_auto] sm:gap-3">
                <button
                  type="button"
                  onClick={() => setActiveId(slide.id)}
                  className="text-left font-display text-xl italic tabular-nums text-gold"
                  aria-label={`Open session ${sessionLabel(slide.session)}: ${slide.title}`}
                >
                  {sessionLabel(slide.session)}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveId(slide.id)}
                  className="min-w-0 text-left"
                >
                  <span className="block text-sm font-medium leading-snug text-cream transition group-hover:text-gold sm:text-base">
                    {slide.title}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted sm:hidden">
                    {slide.area} · {slide.pageCount} slides
                  </span>
                  <span className="mt-1 hidden text-xs leading-relaxed text-muted sm:block">
                    {slide.description}
                  </span>
                </button>

                <p className="hidden text-xs uppercase tracking-[0.12em] text-muted sm:block">
                  {slide.area}
                </p>

                <p className="hidden text-right text-sm tabular-nums text-muted sm:block">
                  {slide.pageCount}
                </p>

                <div className="col-span-2 flex items-center justify-end gap-3 sm:col-span-1">
                  <button
                    type="button"
                    onClick={() => setActiveId(slide.id)}
                    className="text-sm text-gold transition hover:underline"
                  >
                    View
                  </button>
                  <a
                    href={slide.pdf}
                    download
                    className="text-sm text-muted transition hover:text-gold"
                  >
                    PDF
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {active ? (
        <SlideViewer deck={active} onClose={() => setActiveId(null)} />
      ) : null}
    </section>
  );
}

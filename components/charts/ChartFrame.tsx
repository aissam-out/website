"use client";

import type { ReactNode } from "react";

export function ChartFrame({
  title,
  caption,
  children,
  className = "",
}: {
  title?: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`my-10 ${className}`.trim()}>
      {title ? (
        <figcaption className="font-display text-2xl italic leading-snug text-cream md:text-[1.65rem]">
          {title}
        </figcaption>
      ) : null}
      <div
        className={`overflow-hidden rounded-2xl border border-line bg-canvas-2 ${
          title ? "mt-4" : ""
        }`}
      >
        <div className="px-3 py-4 sm:px-5 sm:py-5">{children}</div>
      </div>
      {caption ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted italic">
          {caption}
        </p>
      ) : null}
    </figure>
  );
}

export function ChartLegend({
  items,
}: {
  items: { label: string; color: string; dashed?: boolean }[];
}) {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2.5 w-2.5 rounded-[2px]"
            style={{
              background: item.dashed ? "transparent" : item.color,
              border: `1.5px ${item.dashed ? "dashed" : "solid"} ${item.color}`,
            }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

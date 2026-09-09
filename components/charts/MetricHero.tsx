"use client";

import type { ReactNode } from "react";
import { metricHero, round2 } from "@/lib/charts/translategemma-data";

const TERJAMABENCH_HF =
  "https://huggingface.co/datasets/atlasia/TerjamaBench";

const metrics = [
  {
    key: "BLEU",
    ...metricHero.bleu,
    hint: "Higher is better",
  },
  {
    key: "chrF",
    ...metricHero.chrf,
    hint: "Higher is better",
  },
  {
    key: "TER",
    ...metricHero.ter,
    hint: "Lower is better",
  },
] as const;

export function MetricHero({
  eyebrow,
}: {
  eyebrow?: ReactNode;
}) {
  return (
    <aside className="my-10 overflow-hidden rounded-2xl border border-line bg-canvas-2">
      <div className="border-b border-line px-5 py-3 sm:px-7">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-gold">
          {eyebrow ?? (
            <>
              External evaluation ·{" "}
              <a
                href={TERJAMABENCH_HF}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-gold/40 underline-offset-4 hover:decoration-gold"
              >
                TerjamaBench
              </a>{" "}
              (reversed)
            </>
          )}
        </p>
      </div>

      <div className="grid sm:grid-cols-3">
        {metrics.map((metric, index) => {
          const delta = metric.after - metric.before;
          const improved = metric.higherIsBetter
            ? metric.after > metric.before
            : metric.after < metric.before;
          const direction = metric.higherIsBetter ? "Higher" : "Lower";

          return (
            <div
              key={metric.key}
              className={`px-5 py-6 sm:px-7 sm:py-7 ${
                index > 0 ? "border-t border-line sm:border-t-0 sm:border-l" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-2xl italic leading-none text-cream">
                  {metric.key}
                </p>
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] ${
                    improved
                      ? "border-gold/35 bg-gold/10 text-gold"
                      : "border-line text-muted"
                  }`}
                >
                  <span aria-hidden>{metric.higherIsBetter ? "↑" : "↓"}</span>
                  {direction}
                </span>
              </div>

              <div className="mt-5 flex items-end gap-3">
                <div className="min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                    Base
                  </p>
                  <p className="mt-1 font-sans text-xl font-medium tabular-nums tracking-tight text-cream/55 sm:text-2xl">
                    {round2(metric.before)}
                  </p>
                </div>

                <span
                  className="mb-1.5 shrink-0 text-lg font-medium text-gold"
                  aria-hidden
                >
                  →
                </span>

                <div className="min-w-0">
                  <p className="text-[0.65rem] uppercase tracking-[0.14em] text-gold">
                    Fine-tuned
                  </p>
                  <p className="mt-1 font-sans text-3xl font-semibold tabular-nums tracking-tight text-cream sm:text-4xl">
                    {round2(metric.after)}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted">
                {metric.hint}
                {improved ? (
                  <>
                    {" · "}
                    <span className="tabular-nums text-cream">
                      {delta > 0 ? "+" : ""}
                      {round2(delta)}
                    </span>
                  </>
                ) : null}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

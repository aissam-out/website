import type { ReactNode } from "react";
import { ChartFrame } from "@/components/charts/ChartFrame";
import {
  ttsCheckpointScaleMax,
  ttsCheckpointSizes,
  ttsExperiments,
} from "@/lib/charts/tts-data";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
      {children}
    </p>
  );
}

function FigureTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-2 font-display text-2xl italic leading-snug text-cream md:text-[1.65rem]">
      {children}
    </h3>
  );
}

function FigureLead({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
      {children}
    </p>
  );
}

function Panel({
  children,
  accent = false,
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border bg-canvas px-3 py-3 sm:px-4 sm:py-3.5 ${
        accent ? "border-gold/55" : "border-line"
      } ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function TtsModelJourney() {
  return (
    <ChartFrame className="!mb-0">
      <div
        role="img"
        aria-label="Three TTS experiments. MOSS Local 1.7B completed training but stayed below the listening target. MOSS Local v1.5 4B was stopped amid upload failures without a controlled listening verdict. OmniVoice 0.6B sounded promising before adaptation and its step-5000 inference model was saved. This is a personal experiment record, not a controlled ranking."
      >
        <Eyebrow>01 / Three experiments</Eyebrow>
        <FigureTitle>What changed the direction of the project</FigureTitle>
        <FigureLead>
          The decisive signal was a base model that already sounded convincing
          on my text.
        </FigureLead>

        <ol className="relative mt-6 space-y-3">
          <span
            aria-hidden
            className="absolute bottom-4 left-[0.7rem] top-4 hidden w-px bg-line sm:block"
          />
          {ttsExperiments.map((experiment) => (
            <li key={experiment.id} className="relative sm:pl-10">
              <span
                aria-hidden
                className="absolute left-0 top-4 hidden h-6 w-6 items-center justify-center rounded-full border border-gold bg-canvas text-[0.62rem] font-medium text-gold sm:flex"
              >
                {experiment.id}
              </span>
              <Panel accent={experiment.accent}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                  <div className="min-w-0 sm:w-[38%] sm:shrink-0 sm:border-r sm:border-line sm:pr-5">
                    <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted sm:hidden">
                      Experiment {experiment.id}
                    </p>
                    <p className="text-sm font-medium text-cream sm:mt-0">
                      {experiment.model}
                    </p>
                    <p className="mt-1 text-sm text-gold">
                      {experiment.parameters}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gold">{experiment.progress}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {experiment.evidence}
                    </p>
                  </div>
                </div>
              </Panel>
            </li>
          ))}
        </ol>

        <p className="mt-5 text-xs leading-relaxed text-muted">
          Personal experiment record. Model sizes are not quality scores; this
          is not a controlled ranking.
        </p>
      </div>
    </ChartFrame>
  );
}

export function TtsCheckpointStorage() {
  return (
    <ChartFrame className="!mb-0">
      <div
        role="img"
        aria-label="Approximate checkpoint sizes from the OmniVoice run. Full checkpoint about 6.9 GB. Optimizer file about 4.6 GB, included in the full checkpoint. Final inference repository about 2.46 GB. The three bars are independent observations and must not be added together."
      >
        <Eyebrow>02 / Artifact recovery</Eyebrow>
        <FigureTitle>What survives after the GPU instance is gone?</FigureTitle>
        <FigureLead>
          Reported sizes from the OmniVoice run. Each bar is measured
          separately.
        </FigureLead>

        <div className="mt-6">
          <div className="mb-3 flex items-end justify-between gap-3 border-b border-line pb-2 text-[0.65rem] uppercase tracking-[0.12em] text-muted">
            <span>Approximate size</span>
            <span>0 — {ttsCheckpointScaleMax} GB</span>
          </div>

          <ul className="space-y-5">
            {ttsCheckpointSizes.map((item) => {
              const width = `${(item.gb / ttsCheckpointScaleMax) * 100}%`;
              const barClass =
                item.tone === "accent"
                  ? "bg-gold"
                  : item.tone === "soft"
                    ? "bg-line"
                    : "bg-muted";
              const valueClass =
                item.tone === "accent" ? "text-gold" : "text-cream";

              return (
                <li key={item.label}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <div>
                      <p className="text-sm font-medium text-cream">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted">{item.detail}</p>
                    </div>
                    <p
                      className={`text-sm font-medium tabular-nums ${valueClass}`}
                    >
                      ~{item.gb} GB
                    </p>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-md bg-canvas">
                    <div
                      className={`h-full rounded-md ${barClass}`}
                      style={{ width }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-canvas px-4 py-3">
          <p className="font-display text-lg italic text-cream">
            The saved export preserved generation.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Exact continuation still requires optimizer, scheduler, and other
            training state.
          </p>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Approximate logged sizes; independent bars are not additive or an
          exact component breakdown.
        </p>
      </div>
    </ChartFrame>
  );
}

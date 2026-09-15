import type { ReactNode } from "react";
import { ChartFrame } from "@/components/charts/ChartFrame";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`shrink-0 font-display text-lg leading-none text-gold ${className}`.trim()}
    >
      →
    </span>
  );
}

function DownArrow() {
  return (
    <span aria-hidden className="font-display text-lg leading-none text-gold">
      ↓
    </span>
  );
}

function Chip({
  children,
  accent = false,
}: {
  children: ReactNode;
  accent?: boolean;
}) {
  return (
    <span
      className={`inline-flex min-h-9 items-center justify-center rounded-lg border px-2.5 py-1.5 text-center text-[0.62rem] font-medium uppercase leading-tight tracking-[0.1em] sm:min-h-10 sm:text-[0.65rem] ${
        accent
          ? "border-gold/50 bg-gold/10 text-gold"
          : "border-line bg-canvas text-cream"
      }`}
    >
      {children}
    </span>
  );
}

const originalGroups = [
  {
    label: "Foundations",
    stages: ["AI context", "Data", "ML workflow"],
  },
  {
    label: "Classical ML",
    stages: ["Classical ML"],
  },
  {
    label: "Deep Learning",
    stages: ["Neural networks", "Optimization", "Training challenges"],
  },
  {
    label: "Architectures",
    stages: ["CNNs", "RNNs"],
  },
  {
    label: "LLMs",
    stages: ["Attention / Transformers", "LLM systems"],
  },
] as const;

const curriculum2026 = [
  { title: "Data, problem formulation and leakage", half: "first" },
  { title: "Classical ML, baselines and experimentation", half: "first" },
  { title: "Evaluation, calibration and error analysis", half: "first" },
  { title: "Neural networks and learned representations", half: "first" },
  { title: "Optimization, training and compute constraints", half: "first" },
  {
    title:
      "Architectural ideas: convolution, sequence modeling and inductive bias",
    half: "first",
  },
  { title: "Attention, transformers and language models", half: "first" },
  { title: "Embeddings, retrieval and RAG", half: "second" },
  { title: "Tool use, structured outputs and agentic workflows", half: "second" },
  {
    title: "LLM evaluation, observability and failure analysis",
    half: "second",
  },
  { title: "Production AI system design", half: "second" },
] as const;

export function MlCoursePath({
  caption = "The original eleven-session path. Foundations first, then classical ML, deep learning, architectures, and finally LLM systems.",
}: {
  caption?: string;
}) {
  let session = 0;
  const sessions = originalGroups.flatMap((group) =>
    group.stages.map((stage) => {
      session += 1;
      return { session, stage, group: group.label };
    }),
  );

  return (
    <ChartFrame title="Original course path" caption={caption}>
      <ol className="space-y-0">
        {originalGroups.map((group) => {
          const groupSessions = sessions.filter((s) => s.group === group.label);
          return (
            <li key={group.label} className="border-b border-line last:border-b-0">
              <div className="grid gap-3 py-4 md:grid-cols-[7.5rem_minmax(0,1fr)] md:items-start md:gap-6">
                <p className="pt-1 text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                  {group.label}
                </p>
                <ol className="space-y-2.5">
                  {groupSessions.map((item) => (
                    <li
                      key={item.session}
                      className="flex items-baseline gap-3"
                    >
                      <span className="w-7 shrink-0 font-display text-lg italic tabular-nums text-muted">
                        {String(item.session).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 text-sm leading-snug text-cream sm:text-base">
                        {item.stage}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </li>
          );
        })}
      </ol>
    </ChartFrame>
  );
}

export function MlCoursePerspectiveShift({
  caption = "The model is still complex. Much of the engineering difficulty now lives in the surrounding system.",
}: {
  caption?: string;
}) {
  return (
    <ChartFrame caption={caption}>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-canvas p-4 sm:p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
            Where I used to place the complexity
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <Chip>data</Chip>
            <DownArrow />
            <div className="flex min-h-16 w-full max-w-[12rem] items-center justify-center rounded-xl border border-gold/50 bg-gold/15 px-4 py-4 text-center">
              <span className="font-display text-2xl italic text-gold">
                model
              </span>
            </div>
            <DownArrow />
            <Chip>prediction</Chip>
          </div>
          <p className="mt-5 text-center text-xs leading-relaxed text-muted">
            The model sits at the center of the story.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-canvas p-4 sm:p-5">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
            Where I place it now
          </p>
          <div className="mt-5 flex flex-col items-center gap-1.5 text-center">
            <Chip>data / retrieval / context</Chip>
            <DownArrow />
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Chip>routing</Chip>
              <Arrow />
              <Chip accent>model</Chip>
              <Arrow />
              <Chip>tools</Chip>
            </div>
            <DownArrow />
            <Chip>validation / evaluation</Chip>
            <DownArrow />
            <Chip>serving / caching / observability</Chip>
          </div>
          <p className="mt-5 text-center text-xs leading-relaxed text-muted">
            The model is one component of a larger system.
          </p>
        </div>
      </div>
    </ChartFrame>
  );
}

export function MlCourseCurriculumList() {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-line bg-canvas-2">
      <div className="border-b border-line px-5 py-3">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
          Proposed 2026 path
        </p>
      </div>
      <ol className="divide-y divide-line">
        {curriculum2026.map((item, index) => (
          <li
            key={item.title}
            className="flex items-start gap-4 px-5 py-3.5"
          >
            <span
              aria-hidden
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-lg italic tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.14em] text-gold">
                  {item.half === "first"
                    ? "Foundations & models"
                    : "Systems & products"}
                </span>
              </div>
              <p className="mt-1 text-sm leading-snug text-cream sm:text-base">
                {item.title}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function MlCourseCurriculum2026({
  caption = "A rebuilt eleven-session path keeps the foundations, then spends the second half on retrieval, tools, evaluation and production system design.",
}: {
  caption?: string;
}) {
  return (
    <ChartFrame title="The course I would teach in 2026" caption={caption}>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-canvas p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
            Sessions 01–07
          </p>
          <p className="mt-2 font-display text-xl italic text-cream">
            Foundations & models
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            <li>Data and leakage</li>
            <li>Baselines and experimentation</li>
            <li>Evaluation and error analysis</li>
            <li>Representations and optimization</li>
            <li>Architectural inductive bias</li>
          </ul>
        </div>
        <div className="rounded-xl border border-gold/40 bg-gold/10 p-4">
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
            Sessions 08–11
          </p>
          <p className="mt-2 font-display text-xl italic text-cream">
            Systems & products
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            <li>Embeddings, retrieval and RAG</li>
            <li>Tools and agentic workflows</li>
            <li>Evaluation and observability</li>
            <li>Production AI system design</li>
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-line pt-5">
        <Chip>Data</Chip>
        <Arrow />
        <Chip>Models</Chip>
        <Arrow />
        <Chip>Retrieval</Chip>
        <Arrow />
        <Chip accent>Tools</Chip>
        <Arrow />
        <Chip accent>Evaluation</Chip>
        <Arrow />
        <Chip accent>Production</Chip>
      </div>
    </ChartFrame>
  );
}

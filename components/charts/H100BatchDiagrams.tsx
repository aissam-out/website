import { Fragment, type ReactNode } from "react";
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
  className = "",
}: {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex min-h-10 items-center justify-center rounded-lg border px-2.5 py-2 text-center text-[0.62rem] font-medium uppercase leading-tight tracking-[0.12em] sm:min-h-11 sm:text-[0.65rem] ${
        accent
          ? "border-gold/50 bg-gold/10 text-gold"
          : "border-line bg-canvas text-cream"
      } ${className}`.trim()}
    >
      {children}
    </span>
  );
}

function LaneLabel({ children }: { children: ReactNode }) {
  return (
    <p className="w-14 shrink-0 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-muted sm:w-16">
      {children}
    </p>
  );
}

function Block({
  children,
  accent = false,
  idle = false,
  className = "",
}: {
  children?: ReactNode;
  accent?: boolean;
  idle?: boolean;
  className?: string;
}) {
  if (idle) {
    return (
      <div
        className={`flex items-center justify-center rounded-md border border-dashed border-line/80 text-[0.6rem] uppercase tracking-[0.12em] text-muted/55 ${className}`.trim()}
      >
        idle
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center rounded-md border px-1.5 py-1.5 text-center text-[0.62rem] font-medium leading-tight sm:text-[0.68rem] ${
        accent
          ? "border-gold/45 bg-gold/15 text-gold"
          : "border-line bg-canvas text-cream"
      } ${className}`.trim()}
    >
      {children}
    </div>
  );
}

export function H100CriticalPath({
  caption = "An accelerator is one stage of the system. End-to-end throughput is determined by the critical path.",
}: {
  caption?: string;
}) {
  const stages = [
    "Remote storage",
    "Read / decode",
    "CPU prep",
    "H2D",
    { label: "H100", accent: true },
    "Postprocess",
    "Persist",
  ] as const;

  // Proportional sketch of a job where GPU is only one segment of the path.
  const timeline = [
    { label: "I/O wait", short: "I/O", pct: 18, accent: false },
    { label: "CPU", short: "CPU", pct: 16, accent: false },
    { label: "Queue", short: "Q", pct: 10, accent: false },
    { label: "Transfer", short: "H2D", pct: 12, accent: false },
    { label: "GPU", short: "GPU", pct: 24, accent: true },
    { label: "Persistence", short: "Save", pct: 20, accent: false },
  ] as const;

  return (
    <ChartFrame caption={caption}>
      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
        Where the time goes
      </p>

      <div className="mt-4 hidden flex-wrap items-center gap-x-2 gap-y-2 md:flex">
        {stages.map((stage, index) => {
          const label = typeof stage === "string" ? stage : stage.label;
          const accent = typeof stage !== "string";
          return (
            <Fragment key={label}>
              <Chip accent={accent}>{label}</Chip>
              {index < stages.length - 1 ? <Arrow /> : null}
            </Fragment>
          );
        })}
      </div>

      <ol className="mt-4 flex flex-col items-center gap-1 md:hidden">
        {stages.map((stage, index) => {
          const label = typeof stage === "string" ? stage : stage.label;
          const accent = typeof stage !== "string";
          return (
            <li key={label} className="flex w-full max-w-xs flex-col items-center">
              <Chip accent={accent}>{label}</Chip>
              {index < stages.length - 1 ? <DownArrow /> : null}
            </li>
          );
        })}
      </ol>

      <div className="mt-6">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          Wall-clock interval
        </p>

        {/* Desktop: labeled segments with enough width for every label */}
        <div className="mt-2 hidden overflow-hidden rounded-lg border border-line sm:flex">
          {timeline.map((item, index) => (
            <div
              key={item.label}
              style={{ flexGrow: item.pct, flexBasis: 0 }}
              className={`flex min-w-0 flex-col items-center justify-center gap-0.5 px-1 py-2.5 ${
                item.accent ? "bg-gold/20" : "bg-canvas"
              } ${index < timeline.length - 1 ? "border-r border-line" : ""}`}
            >
              <span
                className={`text-center text-[0.62rem] font-medium uppercase tracking-[0.1em] ${
                  item.accent ? "text-gold" : "text-muted"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile: stacked legend so narrow segments stay readable */}
        <div className="mt-2 sm:hidden">
          <div className="flex h-3 overflow-hidden rounded-full border border-line">
            {timeline.map((item) => (
              <div
                key={item.label}
                style={{ width: `${item.pct}%` }}
                className={item.accent ? "bg-gold/70" : "bg-cream/20"}
              />
            ))}
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {timeline.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-xs">
                <span
                  aria-hidden
                  className={`h-2 w-2 shrink-0 rounded-sm ${
                    item.accent ? "bg-gold" : "bg-cream/35"
                  }`}
                />
                <span className={item.accent ? "text-gold" : "text-muted"}>
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted">
          GPU inference occupies only one interval of the job. The rest of the
          critical path is still running.
        </p>
      </div>
    </ChartFrame>
  );
}

export function H100PipelineOverlap({
  caption = "Prepare the next batch and persist the previous one while the accelerator works on the current batch.",
}: {
  caption?: string;
}) {
  return (
    <ChartFrame caption={caption}>
      <div className="space-y-8">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
            Serial execution
          </p>
          <p className="mt-1 font-display text-sm italic text-muted">
            time ──────────────────────────────▶
          </p>
          <div className="mt-3 space-y-2 overflow-x-auto">
            <div className="grid min-w-[28rem] grid-cols-[3.5rem_repeat(6,minmax(0,1fr))] gap-1.5">
              <LaneLabel>CPU</LaneLabel>
              <Block>prep B1</Block>
              <Block idle />
              <Block>prep B2</Block>
              <Block idle />
              <Block>prep B3</Block>
              <Block idle />

              <LaneLabel>H100</LaneLabel>
              <Block idle />
              <Block accent>GPU B1</Block>
              <Block idle />
              <Block accent>GPU B2</Block>
              <Block idle />
              <Block accent>GPU B3</Block>

              <LaneLabel>I/O</LaneLabel>
              <Block idle />
              <Block idle />
              <Block>save B1</Block>
              <Block idle />
              <Block>save B2</Block>
              <span />
            </div>
          </div>
        </div>

        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
            Pipelined execution
          </p>
          <p className="mt-1 font-display text-sm italic text-muted">
            time ──────────────────────────────▶
          </p>
          <div className="mt-3 space-y-2 overflow-x-auto">
            <div className="grid min-w-[28rem] grid-cols-[3.5rem_repeat(5,minmax(0,1fr))] gap-1.5">
              <LaneLabel>CPU</LaneLabel>
              <Block>prep B1</Block>
              <Block>prep B2</Block>
              <Block>prep B3</Block>
              <Block>prep B4</Block>
              <span />

              <LaneLabel>H100</LaneLabel>
              <Block idle />
              <Block accent>GPU B1</Block>
              <Block accent>GPU B2</Block>
              <Block accent>GPU B3</Block>
              <span />

              <LaneLabel>I/O</LaneLabel>
              <span />
              <Block idle />
              <Block>save B1</Block>
              <Block>save B2</Block>
              <Block>save B3</Block>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Overlap is useful when stages use different resources. It is not a
            claim that every operation can run at once.
          </p>
        </div>
      </div>
    </ChartFrame>
  );
}

/** Four-lane target schedule shown after the “behave more like this” paragraph. */
export function H100TargetSchedule({
  caption = "While the H100 works on batch N, I/O and CPU prepare what comes next and persistence finishes what came before.",
}: {
  caption?: string;
}) {
  return (
    <ChartFrame caption={caption}>
      <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
        Target machine behavior
      </p>
      <p className="mt-1 font-display text-sm italic text-muted">
        time ─────────────────────────────────────────────▶
      </p>

      <div className="mt-4 space-y-2 overflow-x-auto pb-1">
        <div className="grid min-w-[34rem] grid-cols-[4rem_repeat(8,minmax(0,1fr))] gap-1.5">
          <LaneLabel>I/O</LaneLabel>
          <Block className="col-span-2">read B1</Block>
          <Block className="col-span-2">read B2</Block>
          <Block className="col-span-2">read B3</Block>
          <Block className="col-span-2">read B4</Block>

          <LaneLabel>CPU</LaneLabel>
          <Block idle />
          <Block className="col-span-2">prep B1</Block>
          <Block className="col-span-2">prep B2</Block>
          <Block className="col-span-2">prep B3</Block>
          <Block>prep B4</Block>

          <LaneLabel>H100</LaneLabel>
          <span />
          <span />
          <Block accent className="col-span-2">
            B1
          </Block>
          <Block accent className="col-span-2">
            B2
          </Block>
          <Block accent className="col-span-2">
            B3
          </Block>

          <LaneLabel>Persist</LaneLabel>
          <span />
          <span />
          <span />
          <Block className="col-span-2">save B1</Block>
          <Block className="col-span-2">save B2</Block>
          <Block>save B3</Block>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        The unit of optimization is the flow of work through the system, not a
        single recording.
      </p>
    </ChartFrame>
  );
}

export function H100ModelScheduling({
  caption = "Multi-model pipelines force a choice about the unit of scheduling.",
}: {
  caption?: string;
}) {
  const models = ["A", "B", "C"] as const;

  return (
    <ChartFrame caption={caption}>
      <p className="mb-5 text-center font-display text-sm italic text-gold">
        Scheduling is a workload decision, not a universal rule.
      </p>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-line bg-canvas p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
              Item-oriented
            </p>
            <p className="text-[0.6rem] uppercase tracking-[0.12em] text-muted">
              Per item
            </p>
          </div>
          <p className="mt-2 text-sm text-muted">
            Finish one recording through every model before starting the next.
          </p>

          <div className="mt-5 space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-12 shrink-0 text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                  Item {item}
                </span>
                <div className="flex min-w-0 flex-1 items-center gap-1">
                  {models.map((model, index) => (
                    <Fragment key={model}>
                      <div className="flex h-9 flex-1 items-center justify-center rounded-md border border-line bg-canvas-2 text-sm font-medium text-cream">
                        {model}
                      </div>
                      {index < models.length - 1 ? (
                        <span aria-hidden className="text-gold">
                          →
                        </span>
                      ) : null}
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 border-t border-line pt-3 text-xs leading-relaxed text-muted">
            Better when individual item latency matters. Batching opportunities
            stay small.
          </p>
        </div>

        <div className="rounded-xl border border-line bg-canvas p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
              Stage-oriented
            </p>
            <p className="text-[0.6rem] uppercase tracking-[0.12em] text-muted">
              Per model
            </p>
          </div>
          <p className="mt-2 text-sm text-muted">
            Run model A over many items, then B, then C. Keep one model hot.
          </p>

          <div className="mt-5 space-y-3">
            {models.map((model) => (
              <div key={model} className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                  Model {model}
                </span>
                <div className="flex min-w-0 flex-1 items-center gap-1">
                  {[1, 2, 3, "N"].map((item, index) => (
                    <Fragment key={`${model}-${item}`}>
                      <div
                        className={`flex h-9 flex-1 items-center justify-center rounded-md border text-sm font-medium ${
                          model === "A"
                            ? "border-gold/45 bg-gold/15 text-gold"
                            : "border-line bg-canvas-2 text-cream"
                        }`}
                      >
                        {item}
                      </div>
                      {index < 3 ? (
                        <span aria-hidden className="text-muted/50">
                          ·
                        </span>
                      ) : null}
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 border-t border-line pt-3 text-xs leading-relaxed text-muted">
            Better for offline throughput. Intermediate state and resumability
            become part of the design.
          </p>
        </div>
      </div>
    </ChartFrame>
  );
}

const surfaceAreas = [
  {
    title: "Data",
    items: ["prefetch", "local staging", "fewer round trips", "caching"],
  },
  {
    title: "CPU",
    items: [
      "parallel preprocessing",
      "vectorization",
      "avoid oversubscription",
    ],
  },
  {
    title: "GPU",
    items: ["batching", "precision", "optimized runtime", "transfer overlap"],
  },
  {
    title: "Scheduling",
    items: [
      "model residency",
      "bucketing",
      "controlled concurrency",
      "backpressure",
    ],
  },
  {
    title: "Reliability",
    items: ["checkpoints", "idempotency", "retry failed work only"],
  },
  {
    title: "Observability",
    items: [
      "stage timing",
      "queue depth",
      "tail latency",
      "representative benchmarks",
    ],
  },
] as const;

export function H100OptimizationSurface({
  title = "The optimization surface",
  caption = "The final improvement came from accumulated changes across the complete execution path.",
}: {
  title?: string;
  caption?: string;
}) {
  return (
    <ChartFrame title={title} caption={caption}>
      <div className="rounded-2xl border border-line bg-canvas p-4 sm:p-5">
        <div className="flex justify-center">
          <p className="rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-center font-display text-lg italic text-gold sm:text-xl">
            Useful throughput
          </p>
        </div>
        <p className="mx-auto mt-3 max-w-md text-center text-xs leading-relaxed text-muted">
          GPU performance sits inside this surface. The surrounding work decides
          how much of the accelerator can actually be used.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {surfaceAreas.map((area) => (
            <div
              key={area.title}
              className="rounded-xl border border-line bg-canvas-2 px-4 py-3"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-gold">
                {area.title}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-cream/85">
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          Normalized end-to-end runtime. Before = 100. Approximately 75%
          reduction.
        </p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-3">
            <p className="w-36 shrink-0 text-xs text-muted sm:w-44">
              Before optimization
            </p>
            <div className="h-6 flex-1 overflow-hidden rounded-md bg-canvas">
              <div className="h-full w-full rounded-md bg-cream/25" />
            </div>
            <p className="w-10 shrink-0 text-right font-display text-lg italic tabular-nums text-cream">
              100
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="w-36 shrink-0 text-xs text-muted sm:w-44">
              After optimization
            </p>
            <div className="h-6 flex-1 overflow-hidden rounded-md bg-canvas">
              <div className="h-full w-1/4 rounded-md bg-gold/70" />
            </div>
            <p className="w-10 shrink-0 text-right font-display text-lg italic tabular-nums text-gold">
              ~25
            </p>
          </div>
        </div>
      </div>
    </ChartFrame>
  );
}

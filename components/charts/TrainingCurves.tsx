"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { useChartTheme, type ChartTheme } from "@/components/charts/useChartTheme";

type SeriesPoint = { step: number; value: number };

function parseWandbSeries(text: string, metricHint: "train/loss" | "eval/loss"): SeriesPoint[] {
  const lines = text
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);
  if (lines.length < 2) return [];

  const header = splitCsvLine(lines[0]).map((h) => h.replace(/^"|"$/g, "").trim());
  const stepIdx = header.findIndex(
    (h) => h === "train/global_step" || h.toLowerCase() === "step",
  );
  const valueIdx = header.findIndex((h) => {
    const lower = h.toLowerCase();
    return (
      lower.includes(metricHint) &&
      !lower.includes("__min") &&
      !lower.includes("__max")
    );
  });
  if (stepIdx < 0 || valueIdx < 0) return [];

  const points: SeriesPoint[] = [];
  for (const line of lines.slice(1)) {
    const cols = splitCsvLine(line).map((c) => c.replace(/^"|"$/g, "").trim());
    const step = Number(cols[stepIdx]);
    const value = Number(cols[valueIdx]);
    if (!Number.isFinite(step) || !Number.isFinite(value)) continue;
    points.push({ step, value });
  }
  return points;
}

/** Minimal CSV splitter that respects quoted commas. */
function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      cur += ch;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

function TooltipBody({
  active,
  payload,
  label,
  metric,
}: {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string | number;
  metric: string;
}) {
  if (!active || !payload?.length || payload[0].value === undefined) return null;
  return (
    <div className="rounded-lg border border-line bg-canvas px-3 py-2 text-xs shadow-sm">
      <p className="font-medium tabular-nums text-cream">Step {label}</p>
      <p className="mt-1 text-muted">
        {metric}:{" "}
        <span className="tabular-nums text-cream">
          {Number(payload[0].value).toFixed(6)}
        </span>
      </p>
    </div>
  );
}

function CompactLine({
  data,
  theme,
  color,
  metric,
  showXAxis,
  xDomain,
  markMin,
  heightClass,
}: {
  data: SeriesPoint[];
  theme: ChartTheme;
  color: string;
  metric: string;
  showXAxis: boolean;
  xDomain: [number, number];
  markMin?: SeriesPoint | null;
  heightClass: string;
}) {
  return (
    <div className={heightClass}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: showXAxis ? 4 : 0 }}>
          <CartesianGrid vertical={false} stroke={theme.line} strokeDasharray="3 6" />
          <XAxis
            dataKey="step"
            type="number"
            domain={xDomain}
            hide={!showXAxis}
            tick={{ fill: theme.muted, fontSize: 11 }}
            axisLine={{ stroke: theme.line }}
            tickLine={false}
            tickCount={6}
          />
          <YAxis
            tick={{ fill: theme.muted, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={48}
            domain={["auto", "auto"]}
            tickFormatter={(v: number) =>
              Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2)
            }
          />
          <Tooltip
            content={<TooltipBody metric={metric} />}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="value"
            name={metric}
            stroke={color}
            strokeWidth={1.6}
            dot={data.length < 40 ? { r: 2.5, fill: color, strokeWidth: 0 } : false}
            activeDot={{ r: 3.5 }}
            connectNulls={false}
            isAnimationActive={false}
          />
          {markMin ? (
            <>
              <ReferenceLine
                x={markMin.step}
                stroke={theme.line}
                strokeDasharray="2 4"
              />
              <ReferenceDot
                x={markMin.step}
                y={markMin.value}
                r={4}
                fill={theme.canvas}
                stroke={theme.ink}
                strokeWidth={1.5}
                ifOverflow="extendDomain"
              />
            </>
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrainingCurves({
  trainSrc = "/data/wandb-train-loss.csv",
  evalSrc = "/data/wandb-eval-loss.csv",
  title = "Training and evaluation loss",
  caption = "Logged W&B train/loss and eval/loss against global step. Curves use separate y-scales; eval points are only shown where logged.",
}: {
  trainSrc?: string;
  evalSrc?: string;
  title?: string;
  caption?: string;
}) {
  const theme = useChartTheme();
  const [train, setTrain] = useState<SeriesPoint[] | null>(null);
  const [evalRows, setEvalRows] = useState<SeriesPoint[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);

    Promise.all([
      fetch(trainSrc).then(async (res) => {
        if (!res.ok) throw new Error(`Could not load ${trainSrc} (${res.status})`);
        return res.text();
      }),
      fetch(evalSrc).then(async (res) => {
        if (!res.ok) throw new Error(`Could not load ${evalSrc} (${res.status})`);
        return res.text();
      }),
    ])
      .then(([trainText, evalText]) => {
        if (cancelled) return;
        setTrain(parseWandbSeries(trainText, "train/loss"));
        setEvalRows(parseWandbSeries(evalText, "eval/loss"));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load CSV");
        setTrain([]);
        setEvalRows([]);
      });

    return () => {
      cancelled = true;
    };
  }, [trainSrc, evalSrc]);

  const lowestEval = useMemo(() => {
    if (!evalRows?.length) return null;
    return evalRows.reduce((best, row) =>
      row.value < best.value ? row : best,
    );
  }, [evalRows]);

  const xDomain = useMemo((): [number, number] => {
    const steps = [...(train ?? []), ...(evalRows ?? [])].map((p) => p.step);
    if (!steps.length) return [0, 1];
    return [0, Math.max(...steps)];
  }, [train, evalRows]);

  const loading = train === null || evalRows === null;

  return (
    <ChartFrame title={title} caption={caption}>
      {error ? (
        <p className="text-sm text-muted">{error}</p>
      ) : loading ? (
        <p className="text-sm text-muted">Loading training history…</p>
      ) : (
        <div className="space-y-5">
          <div>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                train/loss
              </p>
              <p className="text-xs tabular-nums text-muted">
                ends near{" "}
                <span className="text-cream">
                  {train.length
                    ? train[train.length - 1].value.toFixed(3)
                    : "—"}
                </span>
              </p>
            </div>
            <CompactLine
              data={train}
              theme={theme}
              color={theme.accent}
              metric="train/loss"
              showXAxis={false}
              xDomain={xDomain}
              heightClass="h-[160px] w-full sm:h-[180px]"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                eval/loss
              </p>
              {lowestEval ? (
                <p className="text-xs tabular-nums text-muted">
                  min{" "}
                  <span className="text-cream">
                    {lowestEval.value.toFixed(4)}
                  </span>{" "}
                  @ step{" "}
                  <span className="text-cream">{lowestEval.step}</span>
                </p>
              ) : null}
            </div>
            <CompactLine
              data={evalRows}
              theme={theme}
              color={theme.secondary}
              metric="eval/loss"
              showXAxis
              xDomain={xDomain}
              markMin={lowestEval}
              heightClass="h-[160px] w-full sm:h-[180px]"
            />
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Lowest validation loss sits in the 12k–13k step region
              {lowestEval ? (
                <>
                  {" "}
                  (step{" "}
                  <span className="tabular-nums text-cream">
                    {lowestEval.step}
                  </span>
                  )
                </>
              ) : null}
              ; afterward it rises slightly through the rest of the run.
            </p>
          </div>

          <p className="border-t border-line pt-3 text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            Shared x-axis · global step
          </p>
        </div>
      )}
    </ChartFrame>
  );
}

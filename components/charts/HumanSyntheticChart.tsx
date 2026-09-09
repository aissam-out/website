"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartFrame } from "@/components/charts/ChartFrame";
import { useChartTheme } from "@/components/charts/useChartTheme";
import { humanSynthetic, round2 } from "@/lib/charts/translategemma-data";

const data = [
  {
    label: "Synthetic Arabic",
    group: "Synthetic",
    value: Number(round2(humanSynthetic.syntheticArabic)),
  },
  {
    label: "Synthetic Arabizi",
    group: "Synthetic",
    value: Number(round2(humanSynthetic.syntheticArabizi)),
  },
  {
    label: "Human Arabic",
    group: "Human",
    value: Number(round2(humanSynthetic.humanArabic)),
  },
  {
    label: "Human Arabizi",
    group: "Human",
    value: Number(round2(humanSynthetic.humanArabizi)),
  },
];

function TooltipBody({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload?: { label: string; group: string; value: number } }[];
}) {
  if (!active || !payload?.[0]?.payload) return null;
  const row = payload[0].payload;
  return (
    <div className="rounded-lg border border-line bg-canvas px-3 py-2 text-xs shadow-sm">
      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-muted">
        {row.group}
      </p>
      <p className="mt-1 font-medium text-cream">{row.label}</p>
      <p className="mt-0.5 tabular-nums text-muted">
        BLEU{" "}
        <span className="text-cream">{round2(row.value)}</span>
      </p>
    </div>
  );
}

export function HumanSyntheticChart({
  title = "Why the external benchmark matters",
  caption = "The internal aggregate score is dominated by synthetic data. Human held-out data is much harder, and much closer to the external benchmark.",
  subtitle = "Held-out synthetic data is much easier than human data.",
}: {
  title?: string;
  caption?: string;
  subtitle?: string;
}) {
  const theme = useChartTheme();

  return (
    <ChartFrame title={title} caption={caption}>
      <p className="mb-4 text-sm leading-relaxed text-muted">{subtitle}</p>
      <div className="mb-2 flex gap-6 text-xs uppercase tracking-[0.16em] text-muted">
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2 w-6 rounded-sm"
            style={{ background: theme.accent }}
            aria-hidden
          />
          Synthetic
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2 w-6 rounded-sm"
            style={{ background: theme.secondary, opacity: 0.75 }}
            aria-hidden
          />
          Human
        </span>
      </div>
      <div className="h-[280px] w-full sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 8, left: 0, bottom: 28 }}
            barCategoryGap="22%"
          >
            <CartesianGrid
              vertical={false}
              stroke={theme.line}
              strokeDasharray="3 6"
            />
            <XAxis
              dataKey="label"
              interval={0}
              tick={{ fill: theme.muted, fontSize: 11 }}
              axisLine={{ stroke: theme.line }}
              tickLine={false}
              angle={-18}
              textAnchor="end"
              height={48}
            />
            <YAxis
              tick={{ fill: theme.muted, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={36}
              label={{
                value: "BLEU ↑",
                angle: -90,
                position: "insideLeft",
                fill: theme.muted,
                fontSize: 11,
              }}
            />
            <Tooltip content={<TooltipBody />} cursor={{ fill: theme.line, opacity: 0.35 }} />
            <Bar dataKey="value" name="BLEU" radius={[3, 3, 0, 0]} maxBarSize={56}>
              {data.map((entry) => (
                <Cell
                  key={entry.label}
                  fill={
                    entry.group === "Synthetic" ? theme.accent : theme.secondary
                  }
                  fillOpacity={entry.group === "Synthetic" ? 1 : 0.7}
                />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                formatter={(v) =>
                  typeof v === "number" ? round2(v) : String(v ?? "")
                }
                style={{ fill: theme.ink, fontSize: 11 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartFrame>
  );
}

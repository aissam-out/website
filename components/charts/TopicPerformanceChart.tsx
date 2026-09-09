"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartFrame, ChartLegend } from "@/components/charts/ChartFrame";
import { useChartTheme } from "@/components/charts/useChartTheme";
import {
  averageBleu,
  round2,
  topicPerformance,
} from "@/lib/charts/translategemma-data";

const data = [...topicPerformance]
  .map((row) => ({
    topic: row.topic,
    arabic: Number(round2(row.arabic)),
    arabizi: Number(round2(row.arabizi)),
    avg: averageBleu(row.arabic, row.arabizi),
  }))
  .sort((a, b) => b.avg - a.avg);

function TooltipBody({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-line bg-canvas px-3 py-2 text-xs shadow-sm">
      <p className="font-medium text-cream">{label}</p>
      <ul className="mt-1 space-y-0.5 text-muted">
        {payload.map((entry) => (
          <li key={String(entry.name)}>
            {entry.name}:{" "}
            <span className="tabular-nums text-cream">
              {typeof entry.value === "number" ? round2(entry.value) : "—"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TopicPerformanceChart({
  title = "Where the model is strong, and where it still struggles",
  caption = "Translation quality depends heavily on the phenomenon. Long and code-switched sentences are surprisingly strong. Idioms remain the model’s clearest weakness.",
}: {
  title?: string;
  caption?: string;
}) {
  const theme = useChartTheme();

  return (
    <ChartFrame title={title} caption={caption}>
      <div className="h-[520px] w-full sm:h-[560px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 4, right: 16, left: 4, bottom: 8 }}
            barCategoryGap="18%"
            barGap={3}
          >
            <CartesianGrid
              horizontal={false}
              stroke={theme.line}
              strokeDasharray="3 6"
            />
            <XAxis
              type="number"
              tick={{ fill: theme.muted, fontSize: 11 }}
              axisLine={{ stroke: theme.line }}
              tickLine={false}
              domain={[0, 50]}
              label={{
                value: "BLEU ↑",
                position: "insideBottom",
                offset: -2,
                fill: theme.muted,
                fontSize: 11,
              }}
            />
            <YAxis
              type="category"
              dataKey="topic"
              width={118}
              tick={{ fill: theme.ink, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<TooltipBody />}
              cursor={{ fill: theme.line, opacity: 0.35 }}
            />
            <Bar
              dataKey="arabic"
              name="Arabic script"
              fill={theme.accent}
              radius={[0, 2, 2, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="arabizi"
              name="Arabizi"
              fill={theme.secondary}
              fillOpacity={0.7}
              radius={[0, 2, 2, 0]}
              maxBarSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <ChartLegend
        items={[
          { label: "Arabic script", color: theme.accent },
          { label: "Arabizi", color: theme.secondary },
        ]}
      />
    </ChartFrame>
  );
}

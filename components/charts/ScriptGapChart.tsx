"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartFrame, ChartLegend } from "@/components/charts/ChartFrame";
import { useChartTheme } from "@/components/charts/useChartTheme";
import { round2, scriptGap } from "@/lib/charts/translategemma-data";

const data = [
  {
    script: "Arabic script",
    base: Number(round2(scriptGap.base.arabic)),
    fineTuned: Number(round2(scriptGap.fineTuned.arabic)),
  },
  {
    script: "Arabizi",
    base: Number(round2(scriptGap.base.arabizi)),
    fineTuned: Number(round2(scriptGap.fineTuned.arabizi)),
  },
];

function TooltipBody({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
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

export function ScriptGapChart({
  title = "Darija → English: Fine-tuning nearly closes the script gap",
  caption = "The base model had a large gap between Arabic-script Darija and Arabizi. Fine-tuning nearly removed it.",
}: {
  title?: string;
  caption?: string;
}) {
  const theme = useChartTheme();

  return (
    <ChartFrame title={title} caption={caption}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted">
            Arabic–Arabizi BLEU gap
          </p>
          <p className="mt-1 font-display text-3xl italic tabular-nums text-cream">
            {round2(scriptGap.gap.base)}{" "}
            <span className="text-gold" aria-hidden>
              →
            </span>{" "}
            {round2(scriptGap.gap.fineTuned)}
          </p>
        </div>
        <p className="max-w-xs text-sm leading-snug text-muted">
          Gap fell from{" "}
          <span className="tabular-nums text-cream">
            {round2(scriptGap.gap.base)}
          </span>{" "}
          to{" "}
          <span className="tabular-nums text-cream">
            {round2(scriptGap.gap.fineTuned)}
          </span>{" "}
          BLEU.
        </p>
      </div>

      <div className="h-[280px] w-full sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 8, left: 0, bottom: 4 }}
            barCategoryGap="28%"
            barGap={6}
          >
            <CartesianGrid
              vertical={false}
              stroke={theme.line}
              strokeDasharray="3 6"
            />
            <XAxis
              dataKey="script"
              tick={{ fill: theme.muted, fontSize: 12 }}
              axisLine={{ stroke: theme.line }}
              tickLine={false}
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
                offset: 8,
              }}
            />
            <Tooltip
              content={<TooltipBody />}
              cursor={{ fill: theme.line, opacity: 0.35 }}
            />
            <Bar
              dataKey="base"
              name="Base TranslateGemma"
              fill={theme.secondary}
              fillOpacity={0.55}
              radius={[3, 3, 0, 0]}
              maxBarSize={52}
            >
              <LabelList
                dataKey="base"
                position="top"
                formatter={(v) =>
                  typeof v === "number" ? round2(v) : String(v ?? "")
                }
                style={{ fill: theme.muted, fontSize: 11 }}
              />
            </Bar>
            <Bar
              dataKey="fineTuned"
              name="Fine-tuned"
              fill={theme.accent}
              radius={[3, 3, 0, 0]}
              maxBarSize={52}
            >
              <LabelList
                dataKey="fineTuned"
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
      <ChartLegend
        items={[
          { label: "Base TranslateGemma", color: theme.secondary },
          { label: "Fine-tuned", color: theme.accent },
        ]}
      />
    </ChartFrame>
  );
}

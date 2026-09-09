/** Exact evaluation numbers for the TranslateGemma Darija article. Do not approximate. */

export const scriptGap = {
  base: {
    arabic: 12.621939397817476,
    arabizi: 3.5905130311540048,
  },
  fineTuned: {
    arabic: 33.71852208591826,
    arabizi: 31.91341324346104,
  },
  gap: {
    base: 9.03,
    fineTuned: 1.81,
  },
} as const;

export const topicPerformance = [
  { topic: "Long sentences", arabic: 47.6242, arabizi: 46.0483 },
  { topic: "Mixed language", arabic: 41.0398, arabizi: 43.1824 },
  { topic: "Named entities", arabic: 38.1751, arabizi: 33.014 },
  { topic: "Common phrases", arabic: 32.4565, arabizi: 33.2802 },
  { topic: "Incorrect spellings", arabic: 30.8842, arabizi: 29.9186 },
  { topic: "Educational", arabic: 32.2379, arabizi: 28.3852 },
  { topic: "Numeric & date", arabic: 22.9393, arabizi: 18.2572 },
  { topic: "Dialect variation", arabic: 19.8655, arabizi: 19.2808 },
  { topic: "Religion", arabic: 20.5926, arabizi: 17.1513 },
  { topic: "Humor", arabic: 16.7255, arabizi: 18.8627 },
  { topic: "Idioms", arabic: 6.1135, arabizi: 2.6283 },
] as const;

export const humanSynthetic = {
  syntheticArabic: 71.3663,
  syntheticArabizi: 70.5154,
  humanArabic: 29.8126,
  humanArabizi: 30.8267,
} as const;

export const metricHero = {
  bleu: { before: 7.49, after: 32.82, higherIsBetter: true },
  chrf: { before: 31.15, after: 52.1, higherIsBetter: true },
  ter: { before: 116.11, after: 53.53, higherIsBetter: false },
} as const;

export const engineeringTimeline = [
  {
    title: "Dataset + QLoRA",
    note: "500,350 semantic rows · 4-bit NF4 · LoRA on LM attention / MLP",
  },
  {
    title: "RunPod RTX 4090",
    note: "Training begins · throughput initially lower than expected",
  },
  {
    title: "Throughput tuning",
    note: "Improved the data/batching path and GPU utilization",
  },
  {
    title: "Hugging Face checkpoints",
    note: "Adapter and trainer state checkpointed regularly to Hugging Face",
  },
  {
    title: "Vast.ai + checkpoint recovery",
    note: "Moved with ~30% of training left · PyTorch 2.6 RNG-state compatibility issue · resumed at ~13,001 / 18,527",
  },
  {
    title: "Finished + local inference",
    note: "18,527 optimizer steps · one epoch · M4 MacBook Air inference",
  },
] as const;

export function round2(value: number): string {
  return value.toFixed(2);
}

export function averageBleu(arabic: number, arabizi: number): number {
  return (arabic + arabizi) / 2;
}

export const ttsExperiments = [
  {
    id: "01",
    model: "MOSS Local",
    parameters: "1.7B parameters",
    progress: "~3,024 updates · 3 epochs",
    evidence:
      "Loss fell from ~5.05 to ~4.7. Speech remained below my listening target.",
    accent: false,
  },
  {
    id: "02",
    model: "MOSS Local v1.5",
    parameters: "4B parameters",
    progress: "4,266 / 5,165 updates observed",
    evidence:
      "Loss plateaued near ~5.1; uploads failed. No controlled verdict on the last local checkpoint.",
    accent: false,
  },
  {
    id: "03",
    model: "OmniVoice",
    parameters: "0.6B parameters",
    progress: "3,000 steps, continued to 5,000 total",
    evidence:
      "Promising Darija speech before adaptation. Final inference model saved and usable.",
    accent: true,
  },
] as const;

export const ttsCheckpointSizes = [
  {
    label: "Full checkpoint",
    detail: "Training-state archive",
    gb: 6.9,
    tone: "muted" as const,
  },
  {
    label: "Optimizer file",
    detail: "Part of the full checkpoint",
    gb: 4.6,
    tone: "soft" as const,
  },
  {
    label: "Final inference repository",
    detail: "Weights and inference assets",
    gb: 2.46,
    tone: "accent" as const,
  },
] as const;

export const ttsCheckpointScaleMax = 7;

"use client";

import { useEffect, useState } from "react";

export type ChartTheme = {
  accent: string;
  accentSoft: string;
  ink: string;
  muted: string;
  line: string;
  canvas: string;
  canvas2: string;
  secondary: string;
  fontSans: string;
  fontDisplay: string;
};

const FALLBACK: ChartTheme = {
  accent: "#09a1be",
  accentSoft: "#1aa6b8",
  ink: "#0d0b09",
  muted: "#6b6460",
  line: "rgba(13, 11, 9, 0.09)",
  canvas: "#ffffff",
  canvas2: "#fbfbfb",
  secondary: "#6b6460",
  fontSans: "ui-sans-serif, system-ui, sans-serif",
  fontDisplay: "ui-serif, Georgia, serif",
};

function readTheme(): ChartTheme {
  if (typeof window === "undefined") return FALLBACK;
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => {
    const value = styles.getPropertyValue(name).trim();
    return value || fallback;
  };
  const ink = read("--palette-cream", FALLBACK.ink);
  const muted = read("--palette-muted", FALLBACK.muted);
  return {
    accent: read("--palette-gold", FALLBACK.accent),
    accentSoft: read("--palette-gold-soft", FALLBACK.accentSoft),
    ink,
    muted,
    line: read("--palette-line", FALLBACK.line),
    canvas: read("--palette-canvas", FALLBACK.canvas),
    canvas2: read("--palette-canvas-2", FALLBACK.canvas2),
    // Second series: muted ink, not a decorative dashboard color
    secondary: muted,
    fontSans: read("--font-outfit", FALLBACK.fontSans) || FALLBACK.fontSans,
    fontDisplay:
      read("--font-cormorant", FALLBACK.fontDisplay) || FALLBACK.fontDisplay,
  };
}

export function useChartTheme(): ChartTheme {
  const [theme, setTheme] = useState<ChartTheme>(FALLBACK);

  useEffect(() => {
    const update = () => setTheme(readTheme());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", update);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, []);

  return theme;
}

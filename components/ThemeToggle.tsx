"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-cream/80 transition hover:border-gold hover:text-gold ${className}`}
      aria-label={label}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" />
        </svg>
      )}
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full z-50 mt-2 whitespace-nowrap rounded-md border border-line bg-canvas-2 px-2 py-1 text-xs text-cream opacity-0 shadow-sm transition group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {isDark ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
}

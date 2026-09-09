import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  variant?: "gold" | "ghost";
};

export function ButtonLink({
  variant = "gold",
  className = "",
  ...props
}: Props) {
  const styles =
    variant === "gold"
      ? "bg-gold text-canvas hover:opacity-90"
      : "border border-line text-cream hover:border-gold hover:text-gold";

  return (
    <Link
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition ${styles} ${className}`}
      {...props}
    />
  );
}

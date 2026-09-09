export function parsePostDate(date: string): Date | null {
  if (!date) return null;
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const value = parts
    ? new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]))
    : new Date(date);
  if (Number.isNaN(value.getTime())) return null;
  return value;
}

export function formatDateLong(date: string) {
  const value = parsePostDate(date);
  if (!value) return null;
  return value.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(date: string) {
  const value = parsePostDate(date);
  if (!value) return null;
  return value.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

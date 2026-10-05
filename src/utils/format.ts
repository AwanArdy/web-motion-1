export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function readingTime(text?: string): number {
  const words = text?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

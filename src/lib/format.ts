// Shared formatting helpers for money/date display. Kept framework-free so
// they can be used from both API layer (aggregation) and UI components.

export function parseLeadPrice(price: string | null | undefined): number {
  if (!price) return 0;
  const parsed = Number(price.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("he-IL").format(value);
}

export function formatHebrewDate(date: string | null | undefined): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("he-IL").format(new Date(date));
}

export function currentMonthName(): string {
  return new Intl.DateTimeFormat("he-IL", { month: "long" }).format(new Date());
}

// Shared range calculation for Supabase `.range(from, to)` pagination,
// used by every list endpoint (leads, marketing goals, ...).

export function getRange(page = 1, pageSize = 50) {
  const safePage = Math.max(1, page);
  const safePageSize = Math.min(Math.max(1, pageSize), 100);
  const from = (safePage - 1) * safePageSize;
  return { from, to: from + safePageSize - 1 };
}

import { useQuery } from "@tanstack/react-query";
import { getDashboardSummary } from "@/lib/api/dashboard.functions";

export function useDashboardSummary(userId: string | undefined) {
  return useQuery({
    queryKey: ["dashboard", "summary", userId],
    queryFn: () => getDashboardSummary(userId!),
    enabled: !!userId,
    staleTime: 1000 * 30,
  });
}

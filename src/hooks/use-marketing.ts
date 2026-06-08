import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listMarketingGoals,
  createMarketingGoal,
  updateMarketingGoal,
  deleteMarketingGoal,
  toggleAction,
  type ListMarketingGoalsOptions,
} from "@/lib/api/marketing.functions";
import type {
  ActionItem,
  MarketingCategory,
  MarketingGoal,
  MarketingGoalInsert,
  MarketingGoalUpdate,
} from "@/lib/db/schemas";

export function useMarketingGoals(
  userId: string | undefined,
  categoryOrOptions?: MarketingCategory | ListMarketingGoalsOptions,
) {
  const options =
    typeof categoryOrOptions === "string"
      ? { category: categoryOrOptions }
      : (categoryOrOptions ?? {});

  return useQuery({
    queryKey: ["marketing", userId, options],
    queryFn: async () => {
      const data = await listMarketingGoals(userId!, options);
      return data as MarketingGoal[];
    },
    enabled: !!userId,
  });
}

export function useCreateMarketingGoal(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: MarketingGoalInsert) => createMarketingGoal(userId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketing", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    },
  });
}

export function useUpdateMarketingGoal(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, updates }: { goalId: string; updates: MarketingGoalUpdate }) =>
      updateMarketingGoal(goalId, userId, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketing", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    },
  });
}

export function useDeleteMarketingGoal(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (goalId: string) => deleteMarketingGoal(goalId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketing", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    },
  });
}

export function useToggleAction(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, actions }: { goalId: string; actions: ActionItem[] }) =>
      toggleAction(goalId, userId, actions),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketing", userId] });
    },
  });
}

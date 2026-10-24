import { supabase } from "@/lib/db/client";
import {
  actionItemSchema,
  marketingGoalInsertSchema,
  marketingGoalUpdateSchema,
  type MarketingCategory,
  type MarketingGoalInsert,
  type MarketingGoalUpdate,
  type ActionItem,
} from "@/lib/db/schemas";
import { parseInput } from "@/lib/validation";
import { getRange } from "@/lib/api/pagination";

const MARKETING_GOAL_SELECT =
  "id, user_id, category, title, description, measurable_target, target_date, actions, weekly_task, status, created_at, updated_at";

export type ListMarketingGoalsOptions = {
  category?: MarketingCategory;
  page?: number;
  pageSize?: number;
};

export async function listMarketingGoals(userId: string, options: ListMarketingGoalsOptions = {}) {
  const { category, page, pageSize } = options;
  const { from, to } = getRange(page, pageSize);
  let query = supabase
    .from("marketing_goals")
    .select(MARKETING_GOAL_SELECT)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createMarketingGoal(userId: string, input: MarketingGoalInsert) {
  const validInput = parseInput(marketingGoalInsertSchema, input);
  const { data, error } = await supabase
    .from("marketing_goals")
    .insert({ ...validInput, user_id: userId, created_by: userId })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateMarketingGoal(
  goalId: string,
  userId: string,
  updates: MarketingGoalUpdate,
) {
  const validUpdates = parseInput(marketingGoalUpdateSchema, updates);
  const { data, error } = await supabase
    .from("marketing_goals")
    .update({ ...validUpdates, updated_by: userId })
    .eq("id", goalId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteMarketingGoal(goalId: string, userId: string) {
  const { error } = await supabase
    .from("marketing_goals")
    .delete()
    .eq("id", goalId)
    .eq("user_id", userId);

  if (error) throw error;
}

export async function toggleAction(goalId: string, userId: string, actions: ActionItem[]) {
  const validActions = parseInput(actionItemSchema.array(), actions);
  const { data, error } = await supabase
    .from("marketing_goals")
    .update({
      actions: validActions as unknown as import("@/lib/db/database.types").Json,
      updated_by: userId,
    })
    .eq("id", goalId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

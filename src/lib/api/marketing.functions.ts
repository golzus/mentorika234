import { supabase } from "@/lib/db/client";
import type {
  MarketingCategory,
  MarketingGoalInsert,
  MarketingGoalUpdate,
  ActionItem,
} from "@/lib/db/schemas";

export async function listMarketingGoals(userId: string, category?: MarketingCategory) {
  let query = supabase
    .from("marketing_goals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function createMarketingGoal(userId: string, input: MarketingGoalInsert) {
  const { data, error } = await supabase
    .from("marketing_goals")
    .insert({ ...input, user_id: userId, created_by: userId })
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
  const { data, error } = await supabase
    .from("marketing_goals")
    .update({ ...updates, updated_by: userId })
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
  const { data, error } = await supabase
    .from("marketing_goals")
    .update({
      actions: actions as unknown as import("@/lib/db/database.types").Json,
      updated_by: userId,
    })
    .eq("id", goalId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

import { u as useQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BRRtD0JQ.mjs";
import { p as parseInput, c as actionItemSchema, d as marketingGoalInsertSchema, m as marketingGoalUpdateSchema } from "./router-C5VHrHSa.mjs";
import { g as getRange } from "./pagination-vppo7EAz.mjs";
const MARKETING_GOAL_SELECT = "id, user_id, category, title, description, measurable_target, target_date, actions, weekly_task, status, created_at, updated_at";
async function listMarketingGoals(userId, options = {}) {
  const { category, page, pageSize } = options;
  const { from, to } = getRange(page, pageSize);
  let query = supabase.from("marketing_goals").select(MARKETING_GOAL_SELECT).eq("user_id", userId).order("created_at", { ascending: false }).range(from, to);
  if (category) {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}
async function createMarketingGoal(userId, input) {
  const validInput = parseInput(marketingGoalInsertSchema, input);
  const { data, error } = await supabase.from("marketing_goals").insert({ ...validInput, user_id: userId, created_by: userId }).select().single();
  if (error) throw error;
  return data;
}
async function updateMarketingGoal(goalId, userId, updates) {
  const validUpdates = parseInput(marketingGoalUpdateSchema, updates);
  const { data, error } = await supabase.from("marketing_goals").update({ ...validUpdates, updated_by: userId }).eq("id", goalId).eq("user_id", userId).select().single();
  if (error) throw error;
  return data;
}
async function deleteMarketingGoal(goalId, userId) {
  const { error } = await supabase.from("marketing_goals").delete().eq("id", goalId).eq("user_id", userId);
  if (error) throw error;
}
async function toggleAction(goalId, userId, actions) {
  const validActions = parseInput(actionItemSchema.array(), actions);
  const { data, error } = await supabase.from("marketing_goals").update({
    actions: validActions,
    updated_by: userId
  }).eq("id", goalId).eq("user_id", userId).select().single();
  if (error) throw error;
  return data;
}
function useMarketingGoals(userId, categoryOrOptions) {
  const options = typeof categoryOrOptions === "string" ? { category: categoryOrOptions } : categoryOrOptions ?? {};
  return useQuery({
    queryKey: ["marketing", userId, options],
    queryFn: async () => {
      const data = await listMarketingGoals(userId, options);
      return data;
    },
    enabled: !!userId
  });
}
function useCreateMarketingGoal(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input) => createMarketingGoal(userId, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketing", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    }
  });
}
function useUpdateMarketingGoal(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, updates }) => updateMarketingGoal(goalId, userId, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketing", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    }
  });
}
function useDeleteMarketingGoal(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (goalId) => deleteMarketingGoal(goalId, userId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketing", userId] });
      qc.invalidateQueries({ queryKey: ["dashboard", "summary", userId] });
    }
  });
}
function useToggleAction(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, actions }) => toggleAction(goalId, userId, actions),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["marketing", userId] });
    }
  });
}
export {
  useDeleteMarketingGoal as a,
  useUpdateMarketingGoal as b,
  useToggleAction as c,
  useCreateMarketingGoal as d,
  useMarketingGoals as u
};

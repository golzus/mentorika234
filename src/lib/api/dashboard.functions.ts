import { supabase } from "@/lib/db/client";

export type DashboardSummary = {
  leadsTotal: number;
  leadsThisMonth: number;
  leadsNew: number;
  leadsInProgress: number;
  leadsClosed: number;
  marketingGoalsActive: number;
  marketingGoalsCompleted: number;
  weeklyTasks: { id: string; title: string; category: string; weekly_task: string | null }[];
  categoryGoals: Record<string, number>;
  profile: {
    first_name: string | null;
    last_name: string | null;
    monthly_salary_target: number | null;
    new_clients_target: number | null;
  } | null;
};

export async function getDashboardSummary(userId: string): Promise<DashboardSummary> {
  const [leadsRes, marketingRes, profileRes] = await Promise.all([
    supabase.from("leads").select("status, created_at").eq("user_id", userId),
    supabase
      .from("marketing_goals")
      .select("id, title, category, weekly_task, status")
      .eq("user_id", userId),
    supabase
      .from("profiles")
      .select("first_name, last_name, monthly_salary_target, new_clients_target")
      .eq("id", userId)
      .single(),
  ]);

  if (leadsRes.error) throw leadsRes.error;
  if (marketingRes.error) throw marketingRes.error;

  const leads = leadsRes.data ?? [];
  const goals = marketingRes.data ?? [];
  const now = new Date();
  const isCurrentMonth = (date: string) => {
    const value = new Date(date);
    return value.getMonth() === now.getMonth() && value.getFullYear() === now.getFullYear();
  };

  const categoryGoals: Record<string, number> = {};
  for (const g of goals) {
    if (g.status === "active") {
      categoryGoals[g.category] = (categoryGoals[g.category] ?? 0) + 1;
    }
  }

  return {
    leadsTotal: leads.length,
    leadsThisMonth: leads.filter((l) => isCurrentMonth(l.created_at)).length,
    leadsNew: leads.filter((l) => l.status === "new").length,
    leadsInProgress: leads.filter((l) => l.status === "in_progress").length,
    leadsClosed: leads.filter((l) => l.status === "closed").length,
    marketingGoalsActive: goals.filter((g) => g.status === "active").length,
    marketingGoalsCompleted: goals.filter((g) => g.status === "completed").length,
    weeklyTasks: goals
      .filter((g) => g.status === "active" && g.weekly_task)
      .slice(0, 8)
      .map((g) => ({
        id: g.id,
        title: g.title,
        category: g.category,
        weekly_task: g.weekly_task,
      })),
    categoryGoals,
    profile: profileRes.error ? null : profileRes.data,
  };
}

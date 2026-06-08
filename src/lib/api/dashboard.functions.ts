import { supabase } from "@/lib/db/client";
import type { Lead } from "@/lib/db/schemas";

export type DashboardSummary = {
  leadsTotal: number;
  leadsThisMonth: number;
  leadsNew: number;
  leadsInProgress: number;
  leadsClosed: number;
  monthlyRevenue: number;
  negotiationLeads: Lead[];
  monthlyLeads: Lead[];
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

const LEAD_SELECT =
  "id, user_id, name, phone, email, source, interested_in, proposed_price, notes, status, created_at, updated_at";

function parsePrice(price: string | null | undefined) {
  if (!price) return 0;
  const parsed = Number(price.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function getDashboardSummary(userId: string): Promise<DashboardSummary> {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

  const [
    totalRes,
    monthRes,
    newRes,
    inProgressRes,
    closedRes,
    monthlyClosedRes,
    negotiationRes,
    monthlyLeadsRes,
    marketingRes,
    profileRes,
  ] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", monthStart)
      .lt("created_at", nextMonthStart),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "new"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "in_progress"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("status", "closed"),
    supabase
      .from("leads")
      .select("proposed_price")
      .eq("user_id", userId)
      .eq("status", "closed")
      .gte("updated_at", monthStart)
      .lt("updated_at", nextMonthStart),
    supabase
      .from("leads")
      .select(LEAD_SELECT)
      .eq("user_id", userId)
      .eq("status", "in_progress")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase
      .from("leads")
      .select(LEAD_SELECT)
      .eq("user_id", userId)
      .gte("created_at", monthStart)
      .lt("created_at", nextMonthStart)
      .order("created_at", { ascending: false })
      .limit(3),
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

  if (totalRes.error) throw totalRes.error;
  if (monthRes.error) throw monthRes.error;
  if (newRes.error) throw newRes.error;
  if (inProgressRes.error) throw inProgressRes.error;
  if (closedRes.error) throw closedRes.error;
  if (monthlyClosedRes.error) throw monthlyClosedRes.error;
  if (negotiationRes.error) throw negotiationRes.error;
  if (monthlyLeadsRes.error) throw monthlyLeadsRes.error;
  if (marketingRes.error) throw marketingRes.error;

  const goals = marketingRes.data ?? [];

  const categoryGoals: Record<string, number> = {};
  for (const g of goals) {
    if (g.status === "active") {
      categoryGoals[g.category] = (categoryGoals[g.category] ?? 0) + 1;
    }
  }

  return {
    leadsTotal: totalRes.count ?? 0,
    leadsThisMonth: monthRes.count ?? 0,
    leadsNew: newRes.count ?? 0,
    leadsInProgress: inProgressRes.count ?? 0,
    leadsClosed: closedRes.count ?? 0,
    monthlyRevenue: (monthlyClosedRes.data ?? []).reduce(
      (sum, lead) => sum + parsePrice(lead.proposed_price),
      0,
    ),
    negotiationLeads: (negotiationRes.data ?? []) as Lead[],
    monthlyLeads: (monthlyLeadsRes.data ?? []) as Lead[],
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

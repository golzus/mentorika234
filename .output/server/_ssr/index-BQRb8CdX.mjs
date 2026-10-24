import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as ConfirmDialog } from "./pagination-vppo7EAz.mjs";
import { b as useUpdateLead, c as useDeleteLead, e as LEAD_SELECT, d as LeadActionsBar } from "./use-leads-6lvJK4e1.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BRRtD0JQ.mjs";
import { d as useCreateMarketingGoal, b as useUpdateMarketingGoal, a as useDeleteMarketingGoal } from "./use-marketing-CWoKBn2Y.mjs";
import { u as useAuth } from "./router-C5VHrHSa.mjs";
import { b as Pencil, T as Trash2, P as Plus, a as LoaderCircle } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
const gaugeSvg = "/assets/gauge-65-DzjpdfNC.svg";
function parseLeadPrice(price) {
  if (!price) return 0;
  const parsed = Number(price.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}
function formatCurrency(value) {
  return new Intl.NumberFormat("he-IL").format(value);
}
function formatHebrewDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("he-IL").format(new Date(date));
}
function currentMonthName() {
  return new Intl.DateTimeFormat("he-IL", { month: "long" }).format(/* @__PURE__ */ new Date());
}
async function getDashboardSummary(userId) {
  const now = /* @__PURE__ */ new Date();
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
    profileRes
  ] = await Promise.all([
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("user_id", userId),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("user_id", userId).gte("created_at", monthStart).lt("created_at", nextMonthStart),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("status", "new"),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("status", "in_progress"),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("status", "closed"),
    supabase.from("leads").select("proposed_price").eq("user_id", userId).eq("status", "closed").gte("updated_at", monthStart).lt("updated_at", nextMonthStart),
    supabase.from("leads").select(LEAD_SELECT).eq("user_id", userId).eq("status", "in_progress").order("created_at", { ascending: false }).limit(8),
    supabase.from("leads").select(LEAD_SELECT).eq("user_id", userId).gte("created_at", monthStart).lt("created_at", nextMonthStart).order("created_at", { ascending: false }).limit(3),
    supabase.from("marketing_goals").select("id, title, category, weekly_task, status").eq("user_id", userId),
    supabase.from("profiles").select("first_name, last_name, monthly_salary_target, new_clients_target").eq("id", userId).single()
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
  const categoryGoals = {};
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
      (sum, lead) => sum + parseLeadPrice(lead.proposed_price),
      0
    ),
    negotiationLeads: negotiationRes.data ?? [],
    monthlyLeads: monthlyLeadsRes.data ?? [],
    marketingGoalsActive: goals.filter((g) => g.status === "active").length,
    marketingGoalsCompleted: goals.filter((g) => g.status === "completed").length,
    weeklyTasks: goals.filter((g) => g.status === "active" && g.weekly_task).slice(0, 8).map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      weekly_task: g.weekly_task
    })),
    categoryGoals,
    profile: profileRes.error ? null : profileRes.data
  };
}
function useDashboardSummary(userId) {
  return useQuery({
    queryKey: ["dashboard", "summary", userId],
    queryFn: () => getDashboardSummary(userId),
    enabled: !!userId,
    staleTime: 1e3 * 30
  });
}
const marketingCategories = ["מכירות", "חשיפה", 'שתפ"ם', "שימור", "המלצות", "בניית תשתיות"];
const statCards = [{
  label: "מכירות",
  category: "מכירות",
  sub: "מכירות יזומות מול הלקוח הפוטנציאלי",
  color: "#008f15"
}, {
  label: "חשיפה",
  category: "חשיפה",
  sub: "פרונטלית / פרינטית / דיגיטלית",
  color: "#ff9914"
}, {
  label: 'שתפ"ים',
  category: 'שתפ"ם',
  sub: "הפניות ושיתופי פעולה",
  color: "#f15a48"
}, {
  label: "שימור",
  category: "שימור",
  sub: "מתנות ומעקב שביעות רצון לקוח",
  color: "#f15a48"
}, {
  label: "המלצות",
  category: "המלצות",
  sub: "איסוף המלצות מלקוחות מרוצים",
  color: "#ff9914"
}, {
  label: "בניית תשתיות",
  category: "בניית תשתיות",
  sub: "פיתוח כלים ותהליכים שיווקיים",
  color: "#008f15"
}];
function LeadsDashboard() {
  const {
    user
  } = useAuth();
  const [editingLead, setEditingLead] = reactExports.useState(null);
  const [deletingLead, setDeletingLead] = reactExports.useState(null);
  const [taskModal, setTaskModal] = reactExports.useState(null);
  const [deletingTask, setDeletingTask] = reactExports.useState(null);
  const updateLead = useUpdateLead(user?.id ?? "");
  const deleteLead = useDeleteLead(user?.id ?? "");
  const createTask = useCreateMarketingGoal(user?.id ?? "");
  const updateTask = useUpdateMarketingGoal(user?.id ?? "");
  const deleteTask = useDeleteMarketingGoal(user?.id ?? "");
  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError
  } = useDashboardSummary(user?.id);
  const negotiationLeads = summary?.negotiationLeads ?? [];
  const monthlyLeads = summary?.monthlyLeads ?? [];
  const monthlyRevenue = summary?.monthlyRevenue ?? 0;
  const monthlyTarget = summary?.profile?.monthly_salary_target ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 lg:h-full lg:min-h-0 lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-4 lg:pb-4 lg:pl-[110px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-start-1 lg:col-span-7 lg:row-start-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadsSection, { leads: negotiationLeads, isLoading: summaryLoading, isError: summaryError, onEditLead: setEditingLead, onDeleteLead: setDeletingLead }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-start-8 lg:col-span-5 lg:row-start-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TasksSection, { tasks: summary?.weeklyTasks ?? [], isLoading: summaryLoading, isError: summaryError, onAddTask: () => setTaskModal({
        mode: "add"
      }), onEditTask: (task) => setTaskModal({
        mode: "edit",
        task
      }), onDeleteTask: setDeletingTask, onToggleTaskComplete: (task) => updateTask.mutate({
        goalId: task.id,
        updates: {
          status: "completed"
        }
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-start-1 lg:col-span-4 lg:row-start-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueSection, { revenue: monthlyRevenue, target: monthlyTarget }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-start-5 lg:col-span-3 lg:row-start-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MonthlyLeadsSection, { leads: monthlyLeads, total: summary?.leadsThisMonth ?? monthlyLeads.length, isLoading: summaryLoading, isError: summaryError }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-start-8 lg:col-span-5 lg:row-start-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, { categoryGoals: summary?.categoryGoals ?? {}, isLoading: summaryLoading, isError: summaryError }) })
    ] }),
    editingLead && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadEditModal, { lead: editingLead, onClose: () => setEditingLead(null), onSave: async (updates) => {
      await updateLead.mutateAsync({
        leadId: editingLead.id,
        updates
      });
      setEditingLead(null);
    } }),
    deletingLead && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDialog, { onConfirm: () => {
      deleteLead.mutate(deletingLead.id);
      setDeletingLead(null);
    }, onCancel: () => setDeletingLead(null) }),
    taskModal && /* @__PURE__ */ jsxRuntimeExports.jsx(TaskModal, { mode: taskModal.mode, task: taskModal.mode === "edit" ? taskModal.task : void 0, onClose: () => setTaskModal(null), onSave: async (input) => {
      if (taskModal.mode === "add") {
        await createTask.mutateAsync(input);
      } else {
        await updateTask.mutateAsync({
          goalId: taskModal.task.id,
          updates: input
        });
      }
      setTaskModal(null);
    } }),
    deletingTask && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDialog, { onConfirm: () => {
      deleteTask.mutate(deletingTask.id);
      setDeletingTask(null);
    }, onCancel: () => setDeletingTask(null) })
  ] });
}
function Card({
  title,
  headerExtra,
  children,
  className,
  bodyClassName
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `flex h-full min-h-[220px] flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)] ${className ?? ""}`, children: [
    title && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-[32px] shrink-0 items-center justify-center bg-[#00b6b5] px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[15px] font-bold leading-none text-[#0d0221] md:text-[16px]", children: title }),
      headerExtra && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-3 top-1/2 -translate-y-1/2", children: headerExtra })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex min-h-0 flex-1 flex-col ${bodyClassName ?? "p-3"}`, children })
  ] });
}
function EmptyState({
  children,
  tone = "neutral"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex flex-1 items-center justify-center text-center text-[14px] ${tone === "error" ? "text-[#f15a48]" : "text-[#0d0221]/70"}`, children });
}
function LoadingState({
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center justify-center text-[14px] text-[#0d0221]/70", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "ml-2 h-4 w-4 animate-spin" }),
    label
  ] });
}
function LeadsSection({
  leads,
  isLoading,
  isError,
  onEditLead,
  onDeleteLead
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: 'לידים במו"מ', className: "shadow-[0_10px_20px_rgba(0,182,181,0.3)]", bodyClassName: "p-3 md:p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto pl-1 pr-1", dir: "rtl", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { label: "טוען לידים..." }),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tone: "error", children: "שגיאה בטעינת הלידים" }),
    !isLoading && !isError && leads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { children: 'אין כרגע לידים במו"מ' }),
    !isLoading && !isError && leads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: leads.map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(LeadRow, { lead, highlight: i === 0, onEdit: () => onEditLead(lead), onDelete: () => onDeleteLead(lead) }, lead.id)) })
  ] }) });
}
function LeadRow({
  lead,
  highlight,
  onEdit,
  onDelete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-[8px] bg-white p-2.5", style: {
    boxShadow: highlight ? "0 6px 14px rgba(241,90,72,0.2)" : "0 6px 14px rgba(0,0,0,0.08)"
  }, dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 truncate text-right", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-[15px] font-bold text-[#0d0221]", children: lead.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[12px] text-[#0d0221]/60", children: formatHebrewDate(lead.created_at) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-[12px] text-[#0d0221]/80", children: [lead.source, lead.interested_in, lead.proposed_price].filter(Boolean).join(" · ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeadActionsBar, { lead, onEdit, onDelete }) })
  ] });
}
function TasksSection({
  tasks,
  isLoading,
  isError,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleTaskComplete
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "משימות שבועיות", headerExtra: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onAddTask, className: "flex h-6 w-9 items-center justify-center rounded-full bg-[#f15a48] text-white shadow", "aria-label": "הוספת משימה שבועית", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4", strokeWidth: 2.4 }) }), bodyClassName: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto pl-1 pr-1", dir: "rtl", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { label: "טוען משימות..." }),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tone: "error", children: "שגיאה בטעינת המשימות" }),
    !isLoading && !isError && tasks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { children: "אין משימות שבועיות פעילות" }),
    !isLoading && !isError && tasks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: tasks.map((task) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-[8px] bg-white p-2.5 shadow-[0_6px_14px_rgba(0,0,0,0.08)]", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onToggleTaskComplete(task), className: "h-5 w-5 shrink-0 rounded-full border-2 border-[#f15a48] transition-colors hover:bg-[#f15a48]/10", "aria-label": "סימון משימה כהושלמה" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[14px] font-medium leading-tight text-[#f15a48]", children: task.weekly_task || task.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-[11px] text-[#f15a48]/80", children: task.category })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2 text-[#f15a48]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onEditTask(task), "aria-label": "עריכת משימה", className: "hover:opacity-70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => onDeleteTask(task), "aria-label": "מחיקת משימה", className: "hover:opacity-70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
      ] })
    ] }, task.id)) })
  ] }) });
}
function RevenueSection({
  revenue,
  target
}) {
  const percentage = target > 0 ? Math.min(100, Math.round(revenue / target * 100)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: `סך הכנסות לחודש ${currentMonthName()}`, bodyClassName: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 text-right", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "truncate text-[26px] font-bold leading-tight text-[#f15a48] md:text-[36px]", children: [
        formatCurrency(revenue),
        ' ש"ח'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] leading-tight text-[#0d0221] md:text-[15px]", children: [
        "מתוך יעד של ",
        formatCurrency(target),
        ' ש"ח'
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex h-[100px] w-[100px] shrink-0 items-center justify-center md:h-[120px] md:w-[120px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: gaugeSvg, alt: `${percentage}%`, className: "h-full w-full" }) })
  ] }) });
}
function MonthlyLeadsSection({
  leads,
  total,
  isLoading,
  isError
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "לידים החודש", bodyClassName: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto", dir: "rtl", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingState, { label: "טוען..." }),
    isError && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tone: "error", children: "שגיאה בטעינת לידים" }),
    !isLoading && !isError && leads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { children: "אין לידים חדשים החודש" }),
    !isLoading && !isError && leads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      leads.map((lead) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 rounded-[6px] bg-white p-2 text-[12px] text-[#0d0221] shadow-[0_4px_10px_rgba(0,0,0,0.06)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate text-right font-bold", children: lead.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[11px] text-[#0d0221]/70", children: lead.proposed_price || "" })
      ] }, lead.id)),
      total > leads.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-[12px] font-bold text-[#f15a48]", children: [
        "ועוד ",
        total - leads.length,
        " לידים החודש"
      ] })
    ] })
  ] }) });
}
function StatsSection({
  categoryGoals,
  isLoading,
  isError
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full min-h-[220px] items-center justify-center rounded-[12px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "ml-2 h-5 w-5 animate-spin text-[#0d0221]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] text-[#0d0221]", children: "טוען נתוני שיווק..." })
    ] });
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full min-h-[220px] items-center justify-center rounded-[12px] bg-white text-[14px] text-[#f15a48] shadow-[0_10px_20px_rgba(0,0,0,0.1)]", children: "שגיאה בטעינת נתוני שיווק" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full min-h-[220px] grid-cols-3 grid-rows-2 gap-2", children: statCards.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { stat, value: categoryGoals[stat.category] ?? 0 }, stat.label)) });
}
function StatCard({
  stat,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.1)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[26px] shrink-0 items-center justify-center bg-[#00b6b5]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold text-[#0d0221] md:text-[14px]", children: stat.label }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-around gap-1 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-center text-[10px] leading-tight text-[#0d0221]", dir: "rtl", children: stat.sub }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[28px] font-extrabold leading-none md:text-[32px]", style: {
        color: stat.color
      }, children: value })
    ] })
  ] });
}
function LeadEditModal({
  lead,
  onClose,
  onSave
}) {
  const [name, setName] = reactExports.useState(lead.name);
  const [phone, setPhone] = reactExports.useState(lead.phone ?? "");
  const [email, setEmail] = reactExports.useState(lead.email ?? "");
  const [source, setSource] = reactExports.useState(lead.source ?? "");
  const [interestedIn, setInterestedIn] = reactExports.useState(lead.interested_in ?? "");
  const [proposedPrice, setProposedPrice] = reactExports.useState(lead.proposed_price ?? "");
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const save = async () => {
    if (!name.trim()) {
      setError("שם הליד חובה");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave({
        name: name.trim(),
        phone: phone.trim() || void 0,
        email: email.trim() || void 0,
        source: source.trim() || void 0,
        interested_in: interestedIn.trim() || void 0,
        proposed_price: proposedPrice.trim() || void 0
      });
    } catch {
      setError("שגיאה בשמירה, נסי שוב");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4", onClick: onClose, dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[900px] rounded-[14px] bg-white p-6 shadow-2xl md:p-8", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-center text-[20px] font-bold text-[#00b6b5] md:text-[22px]", children: "עריכת ליד" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardField, { label: "שם *", value: name, onChange: setName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardField, { label: "טלפון", value: phone, onChange: setPhone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardField, { label: "מייל", value: email, onChange: setEmail }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardField, { label: "מקור הליד", value: source, onChange: setSource }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardField, { label: "מעוניין ב", value: interestedIn, onChange: setInterestedIn }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardField, { label: "הצעת מחיר", value: proposedPrice, onChange: setProposedPrice })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-[14px] text-red-500", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalActions, { saving, saveLabel: "שמירת שינויים", onCancel: onClose, onSave: save })
  ] }) });
}
function TaskModal({
  mode,
  task,
  onClose,
  onSave
}) {
  const initialCategory = marketingCategories.includes(task?.category) ? task?.category : "מכירות";
  const [title, setTitle] = reactExports.useState(task?.title ?? "");
  const [weeklyTask, setWeeklyTask] = reactExports.useState(task?.weekly_task ?? "");
  const [category, setCategory] = reactExports.useState(initialCategory);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const save = async () => {
    if (!title.trim()) {
      setError("כותרת משימה חובה");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave({
        title: title.trim(),
        category,
        weekly_task: weeklyTask.trim() || void 0,
        ...mode === "add" ? {
          status: "active"
        } : {}
      });
    } catch {
      setError("שגיאה בשמירה, נסי שוב");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4", onClick: onClose, dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[760px] rounded-[14px] bg-white p-6 shadow-2xl md:p-8", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-6 text-center text-[20px] font-bold text-[#00b6b5] md:text-[22px]", children: mode === "add" ? "הוספת משימה שבועית" : "עריכת משימה שבועית" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardField, { label: "כותרת *", value: title, onChange: setTitle }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "overflow-hidden rounded-[10px] border border-[#eee] bg-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block bg-[#00b6b5] py-2 text-center text-[14px] font-bold text-white", children: "קטגוריה" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full bg-transparent px-3 py-2.5 text-center text-[14px] outline-none", children: marketingCategories.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: item, children: item }, item)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardField, { label: "משימה שבועית", value: weeklyTask, onChange: setWeeklyTask }) })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-[14px] text-red-500", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModalActions, { saving, saveLabel: mode === "add" ? "הוספת משימה" : "שמירת שינויים", onCancel: onClose, onSave: save })
  ] }) });
}
function DashboardField({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "overflow-hidden rounded-[10px] border border-[#eee] bg-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block bg-[#00b6b5] py-2 text-center text-[14px] font-bold text-white", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "w-full bg-transparent px-3 py-2.5 text-center text-[14px] outline-none" })
  ] });
}
function ModalActions({
  saving,
  saveLabel,
  onCancel,
  onSave
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex items-center justify-end gap-3", dir: "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onCancel, className: "h-[42px] rounded-[8px] border border-[#222] bg-white px-8 text-[15px] font-medium text-[#222]", children: "ביטול" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onSave, disabled: saving, className: "h-[42px] rounded-[8px] bg-[#f15a48] px-8 text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)] disabled:opacity-60", children: saving ? "שומר..." : saveLabel })
  ] });
}
export {
  LeadsDashboard as component
};

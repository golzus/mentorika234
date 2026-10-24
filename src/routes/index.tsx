import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import gaugeSvg from "@/assets/gauge-65.svg";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LeadActionsBar } from "@/components/LeadActionsBar";
import { useDashboardSummary } from "@/hooks/use-dashboard";
import {
  useCreateMarketingGoal,
  useDeleteMarketingGoal,
  useUpdateMarketingGoal,
} from "@/hooks/use-marketing";
import { useDeleteLead, useUpdateLead } from "@/hooks/use-leads";
import { useAuth } from "@/lib/auth/auth-context";
import { requireAuth } from "@/lib/auth/route-guards";
import { formatCurrency, formatHebrewDate, currentMonthName } from "@/lib/format";
import type {
  Lead,
  LeadUpdate,
  MarketingCategory,
  MarketingGoalInsert,
  MarketingGoalUpdate,
} from "@/lib/db/schemas";

export const Route = createFileRoute("/")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [
      { title: "מנטוריקה — ניהול לידים" },
      { name: "description", content: "מסך ניהול לידים, משימות שבועיות ויעדים חודשיים." },
    ],
  }),
  component: LeadsDashboard,
});

const marketingCategories: MarketingCategory[] = [
  "מכירות",
  "חשיפה",
  'שתפ"ם',
  "שימור",
  "המלצות",
  "בניית תשתיות",
];

type DashboardTask = {
  id: string;
  title: string;
  category: MarketingCategory | string;
  weekly_task: string | null;
};

type StatDefinition = {
  label: string;
  category: MarketingCategory;
  sub: string;
  color: string;
};

const statCards: StatDefinition[] = [
  {
    label: "מכירות",
    category: "מכירות",
    sub: "מכירות יזומות מול הלקוח הפוטנציאלי",
    color: "#008f15",
  },
  { label: "חשיפה", category: "חשיפה", sub: "פרונטלית / פרינטית / דיגיטלית", color: "#ff9914" },
  { label: 'שתפ"ים', category: 'שתפ"ם', sub: "הפניות ושיתופי פעולה", color: "#f15a48" },
  { label: "שימור", category: "שימור", sub: "מתנות ומעקב שביעות רצון לקוח", color: "#f15a48" },
  { label: "המלצות", category: "המלצות", sub: "איסוף המלצות מלקוחות מרוצים", color: "#ff9914" },
  {
    label: "בניית תשתיות",
    category: "בניית תשתיות",
    sub: "פיתוח כלים ותהליכים שיווקיים",
    color: "#008f15",
  },
];

function LeadsDashboard() {
  const { user } = useAuth();
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [taskModal, setTaskModal] = useState<
    { mode: "add" } | { mode: "edit"; task: DashboardTask } | null
  >(null);
  const [deletingTask, setDeletingTask] = useState<DashboardTask | null>(null);
  const updateLead = useUpdateLead(user?.id ?? "");
  const deleteLead = useDeleteLead(user?.id ?? "");
  const createTask = useCreateMarketingGoal(user?.id ?? "");
  const updateTask = useUpdateMarketingGoal(user?.id ?? "");
  const deleteTask = useDeleteMarketingGoal(user?.id ?? "");
  const {
    data: summary,
    isLoading: summaryLoading,
    isError: summaryError,
  } = useDashboardSummary(user?.id);

  const negotiationLeads = summary?.negotiationLeads ?? [];
  const monthlyLeads = summary?.monthlyLeads ?? [];
  const monthlyRevenue = summary?.monthlyRevenue ?? 0;
  const monthlyTarget = summary?.profile?.monthly_salary_target ?? 0;

  return (
    <>
      {/*
        Desktop (lg+): full viewport height, no page scroll — 2 rows.
        Mobile/tablet: natural flow, single column.
      */}
      {/* Figma layout — in RTL col-start-1 is rightmost.
         Row 1: Leads (right, wide) | Tasks (middle-left).
         Row 2: Revenue (right) | Monthly leads (middle) | Stats grid (left).
         The daily tip badge lives in DashboardShell (floats in top-left corner). */}
      <div className="flex flex-col gap-3 lg:h-full lg:min-h-0 lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-4 lg:pb-4 lg:pl-[110px]">
        <div className="lg:col-start-1 lg:col-span-7 lg:row-start-1">
          <LeadsSection
            leads={negotiationLeads}
            isLoading={summaryLoading}
            isError={summaryError}
            onEditLead={setEditingLead}
            onDeleteLead={setDeletingLead}
          />
        </div>
        <div className="lg:col-start-8 lg:col-span-5 lg:row-start-1">
          <TasksSection
            tasks={summary?.weeklyTasks ?? []}
            isLoading={summaryLoading}
            isError={summaryError}
            onAddTask={() => setTaskModal({ mode: "add" })}
            onEditTask={(task) => setTaskModal({ mode: "edit", task })}
            onDeleteTask={setDeletingTask}
            onToggleTaskComplete={(task) =>
              updateTask.mutate({ goalId: task.id, updates: { status: "completed" } })
            }
          />
        </div>

        <div className="lg:col-start-1 lg:col-span-4 lg:row-start-2">
          <RevenueSection revenue={monthlyRevenue} target={monthlyTarget} />
        </div>
        <div className="lg:col-start-5 lg:col-span-3 lg:row-start-2">
          <MonthlyLeadsSection
            leads={monthlyLeads}
            total={summary?.leadsThisMonth ?? monthlyLeads.length}
            isLoading={summaryLoading}
            isError={summaryError}
          />
        </div>
        <div className="lg:col-start-8 lg:col-span-5 lg:row-start-2">
          <StatsSection
            categoryGoals={summary?.categoryGoals ?? {}}
            isLoading={summaryLoading}
            isError={summaryError}
          />
        </div>
      </div>

      {editingLead && (
        <LeadEditModal
          lead={editingLead}
          onClose={() => setEditingLead(null)}
          onSave={async (updates) => {
            await updateLead.mutateAsync({ leadId: editingLead.id, updates });
            setEditingLead(null);
          }}
        />
      )}
      {deletingLead && (
        <ConfirmDialog
          onConfirm={() => {
            deleteLead.mutate(deletingLead.id);
            setDeletingLead(null);
          }}
          onCancel={() => setDeletingLead(null)}
        />
      )}
      {taskModal && (
        <TaskModal
          mode={taskModal.mode}
          task={taskModal.mode === "edit" ? taskModal.task : undefined}
          onClose={() => setTaskModal(null)}
          onSave={async (input) => {
            if (taskModal.mode === "add") {
              await createTask.mutateAsync(input as MarketingGoalInsert);
            } else {
              await updateTask.mutateAsync({
                goalId: taskModal.task.id,
                updates: input as MarketingGoalUpdate,
              });
            }
            setTaskModal(null);
          }}
        />
      )}
      {deletingTask && (
        <ConfirmDialog
          onConfirm={() => {
            deleteTask.mutate(deletingTask.id);
            setDeletingTask(null);
          }}
          onCancel={() => setDeletingTask(null)}
        />
      )}
    </>
  );
}

// Card fills its grid slot; header stays put; body scrolls when overflowing.
function Card({
  title,
  headerExtra,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  headerExtra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={`flex h-full min-h-[220px] flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)] ${className ?? ""}`}
    >
      {title && (
        <div className="relative flex h-[32px] shrink-0 items-center justify-center bg-[#00b6b5] px-4">
          <h3 className="text-[15px] font-bold leading-none text-[#0d0221] md:text-[16px]">
            {title}
          </h3>
          {headerExtra && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2">{headerExtra}</div>
          )}
        </div>
      )}
      <div className={`flex min-h-0 flex-1 flex-col ${bodyClassName ?? "p-3"}`}>{children}</div>
    </section>
  );
}

function EmptyState({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "error";
}) {
  return (
    <div
      className={`flex flex-1 items-center justify-center text-center text-[14px] ${tone === "error" ? "text-[#f15a48]" : "text-[#0d0221]/70"}`}
    >
      {children}
    </div>
  );
}

function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-1 items-center justify-center text-[14px] text-[#0d0221]/70">
      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

function LeadsSection({
  leads,
  isLoading,
  isError,
  onEditLead,
  onDeleteLead,
}: {
  leads: Lead[];
  isLoading: boolean;
  isError: boolean;
  onEditLead: (lead: Lead) => void;
  onDeleteLead: (lead: Lead) => void;
}) {
  return (
    <Card
      title='לידים במו"מ'
      className="shadow-[0_10px_20px_rgba(0,182,181,0.3)]"
      bodyClassName="p-3 md:p-4"
    >
      <div className="min-h-0 flex-1 overflow-y-auto pl-1 pr-1" dir="rtl">
        {isLoading && <LoadingState label="טוען לידים..." />}
        {isError && <EmptyState tone="error">שגיאה בטעינת הלידים</EmptyState>}
        {!isLoading && !isError && leads.length === 0 && (
          <EmptyState>אין כרגע לידים במו&quot;מ</EmptyState>
        )}
        {!isLoading && !isError && leads.length > 0 && (
          <div className="flex flex-col gap-2">
            {leads.map((lead, i) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                highlight={i === 0}
                onEdit={() => onEditLead(lead)}
                onDelete={() => onDeleteLead(lead)}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function LeadRow({
  lead,
  highlight,
  onEdit,
  onDelete,
}: {
  lead: Lead;
  highlight: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className="flex items-center gap-3 rounded-[8px] bg-white p-2.5"
      style={{
        boxShadow: highlight ? "0 6px 14px rgba(241,90,72,0.2)" : "0 6px 14px rgba(0,0,0,0.08)",
      }}
      dir="rtl"
    >
      <div className="min-w-0 flex-1 truncate text-right">
        <div className="flex items-baseline justify-between gap-2">
          <span className="truncate text-[15px] font-bold text-[#0d0221]">{lead.name}</span>
          <span className="shrink-0 text-[12px] text-[#0d0221]/60">
            {formatHebrewDate(lead.created_at)}
          </span>
        </div>
        <div className="mt-0.5 truncate text-[12px] text-[#0d0221]/80">
          {[lead.source, lead.interested_in, lead.proposed_price].filter(Boolean).join(" · ")}
        </div>
      </div>
      <div className="shrink-0" dir="ltr">
        <LeadActionsBar lead={lead} onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}

function TasksSection({
  tasks,
  isLoading,
  isError,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleTaskComplete,
}: {
  tasks: DashboardTask[];
  isLoading: boolean;
  isError: boolean;
  onAddTask: () => void;
  onEditTask: (task: DashboardTask) => void;
  onDeleteTask: (task: DashboardTask) => void;
  onToggleTaskComplete: (task: DashboardTask) => void;
}) {
  return (
    <Card
      title="משימות שבועיות"
      headerExtra={
        <button
          type="button"
          onClick={onAddTask}
          className="flex h-6 w-9 items-center justify-center rounded-full bg-[#f15a48] text-white shadow"
          aria-label="הוספת משימה שבועית"
        >
          <Plus className="h-4 w-4" strokeWidth={2.4} />
        </button>
      }
      bodyClassName="p-3"
    >
      <div className="min-h-0 flex-1 overflow-y-auto pl-1 pr-1" dir="rtl">
        {isLoading && <LoadingState label="טוען משימות..." />}
        {isError && <EmptyState tone="error">שגיאה בטעינת המשימות</EmptyState>}
        {!isLoading && !isError && tasks.length === 0 && (
          <EmptyState>אין משימות שבועיות פעילות</EmptyState>
        )}
        {!isLoading && !isError && tasks.length > 0 && (
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-[8px] bg-white p-2.5 shadow-[0_6px_14px_rgba(0,0,0,0.08)]"
                dir="rtl"
              >
                <button
                  type="button"
                  onClick={() => onToggleTaskComplete(task)}
                  className="h-5 w-5 shrink-0 rounded-full border-2 border-[#f15a48] transition-colors hover:bg-[#f15a48]/10"
                  aria-label="סימון משימה כהושלמה"
                />
                <div className="min-w-0 flex-1 text-right">
                  <div className="truncate text-[14px] font-medium leading-tight text-[#f15a48]">
                    {task.weekly_task || task.title}
                  </div>
                  <div className="mt-0.5 truncate text-[11px] text-[#f15a48]/80">
                    {task.category}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2 text-[#f15a48]">
                  <button
                    type="button"
                    onClick={() => onEditTask(task)}
                    aria-label="עריכת משימה"
                    className="hover:opacity-70"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteTask(task)}
                    aria-label="מחיקת משימה"
                    className="hover:opacity-70"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

function RevenueSection({ revenue, target }: { revenue: number; target: number }) {
  const percentage = target > 0 ? Math.min(100, Math.round((revenue / target) * 100)) : 0;

  return (
    <Card title={`סך הכנסות לחודש ${currentMonthName()}`} bodyClassName="p-4">
      <div className="flex flex-1 items-center justify-between gap-3">
        <div className="min-w-0 flex-1 text-right" dir="rtl">
          <div className="truncate text-[26px] font-bold leading-tight text-[#f15a48] md:text-[36px]">
            {formatCurrency(revenue)} ש&quot;ח
          </div>
          <div className="text-[12px] leading-tight text-[#0d0221] md:text-[15px]">
            מתוך יעד של {formatCurrency(target)} ש&quot;ח
          </div>
        </div>
        <div className="relative flex h-[100px] w-[100px] shrink-0 items-center justify-center md:h-[120px] md:w-[120px]">
          <img src={gaugeSvg} alt={`${percentage}%`} className="h-full w-full" />
        </div>
      </div>
    </Card>
  );
}

function MonthlyLeadsSection({
  leads,
  total,
  isLoading,
  isError,
}: {
  leads: Lead[];
  total: number;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <Card title="לידים החודש" bodyClassName="p-3">
      <div className="min-h-0 flex-1 overflow-y-auto" dir="rtl">
        {isLoading && <LoadingState label="טוען..." />}
        {isError && <EmptyState tone="error">שגיאה בטעינת לידים</EmptyState>}
        {!isLoading && !isError && leads.length === 0 && (
          <EmptyState>אין לידים חדשים החודש</EmptyState>
        )}
        {!isLoading && !isError && leads.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-2 rounded-[6px] bg-white p-2 text-[12px] text-[#0d0221] shadow-[0_4px_10px_rgba(0,0,0,0.06)]"
              >
                <span className="min-w-0 flex-1 truncate text-right font-bold">{lead.name}</span>
                <span className="shrink-0 text-[11px] text-[#0d0221]/70">
                  {lead.proposed_price || ""}
                </span>
              </div>
            ))}
            {total > leads.length && (
              <div className="text-center text-[12px] font-bold text-[#f15a48]">
                ועוד {total - leads.length} לידים החודש
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

function StatsSection({
  categoryGoals,
  isLoading,
  isError,
}: {
  categoryGoals: Record<string, number>;
  isLoading: boolean;
  isError: boolean;
}) {
  if (isLoading) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-[12px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        <Loader2 className="ml-2 h-5 w-5 animate-spin text-[#0d0221]" />
        <span className="text-[14px] text-[#0d0221]">טוען נתוני שיווק...</span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-full min-h-[220px] items-center justify-center rounded-[12px] bg-white text-[14px] text-[#f15a48] shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        שגיאה בטעינת נתוני שיווק
      </div>
    );
  }
  return (
    <div className="grid h-full min-h-[220px] grid-cols-3 grid-rows-2 gap-2">
      {statCards.map((stat) => (
        <StatCard key={stat.label} stat={stat} value={categoryGoals[stat.category] ?? 0} />
      ))}
    </div>
  );
}

function StatCard({ stat, value }: { stat: StatDefinition; value: number }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.1)]">
      <div className="flex h-[26px] shrink-0 items-center justify-center bg-[#00b6b5]">
        <span className="text-[13px] font-bold text-[#0d0221] md:text-[14px]">{stat.label}</span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-around gap-1 p-2">
        <p className="line-clamp-2 text-center text-[10px] leading-tight text-[#0d0221]" dir="rtl">
          {stat.sub}
        </p>
        <div
          className="text-[28px] font-extrabold leading-none md:text-[32px]"
          style={{ color: stat.color }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

// ── Modals ───────────────────────────────────────────────────────

function LeadEditModal({
  lead,
  onClose,
  onSave,
}: {
  lead: Lead;
  onClose: () => void;
  onSave: (updates: LeadUpdate) => Promise<void>;
}) {
  const [name, setName] = useState(lead.name);
  const [phone, setPhone] = useState(lead.phone ?? "");
  const [email, setEmail] = useState(lead.email ?? "");
  const [source, setSource] = useState(lead.source ?? "");
  const [interestedIn, setInterestedIn] = useState(lead.interested_in ?? "");
  const [proposedPrice, setProposedPrice] = useState(lead.proposed_price ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        source: source.trim() || undefined,
        interested_in: interestedIn.trim() || undefined,
        proposed_price: proposedPrice.trim() || undefined,
      });
    } catch {
      setError("שגיאה בשמירה, נסי שוב");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="w-full max-w-[900px] rounded-[14px] bg-white p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-center text-[20px] font-bold text-[#00b6b5] md:text-[22px]">
          עריכת ליד
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          <DashboardField label="שם *" value={name} onChange={setName} />
          <DashboardField label="טלפון" value={phone} onChange={setPhone} />
          <DashboardField label="מייל" value={email} onChange={setEmail} />
          <DashboardField label="מקור הליד" value={source} onChange={setSource} />
          <DashboardField label="מעוניין ב" value={interestedIn} onChange={setInterestedIn} />
          <DashboardField label="הצעת מחיר" value={proposedPrice} onChange={setProposedPrice} />
        </div>
        {error && <p className="mt-3 text-center text-[14px] text-red-500">{error}</p>}
        <ModalActions saving={saving} saveLabel="שמירת שינויים" onCancel={onClose} onSave={save} />
      </div>
    </div>
  );
}

function TaskModal({
  mode,
  task,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  task?: DashboardTask;
  onClose: () => void;
  onSave: (input: MarketingGoalInsert | MarketingGoalUpdate) => Promise<void>;
}) {
  const initialCategory = marketingCategories.includes(task?.category as MarketingCategory)
    ? (task?.category as MarketingCategory)
    : "מכירות";
  const [title, setTitle] = useState(task?.title ?? "");
  const [weeklyTask, setWeeklyTask] = useState(task?.weekly_task ?? "");
  const [category, setCategory] = useState<MarketingCategory>(initialCategory);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
        weekly_task: weeklyTask.trim() || undefined,
        ...(mode === "add" ? { status: "active" } : {}),
      });
    } catch {
      setError("שגיאה בשמירה, נסי שוב");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="w-full max-w-[760px] rounded-[14px] bg-white p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-center text-[20px] font-bold text-[#00b6b5] md:text-[22px]">
          {mode === "add" ? "הוספת משימה שבועית" : "עריכת משימה שבועית"}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DashboardField label="כותרת *" value={title} onChange={setTitle} />
          <label className="overflow-hidden rounded-[10px] border border-[#eee] bg-white">
            <span className="block bg-[#00b6b5] py-2 text-center text-[14px] font-bold text-white">
              קטגוריה
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as MarketingCategory)}
              className="w-full bg-transparent px-3 py-2.5 text-center text-[14px] outline-none"
            >
              {marketingCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <div className="sm:col-span-2">
            <DashboardField label="משימה שבועית" value={weeklyTask} onChange={setWeeklyTask} />
          </div>
        </div>
        {error && <p className="mt-3 text-center text-[14px] text-red-500">{error}</p>}
        <ModalActions
          saving={saving}
          saveLabel={mode === "add" ? "הוספת משימה" : "שמירת שינויים"}
          onCancel={onClose}
          onSave={save}
        />
      </div>
    </div>
  );
}

function DashboardField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="overflow-hidden rounded-[10px] border border-[#eee] bg-white">
      <span className="block bg-[#00b6b5] py-2 text-center text-[14px] font-bold text-white">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent px-3 py-2.5 text-center text-[14px] outline-none"
      />
    </label>
  );
}

function ModalActions({
  saving,
  saveLabel,
  onCancel,
  onSave,
}: {
  saving: boolean;
  saveLabel: string;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <div className="mt-7 flex items-center justify-end gap-3" dir="ltr">
      <button
        type="button"
        onClick={onCancel}
        className="h-[42px] rounded-[8px] border border-[#222] bg-white px-8 text-[15px] font-medium text-[#222]"
      >
        ביטול
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="h-[42px] rounded-[8px] bg-[#f15a48] px-8 text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)] disabled:opacity-60"
      >
        {saving ? "שומר..." : saveLabel}
      </button>
    </div>
  );
}

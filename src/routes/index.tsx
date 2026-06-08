import { createFileRoute } from "@tanstack/react-router";
import plusIcon from "@/assets/figma/plus-icon.svg";
import taskRadioDanger from "@/assets/figma/task-radio-danger.svg";
import taskEdit from "@/assets/figma/task-edit.svg";
import taskDelete from "@/assets/figma/task-delete.svg";
import taskFooterIcons from "@/assets/figma/task-footer-icons.svg";
import taskMore from "@/assets/figma/task-more.svg";
import gaugeSvg from "@/assets/gauge-65.svg";
import type { CSSProperties } from "react";
import { useState } from "react";
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

const DESIGN_WIDTH = 1650;
const DESIGN_HEIGHT = 870;
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

function figmaRect(left: number, top: number, width: number, height: number): CSSProperties {
  return {
    left: `${(left / DESIGN_WIDTH) * 100}%`,
    top: `${(top / DESIGN_HEIGHT) * 100}%`,
    width: `${(width / DESIGN_WIDTH) * 100}%`,
    height: `${(height / DESIGN_HEIGHT) * 100}%`,
  };
}

const statColumns = [
  {
    left: 930,
    top: { label: 'שתפ"ים', category: 'שתפ"ם', sub: "הפניות ושיתופי פעולה", color: "#f15a48" },
    bottom: {
      label: "בניית תשתיות",
      category: "בניית תשתיות",
      sub: "פיתוח כלים ותהליכים שיווקיים",
      color: "#008f15",
    },
  },
  {
    left: 1100,
    top: {
      label: "חשיפה",
      category: "חשיפה",
      sub: "פרונטלית / פרינטית / דיגיטלית",
      color: "#ff9914",
    },
    bottom: {
      label: "המלצות",
      category: "המלצות",
      sub: "איסוף המלצות מלקוחות מרוצים",
      color: "#ff9914",
    },
  },
  {
    left: 1270,
    top: {
      label: "מכירות",
      category: "מכירות",
      sub: "מכירות יזומות\nמול הלקוח הפוטנציאלי",
      color: "#008f15",
    },
    bottom: {
      label: "שימור",
      category: "שימור",
      sub: "מתנות ומעקב שביעות\nרצון לקוח",
      color: "#f15a48",
    },
  },
] satisfies {
  left: number;
  top: StatDefinition;
  bottom: StatDefinition;
}[];

type StatDefinition = {
  label: string;
  category: MarketingCategory;
  sub: string;
  color: string;
};

function formatDate(date: string | null | undefined) {
  if (!date) return "";
  return new Intl.DateTimeFormat("he-IL").format(new Date(date));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("he-IL").format(value);
}

function currentMonthName() {
  return new Intl.DateTimeFormat("he-IL", { month: "long" }).format(new Date());
}

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
  const isLoading = summaryLoading;
  const isError = summaryError;

  return (
    <>
      <LeadsSection
        leads={negotiationLeads}
        isLoading={summaryLoading}
        isError={summaryError}
        onEditLead={setEditingLead}
        onDeleteLead={setDeletingLead}
      />
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
      <RevenueSection revenue={monthlyRevenue} target={monthlyTarget} />
      <MonthlyLeadsSection
        leads={monthlyLeads}
        total={summary?.leadsThisMonth ?? monthlyLeads.length}
        isLoading={summaryLoading}
        isError={summaryError}
      />
      <StatsSection
        categoryGoals={summary?.categoryGoals ?? {}}
        isLoading={isLoading}
        isError={isError}
      />
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

function TealHeader({
  left,
  top,
  width,
  children,
}: {
  left: number;
  top: number;
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute flex h-[30px] items-center justify-center rounded-t-[10px] bg-[#00b6b5] shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
      style={figmaRect(left, top, width, 30)}
    >
      <h3 className="text-[18px] font-bold leading-[25px] text-[#0d0221]">{children}</h3>
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
    <section
      className="absolute overflow-hidden rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,182,181,0.3)]"
      style={figmaRect(90, 180.5, 810, 360)}
    >
      <div className="flex h-[30px] items-center justify-center rounded-t-[10px] bg-[#00b6b5] shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
        <h3 className="text-[18px] font-bold leading-[25px] text-[#0d0221]">לידים במו&quot;מ</h3>
      </div>

      <div className="h-[330px] overflow-y-auto px-[60px] py-[30px]" dir="rtl">
        {isLoading && (
          <div className="flex h-full items-center justify-center text-center text-[18px] leading-[25px] text-[#0d0221]">
            טוען לידים...
          </div>
        )}
        {isError && (
          <div className="flex h-full items-center justify-center text-center text-[18px] leading-[25px] text-[#f15a48]">
            שגיאה בטעינת הלידים
          </div>
        )}
        {!isLoading && !isError && leads.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-[18px] leading-[25px] text-[#0d0221]">
            אין כרגע לידים במו&quot;מ
          </div>
        )}

        {!isLoading && !isError && leads.length > 0 && (
          <div className="flex min-h-full flex-col gap-[14.99px]">
            {leads.map((lead, i) => (
              <div
                key={lead.id}
                className="relative flex h-[39.13px] shrink-0 items-center rounded-[5px] bg-white"
                style={{
                  boxShadow:
                    i === 0 ? "0 10px 20px rgba(241,90,72,0.2)" : "0 10px 20px rgba(0,0,0,0.1)",
                }}
                dir="ltr"
              >
                <div className="absolute left-[30px] top-1/2 -translate-y-1/2">
                  <LeadActionsBar
                    phone={lead.phone}
                    email={lead.email}
                    onEdit={() => onEditLead(lead)}
                    onDelete={() => onDeleteLead(lead)}
                    className="h-[24.357px] w-[92.269px]"
                  />
                </div>

                <div
                  className="absolute left-[155px] right-[30px] top-1/2 grid h-[24.783px] -translate-y-1/2 grid-cols-[120px_1px_90px_1px_115px_1px_80px_1px_90px] items-center text-[18px] leading-[25px] text-[#0d0221]"
                  dir="rtl"
                >
                  <div className="min-w-0 truncate text-right font-bold">{lead.name}</div>
                  <div className="h-[19px] w-px bg-[#d9d9d9]" />
                  <div className="min-w-0 truncate text-right">{lead.source}</div>
                  <div className="h-[19px] w-px bg-[#d9d9d9]" />
                  <div className="min-w-0 truncate text-right">{lead.interested_in}</div>
                  <div className="h-[19px] w-px bg-[#d9d9d9]" />
                  <div className="min-w-0 truncate text-right">{lead.proposed_price}</div>
                  <div className="h-[19px] w-px bg-[#d9d9d9]" />
                  <div className="min-w-0 truncate text-right">{formatDate(lead.created_at)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
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
    <section
      className="absolute overflow-hidden rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
      style={figmaRect(930, 180.5, 510, 300)}
    >
      <div className="flex h-[30px] items-center justify-center rounded-t-[10px] bg-[#00b6b5] shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
        <h3 className="text-[18px] font-bold leading-[25px] text-[#0d0221]">משימות שבועיות</h3>
      </div>
      <button
        type="button"
        onClick={onAddTask}
        className="absolute left-[50px] top-[5.5px] flex h-[19px] w-[29px] items-center justify-center rounded-[10px] bg-[#f15a48] shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
        aria-label="הוספת משימה שבועית"
      >
        <img src={plusIcon} alt="" className="h-[13px] w-[15px]" />
      </button>

      <div className="h-[230px] overflow-y-auto px-[60px] pb-[12px] pt-[10px]" dir="rtl">
        {isLoading && (
          <div className="flex h-full items-center justify-center text-center text-[18px] leading-[25px] text-[#0d0221]">
            טוען משימות...
          </div>
        )}
        {isError && (
          <div className="flex h-full items-center justify-center text-center text-[18px] leading-[25px] text-[#f15a48]">
            שגיאה בטעינת המשימות
          </div>
        )}
        {!isLoading && !isError && tasks.length === 0 && (
          <div className="flex h-full items-center justify-center text-center text-[18px] leading-[25px] text-[#0d0221]">
            אין משימות שבועיות פעילות
          </div>
        )}

        {!isLoading && !isError && tasks.length > 0 && (
          <div className="flex min-h-full flex-col gap-[11px]">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="relative h-[42px] shrink-0 rounded-[8px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
                dir="rtl"
              >
                <button
                  type="button"
                  onClick={() => onToggleTaskComplete(task)}
                  className="absolute right-[18px] top-[7px] size-[16px]"
                  aria-label="סימון משימה כהושלמה"
                >
                  <img src={taskRadioDanger} alt="" className="size-[16px]" />
                </button>
                <div className="absolute left-[82px] right-[48px] top-[4px] truncate text-right text-[18px] leading-[25px] text-[#f15a48]">
                  {task.weekly_task || task.title}
                </div>
                <div className="absolute bottom-[3px] left-[82px] right-[48px] truncate text-right text-[14px] leading-[20px] text-[#f15a48]">
                  {task.category}
                </div>
                <div className="absolute bottom-[6px] left-[18px] flex w-[46px] items-center justify-start gap-[16px]">
                  <button
                    type="button"
                    onClick={() => onEditTask(task)}
                    className="flex size-[14px] items-center justify-center"
                    aria-label="עריכת משימה"
                  >
                    <img src={taskEdit} alt="" className="size-[11px]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteTask(task)}
                    className="flex size-[14px] items-center justify-center"
                    aria-label="מחיקת משימה"
                  >
                    <img src={taskDelete} alt="" className="h-[11px] w-[9.533px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <img
        src={taskFooterIcons}
        alt=""
        className="absolute bottom-[17px] left-[60px] h-[12.437px] w-[110.651px]"
      />
      <img
        src={taskMore}
        alt=""
        className="absolute bottom-[14px] left-[420px] h-[18px] w-[24px]"
      />
      <div
        className="absolute bottom-[7px] left-[210px] w-[210px] text-right text-[18px] leading-[25px] text-black"
        dir="rtl"
      >
        ...
      </div>
    </section>
  );
}

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="w-[92vw] max-w-[900px] rounded-[14px] bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-center text-[22px] font-bold text-[#00b6b5]">עריכת ליד</h2>
        <div className="grid grid-cols-3 gap-3">
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="w-[92vw] max-w-[760px] rounded-[14px] bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-center text-[22px] font-bold text-[#00b6b5]">
          {mode === "add" ? "הוספת משימה שבועית" : "עריכת משימה שבועית"}
        </h2>
        <div className="grid grid-cols-2 gap-3">
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
          <div className="col-span-2">
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
    <div className="mt-7 flex items-center gap-3" dir="ltr">
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

function RevenueSection({ revenue, target }: { revenue: number; target: number }) {
  const percentage = target > 0 ? Math.min(100, Math.round((revenue / target) * 100)) : 0;

  return (
    <>
      <div
        className="absolute rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        style={figmaRect(90, 570.5, 450, 210)}
      />
      <TealHeader left={90} top={570.5} width={450}>
        סך הכנסות לחודש <span className="underline decoration-[9.5%]">{currentMonthName()}</span>
      </TealHeader>

      <img
        src={gaugeSvg}
        alt={`${percentage}%`}
        className="absolute"
        style={figmaRect(117, 622, 109, 109)}
      />
      <div className="absolute text-right" style={figmaRect(255, 643, 245, 95)} dir="rtl">
        <div className="text-[40px] font-bold leading-[46.665px] text-[#f15a48]">
          {formatCurrency(revenue)} ש&quot;ח
        </div>
        <div className="text-[19.534px] leading-[46.665px] text-[#0d0221]">
          מתוך יעד של {formatCurrency(target)} ש&quot;ח
        </div>
      </div>
    </>
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
  const visibleLeads = leads.slice(0, 3);

  return (
    <section
      className="absolute overflow-hidden rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.12)]"
      style={figmaRect(570, 570.5, 330, 210)}
      dir="rtl"
    >
      <div className="flex h-[31px] items-center justify-center bg-[#00b6b5] text-[18px] font-bold leading-none text-[#0d0221]">
        לידים החודש
      </div>
      {isLoading && (
        <div className="flex h-[calc(100%-31px)] items-center justify-center text-center text-[16px] leading-[25px] text-[#0d0221]">
          טוען לידים...
        </div>
      )}
      {isError && (
        <div className="flex h-[calc(100%-31px)] items-center justify-center text-center text-[16px] leading-[25px] text-[#f15a48]">
          שגיאה בטעינת לידים
        </div>
      )}
      {!isLoading && !isError && leads.length === 0 && (
        <div className="flex h-[calc(100%-31px)] items-center justify-center text-center text-[16px] leading-[25px] text-[#0d0221]">
          אין לידים חדשים החודש
        </div>
      )}

      {!isLoading && !isError && leads.length > 0 && (
        <div className="flex flex-col gap-[14px] px-[22px] pt-[22px]">
          {visibleLeads.map((lead) => (
            <div
              key={lead.id}
              className="flex h-[39px] items-center justify-center rounded-[5px] bg-white px-[10px] text-[#0d0221] shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
            >
              <div className="grid w-full grid-cols-[minmax(58px,1fr)_1px_minmax(52px,0.9fr)_1px_minmax(72px,1.1fr)_1px_minmax(48px,0.8fr)] items-center gap-[7px] text-[12px] leading-[15px]">
                <span className="truncate text-right text-[18px] font-bold leading-[25px]">
                  {lead.name}
                </span>
                <span className="h-[9px] w-px bg-[#d9d9d9]" />
                <span className="truncate text-right">{lead.source || "מקור"}</span>
                <span className="h-[9px] w-px bg-[#d9d9d9]" />
                <span className="truncate text-right">{lead.proposed_price || "הצעת מחיר"}</span>
                <span className="h-[9px] w-px bg-[#d9d9d9]" />
                <span className="truncate text-right">{formatDate(lead.created_at)}</span>
              </div>
            </div>
          ))}
          {total > visibleLeads.length && (
            <div className="text-center text-[13px] font-bold leading-[18px] text-[#f15a48]">
              ועוד {total - visibleLeads.length} לידים החודש
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function StatsColumn({
  left,
  top,
  bottom,
  categoryGoals,
}: {
  left: number;
  top: StatDefinition;
  bottom: StatDefinition;
  categoryGoals: Record<string, number>;
}) {
  return (
    <div
      className="absolute overflow-hidden rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
      style={figmaRect(left, 510.5, 170, 270)}
    >
      {/* Top half */}
      <div className="flex h-[22.5px] items-center justify-center rounded-t-[10px] bg-[#00b6b5]">
        <span className="text-[18px] font-bold leading-[25px] text-[#0d0221]">{top.label}</span>
      </div>
      <div className="flex h-[112.5px] flex-col items-center justify-around px-1 py-1">
        <p
          className="w-full whitespace-pre-line text-center text-[12px] leading-[15px] text-[#0d0221]"
          dir="rtl"
        >
          {top.sub}
        </p>
        <div className="text-[40px] font-extrabold leading-none" style={{ color: top.color }}>
          {categoryGoals[top.category] ?? 0}
        </div>
      </div>

      {/* Bottom half */}
      <div className="flex h-[22.5px] w-full items-center justify-center bg-[#00b6b5] shadow-[0_10px_20px_rgba(0,0,0,0.1),0_-10px_20px_rgba(0,0,0,0.1)]">
        <span className="text-[18px] font-bold leading-[25px] text-[#0d0221]">{bottom.label}</span>
      </div>
      <div className="flex h-[112.5px] flex-col items-center justify-around px-1 py-1">
        <p
          className="w-full whitespace-pre-line text-center text-[12px] leading-[15px] text-[#0d0221]"
          dir="rtl"
        >
          {bottom.sub}
        </p>
        <div className="text-[40px] font-extrabold leading-none" style={{ color: bottom.color }}>
          {categoryGoals[bottom.category] ?? 0}
        </div>
      </div>
    </div>
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
  return (
    <>
      {(isLoading || isError) && (
        <div
          className="absolute text-center text-[16px] leading-[22px]"
          style={{ ...figmaRect(930, 486, 510, 22), color: isError ? "#f15a48" : "#0d0221" }}
        >
          {isError ? "שגיאה בטעינת נתוני שיווק" : "טוען נתוני שיווק..."}
        </div>
      )}
      {statColumns.map((col) => (
        <StatsColumn
          key={col.top.label}
          left={col.left}
          top={col.top}
          bottom={col.bottom}
          categoryGoals={categoryGoals}
        />
      ))}
    </>
  );
}

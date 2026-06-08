import { createFileRoute } from "@tanstack/react-router";
import { Plus, X, Calendar, ChevronDown, Pencil, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { DashboardShell } from "@/components/DashboardShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useAuth } from "@/lib/auth/auth-context";
import {
  useMarketingGoals,
  useCreateMarketingGoal,
  useDeleteMarketingGoal,
  useToggleAction,
  useUpdateMarketingGoal,
} from "@/hooks/use-marketing";
import type { MarketingCategory, MarketingGoal, ActionItem } from "@/lib/db/schemas";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "מנטוריקה — מעקב שיווק" },
      { name: "description", content: "מעקב שיווק ומכירות יזומות מול הלקוח הפוטנציאלי." },
    ],
  }),
  component: MarketingPage,
});

const tabs: MarketingCategory[] = ["בניית תשתיות", "המלצות", "שימור", 'שתפ"ם', "חשיפה", "מכירות"];

const categoryTitles: Record<MarketingCategory, { title: string; subtitle: string }> = {
  מכירות: {
    title: "מכירות יזומות מול הלקוח הפוטנציאלי",
    subtitle: "מכירות יזומות מול הלקוח הפוטנציאלי",
  },
  חשיפה: { title: "חשיפה מול הלקוח הפוטנציאלי", subtitle: "פרונטלית / פרינטית / דיגיטלית" },
  'שתפ"ם': { title: "שיתופי פעולה והפניות", subtitle: "הפניות ושיתופי פעולה" },
  שימור: { title: "שימור לקוחות קיימים", subtitle: "מתנות ומעקב שביעות רצון לקוח" },
  המלצות: { title: "איסוף המלצות מלקוחות מרוצים", subtitle: "איסוף המלצות מלקוחות מרוצים" },
  "בניית תשתיות": { title: "בניית תשתיות שיווקיות", subtitle: "פיתוח כלים ותהליכים שיווקיים" },
};

function MarketingPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<MarketingCategory>("מכירות");
  const [open, setOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<MarketingGoal | null>(null);

  const { data: goals = [], isLoading, isError } = useMarketingGoals(user?.id, activeTab);
  const deleteGoal = useDeleteMarketingGoal(user?.id ?? "");
  const updateGoal = useUpdateMarketingGoal(user?.id ?? "");
  const toggleAction = useToggleAction(user?.id ?? "");

  const { title, subtitle } = categoryTitles[activeTab];
  const activeGoals = goals.filter((g) => g.status === "active");
  const totalActive = activeGoals.length;

  return (
    <DashboardShell active="מעקב שיווק" breadcrumb="מעקב שיווק">
      <div className="flex h-full flex-col">
        {/* ── Tab bar ──────────────────────────────────────────── */}
        <div
          className="mb-[14px] flex shrink-0 items-stretch overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
          dir="ltr"
        >
          {tabs.map((label, i) => {
            const isActive = label === activeTab;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActiveTab(label)}
                className={`flex h-[40px] flex-1 cursor-pointer items-center justify-center text-[17px] font-medium transition-colors ${
                  isActive
                    ? "rounded-[8px] bg-[#f15a48] font-bold text-white"
                    : `text-[#444] hover:bg-[#fafafa] ${i === 0 ? "" : "border-l border-[#f0c8c0]"}`
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Main two-panel layout ────────────────────────────── */}
        <div className="grid min-h-0 flex-1 grid-cols-[35%_1fr] gap-[22px]" dir="ltr">
          {/* Left: gauge panel */}
          <aside
            className="flex flex-col items-center justify-center gap-[16px] overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white px-6 py-6 text-center shadow-[0_7px_18px_rgba(0,0,0,0.06)]"
            dir="rtl"
          >
            <h3 className="text-[24px] font-bold leading-snug text-[#222]">
              {totalActive > 0 ? "יוצאת לשטח!" : "עדיין לא התחלנו"}
              <br />
              {totalActive > 0 ? "כל הכבוד!" : "הוסיפי משימה ראשונה"}
            </h3>
            <TicksGauge value={totalActive} max={20} lines={[activeTab, "פעילות"]} />
          </aside>

          {/* Right: tasks panel */}
          <section
            className="flex min-h-0 flex-col overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_7px_18px_rgba(0,0,0,0.06)]"
            dir="rtl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between p-[18px] pb-[12px]">
              <div className="text-right">
                <h2 className="text-[22px] font-bold leading-snug text-[#222]">{title}</h2>
                <p className="mt-0.5 text-[13px] text-[#666]">{subtitle}</p>
              </div>
              <button
                onClick={() => setOpen(true)}
                className="flex h-[48px] items-center gap-5 rounded-[10px] bg-[#ff5a49] px-3.5 text-[18px] font-normal text-[#0d0221] shadow-[0_6px_14px_rgba(241,90,72,0.35)]"
                dir="ltr"
              >
                <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[3px] border-2 border-[#0d0221]">
                  <Plus className="h-6 w-6" strokeWidth={2.4} />
                </span>
                <span className="flex items-center" dir="rtl">
                  משימה חדשה
                </span>
              </button>
            </div>

            {/* States */}
            {isLoading && (
              <div className="flex flex-1 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#00b6b5]" />
              </div>
            )}
            {isError && (
              <div className="flex flex-1 items-center justify-center text-[16px] text-red-500">
                שגיאה בטעינת הנתונים
              </div>
            )}
            {!isLoading && !isError && goals.length === 0 && (
              <div className="flex flex-1 items-center justify-center text-[16px] text-[#aaa]">
                אין משימות בקטגוריה זו עדיין
              </div>
            )}

            {/* Goal grid */}
            {!isLoading && !isError && goals.length > 0 && (
              <div className="min-h-0 flex-1 overflow-y-auto px-[18px] pb-[18px]">
                <div className="grid grid-cols-2 gap-x-[14px] gap-y-[10px]">
                  {goals.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onEdit={() => setEditingGoal(goal)}
                      onDelete={() => deleteGoal.mutate(goal.id)}
                      onToggleStatus={() =>
                        updateGoal.mutate({
                          goalId: goal.id,
                          updates: { status: goal.status === "active" ? "completed" : "active" },
                        })
                      }
                      onToggleAction={(actions) =>
                        toggleAction.mutate({
                          goalId: goal.id,
                          actions,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {open && (
        <GoalModal activeTab={activeTab} userId={user?.id ?? ""} onClose={() => setOpen(false)} />
      )}
      {editingGoal && (
        <GoalModal
          activeTab={activeTab}
          goal={editingGoal}
          userId={user?.id ?? ""}
          onClose={() => setEditingGoal(null)}
        />
      )}
    </DashboardShell>
  );
}

function GoalCard({
  goal,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleAction,
}: {
  goal: MarketingGoal;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
  onToggleAction: (actions: ActionItem[]) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const actions = (goal.actions as ActionItem[] | null) ?? [];
  const done = actions.filter((a) => a.done).length;
  const color = goal.status === "completed" ? "#008f15" : "#f15a48";
  const isCompleted = goal.status === "completed";
  const secondaryText =
    goal.weekly_task ||
    goal.measurable_target ||
    goal.description ||
    (goal.target_date ? `יעד: ${goal.target_date}` : "");

  return (
    <>
      <div className="flex min-h-[66px] flex-col justify-center rounded-[10px] border border-[#f2f2f2] bg-white px-4 py-2.5 shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleStatus}
            title={isCompleted ? "סמן כפעיל" : "סמן כהושלם"}
            className="shrink-0 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              width: 22,
              height: 22,
              borderColor: color,
              backgroundColor: isCompleted ? color : "transparent",
            }}
          />
          <div className="min-w-0 flex-1 text-right">
            <div className="truncate text-[18px] font-bold leading-[24px]" style={{ color }}>
              {goal.title}
            </div>
            {secondaryText && (
              <div className="mt-0.5 truncate text-[13px] font-medium leading-[18px] text-[#777]">
                {secondaryText}
              </div>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2.5">
            {actions.length > 0 && (
              <span className="text-[13px] font-medium text-[#888]">
                {done}/{actions.length}
              </span>
            )}
            <button
              onClick={onEdit}
              title="עריכת משימה"
              className="text-[#f15a48] hover:opacity-75"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              title="מחיקת משימה"
              className="text-[#f15a48] hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        {goal.target_date && secondaryText !== `יעד: ${goal.target_date}` && (
          <div className="mt-1 flex items-center justify-end gap-1.5 text-[12px] font-medium leading-[16px] text-[#f15a48]">
            <Calendar className="h-3.5 w-3.5" />
            <span>יעד: {goal.target_date}</span>
          </div>
        )}
        {actions.length > 0 && (
          <div className="mt-2 flex flex-col gap-1 border-t border-[#f1f1f1] pt-2">
            {actions.map((action, index) => (
              <label
                key={`${action.text}-${index}`}
                className="flex cursor-pointer items-center justify-end gap-2 text-right text-[12px] leading-[16px] text-[#555]"
              >
                <span className={action.done ? "line-through opacity-60" : ""}>{action.text}</span>
                <input
                  type="checkbox"
                  checked={action.done}
                  onChange={() => {
                    const next = actions.map((item, itemIndex) =>
                      itemIndex === index ? { ...item, done: !item.done } : item,
                    );
                    onToggleAction(next);
                  }}
                  className="size-3 accent-[#f15a48]"
                />
              </label>
            ))}
          </div>
        )}
      </div>

      {confirmDelete && (
        <ConfirmDialog
          onConfirm={() => {
            setConfirmDelete(false);
            onDelete();
          }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </>
  );
}

function GoalModal({
  activeTab,
  userId,
  goal,
  onClose,
}: {
  activeTab: MarketingCategory;
  userId: string;
  goal?: MarketingGoal;
  onClose: () => void;
}) {
  const isEditing = !!goal;
  const createGoal = useCreateMarketingGoal(userId);
  const updateGoal = useUpdateMarketingGoal(userId);
  const existingActions = (goal?.actions as ActionItem[] | null | undefined) ?? [];
  const [title, setTitle] = useState(goal?.title ?? "");
  const [description, setDescription] = useState(goal?.description ?? "");
  const [date, setDate] = useState(goal?.target_date ?? "");
  const [measurable, setMeasurable] = useState(goal?.measurable_target ?? "");
  const [weekly, setWeekly] = useState(goal?.weekly_task ?? "");
  const [category, setCategory] = useState<MarketingCategory>(goal?.category ?? activeTab);
  const [actions, setActions] = useState<string[]>(
    existingActions.length > 0 ? existingActions.map((action) => action.text) : ["", "", "", ""],
  );

  const save = async () => {
    if (!title.trim()) return;
    const actionItems: ActionItem[] = actions
      .filter((a) => a.trim())
      .map((text, index) => ({
        text,
        done: existingActions[index]?.text === text ? existingActions[index].done : false,
      }));

    const payload = {
      title,
      category,
      description: description || undefined,
      target_date: date || undefined,
      measurable_target: measurable || undefined,
      weekly_task: weekly || undefined,
      actions: actionItems,
      status: goal?.status ?? "active",
    };

    if (goal) {
      await updateGoal.mutateAsync({ goalId: goal.id, updates: payload });
    } else {
      await createGoal.mutateAsync(payload);
    }
    onClose();
  };
  const isSaving = createGoal.isPending || updateGoal.isPending;
  const hasError = createGoal.isError || updateGoal.isError;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="relative max-h-[88vh] w-[92vw] max-w-[920px] overflow-auto rounded-[18px] bg-white px-12 py-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-7 top-7 flex h-7 w-7 items-center justify-center rounded-full border border-[#f15a48] text-[#f15a48]"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="mb-10 text-center text-[18px] font-bold text-[#00b6b5] underline underline-offset-4">
          {isEditing ? "עריכת משימה" : "הוספת משימה חדשה"}
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <FieldHeader label="תאריך יעד לביצוע">
            <div className="flex min-h-[48px] items-center justify-center gap-2 px-4">
              <Calendar className="h-4 w-4 text-[#00b6b5]" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-center text-[13px] outline-none"
              />
            </div>
          </FieldHeader>
          <FieldHeader label="יעדים מדידים">
            <input
              value={measurable}
              onChange={(e) => setMeasurable(e.target.value)}
              placeholder="פירוט מספרי ליעד"
              className="min-h-[48px] w-full bg-transparent px-4 text-center text-[13px] text-[#999] outline-none"
            />
          </FieldHeader>
          <FieldHeader label="פירוט המשימה">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="כותרת המשימה..."
              className="min-h-[48px] w-full bg-transparent px-4 text-center text-[13px] text-[#999] outline-none"
            />
          </FieldHeader>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <FieldHeader label="תיאור המשימה">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="פירוט נוסף על המשימה או היעד"
                rows={3}
                className="min-h-[78px] w-full resize-none bg-transparent px-4 py-3 text-center text-[12px] text-[#666] outline-none placeholder:text-[#999]"
              />
            </FieldHeader>
            <FieldHeader label="משימה שבועית">
              <input
                value={weekly}
                onChange={(e) => setWeekly(e.target.value)}
                placeholder="מה המשימה שעליי לעשות השבוע בכדי לקדם את היעד?"
                className="min-h-[48px] w-full bg-transparent px-4 text-center text-[12px] text-[#999] outline-none"
              />
            </FieldHeader>
            <FieldHeader label="מטרת היעד">
              <div className="flex min-h-[48px] items-center justify-center gap-2 px-4">
                <ChevronDown className="h-4 w-4 text-[#f15a48]" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MarketingCategory)}
                  className="w-full appearance-none bg-transparent text-center text-[13px] outline-none"
                >
                  {tabs.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </FieldHeader>
          </div>

          <div className="overflow-hidden rounded-[10px] border border-[#eee] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
            <div className="bg-[#f15a48] py-2 text-center text-[14px] font-bold text-white">
              פירוט פעולות להשלמת המשימה
            </div>
            <div className="px-4 py-2.5">
              {actions.map((a, i) => (
                <div
                  key={i}
                  className="flex min-h-[30px] items-center justify-between border-b border-[#f0f0f0] py-1.5 last:border-0"
                >
                  <div className="flex items-center gap-2 text-[12px] text-[#888]">
                    <Pencil className="h-3 w-3" />
                    <Trash2
                      className="h-3 w-3 cursor-pointer hover:text-red-400"
                      onClick={() => setActions(actions.filter((_, j) => j !== i))}
                    />
                  </div>
                  <input
                    value={a}
                    onChange={(e) => {
                      const next = [...actions];
                      next[i] = e.target.value;
                      setActions(next);
                    }}
                    placeholder="פעולה..."
                    className="flex-1 bg-transparent px-2 text-center text-[12px] outline-none"
                  />
                </div>
              ))}
              <div className="mt-2 flex justify-end border-t border-[#eee] pt-2">
                <button
                  onClick={() => setActions([...actions, ""])}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-[#888]"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {hasError && (
          <p className="mt-3 text-center text-[14px] text-red-500">שגיאה בשמירה, נסי שוב</p>
        )}

        <div className="mt-8 flex items-center gap-5" dir="ltr">
          <button
            onClick={save}
            disabled={isSaving || !title.trim()}
            className="h-[44px] min-w-[132px] rounded-[8px] bg-[#f15a48] px-8 text-[14px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)] disabled:opacity-60"
          >
            {isSaving ? "שומר..." : "שמירת משימה"}
          </button>
          <button
            onClick={onClose}
            className="h-[44px] min-w-[96px] rounded-[8px] border border-[#222] bg-white px-8 text-[14px] font-medium text-[#222]"
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;

  return createPortal(modal, document.body);
}

function FieldHeader({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#eee] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
      <div className="bg-[#00b6b5] py-2 text-center text-[13px] font-bold text-white">{label}</div>
      {children}
    </div>
  );
}

function TicksGauge({
  value,
  max,
  lines,
}: {
  value: number;
  max: number;
  lines: [string, string];
}) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 120;
  const rInner = 100;
  const totalTicks = 30;
  const filledTicks = Math.round((Math.min(value, max) / max) * totalTicks);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: totalTicks }).map((_, i) => {
          const angle = (i / totalTicks) * Math.PI * 2 - Math.PI / 2;
          const x1 = cx + Math.cos(angle) * rInner;
          const y1 = cy + Math.sin(angle) * rInner;
          const x2 = cx + Math.cos(angle) * rOuter;
          const y2 = cy + Math.sin(angle) * rOuter;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i < filledTicks ? "#f15a48" : "#cfeeee"}
              strokeWidth={9}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[60px] font-extrabold leading-none text-[#f15a48]">{value}</div>
        <div className="mt-1 text-[13px] font-bold leading-tight text-[#222]">{lines[0]}</div>
        <div className="text-[13px] font-bold leading-tight text-[#222]">{lines[1]}</div>
        <div className="mt-1 text-[12px] text-[#00b6b5]">מתוך {max}</div>
      </div>
    </div>
  );
}

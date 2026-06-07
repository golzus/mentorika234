import { createFileRoute } from "@tanstack/react-router";
import { Plus, X, Calendar, ChevronDown, Pencil, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useAuth } from "@/lib/auth/auth-context";
import {
  useMarketingGoals,
  useCreateMarketingGoal,
  useDeleteMarketingGoal,
  useUpdateMarketingGoal,
  useToggleAction,
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
              <button
                onClick={() => setOpen(true)}
                className="flex h-[40px] items-stretch overflow-hidden rounded-[8px] bg-[#f15a48] text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(241,90,72,0.35)]"
              >
                <span className="flex w-[40px] shrink-0 items-center justify-center bg-[#d94e3e]">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="flex items-center px-4">משימה חדשה</span>
              </button>
              <div className="text-right">
                <h2 className="text-[22px] font-bold leading-snug text-[#222]">{title}</h2>
                <p className="mt-0.5 text-[13px] text-[#666]">{subtitle}</p>
              </div>
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
                      onDelete={() => deleteGoal.mutate(goal.id)}
                      onToggleStatus={() =>
                        updateGoal.mutate({
                          goalId: goal.id,
                          updates: { status: goal.status === "active" ? "completed" : "active" },
                        })
                      }
                      onToggleAction={(actions) =>
                        toggleAction.mutate({ goalId: goal.id, actions })
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
        <NewGoalModal
          activeTab={activeTab}
          userId={user?.id ?? ""}
          onClose={() => setOpen(false)}
        />
      )}
    </DashboardShell>
  );
}

function GoalCard({
  goal,
  onDelete,
  onToggleStatus,
  onToggleAction,
}: {
  goal: MarketingGoal;
  onDelete: () => void;
  onToggleStatus: () => void;
  onToggleAction: (actions: ActionItem[]) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const actions = (goal.actions as ActionItem[] | null) ?? [];
  const done = actions.filter((a) => a.done).length;
  const color = goal.status === "completed" ? "#008f15" : "#f15a48";
  const isCompleted = goal.status === "completed";

  return (
    <>
      <div className="flex h-auto min-h-[54px] flex-col gap-1 rounded-[10px] border border-[#eee] bg-white px-4 py-3 shadow-[0_2px_6px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleStatus}
            title={isCompleted ? "סמן כפעיל" : "סמן כהושלם"}
            className="shrink-0 rounded-full border-2 transition-transform hover:scale-110"
            style={{
              width: 18,
              height: 18,
              borderColor: color,
              backgroundColor: isCompleted ? color : "transparent",
            }}
          />
          <div className="min-w-0 flex-1 text-right">
            <div className="truncate text-[16px] font-bold leading-tight" style={{ color }}>
              {goal.title}
            </div>
            {goal.target_date && (
              <div className="mt-0.5 text-[12px] leading-tight text-[#888]">
                יעד: {goal.target_date}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {actions.length > 0 && (
              <span className="text-[11px] text-[#888]">
                {done}/{actions.length}
              </span>
            )}
            <button
              onClick={() => setConfirmDelete(true)}
              title="מחיקת משימה"
              className="text-[#ccc] hover:text-red-400"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        {goal.weekly_task && (
          <div className="text-right text-[12px] text-[#666]">שבועי: {goal.weekly_task}</div>
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

function NewGoalModal({
  activeTab,
  userId,
  onClose,
}: {
  activeTab: MarketingCategory;
  userId: string;
  onClose: () => void;
}) {
  const createGoal = useCreateMarketingGoal(userId);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [measurable, setMeasurable] = useState("");
  const [weekly, setWeekly] = useState("");
  const [category, setCategory] = useState<MarketingCategory>(activeTab);
  const [actions, setActions] = useState<string[]>(["", "", "", ""]);

  const save = async () => {
    if (!title.trim()) return;
    const actionItems: ActionItem[] = actions
      .filter((a) => a.trim())
      .map((text) => ({ text, done: false }));

    await createGoal.mutateAsync({
      title,
      category,
      target_date: date || undefined,
      measurable_target: measurable || undefined,
      weekly_task: weekly || undefined,
      actions: actionItems,
      status: "active",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="relative h-[86vh] max-h-[760px] w-[92vw] max-w-[1340px] overflow-auto rounded-[18px] bg-white p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f15a48] text-[#f15a48]"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="mb-6 text-center text-[22px] font-bold text-[#00b6b5] underline underline-offset-4">
          הוספת משימה חדשה
        </h2>

        <div className="grid grid-cols-3 gap-3">
          <FieldHeader label="תאריך יעד לביצוע">
            <div className="flex items-center justify-center gap-2 px-3 py-2.5">
              <Calendar className="h-4 w-4 text-[#00b6b5]" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-center text-[14px] outline-none"
              />
            </div>
          </FieldHeader>
          <FieldHeader label="יעדים מדידים">
            <input
              value={measurable}
              onChange={(e) => setMeasurable(e.target.value)}
              placeholder="פירוט מספרי ליעד"
              className="w-full bg-transparent px-3 py-2.5 text-center text-[14px] text-[#999] outline-none"
            />
          </FieldHeader>
          <FieldHeader label="פירוט המשימה">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="כותרת המשימה..."
              className="w-full bg-transparent px-3 py-2.5 text-center text-[14px] text-[#999] outline-none"
            />
          </FieldHeader>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3">
            <FieldHeader label="משימה שבועית">
              <input
                value={weekly}
                onChange={(e) => setWeekly(e.target.value)}
                placeholder="מה המשימה שעליי לעשות השבוע בכדי לקדם את היעד?"
                className="w-full bg-transparent px-3 py-2.5 text-center text-[13px] text-[#999] outline-none"
              />
            </FieldHeader>
            <FieldHeader label="מטרת היעד">
              <div className="flex items-center justify-center gap-2 px-3 py-2.5">
                <ChevronDown className="h-4 w-4 text-[#f15a48]" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as MarketingCategory)}
                  className="w-full appearance-none bg-transparent text-center text-[14px] outline-none"
                >
                  {tabs.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </FieldHeader>
          </div>

          <div className="overflow-hidden rounded-[10px] border border-[#eee] bg-white">
            <div className="bg-[#f15a48] py-2 text-center text-[15px] font-bold text-white">
              פירוט פעולות להשלמת המשימה
            </div>
            <div className="px-3 py-2">
              {actions.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-[#f0f0f0] py-1.5 last:border-0"
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
                    className="flex-1 bg-transparent px-2 text-center text-[13px] outline-none"
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

        {createGoal.isError && (
          <p className="mt-3 text-center text-[14px] text-red-500">שגיאה בשמירה, נסי שוב</p>
        )}

        <div className="mt-6 flex items-center gap-3" dir="ltr">
          <button
            onClick={onClose}
            className="h-[42px] rounded-[8px] border border-[#222] bg-white px-8 text-[15px] font-medium text-[#222]"
          >
            ביטול
          </button>
          <button
            onClick={save}
            disabled={createGoal.isPending || !title.trim()}
            className="h-[42px] rounded-[8px] bg-[#f15a48] px-8 text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)] disabled:opacity-60"
          >
            {createGoal.isPending ? "שומר..." : "שמירת משימה"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldHeader({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#eee] bg-white">
      <div className="bg-[#00b6b5] py-2 text-center text-[14px] font-bold text-white">{label}</div>
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

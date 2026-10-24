import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { r as reactDomExports } from "../_libs/react-dom.mjs";
import { C as ConfirmDialog } from "./pagination-vppo7EAz.mjs";
import { u as useAuth } from "./router-C5VHrHSa.mjs";
import { u as useMarketingGoals, a as useDeleteMarketingGoal, b as useUpdateMarketingGoal, c as useToggleAction, d as useCreateMarketingGoal } from "./use-marketing-CWoKBn2Y.mjs";
import { P as Plus, a as LoaderCircle, b as Pencil, T as Trash2, C as Calendar, X, c as ChevronDown } from "../_libs/lucide-react.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./client-BRRtD0JQ.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
const tabs = ["בניית תשתיות", "המלצות", "שימור", 'שתפ"ם', "חשיפה", "מכירות"];
const categoryTitles = {
  מכירות: {
    title: "מכירות יזומות מול הלקוח הפוטנציאלי",
    subtitle: "מכירות יזומות מול הלקוח הפוטנציאלי"
  },
  חשיפה: {
    title: "חשיפה מול הלקוח הפוטנציאלי",
    subtitle: "פרונטלית / פרינטית / דיגיטלית"
  },
  'שתפ"ם': {
    title: "שיתופי פעולה והפניות",
    subtitle: "הפניות ושיתופי פעולה"
  },
  שימור: {
    title: "שימור לקוחות קיימים",
    subtitle: "מתנות ומעקב שביעות רצון לקוח"
  },
  המלצות: {
    title: "איסוף המלצות מלקוחות מרוצים",
    subtitle: "איסוף המלצות מלקוחות מרוצים"
  },
  "בניית תשתיות": {
    title: "בניית תשתיות שיווקיות",
    subtitle: "פיתוח כלים ותהליכים שיווקיים"
  }
};
function MarketingPage() {
  const {
    user
  } = useAuth();
  const [activeTab, setActiveTab] = reactExports.useState("מכירות");
  const [open, setOpen] = reactExports.useState(false);
  const [editingGoal, setEditingGoal] = reactExports.useState(null);
  const {
    data: goals = [],
    isLoading,
    isError
  } = useMarketingGoals(user?.id, activeTab);
  const deleteGoal = useDeleteMarketingGoal(user?.id ?? "");
  const updateGoal = useUpdateMarketingGoal(user?.id ?? "");
  const toggleAction = useToggleAction(user?.id ?? "");
  const {
    title,
    subtitle
  } = categoryTitles[activeTab];
  const activeGoals = goals.filter((g) => g.status === "active");
  const totalActive = activeGoals.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1 overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] sm:grid-cols-3 lg:grid-cols-6 lg:gap-0 lg:p-0", dir: "ltr", children: tabs.map((label) => {
        const isActive = label === activeTab;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setActiveTab(label), className: `flex h-[42px] items-center justify-center rounded-[8px] text-[15px] font-medium transition-colors md:text-[17px] ${isActive ? "bg-[#f15a48] font-bold text-white" : "text-[#444] hover:bg-[#fafafa]"}`, children: label }, label);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-[35%_1fr] lg:gap-5", dir: "ltr", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex flex-col items-center justify-center gap-[16px] overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white px-6 py-6 text-center shadow-[0_7px_18px_rgba(0,0,0,0.06)]", dir: "rtl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[24px] font-bold leading-snug text-[#222]", children: [
            totalActive > 0 ? "יוצאת לשטח!" : "עדיין לא התחלנו",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            totalActive > 0 ? "כל הכבוד!" : "הוסיפי משימה ראשונה"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TicksGauge, { value: totalActive, max: 20, lines: [activeTab, "פעילות"] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_7px_18px_rgba(0,0,0,0.06)]", dir: "rtl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-stretch gap-3 p-[18px] pb-[12px] sm:flex-row sm:items-start sm:justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[20px] font-bold leading-snug text-[#222] md:text-[22px]", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[13px] text-[#666]", children: subtitle })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(true), className: "flex h-[48px] shrink-0 items-center gap-5 self-start rounded-[10px] bg-[#ff5a49] px-3.5 text-[18px] font-normal text-[#0d0221] shadow-[0_6px_14px_rgba(241,90,72,0.35)]", dir: "ltr", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[3px] border-2 border-[#0d0221]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6", strokeWidth: 2.4 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center", dir: "rtl", children: "משימה חדשה" })
            ] })
          ] }),
          isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[240px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-[#00b6b5]" }) }),
          isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[240px] items-center justify-center text-[16px] text-red-500", children: "שגיאה בטעינת הנתונים" }),
          !isLoading && !isError && goals.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[240px] items-center justify-center text-[16px] text-[#aaa]", children: "אין משימות בקטגוריה זו עדיין" }),
          !isLoading && !isError && goals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[70vh] overflow-y-auto px-[18px] pb-[18px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-x-[14px] gap-y-[10px] sm:grid-cols-2", children: goals.map((goal) => /* @__PURE__ */ jsxRuntimeExports.jsx(GoalCard, { goal, onEdit: () => setEditingGoal(goal), onDelete: () => deleteGoal.mutate(goal.id), onToggleStatus: () => updateGoal.mutate({
            goalId: goal.id,
            updates: {
              status: goal.status === "active" ? "completed" : "active"
            }
          }), onToggleAction: (actions) => toggleAction.mutate({
            goalId: goal.id,
            actions
          }) }, goal.id)) }) })
        ] })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(GoalModal, { activeTab, userId: user?.id ?? "", onClose: () => setOpen(false) }),
    editingGoal && /* @__PURE__ */ jsxRuntimeExports.jsx(GoalModal, { activeTab, goal: editingGoal, userId: user?.id ?? "", onClose: () => setEditingGoal(null) })
  ] });
}
function GoalCard({
  goal,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleAction
}) {
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const actions = goal.actions ?? [];
  const done = actions.filter((a) => a.done).length;
  const color = goal.status === "completed" ? "#008f15" : "#f15a48";
  const isCompleted = goal.status === "completed";
  const secondaryText = goal.weekly_task || goal.measurable_target || goal.description || (goal.target_date ? `יעד: ${goal.target_date}` : "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[66px] flex-col justify-center rounded-[10px] border border-[#f2f2f2] bg-white px-4 py-2.5 shadow-[0_10px_20px_rgba(0,0,0,0.1)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggleStatus, title: isCompleted ? "סמן כפעיל" : "סמן כהושלם", className: "shrink-0 rounded-full border-2 transition-transform hover:scale-110", style: {
          width: 22,
          height: 22,
          borderColor: color,
          backgroundColor: isCompleted ? color : "transparent"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1 text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-[18px] font-bold leading-[24px]", style: {
            color
          }, children: goal.title }),
          secondaryText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 truncate text-[13px] font-medium leading-[18px] text-[#777]", children: secondaryText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2.5", children: [
          actions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[13px] font-medium text-[#888]", children: [
            done,
            "/",
            actions.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onEdit, title: "עריכת משימה", className: "text-[#f15a48] hover:opacity-75", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmDelete(true), title: "מחיקת משימה", className: "text-[#f15a48] hover:text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] })
      ] }),
      goal.target_date && secondaryText !== `יעד: ${goal.target_date}` && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-end gap-1.5 text-[12px] font-medium leading-[16px] text-[#f15a48]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "יעד: ",
          goal.target_date
        ] })
      ] }),
      actions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex flex-col gap-1 border-t border-[#f1f1f1] pt-2", children: actions.map((action, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center justify-end gap-2 text-right text-[12px] leading-[16px] text-[#555]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: action.done ? "line-through opacity-60" : "", children: action.text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: action.done, onChange: () => {
          const next = actions.map((item, itemIndex) => itemIndex === index ? {
            ...item,
            done: !item.done
          } : item);
          onToggleAction(next);
        }, className: "size-3 accent-[#f15a48]" })
      ] }, `${action.text}-${index}`)) })
    ] }),
    confirmDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDialog, { onConfirm: () => {
      setConfirmDelete(false);
      onDelete();
    }, onCancel: () => setConfirmDelete(false) })
  ] });
}
function GoalModal({
  activeTab,
  userId,
  goal,
  onClose
}) {
  const isEditing = !!goal;
  const createGoal = useCreateMarketingGoal(userId);
  const updateGoal = useUpdateMarketingGoal(userId);
  const existingActions = goal?.actions ?? [];
  const [title, setTitle] = reactExports.useState(goal?.title ?? "");
  const [description, setDescription] = reactExports.useState(goal?.description ?? "");
  const [date, setDate] = reactExports.useState(goal?.target_date ?? "");
  const [measurable, setMeasurable] = reactExports.useState(goal?.measurable_target ?? "");
  const [weekly, setWeekly] = reactExports.useState(goal?.weekly_task ?? "");
  const [category, setCategory] = reactExports.useState(goal?.category ?? activeTab);
  const [actions, setActions] = reactExports.useState(existingActions.length > 0 ? existingActions.map((action) => action.text) : ["", "", "", ""]);
  const save = async () => {
    if (!title.trim()) return;
    const actionItems = actions.filter((a) => a.trim()).map((text, index) => ({
      text,
      done: existingActions[index]?.text === text ? existingActions[index].done : false
    }));
    const payload = {
      title,
      category,
      description: description || void 0,
      target_date: date || void 0,
      measurable_target: measurable || void 0,
      weekly_task: weekly || void 0,
      actions: actionItems,
      status: goal?.status ?? "active"
    };
    if (goal) {
      await updateGoal.mutateAsync({
        goalId: goal.id,
        updates: payload
      });
    } else {
      await createGoal.mutateAsync(payload);
    }
    onClose();
  };
  const isSaving = createGoal.isPending || updateGoal.isPending;
  const hasError = createGoal.isError || updateGoal.isError;
  const modal = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60", onClick: onClose, dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-h-[88vh] w-[92vw] max-w-[920px] overflow-auto rounded-[18px] bg-white px-12 py-10 shadow-2xl", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "absolute left-7 top-7 flex h-7 w-7 items-center justify-center rounded-full border border-[#f15a48] text-[#f15a48]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-10 text-center text-[18px] font-bold text-[#00b6b5] underline underline-offset-4", children: isEditing ? "עריכת משימה" : "הוספת משימה חדשה" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHeader, { label: "תאריך יעד לביצוע", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[48px] items-center justify-center gap-2 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-[#00b6b5]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: date, onChange: (e) => setDate(e.target.value), className: "w-full bg-transparent text-center text-[13px] outline-none" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHeader, { label: "יעדים מדידים", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: measurable, onChange: (e) => setMeasurable(e.target.value), placeholder: "פירוט מספרי ליעד", className: "min-h-[48px] w-full bg-transparent px-4 text-center text-[13px] text-[#999] outline-none" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHeader, { label: "פירוט המשימה", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "כותרת המשימה...", className: "min-h-[48px] w-full bg-transparent px-4 text-center text-[13px] text-[#999] outline-none" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHeader, { label: "תיאור המשימה", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "פירוט נוסף על המשימה או היעד", rows: 3, className: "min-h-[78px] w-full resize-none bg-transparent px-4 py-3 text-center text-[12px] text-[#666] outline-none placeholder:text-[#999]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHeader, { label: "משימה שבועית", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: weekly, onChange: (e) => setWeekly(e.target.value), placeholder: "מה המשימה שעליי לעשות השבוע בכדי לקדם את היעד?", className: "min-h-[48px] w-full bg-transparent px-4 text-center text-[12px] text-[#999] outline-none" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldHeader, { label: "מטרת היעד", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[48px] items-center justify-center gap-2 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 text-[#f15a48]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full appearance-none bg-transparent text-center text-[13px] outline-none", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: t }, t)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[10px] border border-[#eee] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.08)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#f15a48] py-2 text-center text-[14px] font-bold text-white", children: "פירוט פעולות להשלמת המשימה" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5", children: [
          actions.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[30px] items-center justify-between border-b border-[#f0f0f0] py-1.5 last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[12px] text-[#888]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 cursor-pointer hover:text-red-400", onClick: () => setActions(actions.filter((_, j) => j !== i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: a, onChange: (e) => {
              const next = [...actions];
              next[i] = e.target.value;
              setActions(next);
            }, placeholder: "פעולה...", className: "flex-1 bg-transparent px-2 text-center text-[12px] outline-none" })
          ] }, i)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-end border-t border-[#eee] pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActions([...actions, ""]), className: "flex h-5 w-5 items-center justify-center rounded-full border border-[#888]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }) }) })
        ] })
      ] })
    ] }),
    hasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-[14px] text-red-500", children: "שגיאה בשמירה, נסי שוב" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-5", dir: "ltr", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, disabled: isSaving || !title.trim(), className: "h-[44px] min-w-[132px] rounded-[8px] bg-[#f15a48] px-8 text-[14px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)] disabled:opacity-60", children: isSaving ? "שומר..." : "שמירת משימה" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "h-[44px] min-w-[96px] rounded-[8px] border border-[#222] bg-white px-8 text-[14px] font-medium text-[#222]", children: "ביטול" })
    ] })
  ] }) });
  if (typeof document === "undefined") return null;
  return reactDomExports.createPortal(modal, document.body);
}
function FieldHeader({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-[10px] border border-[#eee] bg-white shadow-[0_6px_14px_rgba(0,0,0,0.08)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#00b6b5] py-2 text-center text-[13px] font-bold text-white", children: label }),
    children
  ] });
}
function TicksGauge({
  value,
  max,
  lines
}) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 120;
  const rInner = 100;
  const totalTicks = 30;
  const filledTicks = Math.round(Math.min(value, max) / max * totalTicks);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: {
    width: size,
    height: size
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: Array.from({
      length: totalTicks
    }).map((_, i) => {
      const angle = i / totalTicks * Math.PI * 2 - Math.PI / 2;
      const x1 = cx + Math.cos(angle) * rInner;
      const y1 = cy + Math.sin(angle) * rInner;
      const x2 = cx + Math.cos(angle) * rOuter;
      const y2 = cy + Math.sin(angle) * rOuter;
      return /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1, y1, x2, y2, stroke: i < filledTicks ? "#f15a48" : "#cfeeee", strokeWidth: 9, strokeLinecap: "round" }, i);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[60px] font-extrabold leading-none text-[#f15a48]", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[13px] font-bold leading-tight text-[#222]", children: lines[0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-bold leading-tight text-[#222]", children: lines[1] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[12px] text-[#00b6b5]", children: [
        "מתוך ",
        max
      ] })
    ] })
  ] });
}
export {
  MarketingPage as component
};

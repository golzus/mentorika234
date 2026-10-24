import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as ConfirmDialog } from "./pagination-vppo7EAz.mjs";
import { u as useLeads, a as useCreateLead, b as useUpdateLead, c as useDeleteLead, C as ChatIcon, L as LinkIcon, D as DiamondIcon, d as LeadActionsBar, P as PencilIcon } from "./use-leads-6lvJK4e1.mjs";
import { u as useAuth } from "./router-C5VHrHSa.mjs";
import { F as Funnel, a as LoaderCircle, P as Plus, d as Minus, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
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
const STATUS_TABS = [{
  key: "in_progress",
  label: 'לידים במו"מ',
  Icon: ChatIcon
}, {
  key: "new",
  label: "לידים שיצרו קשר",
  Icon: LinkIcon
}, {
  key: "closed",
  label: "לידים שסגרו",
  Icon: DiamondIcon
}];
function LeadsPage() {
  const {
    user
  } = useAuth();
  const [activeFilter, setActiveFilter] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editingLead, setEditingLead] = reactExports.useState(null);
  const [expandedLeadId, setExpandedLeadId] = reactExports.useState(null);
  const {
    data: allLeads = [],
    isLoading,
    isError
  } = useLeads(user?.id);
  const createLead = useCreateLead(user?.id ?? "");
  const updateLead = useUpdateLead(user?.id ?? "");
  const deleteLead = useDeleteLead(user?.id ?? "");
  const statusFilteredLeads = activeFilter ? allLeads.filter((l) => l.status === activeFilter) : allLeads;
  const normalizedSearch = search.trim().toLowerCase();
  const filteredLeads = normalizedSearch ? statusFilteredLeads.filter((lead) => [lead.name, lead.phone, lead.email, lead.source, lead.interested_in, lead.proposed_price, lead.next_task].filter(Boolean).some((value) => value.toLowerCase().includes(normalizedSearch))) : statusFilteredLeads;
  const counts = {
    in_progress: allLeads.filter((l) => l.status === "in_progress").length,
    new: allLeads.filter((l) => l.status === "new").length,
    closed: allLeads.filter((l) => l.status === "closed").length
  };
  const expandedLead = expandedLeadId ? allLeads.find((l) => l.id === expandedLeadId) : void 0;
  const panelTitle = expandedLead ? expandedLead.name : STATUS_TABS.find((s) => s.key === activeFilter)?.label ?? 'לידים בסה"כ';
  const setLeadStatus = (leadId, status) => updateLead.mutate({
    leadId,
    updates: {
      status
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-4", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[36px] overflow-hidden rounded-[18px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]", children: STATUS_TABS.map(({
        key,
        label,
        Icon
      }) => {
        const active = key === activeFilter;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveFilter(active ? null : key), className: `flex flex-1 items-center justify-center gap-2 px-2 text-[12px] transition-colors sm:text-[13px] ${active ? "bg-[#f15a48] font-bold text-[#0d0221]" : "bg-white text-[#0d0221] hover:bg-gray-50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-[13px] w-[13px] shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "opacity-70", children: [
            "(",
            counts[key],
            ")"
          ] })
        ] }, key);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:flex-row lg:gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-w-0 flex-1 flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setSearchOpen((v) => !v), className: "relative z-10 flex h-[26px] w-fit items-center gap-1.5 self-start rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] bg-[#f15a48] px-3 text-[13px] text-[#fffbf7] shadow-[0_4px_10px_rgba(0,0,0,0.1)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3 w-3" }),
            "סינון חכם"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-mt-px flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] rounded-tl-none bg-white shadow-[0_10px_20px_rgba(0,182,181,0.3)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[36px] shrink-0 items-center justify-center rounded-t-[10px] rounded-tl-none bg-[#00b6b5]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate px-3 text-[16px] font-bold leading-none text-[#0d0221] md:text-[18px]", children: panelTitle }) }),
            searchOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[42px] shrink-0 items-center gap-3 border-b border-[#e7e7e7] bg-white px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-bold text-[#0d0221]", children: "חיפוש" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: search, onChange: (e) => setSearch(e.target.value), placeholder: "שם, טלפון, מייל, מקור, התעניינות או מחיר", className: "min-w-0 flex-1 bg-transparent text-right text-[14px] text-[#444] outline-none placeholder:text-[#aaa]" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[60vh] overflow-y-auto p-4", children: [
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[240px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-[#00b6b5]" }) }),
              isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[240px] items-center justify-center text-[16px] text-red-500", children: "שגיאה בטעינת הנתונים" }),
              !isLoading && !isError && expandedLead && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadDetailCard, { lead: expandedLead, onCollapse: () => setExpandedLeadId(null), onEdit: () => setEditingLead(expandedLead), onDelete: () => {
                deleteLead.mutate(expandedLead.id);
                setExpandedLeadId(null);
              }, onStatusChange: (status) => setLeadStatus(expandedLead.id, status), onSaveNextTask: (next_task) => updateLead.mutate({
                leadId: expandedLead.id,
                updates: {
                  next_task
                }
              }) }),
              !isLoading && !isError && !expandedLead && filteredLeads.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[240px] items-center justify-center text-[16px] text-[#aaa]", children: "אין לידים עדיין" }),
              !isLoading && !isError && !expandedLead && filteredLeads.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: filteredLeads.map((lead, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(LeadRow, { lead, highlight: i === 0, onExpand: () => setExpandedLeadId(lead.id), onEdit: () => setEditingLead(lead), onDelete: () => deleteLead.mutate(lead.id), onStatusChange: (status) => setLeadStatus(lead.id, status) }, lead.id)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 lg:w-[220px] lg:shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setAddOpen(true), className: "flex h-[52px] items-center gap-5 rounded-[10px] bg-[#ff5a49] px-4 text-[18px] font-normal text-[#0d0221] shadow-[0_6px_14px_rgba(241,90,72,0.35)]", dir: "ltr", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[3px] border-2 border-[#0d0221]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6", strokeWidth: 2.4 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center", dir: "rtl", children: "הוספת ליד" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[120px] flex-col items-center justify-center rounded-[10px] border border-[#e2e2e2] bg-white p-4 text-center text-[13px] leading-[1.6] text-[#f15a48] shadow-[0_1px_4px_rgba(0,0,0,0.04)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "דף הממו שלך.",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "פה יכולה לכתוב את",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "כל מה שתלוי לך על",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "המקרר........"
          ] }) })
        ] })
      ] })
    ] }),
    addOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadModal, { mode: "add", userId: user?.id ?? "", onClose: () => setAddOpen(false), onSave: async (input) => {
      await createLead.mutateAsync(input);
      setAddOpen(false);
    } }),
    editingLead && /* @__PURE__ */ jsxRuntimeExports.jsx(LeadModal, { mode: "edit", lead: editingLead, userId: user?.id ?? "", onClose: () => setEditingLead(null), onSave: async (updates) => {
      await updateLead.mutateAsync({
        leadId: editingLead.id,
        updates
      });
      setEditingLead(null);
    } })
  ] });
}
function LeadRow({
  lead,
  highlight,
  onExpand,
  onEdit,
  onDelete,
  onStatusChange
}) {
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const fallbackSummary = [lead.source, lead.interested_in, lead.proposed_price, new Date(lead.created_at).toLocaleDateString("he-IL")].filter(Boolean).join(" | ");
  const summary = lead.next_task || fallbackSummary;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex h-[60px] shrink-0 items-center gap-3 overflow-x-auto rounded-[5px] px-4 py-[5px] shadow-[0px_10px_10px_rgba(0,0,0,0.1)] sm:px-[30px] ${highlight ? "bg-[#f15a48]" : "bg-white"}`, dir: "ltr", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadActionsBar, { lead, highlight, onEdit, onDelete: () => setConfirmDelete(true), onStatusChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-[25px] w-px shrink-0 ${highlight ? "bg-white/40" : "bg-[#0d0221]/15"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onExpand, title: "פתיחת פרטי הליד", className: "min-w-[120px] flex-1 truncate text-right text-[14px] leading-[25px] text-[#0d0221] sm:text-[16px] lg:text-[18px]", dir: "rtl", children: summary || "אין פרטים נוספים" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-[25px] w-px shrink-0 ${highlight ? "bg-white/40" : "bg-[#0d0221]/15"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onExpand, title: "פתיחת פרטי הליד", className: "shrink-0 whitespace-nowrap text-[18px] leading-[normal] text-[#0d0221] sm:text-[22px] lg:text-[26px]", dir: "rtl", children: lead.name })
    ] }),
    confirmDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDialog, { onConfirm: () => {
      setConfirmDelete(false);
      onDelete();
    }, onCancel: () => setConfirmDelete(false) })
  ] });
}
function LeadDetailCard({
  lead,
  onCollapse,
  onEdit,
  onDelete,
  onStatusChange,
  onSaveNextTask
}) {
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const [editingTask, setEditingTask] = reactExports.useState(false);
  const [taskDraft, setTaskDraft] = reactExports.useState(lead.next_task ?? "");
  const saveTask = () => {
    onSaveNextTask(taskDraft.trim());
    setEditingTask(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col gap-6 pb-10", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[60px] shrink-0 items-center gap-3 overflow-x-auto rounded-[5px] bg-white px-4 py-[5px] shadow-[0px_10px_10px_rgba(0,0,0,0.1)] sm:px-[30px]", dir: "ltr", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadActionsBar, { lead, onEdit, onDelete: () => setConfirmDelete(true), onStatusChange }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[25px] w-px shrink-0 bg-[#0d0221]/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[120px] flex-1 truncate text-[14px] leading-[25px] text-[#0d0221] sm:text-[16px] lg:text-[18px]", dir: "rtl", children: lead.next_task || "אין משימה הבאה" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[25px] w-px shrink-0 bg-[#0d0221]/15" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 whitespace-nowrap text-[18px] leading-[normal] text-[#0d0221] sm:text-[22px] lg:text-[26px]", dir: "rtl", children: lead.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      lead.email && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoPill, { children: lead.email }),
      lead.phone && /* @__PURE__ */ jsxRuntimeExports.jsx(InfoPill, { children: lead.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoPill, { children: lead.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[120px] flex-1 flex-col items-center justify-end gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      editingTask ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        saveTask();
      }, className: "flex items-center gap-2 rounded-[10px] bg-[#f15a48] px-4 py-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.1)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { autoFocus: true, value: taskDraft, onChange: (e) => setTaskDraft(e.target.value), placeholder: "המשימה הבאה שלי", className: "w-[160px] bg-transparent text-[16px] text-[#0d0221] outline-none placeholder:text-[#0d0221]/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "shrink-0 text-[13px] font-bold text-[#0d0221]", children: "שמירה" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
        setTaskDraft(lead.next_task ?? "");
        setEditingTask(true);
      }, className: "flex items-center gap-2 rounded-[10px] bg-[#f15a48] px-4 py-1.5 text-[16px] text-[#0d0221] shadow-[0_10px_20px_rgba(0,0,0,0.1)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PencilIcon, { className: "h-[14px] w-[14px]" }),
        "המשימה הבאה שלי"
      ] }),
      lead.status === "closed" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[10px] bg-[#f15a48] px-4 py-1.5 text-[16px] text-[#0d0221] shadow-[0_10px_20px_rgba(0,0,0,0.1)]", children: "סגירת ליד - בהצלחה בפרויקט החדש" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onCollapse, title: "סגירת כרטיס הליד", "aria-label": "סגירת כרטיס הליד", className: "absolute bottom-0 left-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f15a48] text-[#f15a48] transition-colors hover:bg-[#f15a48]/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-5 w-5" }) }),
    confirmDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmDialog, { onConfirm: () => {
      setConfirmDelete(false);
      onDelete();
    }, onCancel: () => setConfirmDelete(false) })
  ] });
}
function InfoPill({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-full truncate rounded-[10px] bg-[#00b6b5] px-4 py-1.5 text-[16px] text-[#0d0221] shadow-[0_10px_20px_rgba(0,0,0,0.1)]", dir: "rtl", children });
}
function LeadModal({
  mode,
  lead,
  onClose,
  onSave
}) {
  const [name, setName] = reactExports.useState(lead?.name ?? "");
  const [phone, setPhone] = reactExports.useState(lead?.phone ?? "");
  const [email, setEmail] = reactExports.useState(lead?.email ?? "");
  const [source, setSource] = reactExports.useState(lead?.source ?? "");
  const [interestedIn, setInterestedIn] = reactExports.useState(lead?.interested_in ?? "");
  const [proposedPrice, setProposedPrice] = reactExports.useState(lead?.proposed_price ?? "");
  const [notes, setNotes] = reactExports.useState(lead?.notes ?? "");
  const [nextTask, setNextTask] = reactExports.useState(lead?.next_task ?? "");
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const save = async () => {
    if (!name.trim()) {
      setError("שם הליד חובה");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSave({
        name,
        phone: phone || void 0,
        email: email || void 0,
        source: source || void 0,
        interested_in: interestedIn || void 0,
        proposed_price: proposedPrice || void 0,
        notes: notes || void 0,
        next_task: nextTask || void 0,
        ...mode === "add" ? {
          status: "new"
        } : {}
      });
    } catch {
      setError("שגיאה בשמירה, נסי שוב");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/60", onClick: onClose, dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-[92vw] max-w-[1100px] rounded-[14px] border-[3px] border-[#00b6b5] bg-white p-10 shadow-2xl", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f15a48] text-[#f15a48]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-7 text-center text-[20px] font-bold text-[#222]", children: mode === "add" ? "הוספת ליד חדש" : `עריכת ליד — ${lead?.name}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadField, { label: "שם *", value: name, onChange: setName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadField, { label: "טלפון", value: phone, onChange: setPhone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadField, { label: "מייל", value: email, onChange: setEmail }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadField, { label: "מקור הליד", value: source, onChange: setSource }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadField, { label: "מעוניין ב", value: interestedIn, onChange: setInterestedIn }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadField, { label: "הצעת מחיר", value: proposedPrice, onChange: setProposedPrice })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadField, { label: "המשימה הבאה שלי", value: nextTask, onChange: setNextTask }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LeadField, { label: "הערות", value: notes, onChange: setNotes })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-[14px] text-red-500", children: error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex items-center gap-3", dir: "ltr", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "h-[42px] rounded-[8px] border border-[#222] bg-white px-8 text-[15px] font-medium text-[#222]", children: "ביטול" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: save, disabled: saving, className: "h-[42px] rounded-[8px] bg-[#f15a48] px-8 text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)] disabled:opacity-60", children: saving ? "שומר..." : mode === "add" ? "הוספת ליד" : "שמירת שינויים" })
    ] })
  ] }) });
}
function LeadField({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-[10px] border border-[#d0d0d0] bg-white px-3 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), placeholder: "—", className: "w-full bg-transparent text-center text-[14px] text-[#666] outline-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#222]", children: label })
  ] });
}
export {
  LeadsPage as component
};

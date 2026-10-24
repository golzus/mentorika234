import { createFileRoute } from "@tanstack/react-router";
import { Plus, X, Loader2, Minus, Filter } from "lucide-react";
import { useState, type ReactNode } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LeadActionsBar } from "@/components/LeadActionsBar";
import { ChatIcon, DiamondIcon, LinkIcon, PencilIcon } from "@/components/icons/lead-row-icons";
import { useAuth } from "@/lib/auth/auth-context";
import { requireAuth } from "@/lib/auth/route-guards";
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from "@/hooks/use-leads";
import type { Lead, LeadInsert, LeadStatus, LeadUpdate } from "@/lib/db/schemas";

export const Route = createFileRoute("/leads")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [
      { title: "מנטוריקה — מעקב לידים" },
      { name: "description", content: "מעקב לידים וניהול הלקוחות הפוטנציאליים." },
    ],
  }),
  component: LeadsPage,
});

// Matches the Figma tab bar exactly: same 3 statuses, same captions, same
// icons as the lead-row quick-status buttons (right-to-left reading order).
const STATUS_TABS: { key: LeadStatus; label: string; Icon: typeof ChatIcon }[] = [
  { key: "in_progress", label: 'לידים במו"מ', Icon: ChatIcon },
  { key: "new", label: "לידים שיצרו קשר", Icon: LinkIcon },
  { key: "closed", label: "לידים שסגרו", Icon: DiamondIcon },
];

function LeadsPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<LeadStatus | null>(null);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);

  const { data: allLeads = [], isLoading, isError } = useLeads(user?.id);
  const createLead = useCreateLead(user?.id ?? "");
  const updateLead = useUpdateLead(user?.id ?? "");
  const deleteLead = useDeleteLead(user?.id ?? "");

  const statusFilteredLeads = activeFilter
    ? allLeads.filter((l) => l.status === activeFilter)
    : allLeads;
  const normalizedSearch = search.trim().toLowerCase();
  const filteredLeads = normalizedSearch
    ? statusFilteredLeads.filter((lead) =>
        [
          lead.name,
          lead.phone,
          lead.email,
          lead.source,
          lead.interested_in,
          lead.proposed_price,
          lead.next_task,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedSearch)),
      )
    : statusFilteredLeads;

  const counts: Record<LeadStatus, number> = {
    in_progress: allLeads.filter((l) => l.status === "in_progress").length,
    new: allLeads.filter((l) => l.status === "new").length,
    closed: allLeads.filter((l) => l.status === "closed").length,
  };

  const expandedLead = expandedLeadId ? allLeads.find((l) => l.id === expandedLeadId) : undefined;
  const panelTitle = expandedLead
    ? expandedLead.name
    : (STATUS_TABS.find((s) => s.key === activeFilter)?.label ?? 'לידים בסה"כ');

  const setLeadStatus = (leadId: string, status: LeadStatus) =>
    updateLead.mutate({ leadId, updates: { status } });

  return (
    <>
      <div className="flex w-full flex-col gap-4" dir="rtl">
        {/* ── Tab bar — matches the Figma filter strip exactly ──── */}
        <div className="flex h-[36px] overflow-hidden rounded-[18px] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          {STATUS_TABS.map(({ key, label, Icon }) => {
            const active = key === activeFilter;
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(active ? null : key)}
                className={`flex flex-1 items-center justify-center gap-2 px-2 text-[12px] transition-colors sm:text-[13px] ${
                  active ? "bg-[#f15a48] font-bold text-[#0d0221]" : "bg-white text-[#0d0221] hover:bg-gray-50"
                }`}
              >
                <Icon className="h-[13px] w-[13px] shrink-0" />
                <span className="truncate">{label}</span>
                <span className="opacity-70">({counts[key]})</span>
              </button>
            );
          })}
        </div>

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-5">
          {/* Leads panel */}
          <div className="relative flex min-w-0 flex-1 flex-col">
            {/* "סינון חכם" badge — matches the Figma tab (node 5125:933), sits on
               the card's top-left corner; click reveals the search field. */}
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              className="relative z-10 flex h-[26px] w-fit items-center gap-1.5 self-start rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] bg-[#f15a48] px-3 text-[13px] text-[#fffbf7] shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
            >
              <Filter className="h-3 w-3" />
              סינון חכם
            </button>

            <div className="-mt-px flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] rounded-tl-none bg-white shadow-[0_10px_20px_rgba(0,182,181,0.3)]">
              <div className="flex h-[36px] shrink-0 items-center justify-center rounded-t-[10px] rounded-tl-none bg-[#00b6b5]">
                <h2 className="truncate px-3 text-[16px] font-bold leading-none text-[#0d0221] md:text-[18px]">
                  {panelTitle}
                </h2>
              </div>

              {searchOpen && (
                <div className="flex h-[42px] shrink-0 items-center gap-3 border-b border-[#e7e7e7] bg-white px-4">
                  <span className="text-[13px] font-bold text-[#0d0221]">חיפוש</span>
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="שם, טלפון, מייל, מקור, התעניינות או מחיר"
                    className="min-w-0 flex-1 bg-transparent text-right text-[14px] text-[#444] outline-none placeholder:text-[#aaa]"
                  />
                </div>
              )}

              <div className="max-h-[60vh] overflow-y-auto p-4">
              {isLoading && (
                <div className="flex h-[240px] items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-[#00b6b5]" />
                </div>
              )}
              {isError && (
                <div className="flex h-[240px] items-center justify-center text-[16px] text-red-500">
                  שגיאה בטעינת הנתונים
                </div>
              )}
              {!isLoading && !isError && expandedLead && (
                <LeadDetailCard
                  lead={expandedLead}
                  onCollapse={() => setExpandedLeadId(null)}
                  onEdit={() => setEditingLead(expandedLead)}
                  onDelete={() => {
                    deleteLead.mutate(expandedLead.id);
                    setExpandedLeadId(null);
                  }}
                  onStatusChange={(status) => setLeadStatus(expandedLead.id, status)}
                  onSaveNextTask={(next_task) =>
                    updateLead.mutate({ leadId: expandedLead.id, updates: { next_task } })
                  }
                />
              )}
              {!isLoading && !isError && !expandedLead && filteredLeads.length === 0 && (
                <div className="flex h-[240px] items-center justify-center text-[16px] text-[#aaa]">
                  אין לידים עדיין
                </div>
              )}
              {!isLoading && !isError && !expandedLead && filteredLeads.length > 0 && (
                <div className="flex flex-col gap-3">
                  {filteredLeads.map((lead, i) => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      highlight={i === 0}
                      onExpand={() => setExpandedLeadId(lead.id)}
                      onEdit={() => setEditingLead(lead)}
                      onDelete={() => deleteLead.mutate(lead.id)}
                      onStatusChange={(status) => setLeadStatus(lead.id, status)}
                    />
                  ))}
                </div>
              )}
            </div>
            </div>
          </div>

          {/* Right action panel */}
          <div className="flex flex-col gap-4 lg:w-[220px] lg:shrink-0">
            <button
              onClick={() => setAddOpen(true)}
              className="flex h-[52px] items-center gap-5 rounded-[10px] bg-[#ff5a49] px-4 text-[18px] font-normal text-[#0d0221] shadow-[0_6px_14px_rgba(241,90,72,0.35)]"
              dir="ltr"
            >
              <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[3px] border-2 border-[#0d0221]">
                <Plus className="h-6 w-6" strokeWidth={2.4} />
              </span>
              <span className="flex items-center" dir="rtl">
                הוספת ליד
              </span>
            </button>

            <div className="flex min-h-[120px] flex-col items-center justify-center rounded-[10px] border border-[#e2e2e2] bg-white p-4 text-center text-[13px] leading-[1.6] text-[#f15a48] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <p>
                דף הממו שלך.
                <br />
                פה יכולה לכתוב את
                <br />
                כל מה שתלוי לך על
                <br />
                המקרר........
              </p>
            </div>
          </div>
        </div>
      </div>

      {addOpen && (
        <LeadModal
          mode="add"
          userId={user?.id ?? ""}
          onClose={() => setAddOpen(false)}
          onSave={async (input) => {
            await createLead.mutateAsync(input as LeadInsert);
            setAddOpen(false);
          }}
        />
      )}

      {editingLead && (
        <LeadModal
          mode="edit"
          lead={editingLead}
          userId={user?.id ?? ""}
          onClose={() => setEditingLead(null)}
          onSave={async (updates) => {
            await updateLead.mutateAsync({
              leadId: editingLead.id,
              updates: updates as LeadUpdate,
            });
            setEditingLead(null);
          }}
        />
      )}
    </>
  );
}

// ─── LeadRow ──────────────────────────────────────────────────────────────────

function LeadRow({
  lead,
  highlight,
  onExpand,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  lead: Lead;
  highlight: boolean;
  onExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: LeadStatus) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fallbackSummary = [
    lead.source,
    lead.interested_in,
    lead.proposed_price,
    new Date(lead.created_at).toLocaleDateString("he-IL"),
  ]
    .filter(Boolean)
    .join(" | ");
  const summary = lead.next_task || fallbackSummary;

  return (
    <>
      <div
        className={`flex h-[60px] shrink-0 items-center gap-3 overflow-x-auto rounded-[5px] px-4 py-[5px] shadow-[0px_10px_10px_rgba(0,0,0,0.1)] sm:px-[30px] ${
          highlight ? "bg-[#f15a48]" : "bg-white"
        }`}
        dir="ltr"
      >
        <LeadActionsBar
          lead={lead}
          highlight={highlight}
          onEdit={onEdit}
          onDelete={() => setConfirmDelete(true)}
          onStatusChange={onStatusChange}
        />

        <div
          className={`h-[25px] w-px shrink-0 ${highlight ? "bg-white/40" : "bg-[#0d0221]/15"}`}
        />

        <button
          type="button"
          onClick={onExpand}
          title="פתיחת פרטי הליד"
          className="min-w-[120px] flex-1 truncate text-right text-[14px] leading-[25px] text-[#0d0221] sm:text-[16px] lg:text-[18px]"
          dir="rtl"
        >
          {summary || "אין פרטים נוספים"}
        </button>

        <div
          className={`h-[25px] w-px shrink-0 ${highlight ? "bg-white/40" : "bg-[#0d0221]/15"}`}
        />

        <button
          type="button"
          onClick={onExpand}
          title="פתיחת פרטי הליד"
          className="shrink-0 whitespace-nowrap text-[18px] leading-[normal] text-[#0d0221] sm:text-[22px] lg:text-[26px]"
          dir="rtl"
        >
          {lead.name}
        </button>
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

// ─── LeadDetailCard ───────────────────────────────────────────────────────────
// The single-lead "expanded" view from the Figma design (node 5125:799):
// the same action row as the list, plus contact-info pills and a next-task
// pill, replacing the list until the collapse button is pressed.

function LeadDetailCard({
  lead,
  onCollapse,
  onEdit,
  onDelete,
  onStatusChange,
  onSaveNextTask,
}: {
  lead: Lead;
  onCollapse: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: LeadStatus) => void;
  onSaveNextTask: (nextTask: string) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
  const [taskDraft, setTaskDraft] = useState(lead.next_task ?? "");

  const saveTask = () => {
    onSaveNextTask(taskDraft.trim());
    setEditingTask(false);
  };

  return (
    <div className="relative flex flex-col gap-6 pb-10" dir="rtl">
      <div
        className="flex h-[60px] shrink-0 items-center gap-3 overflow-x-auto rounded-[5px] bg-white px-4 py-[5px] shadow-[0px_10px_10px_rgba(0,0,0,0.1)] sm:px-[30px]"
        dir="ltr"
      >
        <LeadActionsBar lead={lead} onEdit={onEdit} onDelete={() => setConfirmDelete(true)} onStatusChange={onStatusChange} />
        <div className="h-[25px] w-px shrink-0 bg-[#0d0221]/15" />
        <div
          className="min-w-[120px] flex-1 truncate text-[14px] leading-[25px] text-[#0d0221] sm:text-[16px] lg:text-[18px]"
          dir="rtl"
        >
          {lead.next_task || "אין משימה הבאה"}
        </div>
        <div className="h-[25px] w-px shrink-0 bg-[#0d0221]/15" />
        <div
          className="shrink-0 whitespace-nowrap text-[18px] leading-[normal] text-[#0d0221] sm:text-[22px] lg:text-[26px]"
          dir="rtl"
        >
          {lead.name}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {lead.email && <InfoPill>{lead.email}</InfoPill>}
        {lead.phone && <InfoPill>{lead.phone}</InfoPill>}
        <InfoPill>{lead.name}</InfoPill>
      </div>

      <div className="flex min-h-[120px] flex-1 flex-col items-center justify-end gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {editingTask ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveTask();
              }}
              className="flex items-center gap-2 rounded-[10px] bg-[#f15a48] px-4 py-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
            >
              <input
                autoFocus
                value={taskDraft}
                onChange={(e) => setTaskDraft(e.target.value)}
                placeholder="המשימה הבאה שלי"
                className="w-[160px] bg-transparent text-[16px] text-[#0d0221] outline-none placeholder:text-[#0d0221]/60"
              />
              <button type="submit" className="shrink-0 text-[13px] font-bold text-[#0d0221]">
                שמירה
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => {
                setTaskDraft(lead.next_task ?? "");
                setEditingTask(true);
              }}
              className="flex items-center gap-2 rounded-[10px] bg-[#f15a48] px-4 py-1.5 text-[16px] text-[#0d0221] shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
            >
              <PencilIcon className="h-[14px] w-[14px]" />
              המשימה הבאה שלי
            </button>
          )}

          {lead.status === "closed" && (
            <div className="rounded-[10px] bg-[#f15a48] px-4 py-1.5 text-[16px] text-[#0d0221] shadow-[0_10px_20px_rgba(0,0,0,0.1)]">
              סגירת ליד - בהצלחה בפרויקט החדש
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onCollapse}
        title="סגירת כרטיס הליד"
        aria-label="סגירת כרטיס הליד"
        className="absolute bottom-0 left-0 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f15a48] text-[#f15a48] transition-colors hover:bg-[#f15a48]/10"
      >
        <Minus className="h-5 w-5" />
      </button>

      {confirmDelete && (
        <ConfirmDialog
          onConfirm={() => {
            setConfirmDelete(false);
            onDelete();
          }}
          onCancel={() => setConfirmDelete(false)}
        />
      )}
    </div>
  );
}

function InfoPill({ children }: { children: ReactNode }) {
  return (
    <div
      className="max-w-full truncate rounded-[10px] bg-[#00b6b5] px-4 py-1.5 text-[16px] text-[#0d0221] shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
      dir="rtl"
    >
      {children}
    </div>
  );
}

// ─── LeadModal (add + edit) ───────────────────────────────────────────────────

function LeadModal({
  mode,
  lead,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  lead?: Lead;
  userId: string;
  onClose: () => void;
  onSave: (data: Partial<LeadInsert>) => Promise<void>;
}) {
  const [name, setName] = useState(lead?.name ?? "");
  const [phone, setPhone] = useState(lead?.phone ?? "");
  const [email, setEmail] = useState(lead?.email ?? "");
  const [source, setSource] = useState(lead?.source ?? "");
  const [interestedIn, setInterestedIn] = useState(lead?.interested_in ?? "");
  const [proposedPrice, setProposedPrice] = useState(lead?.proposed_price ?? "");
  const [notes, setNotes] = useState(lead?.notes ?? "");
  const [nextTask, setNextTask] = useState(lead?.next_task ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
        phone: phone || undefined,
        email: email || undefined,
        source: source || undefined,
        interested_in: interestedIn || undefined,
        proposed_price: proposedPrice || undefined,
        notes: notes || undefined,
        next_task: nextTask || undefined,
        ...(mode === "add" ? { status: "new" as LeadStatus } : {}),
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
        className="relative w-[92vw] max-w-[1100px] rounded-[14px] border-[3px] border-[#00b6b5] bg-white p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f15a48] text-[#f15a48]"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="mb-7 text-center text-[20px] font-bold text-[#222]">
          {mode === "add" ? "הוספת ליד חדש" : `עריכת ליד — ${lead?.name}`}
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <LeadField label="שם *" value={name} onChange={setName} />
          <LeadField label="טלפון" value={phone} onChange={setPhone} />
          <LeadField label="מייל" value={email} onChange={setEmail} />
          <LeadField label="מקור הליד" value={source} onChange={setSource} />
          <LeadField label="מעוניין ב" value={interestedIn} onChange={setInterestedIn} />
          <LeadField label="הצעת מחיר" value={proposedPrice} onChange={setProposedPrice} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <LeadField label="המשימה הבאה שלי" value={nextTask} onChange={setNextTask} />
          <LeadField label="הערות" value={notes} onChange={setNotes} />
        </div>

        {error && <p className="mt-3 text-center text-[14px] text-red-500">{error}</p>}

        <div className="mt-7 flex items-center gap-3" dir="ltr">
          <button
            onClick={onClose}
            className="h-[42px] rounded-[8px] border border-[#222] bg-white px-8 text-[15px] font-medium text-[#222]"
          >
            ביטול
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="h-[42px] rounded-[8px] bg-[#f15a48] px-8 text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)] disabled:opacity-60"
          >
            {saving ? "שומר..." : mode === "add" ? "הוספת ליד" : "שמירת שינויים"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative rounded-[10px] border border-[#d0d0d0] bg-white px-3 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="—"
        className="w-full bg-transparent text-center text-[14px] text-[#666] outline-none"
      />
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] text-[#222]">
        {label}
      </span>
    </div>
  );
}

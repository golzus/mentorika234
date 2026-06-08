import { createFileRoute } from "@tanstack/react-router";
import { Plus, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { LeadActionsBar } from "@/components/LeadActionsBar";
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

const STATUS_LABELS: { key: LeadStatus | "all"; label: string }[] = [
  { key: "all", label: 'לידים בסה"כ' },
  { key: "in_progress", label: 'לידים במו"מ' },
  { key: "new", label: "לידים חדשים" },
  { key: "closed", label: "לידים שנסגרו" },
];

function LeadsPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const { data: allLeads = [], isLoading, isError } = useLeads(user?.id);
  const createLead = useCreateLead(user?.id ?? "");
  const updateLead = useUpdateLead(user?.id ?? "");
  const deleteLead = useDeleteLead(user?.id ?? "");

  const statusFilteredLeads =
    activeFilter === "all" ? allLeads : allLeads.filter((l) => l.status === activeFilter);
  const normalizedSearch = search.trim().toLowerCase();
  const filteredLeads = normalizedSearch
    ? statusFilteredLeads.filter((lead) =>
        [lead.name, lead.phone, lead.email, lead.source, lead.interested_in, lead.proposed_price]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedSearch)),
      )
    : statusFilteredLeads;
  const closedRevenue = allLeads
    .filter((lead) => lead.status === "closed")
    .reduce((sum, lead) => sum + parseLeadPrice(lead.proposed_price), 0);

  const counts: Record<string, number> = {
    all: allLeads.length,
    in_progress: allLeads.filter((l) => l.status === "in_progress").length,
    new: allLeads.filter((l) => l.status === "new").length,
    closed: allLeads.filter((l) => l.status === "closed").length,
  };

  return (
    <>
      <div className="flex h-full w-full flex-col gap-[2%]" dir="rtl">
        {/* ── Tab bar ─────────────────────────────────────────── */}
        <div className="flex shrink-0 items-stretch gap-[6px]">
          {STATUS_LABELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`flex h-[34px] flex-1 items-center justify-center rounded-[4px] border border-[#bdbdbd] text-[13px] transition-colors ${
                key === activeFilter
                  ? "bg-[#0d0221] font-bold text-white"
                  : "bg-white text-[#222] hover:bg-gray-50"
              }`}
            >
              {label} — {counts[key]}
            </button>
          ))}
        </div>

        <div className="flex h-[38px] shrink-0 items-center gap-3 rounded-[8px] border border-[#e7e7e7] bg-white px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <span className="text-[13px] font-bold text-[#0d0221]">חיפוש</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="שם, טלפון, מייל, מקור, התעניינות או מחיר"
            className="min-w-0 flex-1 bg-transparent text-right text-[14px] text-[#444] outline-none placeholder:text-[#aaa]"
          />
        </div>

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="flex min-h-0 flex-1 gap-[2%]">
          {/* Leads panel */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,182,181,0.3)]">
            <div className="flex h-[30px] shrink-0 items-center justify-center rounded-t-[10px] bg-[#00b6b5] shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
              <h2 className="text-[18px] font-bold leading-[25px] text-[#0d0221]">
                {STATUS_LABELS.find((s) => s.key === activeFilter)?.label ?? "לידים"}
              </h2>
            </div>

            <div className="flex min-h-0 flex-1 overflow-y-auto p-[1.5%]">
              <div className="flex min-w-0 flex-1 flex-col justify-start gap-3 pt-1">
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
                {!isLoading && !isError && filteredLeads.length === 0 && (
                  <div className="flex flex-1 items-center justify-center text-[16px] text-[#aaa]">
                    אין לידים עדיין
                  </div>
                )}
                {filteredLeads.map((lead, i) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    highlight={i === 0}
                    onEdit={() => setEditingLead(lead)}
                    onDelete={() => deleteLead.mutate(lead.id)}
                    onStatusChange={(status) =>
                      updateLead.mutate({ leadId: lead.id, updates: { status } })
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right action panel */}
          <div className="flex w-[18%] min-w-[170px] flex-col gap-[3%]">
            <button
              onClick={() => setAddOpen(true)}
              className="flex h-[48px] items-center gap-5 rounded-[10px] bg-[#ff5a49] px-3.5 text-[18px] font-normal text-[#0d0221] shadow-[0_6px_14px_rgba(241,90,72,0.35)]"
              dir="ltr"
            >
              <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[3px] border-2 border-[#0d0221]">
                <Plus className="h-6 w-6" strokeWidth={2.4} />
              </span>
              <span className="flex items-center" dir="rtl">
                הוספת ליד
              </span>
            </button>

            <div className="rounded-[8px] border border-[#e2e2e2] bg-white p-4 text-center shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              <div className="text-[13px] font-bold leading-[18px] text-[#0d0221]">
                הכנסות מלידים שנסגרו
              </div>
              <div className="mt-2 text-[24px] font-bold leading-[30px] text-[#f15a48]">
                {formatLeadCurrency(closedRevenue)} ש"ח
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center rounded-[8px] border border-[#e2e2e2] bg-white p-4 text-center text-[13px] leading-[1.6] text-[#f15a48] shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
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

function parseLeadPrice(price: string | null | undefined) {
  if (!price) return 0;
  const parsed = Number(price.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatLeadCurrency(value: number) {
  return new Intl.NumberFormat("he-IL").format(value);
}

// ─── LeadRow ──────────────────────────────────────────────────────────────────

function LeadRow({
  lead,
  highlight,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  lead: Lead;
  highlight: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: LeadStatus) => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      <div
        className={`flex h-[56px] shrink-0 items-center gap-[14px] rounded-[6px] bg-white px-[1.5%] ${
          highlight
            ? "shadow-[0_10px_20px_rgba(241,90,72,0.2)]"
            : "shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        }`}
        dir="ltr"
      >
        <LeadActionsBar
          phone={lead.phone}
          email={lead.email}
          onEdit={onEdit}
          onDelete={() => setConfirmDelete(true)}
        />

        <div className="h-[28px] w-px shrink-0 bg-[#d9d9d9]" />

        <div
          className="min-w-0 flex-1 truncate text-[20px] leading-[30px] text-[#0d0221]"
          dir="rtl"
        >
          {[
            lead.source,
            lead.interested_in,
            lead.proposed_price,
            new Date(lead.created_at).toLocaleDateString("he-IL"),
          ]
            .filter(Boolean)
            .join(" | ")}
        </div>

        <div className="h-[28px] w-px shrink-0 bg-[#d9d9d9]" />
        <div className="shrink-0 text-[22px] font-bold leading-[30px] text-[#0d0221]">
          {lead.name}
        </div>
        <div className="h-[28px] w-px shrink-0 bg-[#d9d9d9]" />

        <select
          value={lead.status}
          onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
          className="shrink-0 rounded bg-transparent text-[18px] leading-[26px] text-[#666] outline-none"
          dir="rtl"
        >
          <option value="new">חדש</option>
          <option value="in_progress">במו&quot;מ</option>
          <option value="closed">נסגר</option>
        </select>
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

        <div className="mt-4">
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

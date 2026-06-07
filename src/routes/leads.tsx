import { createFileRoute } from "@tanstack/react-router";
import leadActions from "@/assets/figma/lead-actions.svg";
import plusIcon from "@/assets/figma/plus-icon.svg";
import { X, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth/auth-context";
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from "@/hooks/use-leads";
import type { Lead, LeadInsert, LeadStatus } from "@/lib/db/schemas";

export const Route = createFileRoute("/leads")({
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

const STATUS_HEB: Record<LeadStatus, string> = {
  new: "חדש",
  in_progress: 'במו"מ',
  closed: "נסגר",
};

function LeadsPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState<LeadStatus | "all">("all");
  const [open, setOpen] = useState(false);

  const { data: allLeads = [], isLoading, isError } = useLeads(user?.id);
  const createLead = useCreateLead(user?.id ?? "");
  const updateLead = useUpdateLead(user?.id ?? "");
  const deleteLead = useDeleteLead(user?.id ?? "");

  const filteredLeads =
    activeFilter === "all"
      ? allLeads
      : allLeads.filter((l) => l.status === activeFilter);

  const counts: Record<string, number> = {
    all: allLeads.length,
    in_progress: allLeads.filter((l) => l.status === "in_progress").length,
    new: allLeads.filter((l) => l.status === "new").length,
    closed: allLeads.filter((l) => l.status === "closed").length,
  };

  return (
    <DashboardShell active="מעקב לידים">
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

        {/* ── Main content ─────────────────────────────────────── */}
        <div className="flex min-h-0 flex-1 gap-[2%]">
          {/* Leads panel */}
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,182,181,0.3)]">
            <div className="flex h-[30px] shrink-0 items-center justify-center rounded-t-[10px] bg-[#00b6b5] shadow-[0_10px_10px_rgba(0,0,0,0.1)]">
              <h2 className="text-[18px] font-bold leading-[25px] text-[#0d0221]">
                {STATUS_LABELS.find((s) => s.key === activeFilter)?.label ?? "לידים"}
              </h2>
            </div>

            <div className="flex min-h-0 flex-1 overflow-hidden p-[1.5%]">
              <div className="relative ml-[2%] flex shrink-0 items-stretch">
                <div className="w-[5px] rounded-full bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]" />
                {filteredLeads.length > 0 && (
                  <div className="absolute top-[5%] h-[22%] w-[5px] rounded-full bg-[#f15a48] shadow-[0_10px_20px_rgba(0,0,0,0.1)]" />
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-start gap-2 overflow-y-auto pl-[1.5%] pt-1">
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
              onClick={() => setOpen(true)}
              className="flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-[8px] bg-[#f15a48] text-[16px] font-bold text-white shadow-[0_4px_10px_rgba(241,90,72,0.35)] transition-opacity hover:opacity-90"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-[4px] border-2 border-white">
                <img src={plusIcon} alt="" className="h-[13px] w-[15px]" />
              </span>
              הוספת ליד
            </button>

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

      {open && (
        <NewLeadModal
          userId={user?.id ?? ""}
          onClose={() => setOpen(false)}
          onSave={async (input) => {
            await createLead.mutateAsync(input);
            setOpen(false);
          }}
        />
      )}
    </DashboardShell>
  );
}

function LeadRow({
  lead,
  highlight,
  onDelete,
  onStatusChange,
}: {
  lead: Lead;
  highlight: boolean;
  onDelete: () => void;
  onStatusChange: (status: LeadStatus) => void;
}) {
  return (
    <div
      className={`flex h-[39px] shrink-0 items-center gap-[10px] rounded-[5px] bg-white px-[1%] ${
        highlight
          ? "shadow-[0_10px_20px_rgba(241,90,72,0.2)]"
          : "shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
      }`}
      dir="ltr"
    >
      <img src={leadActions} alt="" className="h-[24px] w-[92px] shrink-0 object-contain" />
      <div className="h-[19px] w-px shrink-0 bg-[#d9d9d9]" />
      <div className="min-w-0 flex-1 truncate text-[15px] leading-[25px] text-[#0d0221]" dir="rtl">
        {lead.source && `${lead.source} | `}
        {lead.interested_in && `${lead.interested_in} | `}
        {lead.proposed_price && `${lead.proposed_price} | `}
        {new Date(lead.created_at).toLocaleDateString("he-IL")}
      </div>
      <div className="h-[19px] w-px shrink-0 bg-[#d9d9d9]" />
      <div className="shrink-0 text-[16px] font-bold leading-[25px] text-[#0d0221]">{lead.name}</div>
      <div className="h-[19px] w-px shrink-0 bg-[#d9d9d9]" />
      <select
        value={lead.status}
        onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
        className="shrink-0 rounded bg-transparent text-[12px] text-[#666] outline-none"
        dir="rtl"
      >
        <option value="new">חדש</option>
        <option value="in_progress">במו&quot;מ</option>
        <option value="closed">נסגר</option>
      </select>
      <button onClick={onDelete} className="shrink-0 text-[#ccc] hover:text-red-400">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function NewLeadModal({
  userId,
  onClose,
  onSave,
}: {
  userId: string;
  onClose: () => void;
  onSave: (input: LeadInsert) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [interestedIn, setInterestedIn] = useState("");
  const [proposedPrice, setProposedPrice] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async () => {
    if (!name.trim()) { setError("שם הליד חובה"); return; }
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
        status: "new",
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

        <h2 className="mb-7 text-center text-[20px] font-bold text-[#222]">הוספת ליד חדש</h2>

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
            {saving ? "שומר..." : "הוספת ליד"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
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

import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Pencil, Trash2, Plus, X } from "lucide-react";
import { useState } from "react";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "מנטוריקה — מעקב לידים" },
      { name: "description", content: "מעקב לידים וניהול הלקוחות הפוטנציאליים." },
    ],
  }),
  component: LeadsPage,
});

const tabs = [
  { label: 'לידים בסה"כ - 10', active: true },
  { label: "לידים שיצרו קשר - 10" },
  { label: "לידים חדשים - 40" },
  { label: "לידים שנסגרו - 10" },
  { label: "" },
];

type Lead = {
  name: string;
  source: string;
  type: string;
  budget: string;
  date: string;
};

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(
    Array.from({ length: 5 }, () => ({
      name: "ישראלה ישראלי",
      source: "המלצה מחברה",
      type: "אתר תדמית",
      budget: "8,000-10,000",
      date: "01.01.2026",
    })),
  );
  const [open, setOpen] = useState(false);

  const addLead = (l: Lead) => {
    setLeads((p) => [...p, l]);
    setOpen(false);
  };

  return (
    <DashboardShell active="מעקב לידים">
      <div className="mb-[16px] flex items-stretch gap-[6px]" dir="rtl">
        {tabs.map((t, i) => (
          <div
            key={i}
            className={`flex h-[34px] flex-1 items-center justify-center rounded-[4px] border border-[#bdbdbd] text-[13px] ${
              t.active ? "bg-black font-bold text-white" : "bg-white text-[#222]"
            }`}
          >
            {t.label}
          </div>
        ))}
      </div>

      <section className="rounded-[10px] border border-[#e0e0e0] bg-white p-[22px] shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-[200px_1fr] gap-[22px]" dir="rtl">
          <div className="order-2 flex flex-col gap-[14px]">
            {leads.map((l, i) => (
              <div
                key={i}
                className="flex h-[52px] items-center justify-between rounded-[8px] border border-[#e2e2e2] bg-white px-4 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-center gap-3 text-[#666]">
                  <Phone className="h-[18px] w-[18px]" />
                  <Mail className="h-[18px] w-[18px]" />
                  <Pencil className="h-[18px] w-[18px]" />
                  <Trash2 className="h-[18px] w-[18px]" />
                </div>
                <div className="flex items-center gap-3 text-[14px] text-[#222]">
                  <span>{l.date}</span>
                  <span className="text-[#bdbdbd]">|</span>
                  <span>{l.budget}</span>
                  <span className="text-[#bdbdbd]">|</span>
                  <span>{l.type}</span>
                  <span className="text-[#bdbdbd]">|</span>
                  <span>{l.source}</span>
                </div>
                <div className="text-[16px] font-bold text-[#222]">{l.name}</div>
              </div>
            ))}
          </div>

          <div className="order-1 flex flex-col gap-[14px]">
            <button
              onClick={() => setOpen(true)}
              className="flex h-[52px] items-center justify-center gap-2 rounded-[8px] bg-coral text-[16px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-[4px] border-2 border-white">
                <Plus className="h-4 w-4" />
              </span>
              הוספת ליד
            </button>

            <div className="flex-1 rounded-[8px] border border-[#e2e2e2] bg-white p-4 text-center text-[13px] leading-[1.6] text-coral shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
              דף הממו שלך.
              <br />
              פה יכולה לכתוב את
              <br />
              כל מה שתלוי לך על
              <br />
              המקרר........
            </div>
          </div>
        </div>
      </section>

      {open && <NewLeadModal onClose={() => setOpen(false)} onSave={addLead} />}
    </DashboardShell>
  );
}

function NewLeadModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (l: Lead) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [date, setDate] = useState("01.01.2026");
  const [notes, setNotes] = useState("");

  const save = () => {
    onSave({
      name: name || "ליד חדש",
      source: source || "—",
      type: type || "—",
      budget: budget || "—",
      date: date || "—",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="relative w-[92vw] max-w-[1100px] rounded-[14px] border-[3px] border-[#3ba9ff] bg-white p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-coral text-coral"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="mb-7 text-center text-[20px] font-bold text-[#222]">
          הוספת ליד חדש
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <LeadField label="שם" value={name} onChange={setName} />
          <LeadField label="טלפון" value={phone} onChange={setPhone} />
          <LeadField label="מייל" value={email} onChange={setEmail} />
          <LeadField label="מקור הליד" value={source} onChange={setSource} />
          <LeadField label="סוג הליד" value={type} onChange={setType} />
          <LeadField label="טווח תקציבי" value={budget} onChange={setBudget} />
        </div>

        <div className="mt-4">
          <LeadField label="הערות" value={notes} onChange={setNotes} />
        </div>

        <div className="mt-7 flex items-center gap-3" dir="ltr">
          <button
            onClick={onClose}
            className="h-[42px] rounded-[8px] border border-[#222] bg-white px-8 text-[15px] font-medium text-[#222]"
          >
            ביטול
          </button>
          <button
            onClick={save}
            className="h-[42px] rounded-[8px] bg-coral px-8 text-[15px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)]"
          >
            הוספת ליד
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

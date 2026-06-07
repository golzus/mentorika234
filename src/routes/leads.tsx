import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Pencil, Trash2, Plus } from "lucide-react";
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

function LeadsPage() {
  const rows = Array.from({ length: 5 });

  return (
    <DashboardShell active="מעקב לידים">
      {/* Tabs */}
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

      {/* Main card */}
      <section className="rounded-[10px] border border-[#e0e0e0] bg-white p-[22px] shadow-[0_4px_14px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-[200px_1fr] gap-[22px]" dir="rtl">
          {/* Right column (rows) */}
          <div className="order-2 flex flex-col gap-[14px]">
            {rows.map((_, i) => (
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
                  <span>01.01.2026</span>
                  <span className="text-[#bdbdbd]">|</span>
                  <span>8,000-10,000</span>
                  <span className="text-[#bdbdbd]">|</span>
                  <span>אתר תדמית</span>
                  <span className="text-[#bdbdbd]">|</span>
                  <span>המלצה מחברה</span>
                </div>
                <div className="text-[16px] font-bold text-[#222]">ישראלה ישראלי</div>
              </div>
            ))}
          </div>

          {/* Left column (add + note) */}
          <div className="order-1 flex flex-col gap-[14px]">
            <button className="flex h-[52px] items-center justify-center gap-2 rounded-[8px] bg-coral text-[16px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)]">
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
    </DashboardShell>
  );
}

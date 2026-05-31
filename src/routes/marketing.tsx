import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "מנטוריקה — מעקב שיווק" },
      { name: "description", content: "מעקב שיווק ומכירות יזומות מול הלקוח הפוטנציאלי." },
    ],
  }),
  component: MarketingPage,
});

const tabs = [
  { label: "בניית תשתיות" },
  { label: "המלצות" },
  { label: "שימור" },
  { label: 'שתפ"ם' },
  { label: "חשיפה" },
  { label: "מכירות", active: true },
];

const rows = Array.from({ length: 8 });

function MarketingPage() {
  return (
    <DashboardShell active="מעקב שיווק">
      {/* Tabs */}
      <div
        className="mb-[18px] flex items-stretch overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
        dir="ltr"
      >
        {tabs.map((t, i) => {
          if (t.active) {
            return (
              <div
                key={t.label}
                className="flex h-[44px] flex-1 items-center justify-center rounded-[8px] bg-coral text-[18px] font-bold text-white"
              >
                {t.label}
              </div>
            );
          }
          return (
            <div
              key={t.label}
              className={`flex h-[44px] flex-1 items-center justify-center text-[17px] font-medium text-[#444] ${
                i === 0 ? "" : "border-l border-[#f0c8c0]"
              }`}
            >
              {t.label}
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div className="grid grid-cols-[1fr_460px] gap-[28px]" dir="ltr">
        {/* Right (RTL first): tasks list */}
        <section className="rounded-[10px] border border-[#e7e7e7] bg-white p-[22px] shadow-[0_7px_18px_rgba(0,0,0,0.06)]">
          <div className="mb-[14px] flex items-start justify-between" dir="rtl">
            <div>
              <h2 className="text-[26px] font-bold leading-tight text-[#222]">
                מכירות יזומות מול הלקוח הפוטנציאלי
              </h2>
              <p className="mt-1 text-[13px] text-[#666]">
                מכירות יזומות מול הלקוח הפוטנציאלי
              </p>
            </div>
            <button className="flex h-[44px] items-center gap-2 rounded-[8px] bg-coral px-4 text-[16px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)]">
              <Plus className="h-5 w-5" />
              משימה חדשה
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-[18px] gap-y-[12px]" dir="rtl">
            {rows.map((_, i) => (
              <div
                key={i}
                className="flex h-[58px] items-center justify-between rounded-[10px] border border-[#eee] bg-white px-4 shadow-[0_2px_6px_rgba(0,0,0,0.05)]"
              >
                <div className="text-right">
                  <div className="text-[17px] font-bold leading-tight text-coral">
                    עדכון אחד
                  </div>
                  <div className="text-[12px] leading-tight text-coral">היום 09:00 PM</div>
                </div>
                <div
                  className="rounded-full border-2"
                  style={{ width: 20, height: 20, borderColor: "#ff6b57" }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Left: gauge card */}
        <aside className="flex flex-col items-center rounded-[10px] border border-[#e7e7e7] bg-white px-6 py-8 text-center shadow-[0_7px_18px_rgba(0,0,0,0.06)]" dir="rtl">
          <h3 className="text-[26px] font-bold leading-tight text-[#222]">
            כבר כמעט הגעת ליעד.
          </h3>
          <h3 className="text-[26px] font-bold leading-tight text-[#222]">כל הכבוד!</h3>

          <div className="mt-8">
            <TicksGauge value={100} max={200} />
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function TicksGauge({ value, max }: { value: number; max: number }) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 110;
  const rInner = 92;
  const totalTicks = 30;
  const filledTicks = Math.round((value / max) * totalTicks);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {Array.from({ length: totalTicks }).map((_, i) => {
          const angle = (i / totalTicks) * Math.PI * 2 - Math.PI / 2;
          const x1 = cx + Math.cos(angle) * rInner;
          const y1 = cy + Math.sin(angle) * rInner;
          const x2 = cx + Math.cos(angle) * rOuter;
          const y2 = cy + Math.sin(angle) * rOuter;
          const isFilled = i < filledTicks;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isFilled ? "#18b5b6" : "#cfeeee"}
              strokeWidth={8}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[56px] font-extrabold leading-none text-coral">{value}</div>
        <div className="mt-1 text-[14px] font-bold leading-tight text-[#222]">
          מכירות יזומות
        </div>
        <div className="text-[14px] font-bold leading-tight text-[#222]">חדשות</div>
        <div className="mt-1 text-[12px] text-[#666]">מתוך {max}</div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Plus, X, Calendar, ChevronDown, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
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

type Task = { title: string; time: string };

function MarketingPage() {
  const [tasks, setTasks] = useState<Task[]>(
    Array.from({ length: 8 }, () => ({ title: "עדכון אחד", time: "היום 09:00 PM" })),
  );
  const [open, setOpen] = useState(false);

  const addTask = (t: Task) => {
    setTasks((prev) => [...prev, t]);
    setOpen(false);
  };

  return (
    <DashboardShell active="מעקב שיווק">
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

      <div className="grid grid-cols-[1fr_460px] gap-[28px]" dir="ltr">
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
            <button
              onClick={() => setOpen(true)}
              className="flex h-[44px] items-center gap-2 rounded-[8px] bg-coral px-4 text-[16px] font-bold text-white shadow-[0_4px_10px_rgba(255,107,87,0.35)]"
            >
              <Plus className="h-5 w-5" />
              משימה חדשה
            </button>
          </div>

          <div className="grid grid-cols-2 gap-x-[18px] gap-y-[12px]" dir="rtl">
            {tasks.map((t, i) => (
              <div
                key={i}
                className="flex h-[58px] items-center justify-between rounded-[10px] border border-[#eee] bg-white px-4 shadow-[0_2px_6px_rgba(0,0,0,0.05)]"
              >
                <div className="text-right">
                  <div className="text-[17px] font-bold leading-tight text-coral">{t.title}</div>
                  <div className="text-[12px] leading-tight text-coral">{t.time}</div>
                </div>
                <div
                  className="rounded-full border-2"
                  style={{ width: 20, height: 20, borderColor: "#ff6b57" }}
                />
              </div>
            ))}
          </div>
        </section>

        <aside
          className="flex flex-col items-center rounded-[10px] border border-[#e7e7e7] bg-white px-6 py-8 text-center shadow-[0_7px_18px_rgba(0,0,0,0.06)]"
          dir="rtl"
        >
          <h3 className="text-[26px] font-bold leading-tight text-[#222]">
            כבר כמעט הגעת ליעד.
          </h3>
          <h3 className="text-[26px] font-bold leading-tight text-[#222]">כל הכבוד!</h3>

          <div className="mt-8">
            <TicksGauge value={100} max={200} />
          </div>
        </aside>
      </div>

      {open && <NewTaskModal onClose={() => setOpen(false)} onSave={addTask} />}
    </DashboardShell>
  );
}

function NewTaskModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (t: Task) => void;
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("01.01.2026");
  const [goal, setGoal] = useState("");
  const [weekly, setWeekly] = useState("");
  const [target, setTarget] = useState("מכירות");
  const [actions, setActions] = useState<string[]>(["עדכון אתר", "עדכון אתר", "עדכון אתר", "עדכון אתר"]);

  const save = () => {
    onSave({
      title: title || "משימה חדשה",
      time: `היום ${new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}`,
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="relative w-[760px] rounded-[16px] border-[3px] border-[#3ba9ff] bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-coral text-coral"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="mb-6 text-center text-[22px] font-bold text-teal underline underline-offset-4">
          הוספת משימה חדשה
        </h2>

        <div className="grid grid-cols-3 gap-3">
          <FieldHeader label="תאריך יעד לביצוע">
            <div className="flex items-center justify-center gap-2 px-3 py-2.5">
              <Calendar className="h-4 w-4 text-teal" />
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-center text-[14px] outline-none"
              />
            </div>
          </FieldHeader>
          <FieldHeader label="יעדים מדידים">
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="פירוט מספרי ליעד"
              className="w-full bg-transparent px-3 py-2.5 text-center text-[14px] text-[#999] outline-none"
            />
          </FieldHeader>
          <FieldHeader label="פירוט המשימה">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="..."
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
                <ChevronDown className="h-4 w-4 text-coral" />
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full appearance-none bg-transparent text-center text-[14px] outline-none"
                >
                  <option>מכירות</option>
                  <option>שיווק</option>
                  <option>שימור</option>
                </select>
              </div>
            </FieldHeader>
          </div>

          <div className="rounded-[10px] border border-[#eee] bg-white overflow-hidden">
            <div className="bg-coral py-2 text-center text-[15px] font-bold text-white">
              פירוט פעולות להשלמת המשימה
            </div>
            <div className="px-3 py-2">
              {actions.map((a, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[#f0f0f0] py-1.5 last:border-0">
                  <div className="flex items-center gap-2 text-[12px] text-[#888]">
                    <Pencil className="h-3 w-3" />
                    <Trash2 className="h-3 w-3" />
                    <span>היום</span>
                    <span>09:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13px]">{a}</span>
                    <input type="radio" />
                  </div>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-[#eee] pt-2 text-[#888]">
                <div className="flex items-center gap-2">
                  <Trash2 className="h-3.5 w-3.5" />
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="text-[11px]">|</span>
                </div>
                <button
                  onClick={() => setActions([...actions, "עדכון אתר"])}
                  className="flex h-5 w-5 items-center justify-center rounded-full border border-[#888]"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div className="px-3 pb-2 text-left text-[10px] text-coral">
              לפתיחה בחלונית נפרדת
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3" dir="ltr">
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
            שמירת משימה
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldHeader({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[#eee] bg-white">
      <div className="bg-teal py-2 text-center text-[14px] font-bold text-white">{label}</div>
      {children}
    </div>
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
        <div className="mt-1 text-[14px] font-bold leading-tight text-[#222]">מכירות יזומות</div>
        <div className="text-[14px] font-bold leading-tight text-[#222]">חדשות</div>
        <div className="mt-1 text-[12px] text-[#666]">מתוך {max}</div>
      </div>
    </div>
  );
}

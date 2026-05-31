import { createFileRoute } from "@tanstack/react-router";
import {
  Phone, Mail, Pencil, Trash2, Plus, Calendar, Clock, MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import gaugeSvg from "@/assets/gauge-65.svg";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "מנטוריקה — ניהול לידים" },
      { name: "description", content: "מסך ניהול לידים, משימות שבועיות ויעדים חודשיים." },
    ],
  }),
  component: LeadsDashboard,
});

const sideNav = [
  "מסך פתיחה",
  "פרופיל העסק",
  "מעקב שיווק",
  "מעקב לידים",
  "שימור לקוחות",
  "גביה ותשלומים",
  "ניהול שוטף",
  "חדר בקרה",
];

const leads = Array.from({ length: 5 }).map(() => ({
  name: "ישראלה ישראלי",
  meta: 'המלצה | אתר תדמית | 5000 | 01.01.2026',
}));

const tasks = [
  { state: "danger" }, { state: "danger" }, { state: "success" }, { state: "success" },
] as const;

const stats = [
  { label: "מכירות", value: "10", sub: "מכירות יזומות\nמול לקוחות פוטנציאליים", color: "#28b463" },
  { label: "חשיפה", value: "50", sub: "פרסום אונליין / פרינטים /\nדיגיטליים", color: "#28b463" },
  { label: 'שתפ"ם', value: "30", sub: "הפצות ושיתופי פעולה", color: "#28b463" },
  { label: "שימור", value: "15", sub: "מתנות ומפגשי שביעות\nרצון לקוח", color: "#ff6b57" },
  { label: "המלצות", value: "22", sub: "איסוף המלצות מלקוחות\nמרוצים", color: "#ff6b57" },
  { label: "בניית תשתיות", value: "52", sub: "???", color: "#28b463" },
];

function LeadsDashboard() {
  return (
    <div className="min-h-screen w-screen overflow-auto bg-teal" dir="rtl">
      <div className="relative mx-auto overflow-hidden figma-wrap">
      <div
        className="absolute left-0 top-0 h-[870px] w-[1650px] origin-top-left overflow-hidden bg-teal figma-stage"
      >
        {/* Inner cream container */}
        <div className="absolute left-[30px] top-[30px] h-[810px] w-[1470px] rounded-[6px] bg-[#fffbf7] shadow-[0_4px_18px_rgba(0,0,0,0.05)]" />

        {/* Tip ribbon */}
        <aside
          className="absolute left-[24px] top-0 z-30 w-[96px] bg-coral text-white"
          style={{ borderRadius: "0 0 6px 6px" }}
        >
          <div className="px-2 py-2 text-center">
            <div className="mb-2 text-[17px] font-bold leading-tight">הטיפ היומי</div>
            <div className="text-[14px] font-medium leading-tight">
              עקבי אחרי המספרים - הם מספרים את הסיפור האמיתי
            </div>
          </div>
        </aside>

        {/* Sidebar - fixed on the RIGHT like the reference */}
        <nav className="absolute bottom-[30px] right-[30px] top-[186px] z-20 flex w-[120px] flex-col rounded-tl-[10px] bg-teal">
          <div className="absolute -top-[36px] right-0 h-[32px] w-[120px] rounded-full bg-[#fffbf7] text-center text-[16px] font-medium leading-[32px] text-[#222]">
            מסך פתיחה
          </div>
          {sideNav.slice(1).map((item) => (
            <button
              key={item}
              className="flex h-[82px] items-center justify-center px-2 text-center text-[17px] font-medium leading-tight text-[#222]"
            >
              {item}
            </button>
          ))}
          <img src={logoZahavi} alt="זהבי הסגל" className="absolute bottom-[22px] left-1/2 h-[76px] w-auto -translate-x-1/2" />
        </nav>

        <main className="absolute left-[102px] top-[94px] z-10 w-[1342px]">
            {/* Header */}
            <header className="mb-[28px] flex h-[84px] items-start justify-between gap-4" dir="ltr">
              {/* Logo - left in flow */}
              <div className="flex w-[230px] shrink-0 flex-col items-center pt-[2px]">
                <img src={logoMentorika} alt="מנטוריקה" className="h-[45px] w-auto" />
                <div className="mt-[-8px] text-[42px] font-extrabold leading-none text-[#19172f]">מנטוריקה</div>
              </div>
              {/* Greeting - right */}
              <div className="pt-[14px] text-right" dir="rtl">
                <div className="flex items-baseline justify-end gap-3">
                  <span className="text-[17px] text-[#222]">
                    יום חמישי 16.04.2026
                  </span>
                  <h1 className="text-[40px] font-medium leading-none text-[#222]">
                    שלום ישראלה ישראלי
                  </h1>
                </div>
                <div className="mt-3 text-[13px] text-coral">
                  להוסיף פירורי לחם בכל עמוד
                </div>
              </div>
            </header>

            {/* Row 1: Tasks (right ~38%) + Leads (left ~62%) */}
            <div className="grid grid-cols-[810px_500px] gap-[30px]" dir="ltr">
              <LeadsCard />
              <TasksCard />
            </div>

            {/* Row 2: Revenue (left) + Active Clients (middle) + Stats grid (right) */}
            <div className="mt-[30px] grid grid-cols-[430px_330px_500px] gap-[30px]" dir="ltr">
              <div>
                <RevenueCard />
              </div>
              <div>
                <ActiveClientsCard />
              </div>
              <div className="grid grid-cols-3 gap-[2px]">
                {stats.map((s) => <StatCard key={s.label} {...s} />)}
              </div>
            </div>
        </main>

        {/* Mobile nav */}
        <nav className="hidden">
          {sideNav.slice(0, 4).map((item, i) => (
            <button
              key={item}
              className={`rounded px-2 py-2 text-[11px] font-medium ${
                i === 0 ? "bg-teal text-white" : "text-[#222]"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      </div>
    </div>
  );
}

function CardHeader({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div
      className="relative flex items-center justify-center bg-teal px-3 text-white"
      style={{ height: 30, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
    >
      {action && <div className="absolute right-2 top-1/2 -translate-y-1/2">{action}</div>}
      <h3 className="text-[18px] font-bold leading-none text-[#111]">{children}</h3>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden bg-white ${className}`}
      style={{
        borderRadius: 8,
        border: "1px solid #e7e7e7",
        boxShadow: "0 7px 18px rgba(0,0,0,0.13)",
      }}
    >
      {children}
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded p-0.5 text-teal transition hover:bg-[#f0eeea]">
      {children}
    </button>
  );
}

function LeadsCard() {
  return (
    <Card>
      <CardHeader>לידים במו"מ</CardHeader>
      <ul>
        {leads.map((l, i) => (
          <li
            key={i}
            className={`flex items-center gap-2 border-b border-[#f0eeea] px-3 last:border-0 ${
              i === 0 ? "bg-[#fff5f3]" : ""
            }`}
            style={{ height: 51 }}
          >
            <div className="flex items-center gap-0.5">
              <IconBtn><Phone className="h-4 w-4" /></IconBtn>
              <IconBtn><Mail className="h-4 w-4 text-coral" /></IconBtn>
              <IconBtn><Pencil className="h-4 w-4" /></IconBtn>
              <IconBtn><Trash2 className="h-4 w-4" /></IconBtn>
            </div>
            <div className="flex-1 text-right text-[17px]">
              <span className="text-[#444]">{l.meta}</span>
              <span className="mx-2 font-bold text-teal">{l.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function TasksCard() {
  return (
    <Card>
      <CardHeader
        action={
          <button
            className="flex items-center justify-center rounded bg-coral text-white shadow"
            style={{ width: 26, height: 26 }}
          >
            <Plus className="h-4 w-4" />
          </button>
        }
      >
        משימות שבועיות
      </CardHeader>
      <ul>
        {tasks.map((t, i) => {
          const isDanger = t.state === "danger";
          const color = isDanger ? "#ff6b57" : "#28b463";
          return (
            <li
              key={i}
              className="flex items-center justify-between gap-2 border-b border-[#f0eeea] px-3 last:border-0"
              style={{ height: 51 }}
            >
              <div className="flex items-center gap-0.5">
                <IconBtn><Pencil className="h-3 w-3" /></IconBtn>
                <IconBtn><Trash2 className="h-3 w-3 text-coral" /></IconBtn>
              </div>
              <div className="flex-1 text-right">
                <div className="text-[17px] font-bold leading-tight" style={{ color }}>עדכון אתר</div>
                <div className="text-[12px] leading-tight" style={{ color }}>היום 09:00 PM</div>
              </div>
              <div
                className="rounded-full border-2"
                style={{ width: 20, height: 20, borderColor: color }}
              />
            </li>
          );
        })}
      </ul>
      <div className="flex h-[31px] items-center justify-between border-t border-[#f0eeea] bg-[#faf8f5] px-3 text-[#666]">
        <MoreHorizontal className="h-3.5 w-3.5" />
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5" />
          <Clock className="h-3.5 w-3.5" />
          <Trash2 className="h-3.5 w-3.5" />
          <Plus className="h-3.5 w-3.5" />
        </div>
      </div>
    </Card>
  );
}

function RevenueCard() {
  return (
    <Card>
      <CardHeader>סך הכנסות לחודש <span className="underline">יולי</span></CardHeader>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="text-right">
          <div className="text-[34px] font-bold leading-none text-coral md:text-[40px]">
            6,000 <span className="text-[22px]">ש"ח</span>
          </div>
          <div className="mt-2 text-[11px] text-[#666]">
            מתוך יעד של 10,000 ש"ח
          </div>
        </div>
        <img src={gaugeSvg} alt="65%" className="h-[90px] w-[90px] shrink-0" />
      </div>
    </Card>
  );
}

function ActiveClientsCard() {
  return (
    <Card>
      <CardHeader>לקוחות פעילים</CardHeader>
      <ul>
        {[0, 1, 2].map((i) => (
          <li
            key={i}
            className="flex items-center justify-between gap-2 border-b border-[#f0eeea] px-3 text-[11px] text-[#666] last:border-0"
            style={{ height: 44 }}
          >
            <ChevronLeft className="h-3 w-3 shrink-0" />
            <span className="truncate">שירות ע"י | הצעת מחיר | תאריך</span>
            <span className="shrink-0 font-bold text-teal">39 לידים</span>
            <span className="shrink-0">הגיע ע"י</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <Card className="flex flex-col">
      <div
        className="bg-teal text-center text-[12px] font-bold text-white"
        style={{ height: 24, lineHeight: "24px" }}
      >
        {label}
      </div>
      <div className="flex flex-1 flex-col items-center justify-between gap-1 px-1 py-2">
        <p className="whitespace-pre-line text-center text-[9px] leading-tight text-[#666]">
          {sub}
        </p>
        <div className="text-[24px] font-bold leading-none" style={{ color }}>{value}</div>
      </div>
    </Card>
  );
}

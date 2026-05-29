import { createFileRoute } from "@tanstack/react-router";
import {
  Phone, Mail, Pencil, Trash2, Plus, Calendar, Clock, MoreHorizontal,
  ChevronLeft,
} from "lucide-react";
import logoMentorika from "@/assets/logo-mentorika.png";
import logoZahavi from "@/assets/logo-zahavi.png";
import gaugeSvg from "@/assets/gauge-65.svg";

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
    <div className="min-h-screen bg-page p-3 md:p-5 lg:p-6" dir="rtl">
      {/* Outer cream container */}
      <div className="relative mx-auto max-w-[1500px] rounded-[10px] bg-[#fffbf7] shadow-[0_4px_18px_rgba(0,0,0,0.05)]">
        {/* Tip ribbon — inside top-left corner of cream container */}
        <aside
          className="absolute left-0 top-0 z-20 hidden w-[68px] bg-coral text-white md:block"
          style={{ borderRadius: "0 0 8px 0" }}
        >
          <div className="px-2 py-2 text-center">
            <div className="mb-1 text-[12px] font-bold leading-tight">הטיפ היומי</div>
            <div className="text-[10px] font-medium leading-tight">
              עקבי אחרי המספרים - הם מספרים את הסיפור האמיתי
            </div>
          </div>
        </aside>

        <div className="flex">
          {/* Main content (RTL: appears left side) */}
          <main className="min-w-0 flex-1 p-4 pt-5 md:p-6 md:pt-6 lg:p-8">
            {/* Header */}
            <header className="mb-5 flex items-start justify-between gap-4">
              {/* Logo - left in flow */}
              <div className="flex shrink-0 items-center pl-[72px] md:pl-[80px]">
                <img src={logoMentorika} alt="מנטוריקה" className="h-14 w-auto md:h-16" />
              </div>
              {/* Greeting - right */}
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-3">
                  <span className="text-[14px] text-[#222] md:text-[16px]">
                    יום חמישי 16.04.2026
                  </span>
                  <h1 className="text-[24px] font-medium leading-none text-[#222] md:text-[30px]">
                    שלום ישראלה ישראלי
                  </h1>
                </div>
                <div className="mt-2 text-[11px] text-coral md:text-[12px]">
                  להוסיף פירורי לחם בכל עמוד
                </div>
              </div>
            </header>

            {/* Row 1: Tasks (right ~38%) + Leads (left ~62%) */}
            <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-[38%_1fr]">
              <TasksCard />
              <LeadsCard />
            </div>

            {/* Row 2: Revenue (left) + Active Clients (middle) + Stats grid (right) */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:mt-5 md:gap-5 lg:grid-cols-[1fr_1fr_minmax(0,1.3fr)]">
              {/* RTL order: stats first, then active clients, then revenue */}
              <div className="order-3 lg:order-1">
                <RevenueCard />
              </div>
              <div className="order-2">
                <ActiveClientsCard />
              </div>
              <div className="order-1 grid grid-cols-3 gap-2 lg:order-3">
                {stats.map((s) => <StatCard key={s.label} {...s} />)}
              </div>
            </div>

            {/* Brand */}
            <div className="mt-5 flex justify-end">
              <img src={logoZahavi} alt="זהבי הסגל" className="h-10 w-auto md:h-12" />
            </div>
          </main>

          {/* Sidebar - RIGHT (text only) */}
          <nav className="hidden shrink-0 flex-col items-stretch py-8 pl-2 pr-4 lg:flex" style={{ width: 130 }}>
            {sideNav.map((item, i) => {
              const active = i === 0;
              return (
                <button
                  key={item}
                  className="relative mb-6 text-right text-[15px] font-medium text-[#222] transition hover:text-coral"
                >
                  {item}
                  {active && (
                    <span
                      className="absolute -bottom-1 right-0 block bg-teal"
                      style={{ width: 92, height: 3, borderRadius: 2 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile nav */}
        <nav className="grid grid-cols-4 gap-1 border-t border-[#e7e7e7] p-2 lg:hidden">
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
  );
}

function CardHeader({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div
      className="relative flex items-center justify-center bg-teal px-3 text-white"
      style={{ height: 36, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
    >
      {action && <div className="absolute right-2 top-1/2 -translate-y-1/2">{action}</div>}
      <h3 className="text-[16px] font-bold">{children}</h3>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`overflow-hidden bg-white ${className}`}
      style={{
        borderRadius: 10,
        border: "1px solid #e7e7e7",
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
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
            style={{ height: 44 }}
          >
            <div className="flex items-center gap-0.5">
              <IconBtn><Phone className="h-3.5 w-3.5" /></IconBtn>
              <IconBtn><Mail className="h-3.5 w-3.5 text-coral" /></IconBtn>
              <IconBtn><Pencil className="h-3.5 w-3.5" /></IconBtn>
              <IconBtn><Trash2 className="h-3.5 w-3.5" /></IconBtn>
            </div>
            <div className="flex-1 text-right text-[13px]">
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
            style={{ width: 22, height: 22 }}
          >
            <Plus className="h-3.5 w-3.5" />
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
              style={{ height: 50 }}
            >
              <div className="flex items-center gap-0.5">
                <IconBtn><Pencil className="h-3 w-3" /></IconBtn>
                <IconBtn><Trash2 className="h-3 w-3 text-coral" /></IconBtn>
              </div>
              <div className="flex-1 text-right">
                <div className="text-[13px] font-bold" style={{ color }}>עדכון אתר</div>
                <div className="text-[10px]" style={{ color }}>היום 09:00 PM</div>
              </div>
              <div
                className="rounded-full border-2"
                style={{ width: 14, height: 14, borderColor: color }}
              />
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between border-t border-[#f0eeea] bg-[#faf8f5] px-3 py-1.5 text-[#666]">
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

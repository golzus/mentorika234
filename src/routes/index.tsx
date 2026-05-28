import { createFileRoute } from "@tanstack/react-router";
import {
  Phone, Mail, Pencil, Trash2, Plus, Calendar, Clock, MoreHorizontal,
  ChevronLeft,
} from "lucide-react";

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
  meta: "המלצה | אתר תדמית | 5000 | 01.01.2026",
}));

const tasks = [
  { title: "עדכון אתר", time: "היום 09:00 PM", state: "danger" },
  { title: "עדכון אתר", time: "היום 09:00 PM", state: "danger" },
  { title: "עדכון אתר", time: "היום 09:00 PM", state: "success" },
  { title: "עדכון אתר", time: "היום 09:00 PM", state: "success" },
] as const;

const stats = [
  { label: "מכירות", value: "10", sub: "מכירות יזומות\nמול לקוחות הפוטנציאל" },
  { label: "חשיפה", value: "50", sub: "פרסומאלי / פרינטים /\nדיגיטלים" },
  { label: 'שתפ"ם', value: "30", sub: "הפניות ושיתופי פעולה" },
  { label: "שימור", value: "15", sub: "מתנות ומפגש שבועיות\nרצון לקוח" },
  { label: "המלצות", value: "22", sub: "איסוף המלצות ולקוחות\nמרוצים" },
  { label: "בניית תשתיות", value: "52", sub: "???" },
];

function LeadsDashboard() {
  return (
    <div className="min-h-screen bg-page p-3 md:p-6 lg:p-8" dir="rtl">
      <div className="mx-auto flex max-w-[1280px] gap-3 md:gap-4">
        {/* Main panel */}
        <main className="relative flex-1 overflow-hidden rounded-2xl bg-panel shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
          {/* Daily tip ribbon */}
          <aside className="absolute right-0 top-6 z-10 hidden w-10 -translate-x-0 rounded-l-md bg-coral px-2 py-3 text-[10px] font-bold leading-tight text-white shadow-md lg:block">
            <div className="-rotate-0 text-center">
              <div className="mb-1 text-[11px]">הטיפ היומי</div>
              <div className="font-medium leading-snug text-white/95">
                עקבי אחרי המספרים - הם מספרים את הסיפור האמיתי
              </div>
            </div>
          </aside>

          <div className="p-4 pr-4 md:p-6 md:pr-16 lg:p-8 lg:pr-20">
            <Header />

            {/* Top row: Tasks + Leads table */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <TasksCard />
              <LeadsCard />
            </div>

            {/* Mid row: stats grid (right) + revenue+clients (left) */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* left column: revenue + active clients stacked, but in RTL appears on right */}
              <div className="order-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:order-1">
                <RevenueCard />
                <ActiveClientsCard />
              </div>
              {/* right column: 2x3 stats */}
              <div className="order-1 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:order-2">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* Footer brand */}
            <div className="mt-6 flex justify-start">
              <div className="rounded-md bg-coral/10 px-3 py-2 text-[10px] font-extrabold text-coral-dark">
                זהבי הסגל
              </div>
            </div>
          </div>
        </main>

        {/* Side nav */}
        <nav className="hidden w-32 shrink-0 flex-col gap-1 rounded-2xl bg-teal py-6 text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] md:flex">
          {sideNav.map((item, i) => {
            const active = i === 0;
            return (
              <button
                key={item}
                className={`relative mr-2 rounded-l-lg px-3 py-2.5 text-right text-[13px] font-medium transition-all ${
                  active
                    ? "bg-panel text-teal-dark shadow-sm"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      {/* Logo (right in RTL) */}
      <div className="flex items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-teal/15">
          <svg viewBox="0 0 32 32" className="h-8 w-8 text-teal-dark" fill="currentColor">
            <path d="M4 22c4-8 10-12 16-12-2 6-8 12-16 12zm24-12c-3 7-9 12-16 12 6 0 12-2 16-6 1-2 1-4 0-6z" />
          </svg>
        </div>
        <div>
          <div className="text-2xl font-extrabold tracking-tight text-foreground">מנטוריקה</div>
          <div className="text-[10px] font-medium text-muted-foreground">MENTORIKA</div>
        </div>
      </div>

      {/* Greeting (left in RTL) */}
      <div className="text-left">
        <div className="text-xl font-bold text-foreground">
          שלום ישראלה ישראלי{" "}
          <span className="text-sm font-medium text-muted-foreground">יום חמישי 16.04.2026</span>
        </div>
        <div className="mt-0.5 text-[11px] font-medium text-coral">
          להוסיף פירורי לחם בכל עמוד
        </div>
      </div>
    </div>
  );
}

function PanelHeader({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-t-lg bg-teal px-4 py-2 text-white">
      {action ?? <span />}
      <h3 className="text-sm font-bold">{children}</h3>
    </div>
  );
}

function LeadsCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <PanelHeader>לידים במו"מ</PanelHeader>
      <ul className="divide-y divide-border">
        {leads.map((l, i) => (
          <li
            key={i}
            className="flex items-center gap-3 px-4 py-2.5 text-[13px] hover:bg-muted/50"
          >
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <IconBtn><Phone className="h-3.5 w-3.5" /></IconBtn>
              <IconBtn><Mail className="h-3.5 w-3.5 text-coral" /></IconBtn>
              <IconBtn><Pencil className="h-3.5 w-3.5" /></IconBtn>
              <IconBtn><Trash2 className="h-3.5 w-3.5" /></IconBtn>
            </div>
            <div className="flex-1 text-right">
              <span className="text-muted-foreground">{l.meta}</span>
              <span className="mx-2 font-bold text-foreground">{l.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground">
      {children}
    </button>
  );
}

function TasksCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <PanelHeader
        action={
          <button className="flex h-6 w-6 items-center justify-center rounded bg-coral text-white shadow hover:bg-coral-dark">
            <Plus className="h-4 w-4" />
          </button>
        }
      >
        משימות שבועיות
      </PanelHeader>
      <ul>
        {tasks.map((t, i) => {
          const isDanger = t.state === "danger";
          return (
            <li
              key={i}
              className={`relative flex items-center justify-between px-4 py-2.5 text-[13px] ${
                isDanger ? "" : ""
              }`}
            >
              {isDanger && <span className="absolute right-0 top-1.5 bottom-1.5 w-1 rounded-l bg-coral" />}
              <div className="flex items-center gap-2">
                <IconBtn><Pencil className="h-3.5 w-3.5" /></IconBtn>
                <IconBtn><Trash2 className="h-3.5 w-3.5 text-coral" /></IconBtn>
              </div>
              <div className="text-right">
                <div className={`font-bold ${isDanger ? "text-coral" : "text-success"}`}>
                  {t.title}
                </div>
                <div className={`text-[11px] ${isDanger ? "text-coral/80" : "text-success/80"}`}>
                  {t.time}
                </div>
              </div>
              <span className={`absolute left-3 top-3 h-2.5 w-2.5 rounded-full ring-2 ring-white ${isDanger ? "bg-coral" : "bg-success"}`} />
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-muted-foreground">
        <MoreHorizontal className="h-4 w-4" />
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4" />
          <Clock className="h-4 w-4" />
          <Trash2 className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function RevenueCard() {
  const pct = 65;
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-3 rounded-md bg-teal py-1.5 text-center text-sm font-bold text-white">
        סך הכנסות לחודש <span className="underline">יולי</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <Ring percent={pct} />
        <div className="text-right">
          <div className="text-3xl font-extrabold text-coral">
            6,000 <span className="text-2xl">ש"ח</span>
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            מתוך יעד של 10,000 ש"ח
          </div>
        </div>
      </div>
    </div>
  );
}

function Ring({ percent }: { percent: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  return (
    <div className="relative h-24 w-24 shrink-0">
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={r} stroke="oklch(0.92 0.02 200)" strokeWidth="7" fill="none" />
        <circle
          cx="40" cy="40" r={r}
          stroke="var(--coral)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-base font-extrabold text-foreground">
        {percent}%
      </div>
    </div>
  );
}

function ActiveClientsCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <PanelHeader>לקוחות פעילים</PanelHeader>
      <ul className="divide-y divide-border">
        {[0, 1, 2].map((i) => (
          <li key={i} className="flex items-center justify-between px-3 py-2 text-[11px] text-muted-foreground">
            <ChevronLeft className="h-3 w-3" />
            <span>שירות ע"י | הצעת מחיר | תאריך</span>
            <span className="font-bold text-foreground">39 לידים</span>
            <span>הגיע ע"י</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card text-center shadow-sm">
      <div className="bg-teal py-1 text-xs font-bold text-white">{label}</div>
      <div className="px-2 py-2">
        <p className="whitespace-pre-line text-[10px] leading-tight text-muted-foreground">{sub}</p>
        <div className="mt-1 text-2xl font-extrabold text-coral">{value}</div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import {
  Phone, Mail, Pencil, Trash2, Plus, Calendar, Clock, MoreHorizontal,
  ChevronLeft, Circle, CheckCircle2,
} from "lucide-react";
import logoMentorika from "@/assets/logo-mentorika.png";
import logoZahavi from "@/assets/logo-zahavi.png";

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
  { state: "danger" },
  { state: "danger" },
  { state: "success" },
  { state: "success" },
] as const;

const stats = [
  { label: "מכירות", value: "10", sub: "מכירות יזומות\nמול לקוחות פוטנציאל" },
  { label: "חשיפה", value: "50", sub: "פרסום אונליין / פרינטים /\nדיגיטליים" },
  { label: 'שתפ"ם', value: "30", sub: "הפניות ושיתופי פעולה" },
  { label: "שימור", value: "15", sub: "מתנות ומפגשי שבועיות\nרצון לקוח" },
  { label: "המלצות", value: "22", sub: "איסוף המלצות מלקוחות\nמרוצים" },
  { label: "בניית תשתיות", value: "52", sub: "???" },
];

function LeadsDashboard() {
  return (
    <div className="min-h-screen bg-page p-2 sm:p-4 md:p-6 lg:p-8" dir="rtl">
      <div className="mx-auto flex max-w-[1280px] gap-2 sm:gap-3 md:gap-4">
        {/* Side nav — RIGHT side in RTL (first child) */}
        <nav className="sticky top-4 hidden h-fit w-28 shrink-0 flex-col gap-1 self-start rounded-2xl bg-teal py-5 text-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.2)] md:flex lg:w-32">
          <div className="px-3 pb-2 text-center text-[11px] font-bold text-white/90">
            מסך פתיחה
          </div>
          {sideNav.map((item, i) => {
            const active = i === 0;
            return (
              <button
                key={item}
                className={`relative ml-2 rounded-l-lg px-3 py-2 text-right text-[12px] font-semibold transition-all lg:text-[13px] ${
                  active
                    ? "bg-panel text-teal-dark shadow-sm"
                    : "text-white/95 hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            );
          })}
        </nav>

        {/* Main panel */}
        <main className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-panel shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
          {/* Daily tip ribbon — top LEFT */}
          <aside className="absolute left-0 top-6 z-10 hidden w-11 rounded-r-md bg-coral px-2 py-3 text-[10px] font-bold leading-tight text-white shadow-md lg:block">
            <div className="text-center">
              <div className="mb-1 text-[11px]">הטיפ היומי</div>
              <div className="text-[9px] font-medium leading-snug text-white/95">
                עקבי אחרי המספרים - הם מספרים את הסיפור האמיתי
              </div>
            </div>
          </aside>

          <div className="p-4 md:p-6 lg:p-8 lg:pl-20">
            <Header />

            {/* Top row: Tasks (left in RTL) + Leads (right in RTL) */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <LeadsCard />
              <TasksCard />
            </div>

            {/* Mid row */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Right column in RTL: revenue + active clients */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <RevenueCard />
                <ActiveClientsCard />
              </div>
              {/* Left column in RTL: 2x3 stats */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {stats.map((s) => (
                  <StatCard key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* Footer brand */}
            <div className="mt-6 flex justify-end">
              <img src={logoZahavi} alt="זהבי הסגל" className="h-12 w-auto" />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile nav */}
      <nav className="mt-3 grid grid-cols-4 gap-1 rounded-xl bg-teal p-2 text-white md:hidden">
        {sideNav.map((item, i) => (
          <button
            key={item}
            className={`rounded-md px-2 py-2 text-center text-[11px] font-semibold ${
              i === 0 ? "bg-panel text-teal-dark" : "text-white/95"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap-reverse items-start justify-between gap-4">
      {/* Greeting (left in RTL) */}
      <div className="text-left">
        <div className="text-lg font-bold text-foreground md:text-xl">
          שלום ישראלה ישראלי{" "}
          <span className="text-xs font-medium text-muted-foreground md:text-sm">
            יום חמישי 16.04.2026
          </span>
        </div>
        <div className="mt-0.5 text-[11px] font-medium text-coral">
          להוסיף פירורי לחם בכל עמוד
        </div>
      </div>

      {/* Logo (right in RTL) */}
      <div className="flex items-center gap-2">
        <img src={logoMentorika} alt="מנטוריקה" className="h-9 w-auto md:h-11" />
        <div>
          <div className="text-xl font-extrabold tracking-tight text-teal-dark md:text-2xl">
            מנטוריקה
          </div>
          <div className="text-[10px] font-medium tracking-widest text-muted-foreground">
            MENTORIKA
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelHeader({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
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
            className="flex items-center gap-2 px-3 py-2 text-[12px] hover:bg-muted/40 sm:px-4 sm:text-[13px]"
          >
            <div className="flex items-center gap-0.5 text-muted-foreground">
              <IconBtn><Phone className="h-3.5 w-3.5" /></IconBtn>
              <IconBtn><Mail className="h-3.5 w-3.5 text-coral" /></IconBtn>
              <IconBtn><Pencil className="h-3.5 w-3.5" /></IconBtn>
              <IconBtn><Trash2 className="h-3.5 w-3.5" /></IconBtn>
            </div>
            <div className="flex-1 truncate text-right">
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
          const color = isDanger ? "text-coral" : "text-success";
          return (
            <li
              key={i}
              className="relative flex items-center justify-between gap-2 px-3 py-2 text-[12px] sm:px-4 sm:text-[13px]"
            >
              {isDanger && (
                <span className="absolute right-0 top-1 bottom-1 w-1 rounded-l bg-coral" />
              )}
              <div className="flex items-center gap-1">
                <IconBtn><Pencil className="h-3.5 w-3.5" /></IconBtn>
                <IconBtn><Trash2 className="h-3.5 w-3.5 text-coral" /></IconBtn>
              </div>
              <div className="flex-1 text-right">
                <div className={`font-bold ${color}`}>עדכון אתר</div>
                <div className={`text-[10px] ${color}/80 sm:text-[11px]`}>היום 09:00 PM</div>
              </div>
              {isDanger ? (
                <Circle className={`h-4 w-4 fill-coral text-coral`} />
              ) : (
                <CheckCircle2 className={`h-4 w-4 fill-success text-white`} />
              )}
            </li>
          );
        })}
      </ul>
      <div className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-1.5 text-muted-foreground">
        <MoreHorizontal className="h-4 w-4" />
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4" />
          <Clock className="h-4 w-4" />
          <Trash2 className="h-4 w-4" />
          <Plus className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function RevenueCard() {
  const pct = 65;
  return (
    <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
      <div className="mb-3 rounded-md bg-teal py-1.5 text-center text-[13px] font-bold text-white">
        סך הכנסות לחודש <span className="underline">יולי</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <Ring percent={pct} />
        <div className="text-right">
          <div className="text-2xl font-extrabold text-coral md:text-3xl">
            6,000 <span className="text-xl md:text-2xl">ש"ח</span>
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
    <div className="relative h-20 w-20 shrink-0 md:h-24 md:w-24">
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
      <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-foreground md:text-base">
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
          <li
            key={i}
            className="flex items-center justify-between gap-2 px-2 py-2 text-[10px] text-muted-foreground sm:text-[11px]"
          >
            <ChevronLeft className="h-3 w-3 shrink-0" />
            <span className="truncate">שירות ע"י | הצעת מחיר | תאריך</span>
            <span className="shrink-0 font-bold text-foreground">39 לידים</span>
            <span className="shrink-0">הגיע ע"י</span>
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
        <p className="min-h-[28px] whitespace-pre-line text-[10px] leading-tight text-muted-foreground">
          {sub}
        </p>
        <div className="mt-1 text-2xl font-extrabold text-coral">{value}</div>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import leadActions from "@/assets/figma/lead-actions.svg";
import plusIcon from "@/assets/figma/plus-icon.svg";
import taskRadioDanger from "@/assets/figma/task-radio-danger.svg";
import taskRadioSuccess from "@/assets/figma/task-radio-success.svg";
import taskEdit from "@/assets/figma/task-edit.svg";
import taskDelete from "@/assets/figma/task-delete.svg";
import taskFooterIcons from "@/assets/figma/task-footer-icons.svg";
import taskMore from "@/assets/figma/task-more.svg";
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

const leads = Array.from({ length: 5 }).map(() => ({
  name: "ישראלה ישראלי",
  meta: "המלצה | אתר תדמית | 5000| 01.01.2026",
}));

const leadRowTops = [240.5, 294.63, 348.76, 402.89, 457.02];

const tasks = [
  { top: 221, color: "#f15a48", radio: taskRadioDanger },
  { top: 274, color: "#f15a48", radio: taskRadioDanger },
  { top: 327, color: "#008f15", radio: taskRadioSuccess },
  { top: 380, color: "#008f15", radio: taskRadioSuccess },
] as const;

const statColumns = [
  {
    left: 930,
    top: { label: 'שתפ"ים', value: "30", sub: "הפניות ושיתופי פעולה", color: "#f15a48" },
    bottom: { label: "בניית תשתיות", value: "52", sub: "???", color: "#008f15" },
  },
  {
    left: 1100,
    top: {
      label: "חשיפה",
      value: "50",
      sub: "פרונטלית / פרינטית / דיגיטלית",
      color: "#ff9914",
    },
    bottom: {
      label: "המלצות",
      value: "22",
      sub: "איסוף המלצות מלקוחות מרוצים",
      color: "#ff9914",
    },
  },
  {
    left: 1270,
    top: {
      label: "מכירות",
      value: "10",
      sub: "מכירות יזומות\nמול הלקוח הפוטנציאלי",
      color: "#008f15",
    },
    bottom: {
      label: "שימור",
      value: "15",
      sub: "מתנות ומעקב שביעות\nרצון לקוח",
      color: "#f15a48",
    },
  },
];

function LeadsDashboard() {
  return (
    <DashboardShell active="מסך פתיחה" absoluteContent>
      <LeadsSection />
      <TasksSection />
      <RevenueSection />
      <ActiveClientsSection />
      <StatsSection />
    </DashboardShell>
  );
}

function TealHeader({
  left,
  top,
  width,
  children,
}: {
  left: number;
  top: number;
  width: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute flex h-[30px] items-center justify-center rounded-t-[10px] bg-[#00b6b5] shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
      style={{ left, top, width }}
    >
      <h3 className="text-[18px] font-bold leading-[25px] text-[#0d0221]">{children}</h3>
    </div>
  );
}

function LeadsSection() {
  return (
    <>
      <div
        className="absolute rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,182,181,0.3)]"
        style={{ left: 90, top: 180.5, width: 810, height: 360 }}
      />
      <TealHeader left={90} top={180.5} width={810}>
        לידים במו&quot;מ
      </TealHeader>

      <div
        className="absolute rounded-[50px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        style={{ left: 113, top: 239.5, width: 5, height: 257 }}
      />
      <div
        className="absolute rounded-[50px] bg-[#f15a48] shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        style={{ left: 113, top: 258.5, width: 5, height: 24 }}
      />

      {leads.map((lead, i) => (
        <div key={i}>
          <div
            className="absolute rounded-[5px] bg-white"
            style={{
              left: 150,
              top: leadRowTops[i],
              width: 690,
              height: 39.13,
              boxShadow:
                i === 0
                  ? "0 10px 20px rgba(241,90,72,0.2)"
                  : "0 10px 20px rgba(0,0,0,0.1)",
            }}
          />
          <div
            className="absolute flex h-[24.783px] items-center justify-center gap-[30px]"
            style={{ left: 150, top: leadRowTops[i] + 7.83, width: 687.6 }}
            dir="ltr"
          >
            <img src={leadActions} alt="" className="h-[24.357px] w-[92.269px] shrink-0" />
            <div className="h-[19px] w-px shrink-0 bg-[#d9d9d9]" />
            <div className="text-[18px] leading-[25px] text-[#0d0221]" dir="rtl">
              {lead.meta}
            </div>
            <div className="h-[19px] w-px shrink-0 bg-[#d9d9d9]" />
            <div className="text-[18px] font-bold leading-[25px] text-[#0d0221]">{lead.name}</div>
          </div>
        </div>
      ))}
    </>
  );
}

function TasksSection() {
  return (
    <>
      <div
        className="absolute rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        style={{ left: 930, top: 180.5, width: 510, height: 300 }}
      />
      <TealHeader left={930} top={180.5} width={510}>
        משימות שבועיות
      </TealHeader>

      <div
        className="absolute flex items-center justify-center rounded-[10px] bg-[#f15a48] shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
        style={{ left: 980, top: 186, width: 29, height: 19 }}
      >
        <img src={plusIcon} alt="" className="h-[13px] w-[15px]" />
      </div>

      <div
        className="absolute rounded-[50px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        style={{ left: 942, top: 220.5, width: 5, height: 252 }}
      />
      <div
        className="absolute rounded-[50px] bg-[#f15a48] shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        style={{ left: 942, top: 331, width: 5, height: 24 }}
      />

      {tasks.map((task, i) => (
        <div
          key={i}
          className="absolute flex h-[42px] flex-col items-end justify-center"
          style={{ left: 1014, top: task.top, width: 366 }}
          dir="rtl"
        >
          <div className="flex items-center gap-[31px]">
            <div className="text-[18px] leading-[25px]" style={{ color: task.color }}>
              עדכון אתר
            </div>
            <img src={task.radio} alt="" className="size-[16px] shrink-0" />
          </div>
          <div className="flex items-center gap-[17px]">
            <div className="text-[14px] leading-[20px]" style={{ color: task.color }}>
              היום| 09:00 PM
            </div>
            <img src={taskEdit} alt="" className="size-[11px]" />
            <img src={taskDelete} alt="" className="h-[11px] w-[9.533px]" />
          </div>
        </div>
      ))}

      <img
        src={taskFooterIcons}
        alt=""
        className="absolute"
        style={{ left: 990, top: 451, width: 110.651, height: 12.437 }}
      />
      <img
        src={taskMore}
        alt=""
        className="absolute"
        style={{ left: 1350, top: 448, width: 24, height: 18 }}
      />
      <div
        className="absolute text-right text-[18px] leading-[25px] text-black"
        style={{ left: 1140, top: 443, width: 210 }}
        dir="rtl"
      >
        ...
      </div>
    </>
  );
}

function RevenueSection() {
  return (
    <>
      <div
        className="absolute rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        style={{ left: 90, top: 570.5, width: 450, height: 210 }}
      />
      <TealHeader left={90} top={570.5} width={450}>
        סך הכנסות לחודש <span className="underline decoration-[9.5%]">יולי</span>
      </TealHeader>

      <img
        src={gaugeSvg}
        alt="65%"
        className="absolute"
        style={{ left: 117, top: 622, width: 109, height: 109 }}
      />
      <div
        className="absolute text-right"
        style={{ left: 255, top: 643, width: 245 }}
        dir="rtl"
      >
        <div className="text-[40px] font-bold leading-[46.665px] text-[#f15a48]">
          6,000 ש&quot;ח
        </div>
        <div className="text-[19.534px] leading-[46.665px] text-[#0d0221]">
          מתוך יעד של 10,000 ש&quot;ח
        </div>
      </div>
    </>
  );
}

function ActiveClientsSection() {
  const rowTops = [621, 672, 723];

  return (
    <>
      <div
        className="absolute rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
        style={{ left: 570, top: 570.5, width: 330, height: 210 }}
      />
      <TealHeader left={570} top={570.5} width={330}>
        לקוחות פעילים
      </TealHeader>

      {rowTops.map((top, i) => (
        <div
          key={i}
          className="absolute flex h-[39px] items-center gap-[5px]"
          style={{ left: 588, top: top + 7.83, width: 278.337 }}
          dir="ltr"
        >
          <span className="w-[11px] text-center text-[12px] leading-none text-[#0d0221]">‹</span>
          <div className="h-[9px] w-px bg-[#d9d9d9]" />
          <span className="text-[12px] leading-[15px] text-[#0d0221]" dir="rtl">
            הגיעו ע&quot;י | שירות | הצעת מחיר | תאריך
          </span>
          <div className="h-[9px] w-px bg-[#d9d9d9]" />
          <span className="text-[18px] leading-[25px] text-[#0d0221]">39 לידים</span>
        </div>
      ))}
    </>
  );
}

function StatsColumn({
  left,
  top,
  bottom,
}: {
  left: number;
  top: { label: string; value: string; sub: string; color: string };
  bottom: { label: string; value: string; sub: string; color: string };
}) {
  return (
    <div
      className="absolute overflow-hidden rounded-[10px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
      style={{ left, top: 510.5, width: 170, height: 270 }}
    >
      {/* Top half */}
      <div className="flex h-[22.5px] items-center justify-center rounded-t-[10px] bg-[#00b6b5]">
        <span className="text-[18px] font-bold leading-[25px] text-[#0d0221]">{top.label}</span>
      </div>
      <div className="flex h-[112.5px] flex-col items-center justify-around px-1 py-1">
        <p
          className="w-full whitespace-pre-line text-center text-[12px] leading-[15px] text-[#0d0221]"
          dir="rtl"
        >
          {top.sub}
        </p>
        <div
          className="text-[40px] font-extrabold leading-none"
          style={{ color: top.color }}
        >
          {top.value}
        </div>
      </div>

      {/* Bottom half */}
      <div className="flex h-[22.5px] w-full items-center justify-center bg-[#00b6b5] shadow-[0_10px_20px_rgba(0,0,0,0.1),0_-10px_20px_rgba(0,0,0,0.1)]">
        <span className="text-[18px] font-bold leading-[25px] text-[#0d0221]">{bottom.label}</span>
      </div>
      <div className="flex h-[112.5px] flex-col items-center justify-around px-1 py-1">
        <p
          className="w-full whitespace-pre-line text-center text-[12px] leading-[15px] text-[#0d0221]"
          dir="rtl"
        >
          {bottom.sub}
        </p>
        <div
          className="text-[40px] font-extrabold leading-none"
          style={{ color: bottom.color }}
        >
          {bottom.value}
        </div>
      </div>
    </div>
  );
}

function StatsSection() {
  return (
    <>
      {statColumns.map((col) => (
        <StatsColumn key={col.top.label} left={col.left} top={col.top} bottom={col.bottom} />
      ))}
    </>
  );
}

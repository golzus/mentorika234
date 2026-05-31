import { createFileRoute } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "מנטוריקה — פרופיל העסק" },
      { name: "description", content: "פרופיל העסק והיכרות קצרה." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <DashboardShell active="פרופיל העסק">
      {/* Stepper */}
      <div className="mt-[10px] mb-[40px] flex items-center justify-center" dir="ltr">
        <div className="flex items-center gap-0">
          {/* Step 3 (left, inactive) */}
          <StepCircle n={3} active={false} />
          <StepLine />
          <StepCircle n={2} active={false} />
          <StepLine />
          <StepCircle n={1} active />
        </div>
      </div>
      {/* Step labels - RTL so order is 1, 2, 3 right-to-left */}
      <div className="mx-auto mt-[-30px] mb-[40px] grid w-[640px] grid-cols-3 text-center" dir="ltr">
        <div className="text-[18px] font-medium text-[#222]">יעדים כספיים</div>
        <div className="text-[18px] font-medium text-[#222]">העסק שלי</div>
        <div className="text-[18px] font-medium text-[#222]">היכרות קצרה</div>
      </div>

      {/* 2 x 2 cards */}
      <div className="mx-auto grid max-w-[1080px] grid-cols-2 gap-x-[36px] gap-y-[24px]" dir="rtl">
        <QACard question="אז מי את?" answer="שבי שווימער" tint />
        <QACard question="איך קוראים לעסק שלך?" answer="שווימער - בניית מערכות ואפליקציות" />
        <QACard question='מה התפקיד שלך בעסק?' answer='מנכ"לית שווימער - משרד לבניית אתרים' />
        <QACard question="יש לך לוגו?" answer={<LogoSchwimmer />} />
      </div>
    </DashboardShell>
  );
}

function StepCircle({ n, active }: { n: number; active?: boolean }) {
  return (
    <div
      className={`flex h-[64px] w-[64px] items-center justify-center rounded-full text-[26px] font-bold ${
        active ? "bg-coral text-white" : "border-[2px] border-[#bdbdbd] bg-white text-[#9a9a9a]"
      }`}
    >
      {n}
    </div>
  );
}

function StepLine() {
  return <div className="h-[2px] w-[160px] bg-[#bdbdbd]" />;
}

function QACard({
  question,
  answer,
  tint,
}: {
  question: string;
  answer: React.ReactNode;
  tint?: boolean;
}) {
  return (
    <div
      className="overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="flex h-[40px] items-center justify-center bg-teal text-[18px] font-bold text-white">
        {question}
      </div>
      <div
        className={`flex h-[78px] items-center justify-center text-[18px] text-[#222] ${
          tint ? "bg-[#fff1ee]" : "bg-white"
        }`}
      >
        {answer}
      </div>
    </div>
  );
}

function LogoSchwimmer() {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-[34px] font-extrabold tracking-tight text-[#e84c9a]">sch</span>
      <span className="text-[34px] font-extrabold tracking-tight text-[#1e3a8a]">w</span>
      <span className="text-[34px] font-extrabold tracking-tight text-[#1e3a8a]">mmer</span>
    </div>
  );
}

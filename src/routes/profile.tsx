import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth/auth-context";
import { useProfile, useUpsertProfile } from "@/hooks/use-profile";
import type { GoldenCircle } from "@/lib/db/schemas";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "מנטוריקה — פרופיל העסק" },
      { name: "description", content: "פרופיל העסק והיכרות קצרה." },
    ],
  }),
  component: ProfilePage,
});

const STEPS = [
  { n: 1, label: "היכרות קצרה" },
  { n: 2, label: "העסק שלי" },
  { n: 3, label: "יעדים כספיים" },
] as const;

function ProfilePage() {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile(user?.id);
  const upsert = useUpsertProfile(user?.id ?? "");
  const [step, setStep] = useState<(typeof STEPS)[number]["n"]>(1);
  const [saved, setSaved] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessField, setBusinessField] = useState("");
  const [slogan, setSlogan] = useState("");
  const [gc, setGc] = useState<GoldenCircle>({});
  const [salary, setSalary] = useState("");
  const [newClients, setNewClients] = useState("");

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name ?? "");
      setLastName(profile.last_name ?? "");
      setBusinessName(profile.business_name ?? "");
      setBusinessField(profile.business_field ?? "");
      setSlogan(profile.slogan ?? "");
      setSalary(profile.monthly_salary_target?.toString() ?? "");
      setNewClients(profile.new_clients_target?.toString() ?? "");
      const raw = profile.golden_circle;
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        setGc(raw as GoldenCircle);
      }
    }
  }, [profile]);

  const handleSave = async () => {
    await upsert.mutateAsync({
      first_name: firstName,
      last_name: lastName,
      business_name: businessName,
      business_field: businessField,
      slogan,
      golden_circle: gc,
      monthly_salary_target: salary ? parseFloat(salary) : undefined,
      new_clients_target: newClients ? parseInt(newClients) : undefined,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (isLoading) {
    return (
      <DashboardShell active="פרופיל העסק" breadcrumb="פרופיל העסק">
        <div className="flex h-full items-center justify-center">
          <div className="text-[18px] text-[#00b6b5]">טוען...</div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell active="פרופיל העסק" breadcrumb="פרופיל העסק">
      <div className="flex h-full flex-col gap-[12px]">
        <div className="flex shrink-0 flex-col items-center">
          <div className="flex items-center" dir="ltr">
            <StepCircle n={3} status={stepStatus(3, step)} onClick={() => setStep(3)} />
            <StepLine completed={step > 2} />
            <StepCircle n={2} status={stepStatus(2, step)} onClick={() => setStep(2)} />
            <StepLine completed={step > 1} />
            <StepCircle n={1} status={stepStatus(1, step)} onClick={() => setStep(1)} />
          </div>
          <div className="mt-[8px] grid w-[460px] grid-cols-3 text-center" dir="ltr">
            {STEPS.slice()
              .reverse()
              .map(({ n, label }) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setStep(n)}
                  className={`cursor-pointer text-[16px] font-medium transition-colors ${
                    step === n ? "text-[#f15a48]" : "text-[#222] hover:text-[#f15a48]"
                  }`}
                >
                  {label}
                </button>
              ))}
          </div>
        </div>

        <div className="min-h-0 flex-1">
          {step === 1 && (
            <IntroStep
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              businessName={businessName}
              setBusinessName={setBusinessName}
              slogan={slogan}
              setSlogan={setSlogan}
            />
          )}
          {step === 2 && <BusinessStep gc={gc} setGc={setGc} />}
          {step === 3 && (
            <FinancialStep
              salary={salary}
              setSalary={setSalary}
              newClients={newClients}
              setNewClients={setNewClients}
            />
          )}
        </div>

        <div className="flex shrink-0 justify-center pb-2">
          <button
            onClick={handleSave}
            disabled={upsert.isPending}
            className="h-[42px] rounded-[8px] bg-[#f15a48] px-10 text-[16px] font-bold text-white shadow-[0_4px_10px_rgba(241,90,72,0.35)] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {upsert.isPending ? "שומר..." : saved ? "✓ נשמר!" : "שמירה"}
          </button>
          {upsert.isError && (
            <p className="mt-2 text-center text-[14px] text-red-500">שגיאה בשמירה, נסי שוב</p>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

function stepStatus(n: number, current: number): "completed" | "active" | "upcoming" {
  if (n === current) return "active";
  if (n < current) return "completed";
  return "upcoming";
}

function IntroStep({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  businessName,
  setBusinessName,
  slogan,
  setSlogan,
}: {
  firstName: string;
  setFirstName: (v: string) => void;
  lastName: string;
  setLastName: (v: string) => void;
  businessName: string;
  setBusinessName: (v: string) => void;
  slogan: string;
  setSlogan: (v: string) => void;
}) {
  return (
    <div className="grid h-full grid-cols-2 gap-x-[24px] gap-y-[16px]" dir="rtl">
      <QACard
        question="אז מי את?"
        value={firstName}
        onChange={setFirstName}
        tint
        placeholder="שם פרטי"
      />
      <QACard question="שם משפחה" value={lastName} onChange={setLastName} placeholder="שם משפחה" />
      <QACard
        question="איך קוראים לעסק שלך?"
        value={businessName}
        onChange={setBusinessName}
        placeholder="שם העסק"
      />
      <QACard
        question="הסלוגן שלי"
        value={slogan}
        onChange={setSlogan}
        placeholder="סלוגן / תיאור קצר"
      />
    </div>
  );
}

function BusinessStep({ gc, setGc }: { gc: GoldenCircle; setGc: (v: GoldenCircle) => void }) {
  const update = (key: keyof GoldenCircle) => (val: string) => setGc({ ...gc, [key]: val });

  return (
    <div className="grid h-full grid-cols-2 gap-x-[24px] gap-y-[16px]" dir="rtl">
      <PromptCard
        question="למה בחרתי בתחום הזה?"
        prompt="ספרי על הזיקה שלך לעסק, למה את הכי מחוברת"
        value={gc.why ?? ""}
        onChange={update("why")}
      />
      <PromptCard
        question="מה אני הכי מוכרת? (מוצר הדגל שלי?)"
        prompt="תארי את השירות או המוצר העיקרי שלך"
        value={gc.flagship_product ?? ""}
        onChange={update("flagship_product")}
      />
      <PromptCard
        question="למי אני מוכרת? (קהל יעד מועדף)"
        prompt="מי הלקוחה האידיאלית שלך? מאפיינים, גיל, צרכים/כאבים"
        value={gc.target_audience ?? ""}
        onChange={update("target_audience")}
      />
      <PromptCard
        question="מה החזון שלי?"
        prompt="לאן אני רוצה להגיע? מה החלום הגדול?"
        value={gc.vision ?? ""}
        onChange={update("vision")}
      />
    </div>
  );
}

function FinancialStep({
  salary,
  setSalary,
  newClients,
  setNewClients,
}: {
  salary: string;
  setSalary: (v: string) => void;
  newClients: string;
  setNewClients: (v: string) => void;
}) {
  return (
    <div className="grid h-full grid-cols-2 gap-x-[24px] gap-y-[16px]" dir="rtl">
      <PromptCard
        question="מה משכורת החודשית הממוצעת שלך?"
        prompt="הכניסי סכום בשקלים"
        value={salary}
        onChange={setSalary}
      />
      <PromptCard
        question="כמה לקוחות חדשים בחודש יש לך בממוצע?"
        prompt="הכניסי מספר"
        value={newClients}
        onChange={setNewClients}
      />
    </div>
  );
}

function StepCircle({
  n,
  status,
  onClick,
}: {
  n: number;
  status: "completed" | "active" | "upcoming";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full text-[22px] font-bold transition-colors ${
        status === "active"
          ? "bg-[#f15a48] text-white"
          : status === "completed"
            ? "bg-[#00b6b5] text-white"
            : "border-[2px] border-[#bdbdbd] bg-white text-[#9a9a9a]"
      }`}
    >
      {n}
    </button>
  );
}

function StepLine({ completed }: { completed?: boolean }) {
  return <div className={`h-[2px] w-[130px] ${completed ? "bg-[#00b6b5]" : "bg-[#bdbdbd]"}`} />;
}

const fieldBaseClass =
  "w-full border-0 bg-transparent text-center text-[18px] text-[#222] outline-none ring-0 focus:outline-none focus:ring-0";

function PromptCard({
  question,
  prompt,
  value,
  onChange,
}: {
  question: string;
  prompt: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex shrink-0 min-h-[40px] items-center justify-center bg-[#00b6b5] px-4 py-2 text-center text-[18px] font-bold text-[#0d0221]">
        {question}
      </div>
      <div className="flex flex-1 items-center justify-center bg-white px-4 py-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={prompt}
          rows={2}
          className={`${fieldBaseClass} resize-none placeholder:text-[#9a9a9a]`}
        />
      </div>
    </div>
  );
}

function QACard({
  question,
  value,
  onChange,
  tint,
  dir: dirProp,
  placeholder,
}: {
  question: string;
  value: string;
  onChange: (value: string) => void;
  tint?: boolean;
  dir?: "ltr" | "rtl";
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex h-[40px] shrink-0 items-center justify-center bg-[#00b6b5] text-[18px] font-bold text-[#0d0221]">
        {question}
      </div>
      <div
        className={`flex flex-1 items-center justify-center px-4 ${tint ? "bg-[#fff1ee]" : "bg-white"}`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={dirProp}
          placeholder={placeholder}
          className={`${fieldBaseClass} h-full placeholder:text-[#9a9a9a]`}
        />
      </div>
    </div>
  );
}

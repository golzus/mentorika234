import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useAuth, a as useProfile, b as useUpsertProfile } from "./router-C5VHrHSa.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./client-BRRtD0JQ.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/zod.mjs";
const STEPS = [{
  n: 1,
  label: "היכרות קצרה"
}, {
  n: 2,
  label: "העסק שלי"
}, {
  n: 3,
  label: "יעדים כספיים"
}];
function ProfilePage() {
  const {
    user
  } = useAuth();
  const {
    data: profile,
    isLoading
  } = useProfile(user?.id);
  const upsert = useUpsertProfile(user?.id ?? "");
  const [step, setStep] = reactExports.useState(1);
  const [saved, setSaved] = reactExports.useState(false);
  const [firstName, setFirstName] = reactExports.useState("");
  const [lastName, setLastName] = reactExports.useState("");
  const [businessName, setBusinessName] = reactExports.useState("");
  const [businessField, setBusinessField] = reactExports.useState("");
  const [slogan, setSlogan] = reactExports.useState("");
  const [gc, setGc] = reactExports.useState({});
  const [salary, setSalary] = reactExports.useState("");
  const [newClients, setNewClients] = reactExports.useState("");
  reactExports.useEffect(() => {
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
        setGc(raw);
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
      monthly_salary_target: salary ? parseFloat(salary) : void 0,
      new_clients_target: newClients ? parseInt(newClients) : void 0
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2e3);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[300px] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[18px] text-[#00b6b5]", children: "טוען..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", dir: "ltr", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepCircle, { n: 3, status: stepStatus(3, step), onClick: () => setStep(3) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepLine, { completed: step > 2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepCircle, { n: 2, status: stepStatus(2, step), onClick: () => setStep(2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepLine, { completed: step > 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StepCircle, { n: 1, status: stepStatus(1, step), onClick: () => setStep(1) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-[8px] grid w-full max-w-[460px] grid-cols-3 text-center", dir: "ltr", children: STEPS.slice().reverse().map(({
        n,
        label
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStep(n), className: `cursor-pointer text-[14px] font-medium transition-colors sm:text-[16px] ${step === n ? "text-[#f15a48]" : "text-[#222] hover:text-[#f15a48]"}`, children: label }, n)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(IntroStep, { firstName, setFirstName, lastName, setLastName, businessName, setBusinessName, businessField, setBusinessField, slogan, setSlogan }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(BusinessStep, { gc, setGc }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(FinancialStep, { salary, setSalary, newClients, setNewClients })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-center pb-2 pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, disabled: upsert.isPending, className: "h-[42px] rounded-[8px] bg-[#f15a48] px-10 text-[16px] font-bold text-white shadow-[0_4px_10px_rgba(241,90,72,0.35)] transition-opacity hover:opacity-90 disabled:opacity-60", children: upsert.isPending ? "שומר..." : saved ? "✓ נשמר!" : "שמירה" }),
      upsert.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-[14px] text-red-500", children: "שגיאה בשמירה, נסי שוב" })
    ] })
  ] }) });
}
function stepStatus(n, current) {
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
  businessField,
  setBusinessField,
  slogan,
  setSlogan
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(QACard, { question: "אז מי את?", value: firstName, onChange: setFirstName, tint: true, placeholder: "שם פרטי" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QACard, { question: "שם משפחה", value: lastName, onChange: setLastName, placeholder: "שם משפחה" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QACard, { question: "איך קוראים לעסק שלך?", value: businessName, onChange: setBusinessName, placeholder: "שם העסק" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QACard, { question: "מה התחום העסקי שלך?", value: businessField, onChange: setBusinessField, placeholder: "תחום עסקי" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(QACard, { question: "הסלוגן שלי", value: slogan, onChange: setSlogan, placeholder: "סלוגן / תיאור קצר" })
  ] });
}
function BusinessStep({
  gc,
  setGc
}) {
  const update = (key) => (val) => setGc({
    ...gc,
    [key]: val
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { question: "למה בחרתי בתחום הזה?", prompt: "מה הסיבה שבגללה בחרת לפעול בתחום הזה?", value: gc.why ?? "", onChange: update("why") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { question: "ספרי על הזיקה שלך לעסק", prompt: "למה את הכי מחוברת בעסק ובשירות שאת נותנת?", value: gc.affinity ?? "", onChange: update("affinity") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { question: "מה אני הכי מוכרת? (מוצר הדגל שלי?)", prompt: "תארי את השירות או המוצר העיקרי שלך", value: gc.flagship_product ?? "", onChange: update("flagship_product") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { question: "למי אני מוכרת? (קהל יעד מועדף)", prompt: "מי הלקוחה האידיאלית שלך? מאפיינים, גיל, צרכים/כאבים", value: gc.target_audience ?? "", onChange: update("target_audience") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { question: "מה החזון שלי?", prompt: "לאן אני רוצה להגיע? מה החלום הגדול?", value: gc.vision ?? "", onChange: update("vision") })
  ] });
}
function FinancialStep({
  salary,
  setSalary,
  newClients,
  setNewClients
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { question: "מה משכורת החודשית הממוצעת שלך?", prompt: "הכניסי סכום בשקלים", value: salary, onChange: setSalary }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { question: "כמה לקוחות חדשים בחודש יש לך בממוצע?", prompt: "הכניסי מספר", value: newClients, onChange: setNewClients })
  ] });
}
function StepCircle({
  n,
  status,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, className: `flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full text-[22px] font-bold transition-colors ${status === "active" ? "bg-[#f15a48] text-white" : status === "completed" ? "bg-[#00b6b5] text-white" : "border-[2px] border-[#bdbdbd] bg-white text-[#9a9a9a]"}`, children: n });
}
function StepLine({
  completed
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-[2px] w-[60px] sm:w-[130px] ${completed ? "bg-[#00b6b5]" : "bg-[#bdbdbd]"}` });
}
const fieldBaseClass = "w-full border-0 bg-transparent text-center text-[18px] text-[#222] outline-none ring-0 focus:outline-none focus:ring-0";
function PromptCard({
  question,
  prompt,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 min-h-[40px] items-center justify-center bg-[#00b6b5] px-4 py-2 text-center text-[18px] font-bold text-[#0d0221]", children: question }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center bg-white px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value, onChange: (e) => onChange(e.target.value), placeholder: prompt, rows: 2, className: `${fieldBaseClass} resize-none placeholder:text-[#9a9a9a]` }) })
  ] });
}
function QACard({
  question,
  value,
  onChange,
  tint,
  dir: dirProp,
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col overflow-hidden rounded-[10px] border border-[#e7e7e7] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[40px] shrink-0 items-center justify-center bg-[#00b6b5] text-[18px] font-bold text-[#0d0221]", children: question }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex flex-1 items-center justify-center px-4 ${tint ? "bg-[#fff1ee]" : "bg-white"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value, onChange: (e) => onChange(e.target.value), dir: dirProp, placeholder, className: `${fieldBaseClass} h-full placeholder:text-[#9a9a9a]` }) })
  ] });
}
export {
  ProfilePage as component
};

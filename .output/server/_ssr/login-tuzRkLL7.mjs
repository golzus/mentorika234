import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, s as signIn } from "./router-C5VHrHSa.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
function LoginPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading && user) {
      navigate({
        to: "/"
      });
    }
  }, [user, loading, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate({
        to: "/"
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "שגיאה בכניסה";
      setError(message === "Invalid login credentials" ? "אימייל או סיסמה שגויים" : message);
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-[#00b6b5]", dir: "rtl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[420px] rounded-[18px] bg-white px-10 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.2)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[36px] font-extrabold tracking-tight text-[#0d0221]", children: "מנטוריקה" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[16px] text-[#666]", children: "ברוכה הבאה! נא להתחבר" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[14px] font-medium text-[#333]", children: "כתובת אימייל" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "your@email.com", dir: "ltr", className: "w-full rounded-[8px] border border-[#d0d0d0] px-4 py-3 text-[15px] outline-none transition-colors focus:border-[#00b6b5] focus:ring-2 focus:ring-[#00b6b5]/20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-[14px] font-medium text-[#333]", children: "סיסמה" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, placeholder: "••••••••", className: "w-full rounded-[8px] border border-[#d0d0d0] px-4 py-3 text-[15px] outline-none transition-colors focus:border-[#00b6b5] focus:ring-2 focus:ring-[#00b6b5]/20" })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[8px] bg-red-50 px-4 py-3 text-[14px] text-red-600", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submitting, className: "mt-2 h-[48px] w-full rounded-[8px] bg-[#f15a48] text-[16px] font-bold text-white shadow-[0_4px_14px_rgba(241,90,72,0.4)] transition-opacity hover:opacity-90 disabled:opacity-60", children: submitting ? "מתחבר..." : "כניסה" })
    ] })
  ] }) });
}
export {
  LoginPage as component
};

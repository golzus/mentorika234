import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, signIn } from "@/lib/auth/auth-context";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "מנטוריקה — כניסה" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/" });
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate({ to: "/" });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "שגיאה בכניסה";
      setError(message === "Invalid login credentials" ? "אימייל או סיסמה שגויים" : message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#00b6b5]" dir="rtl">
      <div className="w-full max-w-[420px] rounded-[18px] bg-white px-10 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <div className="mb-8 text-center">
          <h1 className="text-[36px] font-extrabold tracking-tight text-[#0d0221]">מנטוריקה</h1>
          <p className="mt-1 text-[16px] text-[#666]">ברוכה הבאה! נא להתחבר</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-[14px] font-medium text-[#333]">כתובת אימייל</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              dir="ltr"
              className="w-full rounded-[8px] border border-[#d0d0d0] px-4 py-3 text-[15px] outline-none transition-colors focus:border-[#00b6b5] focus:ring-2 focus:ring-[#00b6b5]/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-[14px] font-medium text-[#333]">סיסמה</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-[8px] border border-[#d0d0d0] px-4 py-3 text-[15px] outline-none transition-colors focus:border-[#00b6b5] focus:ring-2 focus:ring-[#00b6b5]/20"
            />
          </div>

          {error && (
            <div className="rounded-[8px] bg-red-50 px-4 py-3 text-[14px] text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 h-[48px] w-full rounded-[8px] bg-[#f15a48] text-[16px] font-bold text-white shadow-[0_4px_14px_rgba(241,90,72,0.4)] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "מתחבר..." : "כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
}

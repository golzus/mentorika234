import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logoMentorika from "@/assets/logo-mentorika-full.png";
import logoZahavi from "@/assets/logo-zahavi.png";
import { useProfile } from "@/hooks/use-profile";
import { signOut, useAuth } from "@/lib/auth/auth-context";

const sideNav: { label: string; to: string | null }[] = [
  { label: "מסך פתיחה", to: "/" },
  { label: "פרופיל העסק", to: "/profile" },
  { label: "מעקב שיווק", to: "/marketing" },
  { label: "מעקב לידים", to: "/leads" },
  { label: "שימור לקוחות", to: null },
  { label: "גביה ותשלומים", to: null },
  { label: "ניהול שוטף", to: null },
  { label: "חדר בקרה", to: null },
];

const routeSettings: Record<
  string,
  { active: string; breadcrumb?: string; fillViewport?: boolean; showDailyTip?: boolean }
> = {
  "/": { active: "מסך פתיחה", fillViewport: true, showDailyTip: true },
  "/profile": { active: "פרופיל העסק", breadcrumb: "פרופיל העסק" },
  "/marketing": { active: "מעקב שיווק", breadcrumb: "מעקב שיווק" },
  "/leads": { active: "מעקב לידים" },
};

function getRouteSettings(pathname: string) {
  return routeSettings[pathname] ?? routeSettings["/"];
}

// Active item = white pill that extends past the sidebar's left edge into the canvas gap,
// giving the "tab clicked into the main area" look from the Figma design.
const navBase = "whitespace-nowrap text-right text-[18px] leading-[25px] text-[#0d0221]";
const navActive = `${navBase} nav-active-pill`;
const navLink = `${navBase} nav-link`;
const navDisabled = `${navBase} nav-link cursor-default opacity-60`;

export function DashboardShell({
  children,
  active: activeProp,
  breadcrumb: breadcrumbProp,
  fillViewport: fillViewportProp,
}: {
  children: ReactNode;
  active?: string;
  breadcrumb?: string;
  fillViewport?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const currentRouteSettings = getRouteSettings(location.pathname);
  const active = activeProp ?? currentRouteSettings.active;
  const breadcrumb = breadcrumbProp ?? currentRouteSettings.breadcrumb;
  const fillViewport = fillViewportProp ?? currentRouteSettings.fillViewport ?? false;
  const showDailyTip = currentRouteSettings.showDailyTip ?? false;

  const metadata = user?.user_metadata ?? {};
  const profileName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");
  const metadataName =
    typeof metadata.full_name === "string"
      ? metadata.full_name
      : [metadata.first_name, metadata.last_name]
          .filter((part) => typeof part === "string")
          .join(" ");
  const displayName = profileName || metadataName || user?.email || "אורחת";
  const todayLabel = new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  // Outer: teal frame with padding — everything sits inside this teal background.
  const outerClass = fillViewport
    ? "flex min-h-screen bg-[#00b6b5] p-3 md:p-6 lg:h-screen lg:overflow-hidden"
    : "flex min-h-screen bg-[#00b6b5] p-3 md:p-6";

  // Row wrapper — sidebar on RTL start (right visually), white canvas on RTL end (left).
  const rowClass = fillViewport
    ? "mx-auto flex w-full max-w-[1650px] flex-1 flex-col gap-3 lg:min-h-0 lg:flex-row lg:gap-4 lg:overflow-hidden"
    : "mx-auto flex w-full max-w-[1650px] flex-col gap-3 lg:flex-row lg:gap-4";

  // Inner white "canvas" — header + main content live inside this rounded card.
  // Sidebar sits outside on the teal frame directly.
  const canvasClass = fillViewport
    ? "relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-[16px] bg-[#fffbf7] shadow-[0_20px_40px_rgba(0,0,0,0.15)] lg:min-h-0"
    : "relative flex min-w-0 flex-1 flex-col rounded-[16px] bg-[#fffbf7] shadow-[0_20px_40px_rgba(0,0,0,0.15)]";

  const bodyClass = fillViewport
    ? "flex flex-1 flex-col px-3 pb-4 md:px-6 lg:min-h-0 lg:overflow-hidden"
    : "flex flex-col px-3 pb-8 md:px-6";

  const mainClass = fillViewport
    ? "min-w-0 flex-1 pt-2 md:pt-3 lg:overflow-hidden"
    : "min-w-0 flex-1 pt-2 md:pt-4";

  return (
    <div className={outerClass} dir="rtl">
      <div className={rowClass}>
        {/* Sidebar — sits on the teal frame directly (no background of its own).
           Mobile: hidden here, replaced by a drawer above the canvas. */}
        {/* Sticky + viewport-height on desktop so the menu stays put while the page scrolls. */}
        <aside className="hidden shrink-0 flex-col items-start overflow-visible pt-6 lg:sticky lg:top-6 lg:flex lg:h-[calc(100vh-48px)] lg:w-[150px] lg:self-start xl:pt-10">
          <NavList active={active} />
          <img
            src={logoZahavi}
            alt="זהבי הסגל"
            className="mt-auto h-[56px] w-auto self-center object-contain pb-4 xl:h-[68px]"
          />
        </aside>

        <div className={canvasClass}>
          {/* Daily tip badge — floats in the top-left corner of the white canvas on the home page only */}
          {showDailyTip && (
            <div className="pointer-events-none absolute left-2 top-2 hidden h-[280px] w-[104px] lg:block">
              <div
                className="pointer-events-auto flex h-full flex-col items-center gap-3 rounded-[10px] bg-[#f15a48] px-2 py-4 text-[#fffbf7] shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                dir="rtl"
              >
                <div className="text-center text-[17px] font-bold leading-tight">הטיפ היומי</div>
                <div className="h-px w-[80%] bg-white/60" />
                <p className="text-center text-[13px] leading-[1.4]">
                  עקבי אחרי המספרים — הם מספרים את הסיפור האמיתי
                </p>
              </div>
            </div>
          )}

          {/* ── Header ────────────────────────────────────────── */}
          <header className={`shrink-0 ${showDailyTip ? "lg:pl-[120px]" : ""}`}>
            <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
              {/* Right group (RTL first): logout square + greeting stack */}
              <div className="flex min-w-0 items-center gap-3 md:gap-4">
                <button
                  type="button"
                  onClick={handleSignOut}
                  aria-label="יציאה"
                  className="hidden h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[4px] border border-[#0d0221] bg-[#f15a48] text-white transition-colors hover:bg-[#d94e3e] sm:flex"
                >
                  <LogOut className="h-4 w-4" />
                </button>
                <div className="flex min-w-0 flex-col items-end text-right">
                  <div className="flex flex-wrap items-baseline justify-end gap-x-3 gap-y-1">
                    <h1 className="text-[18px] font-normal leading-tight text-[#0d0221] md:text-[26px]">
                      שלום {displayName}
                    </h1>
                    <span className="text-[12px] leading-none text-[#0d0221] md:text-[16px]">
                      {todayLabel}
                    </span>
                  </div>
                  {breadcrumb && (
                    <div className="mt-1 text-[12px] text-[#0d0221]/80">{breadcrumb}</div>
                  )}
                </div>
              </div>

              {/* Left group: logo (visually on the left of the header) + mobile menu toggle */}
              <div className="flex items-center gap-3">
                <img src={logoMentorika} alt="מנטוריקה" className="h-10 w-auto md:h-14" />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen((v) => !v)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00b6b5] text-[#0d0221] shadow lg:hidden"
                  aria-label="פתיחת תפריט"
                >
                  {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </header>

          {/* Mobile drawer (nav lives here on small screens since the sidebar is desktop-only) */}
          {mobileNavOpen && (
            <div className="px-3 pb-3 lg:hidden">
              <div className="flex flex-col items-stretch gap-2 rounded-2xl bg-[#00b6b5] p-3 shadow-xl">
                <NavList active={active} />
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-2 rounded-full border border-[#0d0221]/30 bg-white px-4 py-2 text-[14px] font-bold text-[#0d0221]"
                >
                  יציאה
                </button>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className={bodyClass}>
            <main className={mainClass}>{children}</main>
          </div>

          {/* Footer credits — matches Figma */}
          <footer className="shrink-0 border-t border-[#0d0221]/5 px-4 py-2 md:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] text-[#0d0221]/80 md:text-[12px]">
              <span>
                ui\ux by: <span className="font-bold text-[#f15a48]">SCHNIMMER</span>
              </span>
              <span>developed by: …</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function NavList({ active }: { active: string }) {
  return (
    <nav
      className="flex w-full flex-col items-stretch"
      style={{ gap: "clamp(8px, 3vh, 30px)" }}
      dir="rtl"
    >
      {sideNav.map((item) => {
        if (item.label === active) {
          return (
            <span key={item.label} className={navActive} aria-current="page">
              {item.label}
            </span>
          );
        }
        if (!item.to) {
          return (
            <span key={item.label} className={navDisabled}>
              {item.label}
            </span>
          );
        }
        return (
          <Link key={item.label} to={item.to} className={navLink}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

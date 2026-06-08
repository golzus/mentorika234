import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import panelUnion from "@/assets/figma/panel-union.svg";
import tipDivider from "@/assets/figma/tip-divider.svg";
import logoMentorika from "@/assets/logo-mentorika-full.png";
import logoZahavi from "@/assets/logo-zahavi.png";
import {
  FIGMA_HEIGHT,
  FIGMA_WIDTH,
  useFigmaCompactClass,
  useFigmaLayout,
} from "@/hooks/use-figma-scale";
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

const navItemBaseClass =
  "flex h-[34px] w-[116px] items-center justify-center whitespace-nowrap rounded-full text-center text-[19px] font-normal leading-[25px] text-[#0d0221]";

const activeNavItemClass = `${navItemBaseClass} bg-[#fffbf7]`;

const navLinkClass = `${navItemBaseClass} transition-colors duration-150 ease-out hover:bg-[#fffbf7] focus-visible:bg-[#fffbf7] active:bg-[#fffbf7]`;

const disabledNavItemClass = `${navItemBaseClass} cursor-default opacity-60`;
const desktopFrameInset = 12;

const routeSettings: Record<
  string,
  { active: string; breadcrumb?: string; absoluteContent?: boolean }
> = {
  "/": { active: "מסך פתיחה", absoluteContent: true },
  "/profile": { active: "פרופיל העסק", breadcrumb: "פרופיל העסק" },
  "/marketing": { active: "מעקב שיווק", breadcrumb: "מעקב שיווק" },
  "/leads": { active: "מעקב לידים" },
};

function getRouteSettings(pathname: string) {
  return routeSettings[pathname] ?? routeSettings["/"];
}

function figmaRect(left: number, top: number, width: number, height: number): CSSProperties {
  return {
    left: `${(left / FIGMA_WIDTH) * 100}%`,
    top: `${(top / FIGMA_HEIGHT) * 100}%`,
    width: `${(width / FIGMA_WIDTH) * 100}%`,
    height: `${(height / FIGMA_HEIGHT) * 100}%`,
  };
}

export function DashboardShell({
  children,
  active: activeProp,
  absoluteContent: absoluteContentProp,
  breadcrumb: breadcrumbProp,
}: {
  children: ReactNode;
  active?: string;
  absoluteContent?: boolean;
  breadcrumb?: string;
}) {
  const location = useLocation();
  const currentRouteSettings = getRouteSettings(location.pathname);
  const active = activeProp ?? currentRouteSettings.active;
  const absoluteContent = absoluteContentProp ?? currentRouteSettings.absoluteContent ?? false;
  const breadcrumb = breadcrumbProp ?? currentRouteSettings.breadcrumb;
  const { scaleX, scaleY, compact, scaledWidth, scaledHeight } = useFigmaLayout();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
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
  useFigmaCompactClass(compact);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  return (
    <div className={`dashboard-viewport${compact ? " dashboard-viewport--compact" : ""}`} dir="rtl">
      <div className="relative shrink-0" style={{ width: scaledWidth, height: scaledHeight }}>
        {!compact && (
          <img
            src={panelUnion}
            alt=""
            className="absolute"
            style={{
              left: desktopFrameInset,
              top: desktopFrameInset,
              width: `calc(100% - ${desktopFrameInset * 2}px)`,
              height: `calc(100% - ${desktopFrameInset * 2}px)`,
            }}
          />
        )}
        <div
          className="absolute left-0 top-0"
          style={{
            width: FIGMA_WIDTH,
            height: FIGMA_HEIGHT,
            backgroundColor: compact ? "#00b6b5" : "transparent",
            transform: `scale(${scaleX}, ${scaleY})`,
            transformOrigin: "top left",
            overflow: compact ? "visible" : "hidden",
          }}
        >
          {compact && (
            <img src={panelUnion} alt="" className="absolute" style={figmaRect(30, 30, 1590, 810)} />
          )}

          {active === "מסך פתיחה" && (
            <div
              className="absolute z-30 box-border flex flex-col items-center overflow-hidden rounded-[10px] bg-[#f15a48] px-[7px] pt-[21px] shadow-[0_15px_30px_rgba(0,0,0,0.1)]"
              style={figmaRect(25, 8, 104, 337)}
            >
              <p className="m-0 w-full text-center text-[18px] font-bold leading-[20px] text-[#fffbf7]">
                הטיפ היומי
              </p>
              <img src={tipDivider} alt="" className="mt-[29px] h-px w-[90px] shrink-0" />
              <p className="m-0 mt-[11px] w-full text-center text-[18px] font-normal leading-[25px] text-[#fffbf7]">
                עקבי אחרי
                <br />
                המספרים -
                <br />
                הם
                <br />
                מספרים
                <br />
                את הסיפור
                <br />
                האמיתי
              </p>
            </div>
          )}

          <nav className="absolute z-20" style={figmaRect(1504, 150.5, 116, 620)}>
            {active === "מסך פתיחה" ? (
              <div className={`absolute -top-[36px] right-0 ${activeNavItemClass}`}>מסך פתיחה</div>
            ) : (
              <Link to="/" className={`absolute -top-[36px] right-0 ${navLinkClass}`}>
                מסך פתיחה
              </Link>
            )}

            <div className="mt-[20px] flex flex-col gap-[45px]">
              {sideNav.slice(1).map((item) => {
                if (item.label === active) {
                  return (
                    <span key={item.label} className={activeNavItemClass} aria-current="page">
                      {item.label}
                    </span>
                  );
                }
                if (!item.to) {
                  return (
                    <span key={item.label} className={disabledNavItemClass}>
                      {item.label}
                    </span>
                  );
                }
                return (
                  <Link key={item.label} to={item.to} className={navLinkClass}>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <img
            src={logoZahavi}
            alt="זהבי הסגל"
            className="absolute object-contain"
            style={figmaRect(1508, 774.5, 72, 68)}
          />

          <header className="absolute z-20" style={figmaRect(90, 84, 1349.5, 66)} dir="ltr">
            <img
              src={logoMentorika}
              alt="מנטוריקה"
              className="absolute left-[120px] top-0 h-[66px] w-auto"
            />
            <button
              type="button"
              onClick={handleSignOut}
              className="absolute left-0 top-[14px] rounded-full border border-[#0d0221]/20 bg-white/70 px-4 py-1.5 text-[13px] font-bold text-[#0d0221] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f15a48]"
              dir="rtl"
            >
              יציאה
            </button>
            <div className="absolute right-0 top-0 text-right" dir="rtl">
              <div className="flex items-baseline justify-end gap-4">
                <span className="text-[18px] leading-[25px] text-[#0d0221]">{todayLabel}</span>
                <h1 className="text-[30px] font-normal leading-none text-[#0d0221]">
                  שלום {displayName}
                </h1>
              </div>
              {breadcrumb && (
                <div className="mt-1 text-[12px] leading-[15px] text-[#f15a48]">{breadcrumb}</div>
              )}
            </div>
          </header>

          {absoluteContent ? (
            <div className="absolute inset-0 z-10">{children}</div>
          ) : (
            <main className="absolute z-10 overflow-hidden" style={figmaRect(90, 180.5, 1350, 600)}>
              {children}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

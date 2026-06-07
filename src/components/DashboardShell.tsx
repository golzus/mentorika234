import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
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
import { useAuth } from "@/lib/auth/auth-context";

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
  "flex h-[34px] w-[136px] items-center justify-center rounded-full text-center text-[18px] font-normal leading-[25px] text-[#0d0221]";

const activeNavItemClass = `${navItemBaseClass} bg-[#fffbf7]`;

const navLinkClass = `${navItemBaseClass} transition-colors duration-150 ease-out hover:bg-[#fffbf7] focus-visible:bg-[#fffbf7] active:bg-[#fffbf7]`;

const disabledNavItemClass = `${navItemBaseClass} cursor-default opacity-60`;

function figmaRect(left: number, top: number, width: number, height: number): CSSProperties {
  return {
    left: `${(left / FIGMA_WIDTH) * 100}%`,
    top: `${(top / FIGMA_HEIGHT) * 100}%`,
    width: `${(width / FIGMA_WIDTH) * 100}%`,
    height: `${(height / FIGMA_HEIGHT) * 100}%`,
  };
}

export function DashboardShell({
  active,
  children,
  absoluteContent = false,
  breadcrumb,
}: {
  active: string;
  children: React.ReactNode;
  absoluteContent?: boolean;
  breadcrumb?: string;
}) {
  const { scale, compact, scaledWidth, scaledHeight } = useFigmaLayout();
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

  return (
    <div className={`dashboard-viewport${compact ? " dashboard-viewport--compact" : ""}`} dir="rtl">
      <div className="relative shrink-0" style={{ width: scaledWidth, height: scaledHeight }}>
        <div
          className="absolute left-0 top-0 bg-[#00b6b5]"
          style={{
            width: FIGMA_WIDTH,
            height: FIGMA_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            overflow: compact ? "visible" : "hidden",
          }}
        >
          <img src={panelUnion} alt="" className="absolute" style={figmaRect(30, 30, 1590, 810)} />

          <div className="absolute z-30" style={figmaRect(25, -91, 104, 337)}>
            <div className="flex h-full w-full items-center justify-center">
              <div className="-rotate-90">
                <div className="h-[104px] w-[337px] rounded-[10px] bg-[#f15a48] shadow-[0_15px_30px_rgba(0,0,0,0.1)]" />
              </div>
            </div>
            <div className="absolute left-1/2 top-[31px] w-[90px] -translate-x-1/2 -translate-y-1/2 text-center text-[18px] font-bold leading-[20px] text-[#fffbf7]">
              הטיפ היומי
            </div>
            <img src={tipDivider} alt="" className="absolute left-[7px] top-[71px] h-px w-[90px]" />
            <div className="absolute left-1/2 top-[158.5px] w-[89px] -translate-x-1/2 -translate-y-1/2 text-center text-[18px] font-normal leading-[25px] text-[#fffbf7]">
              עקבי אחרי המספרים -
              <br />
              הם מספרים את הסיפור האמיתי
            </div>
          </div>

          <nav className="absolute z-20 pl-2" style={figmaRect(1500, 150.5, 120, 620)}>
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

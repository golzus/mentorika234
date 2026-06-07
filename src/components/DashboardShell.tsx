import { Link } from "@tanstack/react-router";
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
  useFigmaCompactClass(compact);

  return (
    <div
      className={`dashboard-viewport${compact ? " dashboard-viewport--compact" : ""}`}
      dir="rtl"
    >
      <div
        className="relative shrink-0"
        style={{ width: scaledWidth, height: scaledHeight }}
      >
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
          <img
            src={panelUnion}
            alt=""
            className="absolute left-[30px] top-[30px] h-[810px] w-[1590px]"
          />

          <div className="absolute left-[25px] top-[-91px] z-30 h-[337px] w-[104px]">
            <div className="flex h-full w-full items-center justify-center">
              <div className="-rotate-90">
                <div className="h-[104px] w-[337px] rounded-[10px] bg-[#f15a48] shadow-[0_15px_30px_rgba(0,0,0,0.1)]" />
              </div>
            </div>
            <div className="absolute left-1/2 top-[31px] w-[90px] -translate-x-1/2 -translate-y-1/2 text-center text-[18px] font-bold leading-[20px] text-[#fffbf7]">
              הטיפ היומי
            </div>
            <img
              src={tipDivider}
              alt=""
              className="absolute left-[7px] top-[71px] h-px w-[90px]"
            />
            <div className="absolute left-1/2 top-[158.5px] w-[89px] -translate-x-1/2 -translate-y-1/2 text-center text-[18px] font-normal leading-[25px] text-[#fffbf7]">
              עקבי אחרי המספרים -
              <br />
              הם מספרים את הסיפור האמיתי
            </div>
          </div>

          <nav className="absolute left-[1500px] top-[150.5px] z-20 w-[120px] pl-2">
            {active === "מסך פתיחה" ? (
              <div className="absolute -top-[36px] right-0 flex h-[32px] w-[120px] items-center justify-center rounded-full bg-[#fffbf7] text-[18px] font-normal leading-[25px] text-[#0d0221]">
                מסך פתיחה
              </div>
            ) : (
              <Link
                to="/"
                className="absolute -top-[36px] right-0 flex h-[32px] w-[120px] items-center justify-center text-[18px] font-normal leading-[25px] text-[#0d0221] hover:opacity-80"
              >
                מסך פתיחה
              </Link>
            )}

            <div className="mt-[20px] flex flex-col gap-[45px]">
              {sideNav.slice(1).map((item) => {
                if (item.label === active) {
                  return (
                    <div key={item.label} className="flex justify-center" aria-current="page">
                      <span className="flex h-[34px] w-[118px] items-center justify-center rounded-full bg-[#fffbf7] text-center text-[18px] font-normal leading-[25px] text-[#0d0221]">
                        {item.label}
                      </span>
                    </div>
                  );
                }
                if (!item.to) {
                  return (
                    <span
                      key={item.label}
                      className="cursor-default text-[18px] font-normal leading-[25px] text-[#0d0221] opacity-60"
                    >
                      {item.label}
                    </span>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="text-[18px] font-normal leading-[25px] text-[#0d0221] hover:opacity-80"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          <img
            src={logoZahavi}
            alt="זהבי הסגל"
            className="absolute left-[1508px] top-[774.5px] h-[68px] w-[72px] object-contain"
          />

          <header className="absolute left-[90px] top-[84px] z-20 h-[66px] w-[1349.5px]" dir="ltr">
            <img src={logoMentorika} alt="מנטוריקה" className="absolute left-0 top-0 h-[66px] w-auto" />
            <div className="absolute right-0 top-0 text-right" dir="rtl">
              <div className="flex items-baseline justify-end gap-4">
                <span className="text-[18px] leading-[25px] text-[#0d0221]">
                  יום חמישי 16.04.2026
                </span>
                <h1 className="text-[30px] font-normal leading-none text-[#0d0221]">
                  שלום ישראלה ישראלי
                </h1>
              </div>
              {breadcrumb && (
                <div className="mt-1 text-[12px] leading-[15px] text-[#f15a48]">
                  {breadcrumb}
                </div>
              )}
            </div>
          </header>

          {absoluteContent ? (
            <div className="absolute inset-0 z-10">{children}</div>
          ) : (
            <main className="absolute left-[90px] top-[180.5px] z-10 h-[600px] w-[1350px] overflow-hidden">
              {children}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}

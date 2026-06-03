import { Link } from "@tanstack/react-router";
import logoMentorika from "@/assets/logo-mentorika.png";
import logoZahavi from "@/assets/logo-zahavi.png";

const sideNav: { label: string; to: string }[] = [
  { label: "מסך פתיחה", to: "/" },
  { label: "פרופיל העסק", to: "/profile" },
  { label: "מעקב שיווק", to: "/marketing" },
  { label: "מעקב לידים", to: "/" },
  { label: "שימור לקוחות", to: "/" },
  { label: "גביה ותשלומים", to: "/" },
  { label: "ניהול שוטף", to: "/" },
  { label: "חדר בקרה", to: "/" },
];

export function DashboardShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-screen overflow-auto bg-teal" dir="rtl">
      <div className="relative mx-auto overflow-hidden figma-wrap">
        <div className="absolute left-0 top-0 h-[870px] w-[1650px] origin-top-left overflow-hidden bg-teal figma-stage">
          {/* Inner cream container */}
          <div className="absolute left-[30px] top-[30px] h-[810px] w-[1470px] rounded-[6px] bg-[#fffbf7] shadow-[0_4px_18px_rgba(0,0,0,0.05)]" />

          {/* Tip ribbon */}
          <aside
            className="absolute left-[24px] top-0 z-30 w-[78px] bg-coral text-white"
            style={{ borderRadius: "0 0 6px 6px" }}
          >
            <div className="px-2 py-2 text-center">
              <div className="mb-1 text-[13px] font-bold leading-tight">הטיפ היומי</div>
              <div className="text-[10px] font-medium leading-[1.2]">
                עקבי אחרי המספרים - הם מספרים את הסיפור האמיתי
              </div>
            </div>
          </aside>

          {/* Sidebar on the RIGHT */}
          <nav className="absolute bottom-[30px] right-[30px] top-[186px] z-20 flex w-[120px] flex-col rounded-tl-[10px] bg-teal">
            {/* "מסך פתיחה" floating pill above */}
            {active === "מסך פתיחה" ? (
              <div className="absolute -top-[36px] right-0 h-[32px] w-[120px] rounded-full bg-[#fffbf7] text-center text-[16px] font-medium leading-[32px] text-[#222]">
                מסך פתיחה
              </div>
            ) : (
              <Link
                to="/"
                className="absolute -top-[36px] right-0 h-[32px] w-[120px] rounded-full text-center text-[16px] font-medium leading-[32px] text-white hover:opacity-80"
              >
                מסך פתיחה
              </Link>
            )}

            {sideNav.slice(1).map((item) => {
              if (item.label === active) {
                return (
                  <div
                    key={item.label}
                    className="relative flex h-[82px] items-center justify-center"
                  >
                    <div className="absolute right-0 h-[32px] w-[140px] rounded-full bg-[#fffbf7] text-center text-[16px] font-medium leading-[32px] text-[#222] shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
                      {item.label}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex h-[82px] items-center justify-center px-2 text-center text-[17px] font-medium leading-tight text-[#222] hover:opacity-80"
                >
                  {item.label}
                </Link>
              );
            })}

            <img
              src={logoZahavi}
              alt="זהבי הסגל"
              className="absolute bottom-[22px] left-1/2 h-[76px] w-auto -translate-x-1/2"
            />
          </nav>

          <main className="absolute left-[60px] top-[60px] z-10 w-[1384px]">
            {/* Header */}
            <header className="mb-[20px] flex h-[60px] items-center justify-between gap-4" dir="ltr">
              <div className="flex shrink-0 items-center gap-2">
                <img src={logoMentorika} alt="" className="h-[44px] w-auto" />
                <div className="text-[28px] font-extrabold leading-none text-[#19172f]">
                  מנטוריקה
                </div>
              </div>
              <div className="text-right" dir="rtl">
                <div className="flex items-baseline justify-end gap-2">
                  <span className="text-[12px] text-[#666]">יום חמישי 16.04.2026</span>
                  <h1 className="text-[26px] font-medium leading-none text-[#222]">
                    שלום ישראלה ישראלי
                  </h1>
                </div>
                <div className="mt-1 text-[10px] text-coral">להוסיף פירורי לחם בכל עמוד</div>
              </div>
            </header>

            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

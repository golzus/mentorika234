import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery, a as useQueryClient, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useLocation, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-BRRtD0JQ.mjs";
import { L as LogOut, X, M as Menu } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, n as numberType, e as enumType, b as booleanType, a as arrayType, l as literalType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const favicon = "/assets/logo-mentorika-full-C-RE1PBZ.png";
const logoZahavi = "/assets/logo-zahavi-C2XomYaF.png";
const goldenCircleSchema = objectType({
  why: stringType().optional(),
  affinity: stringType().optional(),
  flagship_product: stringType().optional(),
  target_audience: stringType().optional(),
  vision: stringType().optional()
});
objectType({
  id: stringType().uuid(),
  first_name: stringType().nullable().optional(),
  last_name: stringType().nullable().optional(),
  business_field: stringType().nullable().optional(),
  business_name: stringType().nullable().optional(),
  slogan: stringType().nullable().optional(),
  golden_circle: goldenCircleSchema.nullable().optional(),
  monthly_salary_target: numberType().nullable().optional(),
  new_clients_target: numberType().int().nullable().optional(),
  created_at: stringType(),
  updated_at: stringType()
});
const profileUpdateSchema = objectType({
  first_name: stringType().min(1, "שם פרטי נדרש").optional(),
  last_name: stringType().optional(),
  business_field: stringType().optional(),
  business_name: stringType().optional(),
  slogan: stringType().optional(),
  golden_circle: goldenCircleSchema.optional(),
  monthly_salary_target: numberType().nonnegative().optional(),
  new_clients_target: numberType().int().nonnegative().optional()
});
const marketingCategorySchema = enumType([
  "מכירות",
  "חשיפה",
  'שתפ"ם',
  "שימור",
  "המלצות",
  "בניית תשתיות"
]);
const actionItemSchema = objectType({
  text: stringType(),
  done: booleanType().default(false)
});
objectType({
  id: stringType().uuid(),
  user_id: stringType().uuid(),
  category: marketingCategorySchema,
  title: stringType(),
  description: stringType().nullable().optional(),
  measurable_target: stringType().nullable().optional(),
  target_date: stringType().nullable().optional(),
  actions: arrayType(actionItemSchema).nullable().optional(),
  weekly_task: stringType().nullable().optional(),
  status: enumType(["active", "completed"]).default("active"),
  created_at: stringType(),
  updated_at: stringType(),
  created_by: stringType().uuid().nullable().optional(),
  updated_by: stringType().uuid().nullable().optional()
});
const marketingGoalInsertSchema = objectType({
  category: marketingCategorySchema,
  title: stringType().min(1, "כותרת נדרשת"),
  description: stringType().optional(),
  measurable_target: stringType().optional(),
  target_date: stringType().optional(),
  actions: arrayType(actionItemSchema).optional().default([]),
  weekly_task: stringType().optional(),
  status: enumType(["active", "completed"]).default("active")
});
const marketingGoalUpdateSchema = marketingGoalInsertSchema.partial();
const leadStatusSchema = enumType(["new", "in_progress", "closed"]);
objectType({
  id: stringType().uuid(),
  user_id: stringType().uuid(),
  name: stringType(),
  phone: stringType().nullable().optional(),
  email: stringType().email().nullable().optional(),
  source: stringType().nullable().optional(),
  interested_in: stringType().nullable().optional(),
  proposed_price: stringType().nullable().optional(),
  notes: stringType().nullable().optional(),
  next_task: stringType().nullable().optional(),
  status: leadStatusSchema.default("new"),
  created_at: stringType(),
  updated_at: stringType(),
  created_by: stringType().uuid().nullable().optional(),
  updated_by: stringType().uuid().nullable().optional()
});
const leadInsertSchema = objectType({
  name: stringType().min(1, "שם ליד נדרש"),
  phone: stringType().optional(),
  email: stringType().email("מייל לא תקין").optional().or(literalType("")),
  source: stringType().optional(),
  interested_in: stringType().optional(),
  proposed_price: stringType().optional(),
  notes: stringType().optional(),
  next_task: stringType().optional(),
  status: leadStatusSchema.default("new")
});
const leadUpdateSchema = leadInsertSchema.partial();
function parseInput(schema, input) {
  const result = schema.safeParse(input);
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? "הנתונים שהוזנו אינם תקינים";
    throw new Error(message);
  }
  return result.data;
}
async function getProfile(userId) {
  const { data, error } = await supabase.from("profiles").select(
    "id, first_name, last_name, business_field, business_name, slogan, golden_circle, monthly_salary_target, new_clients_target, created_at, updated_at"
  ).eq("id", userId).single();
  if (error) throw error;
  return data;
}
async function upsertProfile(userId, updates) {
  const validUpdates = parseInput(profileUpdateSchema, updates);
  const { data, error } = await supabase.from("profiles").upsert({ id: userId, ...validUpdates }).select().single();
  if (error) throw error;
  return data;
}
function useProfile(userId) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
    staleTime: 1e3 * 60 * 5
  });
}
function useUpsertProfile(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (updates) => upsertProfile(userId, updates),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile", userId] });
    }
  });
}
const AuthContext = reactExports.createContext({
  user: null,
  session: null,
  loading: true
});
function AuthProvider({ children }) {
  const [state, setState] = reactExports.useState({
    user: null,
    session: null,
    loading: true
  });
  reactExports.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({ user: session?.user ?? null, session, loading: false });
    });
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, session, loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);
  const value = reactExports.useMemo(() => state, [state]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value, children });
}
function useAuth() {
  return reactExports.useContext(AuthContext);
}
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
const sideNav = [
  { label: "מסך פתיחה", to: "/" },
  { label: "פרופיל העסק", to: "/profile" },
  { label: "מעקב שיווק", to: "/marketing" },
  { label: "מעקב לידים", to: "/leads" },
  { label: "שימור לקוחות", to: null },
  { label: "גביה ותשלומים", to: null },
  { label: "ניהול שוטף", to: null },
  { label: "חדר בקרה", to: null }
];
const routeSettings = {
  "/": { active: "מסך פתיחה", fillViewport: true, showDailyTip: true },
  "/profile": { active: "פרופיל העסק", breadcrumb: "פרופיל העסק" },
  "/marketing": { active: "מעקב שיווק", breadcrumb: "מעקב שיווק" },
  "/leads": { active: "מעקב לידים" }
};
function getRouteSettings(pathname) {
  return routeSettings[pathname] ?? routeSettings["/"];
}
const navBase = "relative z-10 block w-full whitespace-nowrap text-right text-[18px] leading-[25px] text-[#0d0221]";
const navActive = `${navBase} nav-active-pill`;
const navLink = `${navBase} nav-link`;
const navDisabled = `${navBase} nav-link cursor-default opacity-55`;
function DashboardShell({
  children,
  active: activeProp,
  breadcrumb: breadcrumbProp,
  fillViewport: fillViewportProp
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile(user?.id);
  const [mobileNavOpen, setMobileNavOpen] = reactExports.useState(false);
  const currentRouteSettings = getRouteSettings(location.pathname);
  const active = activeProp ?? currentRouteSettings.active;
  const breadcrumb = breadcrumbProp ?? currentRouteSettings.breadcrumb;
  const fillViewport = fillViewportProp ?? currentRouteSettings.fillViewport ?? false;
  const showDailyTip = currentRouteSettings.showDailyTip ?? false;
  const metadata = user?.user_metadata ?? {};
  const profileName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ");
  const metadataName = typeof metadata.full_name === "string" ? metadata.full_name : [metadata.first_name, metadata.last_name].filter((part) => typeof part === "string").join(" ");
  const displayName = profileName || metadataName || user?.email || "אורחת";
  const todayLabel = new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);
  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex min-h-screen bg-[#00b6b5] p-3 md:p-6 lg:h-svh lg:overflow-hidden",
      dir: "rtl",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-[1650px] flex-1 flex-col gap-3 lg:min-h-0 lg:flex-row lg:gap-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "relative z-10 hidden shrink-0 flex-col items-stretch overflow-visible pt-8 lg:flex lg:h-full lg:w-[148px] lg:self-stretch xl:w-[160px] xl:pt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col gap-4 pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavList, { active }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: logoZahavi,
              alt: "זהבי הסגל",
              className: "h-[56px] w-auto shrink-0 self-center object-contain xl:h-[64px]"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-[16px] bg-[#fffbf7] shadow-[0_20px_40px_rgba(0,0,0,0.15)] lg:min-h-0 lg:rounded-r-none", children: [
          showDailyTip && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute left-2 top-2 z-20 hidden h-[280px] w-[104px] lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "pointer-events-auto flex h-full flex-col items-center gap-3 rounded-[10px] bg-[#f15a48] px-2 py-4 text-[#fffbf7] shadow-[0_15px_30px_rgba(0,0,0,0.15)]",
              dir: "rtl",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-[17px] font-bold leading-tight", children: "הטיפ היומי" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-[80%] bg-white/60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[13px] leading-[1.4]", children: "עקבי אחרי המספרים — הם מספרים את הסיפור האמיתי" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: `shrink-0 ${showDailyTip ? "lg:pl-[120px]" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3 md:gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSignOut,
                  "aria-label": "יציאה",
                  className: "hidden h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[4px] border border-[#0d0221] bg-[#f15a48] text-white transition-colors hover:bg-[#d94e3e] sm:flex",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col items-end text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-end gap-x-3 gap-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[18px] font-normal leading-tight text-[#0d0221] md:text-[26px]", children: [
                    "שלום ",
                    displayName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] leading-none text-[#0d0221] md:text-[16px]", children: todayLabel })
                ] }),
                breadcrumb && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[12px] text-[#0d0221]/80", children: breadcrumb })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: favicon, alt: "מנטוריקה", className: "h-10 w-auto md:h-14" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setMobileNavOpen((v) => !v),
                  className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#00b6b5] text-[#0d0221] shadow lg:hidden",
                  "aria-label": "פתיחת תפריט",
                  children: mobileNavOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
                }
              )
            ] })
          ] }) }),
          mobileNavOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-stretch gap-2 rounded-2xl bg-[#00b6b5] p-3 shadow-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(NavList, { active }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSignOut,
                className: "mt-2 rounded-full border border-[#0d0221]/30 bg-white px-4 py-2 text-[14px] font-bold text-[#0d0221]",
                children: "יציאה"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: fillViewport ? "flex min-h-0 flex-1 flex-col px-3 pb-4 md:px-6 lg:overflow-hidden" : "flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pb-8 md:px-6",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "main",
                {
                  className: fillViewport ? "min-w-0 flex-1 pt-2 md:pt-3 lg:min-h-0 lg:overflow-hidden" : "min-w-0 flex-1 pt-2 md:pt-4",
                  children
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "shrink-0 border-t border-[#0d0221]/5 px-4 py-2 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] text-[#0d0221]/80 md:text-[12px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "ui\\ux by: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[#f15a48]", children: "SCHNIMMER" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "developed by: …" })
          ] }) })
        ] })
      ] })
    }
  );
}
function NavList({ active }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "nav-list flex w-full flex-col items-stretch", dir: "rtl", children: sideNav.map((item) => {
    if (item.label === active) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: navActive, "aria-current": "page", children: item.label }, item.label);
    }
    if (!item.to) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: navDisabled, children: item.label }, item.label);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, className: navLink, children: item.label }, item.label);
  }) });
}
const appCss = "/assets/styles-DeTFDnwL.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$5 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      {
        name: "description",
        content: "Pixel Perfect Leads is a responsive web application for managing leads, designed for optimal display across all screen sizes."
      },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      {
        property: "og:description",
        content: "Pixel Perfect Leads is a responsive web application for managing leads, designed for optimal display across all screen sizes."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      {
        name: "twitter:description",
        content: "Pixel Perfect Leads is a responsive web application for managing leads, designed for optimal display across all screen sizes."
      },
      {
        property: "og:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b216de16-e35a-4517-877c-6be7b8b2589c/id-preview-0134fa06--d53d91bc-83b5-46f7-9eae-ac0232491f8b.lovable.app-1780001375331.png"
      },
      {
        name: "twitter:image",
        content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b216de16-e35a-4517-877c-6be7b8b2589c/id-preview-0134fa06--d53d91bc-83b5-46f7-9eae-ac0232491f8b.lovable.app-1780001375331.png"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "icon",
        href: favicon,
        type: "image/png"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$5.useRouteContext();
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: isLoginRoute ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) }) });
}
async function requireAuth() {
  if (typeof window === "undefined") return;
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (!session) {
    throw redirect({ to: "/login" });
  }
}
async function redirectAuthenticated() {
  if (typeof window === "undefined") return;
  const {
    data: { session }
  } = await supabase.auth.getSession();
  if (session) {
    throw redirect({ to: "/" });
  }
}
const $$splitComponentImporter$4 = () => import("./profile-DyGHBREw.mjs");
const Route$4 = createFileRoute("/profile")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [{
      title: "מנטוריקה — פרופיל העסק"
    }, {
      name: "description",
      content: "פרופיל העסק והיכרות קצרה."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./marketing-NbOffjM0.mjs");
const Route$3 = createFileRoute("/marketing")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [{
      title: "מנטוריקה — מעקב שיווק"
    }, {
      name: "description",
      content: "מעקב שיווק ומכירות יזומות מול הלקוח הפוטנציאלי."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./login-tuzRkLL7.mjs");
const Route$2 = createFileRoute("/login")({
  beforeLoad: redirectAuthenticated,
  head: () => ({
    meta: [{
      title: "מנטוריקה — כניסה"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./leads-D746k-hT.mjs");
const Route$1 = createFileRoute("/leads")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [{
      title: "מנטוריקה — מעקב לידים"
    }, {
      name: "description",
      content: "מעקב לידים וניהול הלקוחות הפוטנציאליים."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BQRb8CdX.mjs");
const Route = createFileRoute("/")({
  beforeLoad: requireAuth,
  head: () => ({
    meta: [{
      title: "מנטוריקה — ניהול לידים"
    }, {
      name: "description",
      content: "מסך ניהול לידים, משימות שבועיות ויעדים חודשיים."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ProfileRoute = Route$4.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$5
});
const MarketingRoute = Route$3.update({
  id: "/marketing",
  path: "/marketing",
  getParentRoute: () => Route$5
});
const LoginRoute = Route$2.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$5
});
const LeadsRoute = Route$1.update({
  id: "/leads",
  path: "/leads",
  getParentRoute: () => Route$5
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$5
});
const rootRouteChildren = {
  IndexRoute,
  LeadsRoute,
  LoginRoute,
  MarketingRoute,
  ProfileRoute
};
const routeTree = Route$5._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 1e3 * 30
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  useProfile as a,
  useUpsertProfile as b,
  actionItemSchema as c,
  marketingGoalInsertSchema as d,
  leadUpdateSchema as e,
  leadInsertSchema as l,
  marketingGoalUpdateSchema as m,
  parseInput as p,
  router as r,
  signIn as s,
  useAuth as u
};

# ארכיטקטורה — מרחב מנטוריקה

## Lead Architect

> אתה ה-Lead Architect של פרויקט "מרחב מנטוריקה".

### קריאה חובה לפני שינוי בקוד

1. `docs/PRODUCT.md`
2. `docs/SCOPE.md`
3. `docs/ARCHITECTURE.md`
4. `docs/DB.md`
5. `docs/API.md`
6. `docs/DECISIONS.md`
7. `docs/TODO.md`

## Stack

| שכבה | טכנולוגיה |
|------|-----------|
| Frontend | React 19, TypeScript, TanStack Router |
| Full-stack | TanStack Start |
| Styling | Tailwind v4, shadcn/ui |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth |
| Data | React Query |
| Build | Vite 7 → Nitro → Cloudflare Workers |

## Architecture Rules

- Database = Supabase PostgreSQL בלבד
- Authentication = Supabase Auth בלבד
- אין MongoDB · אין Firebase
- אין שינוי ארכיטקטורת TanStack Start
- UI בעברית + RTL
- shadcn/ui לפני custom components
- אין מחיקת קבצים ללא אישור מפורש

## Development Flow

```
UI → Types → Zod Validation → Server Functions → React Query → Integration → Testing → Security Review → Documentation Update
```

**אסור לדלג על שלבים.**

## הגדרת DONE

פיצ'ר = DONE רק אם **כל** 10 התנאים מתקיימים:

1. Scope מאושר (Phase 1)
2. UI הושלם
3. Types הושלמו
4. Zod Validation הושלם
5. Server Functions הושלמו
6. React Query הושלם
7. Testing Gate עבר
8. Security Review = Approved
9. תיעוד עודכן
10. TODO → DONE

**Not Approved → נשאר IN_PROGRESS.**

## מבנה תיקיות

```
src/
├── routes/           # File-based routing (TanStack Router)
│   ├── __root.tsx    # Root layout
│   ├── index.tsx     # Dashboard (/)
│   ├── profile.tsx
│   ├── marketing.tsx
│   └── leads.tsx
├── components/
│   ├── DashboardShell.tsx
│   └── ui/           # shadcn/ui
├── lib/
│   ├── api/          # Server Functions
│   ├── db/           # Supabase client (עתידי)
│   └── utils.ts
├── start.ts
└── server.ts
```

## Conventions

- Routing: file-based ב-`src/routes/` — **לא** Next.js pages
- `routeTree.gen.ts` — auto-generated, לא לערוך
- Alias: `@/*` → `./src/*`
- Server Functions: `createServerFn` ב-`src/lib/api/`
- Config server-only: `*.server.ts`

## Environment Variables

| כלל | פירוט |
|-----|--------|
| Secrets | `.env` בלבד |
| Client | `VITE_*` בלבד |
| Client אסור | `service_role` key |
| Server | `service_role` מותר server-side בלבד |
| אסור | hardcoded keys, tokens, passwords, URLs רגישים |

## Performance

כל Feature: Loading · Error · Empty · Validation states.

רשימות: Pagination/Limit · אין SELECT * מיותר.

## New Chat Recovery

בצ'אט חדש — קרא `docs/*`, `.cursor/rules/*`, `.cursor/skills/*`, `.cursor/agents/*`.

**אל תשאל** מה כבר בוצע. הסק מצב מתוך התיעוד.

## Mission

פרויקט שניתן להמשיך לפתח בעוד חודשים — ללא אובדן ידע, כפילויות, עם אבטחה, תיעוד וארכיטקטורה מסודרת.

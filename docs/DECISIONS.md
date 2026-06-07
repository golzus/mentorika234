# החלטות ארכיטקטוניות (ADR)

## ADR-001: TanStack Start

**החלטה:** TanStack Start (Lovable template) כ-framework.
**סיבה:** SSR, Server Functions, TanStack Router integration.
**סטטוס:** מאושר

## ADR-002: File-based Routing

**החלטה:** Routes ב-`src/routes/` — לא Next.js pages.
**סטטוס:** מאושר

## ADR-003: shadcn/ui + Tailwind v4

**החלטה:** shadcn/ui + Tailwind v4 לעיצוב.
**סטטוס:** מאושר

## ADR-004: Supabase PostgreSQL

**החלטה:** מסד נתונים = Supabase PostgreSQL בלבד.
**סטטוס:** מאושר

## ADR-005: Supabase Auth

**החלטה:** Authentication = Supabase Auth בלבד.
**סטטוס:** מאושר

## ADR-006: UI עברית + RTL

**החלטה:** כל UI בעברית, RTL.
**סטטוס:** מאושר

## ADR-007: shadcn לפני Custom

**החלטה:** shadcn/ui לפני קומפוננטות מותאמות.
**סטטוס:** מאושר

## ADR-008: אין MongoDB / Firebase

**החלטה:** אין MongoDB, אין Firebase.
**סטטוס:** מאושר

## ADR-009: Development Flow

**החלטה:** UI → Types → Zod → ServerFn → React Query → Integration → Testing → Security → Docs.
**סטטוס:** מאושר

## ADR-010: Scope Phase 1

**החלטה:** פיתוח פעיל רק ל-4 מודולים: Profile, Marketing, Leads, Dashboard.
**סטטוס:** מאושר

## ADR-011: גביה מסונכרנת

**החלטה:** גביה תסונכרן אוטומטית מ-projects.
**סטטוס:** Phase 2 — מתוכנן

## ADR-012: Security Review Gate

**החלטה:** Feature לא עובר ל-DONE בלי Security Review Approved.
**סטטוס:** מאושר

## ADR-013: Testing Gate

**החלטה:** בדיקות ידניות חובה לפני DONE.
**סטטוס:** מאושר

## ADR-014: Frontend ≠ Security

**החלטה:** Authorization בשרת/RLS בלבד — Frontend checks אינם אבטחה.
**סטטוס:** מאושר

## ADR-015: Migration-only Schema

**החלטה:** כל שינוי Schema דרך Supabase Migration. אין שינוי ידני ב-Production.
**סטטוס:** מאושר

## ADR-016: Backup Strategy

**החלטה:** גיבוי לפני Migration משמעותי. Supabase Point-in-Time Recovery + export ידני לפני שינויים גדולים.
**סטטוס:** מאושר

## ADR-017: Environment Variables

**החלטה:** Secrets ב-`.env` בלבד. `VITE_*` client. `service_role` server only.
**סטטוס:** מאושר

## ADR-018: DONE Definition

**החלטה:** DONE = 10 תנאים (Scope, UI, Types, Zod, ServerFn, RQ, Testing, Security Approved, Docs, TODO). Not Approved → IN_PROGRESS.
**סטטוס:** מאושר

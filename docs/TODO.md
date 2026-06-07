# TODO — מרחב מנטוריקה

## BACKLOG

### Phase 1 — תשתית
- [x] Supabase project setup + env variables (project: bexzrpenlcbuxkjsqeyd, eu-central-1)
- [ ] Supabase Auth flow (login/logout/session)
- [x] DB migrations: profiles, marketing_goals, leads + RLS (2026-06-07)
- [x] Types + Zod schemas לכל ישות (src/lib/db/schemas.ts)
- [x] Supabase client browser (src/lib/db/client.ts)
- [x] Auth context + login page (src/lib/auth/auth-context.tsx, src/routes/login.tsx)
- [x] API functions: profile, marketing, leads, dashboard (src/lib/api/*.functions.ts)
- [x] React Query hooks (src/hooks/use-*.ts)

### Phase 1 — מודולים
- [x] Profile: חיבור UI ל-DB (CRUD) — (2026-06-07)
- [x] Marketing: חיבור UI ל-DB (CRUD + checklist) — (2026-06-07)
- [x] Leads: חיבור UI ל-DB (CRUD + סטטוס) — (2026-06-07)
- [x] Dashboard: aggregations אמיתיים מ-3 מודולים — (2026-06-07)

### Phase 1 — UI/Assets
- [ ] הוספת logos חסרים (logo-mentorika.png, logo-zahavi.png)
- [ ] breadcrumbs בכל עמוד
- [x] Loading state — כל המודולים
- [x] Error state — כל המודולים
- [x] Empty state — כל המודולים
- [ ] Validation state — forms (react-hook-form + zod)

### Phase 2 — תיעוד בלבד (אין לפתח)
- [ ] ניהול שוטף (`projects`)
- [ ] גביה ותשלומים (`payments`)
- [ ] שימור לקוחות (`retention_clients`)
- [ ] חדר בקרה

## IN_PROGRESS

_(ריק — עדכן כשמתחילים משימה)_

## DONE

### תשתית Cursor
- [x] יצירת docs/ (8 קבצים)
- [x] יצירת .cursor/rules/ (8 rules)
- [x] יצירת .cursor/skills/ (4 skills)
- [x] יצירת .cursor/agents/ (5 subagents)

### UI Mock (קיים מראש)
- [x] Dashboard `/` — חובר ל-DB
- [x] Profile `/profile` — חובר ל-DB
- [x] Marketing `/marketing` — חובר ל-DB
- [x] Leads `/leads` — חובר ל-DB

### תשתית Supabase (2026-06-07)
- [x] Supabase project (bexzrpenlcbuxkjsqeyd, eu-central-1)
- [x] טבלאות: profiles, marketing_goals, leads + RLS + indexes
- [x] Auth: login page, AuthProvider, auth guard
- [x] API functions + React Query hooks לכל מודול

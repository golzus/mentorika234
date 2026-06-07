# Scope — הסכם פיתוח נוכחי

## Phase 1 — מותר לפתח

| # | מודול | Route | טבלת DB |
|---|--------|-------|---------|
| 1 | פרופיל אישי | `/profile` | `profiles` |
| 2 | מעקב שיווק | `/marketing` | `marketing_goals` |
| 3 | מעקב לידים | `/leads` | `leads` |
| 4 | עמוד בית | `/` | aggregations מ-3 המודולים |

**מותר:** UI · Database · Auth · API · Server Functions · React Query · Business Logic

## Phase 2 — אסור לפתח (פרויקטים נפרדים)

| מודול | Route עתידי | טבלה עתידית |
|--------|-------------|-------------|
| ניהול שוטף | `/ongoing` | `projects` |
| גביה ותשלומים | `/payments` | `payments` |
| שימור לקוחות | `/retention` | `retention_clients` |
| חדר בקרה | `/control-room` | — |

**מותר ל-Phase 2:** Documentation · Architecture Planning · TODO Entries (BACKLOG)

**אסור ל-Phase 2:** Routes · UI · Database Tables פעילות · API · Forms · Queries · Business Logic

## Scope Enforcement

לפני כל משימה — וודא שייכות ל-Phase 1.

אם הבקשה **אינה** שייכת לאחד מ-4 המודולים המאושרים:
1. **עצור** מיד
2. **אל תפתח** קוד
3. **בקש אישור מפורש** מהלקוחה לפני המשך

## מצב נוכחי בקוד

| Route | קובץ | סטטוס |
|-------|------|--------|
| `/` | `src/routes/index.tsx` | UI mock — Phase 1 |
| `/profile` | `src/routes/profile.tsx` | UI mock — Phase 1 |
| `/marketing` | `src/routes/marketing.tsx` | UI mock + local state — Phase 1 |
| `/leads` | `src/routes/leads.tsx` | UI mock + local state — Phase 1 |

פריטי sidebar ל-Phase 2 (`DashboardShell.tsx`) מצביעים ל-`/` — **לא לפתח** עד אישור.

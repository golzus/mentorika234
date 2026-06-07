# API — Server Functions

## דפוס

TanStack Start `createServerFn` — **לא** REST `/api/*`.

מיקום: `src/lib/api/*.functions.ts`

## כללים

- כל Server Function **חייב** לבדוק משתמש מחובר
- כל input → Zod validation
- כל CRUD → וידוא בעלות (`user_id`)
- אין `service_role` בצד לקוח
- אין SELECT * כשאין צורך
- רשימות → pagination/limit

## Phase 1 — Server Functions

### Auth (`src/lib/api/auth.functions.ts`)

| Function | פעולה |
|----------|--------|
| `getSession` | קבלת session נוכחית |
| `signIn` | התחברות |
| `signOut` | התנתקות |

### Profile (`src/lib/api/profile.functions.ts`)

| Function | פעולה |
|----------|--------|
| `getProfile` | קריאת פרופיל |
| `upsertProfile` | יצירה/עדכון |

### Marketing (`src/lib/api/marketing.functions.ts`)

| Function | פעולה |
|----------|--------|
| `listMarketingGoals` | רשימה + סינון קטגוריה |
| `createMarketingGoal` | יצירה |
| `updateMarketingGoal` | עדכון |
| `deleteMarketingGoal` | מחיקה |
| `toggleAction` | סימון checklist |

### Leads (`src/lib/api/leads.functions.ts`)

| Function | פעולה |
|----------|--------|
| `listLeads` | רשימה + סינון סטטוס + pagination |
| `createLead` | יצירה |
| `updateLead` | עדכון |
| `deleteLead` | מחיקה |

### Dashboard (`src/lib/api/dashboard.functions.ts`)

| Function | פעולה |
|----------|--------|
| `getDashboardSummary` | aggregations מ-profile, marketing, leads |

## Phase 2 — מתועד בלבד

projects · payments · retention — **אסור ליצור** ללא אישור.

## React Query Keys

```typescript
['profile', userId]
['marketing', userId, { category }]
['leads', userId, { status, page }]
['dashboard', 'summary', userId]
```

## Environment

```env
# Server only
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Client (VITE_ prefix)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Function Log

| Function | תאריך | סטטוס |
|----------|--------|--------|
| `getGreeting` (example) | — | דוגמה בלבד, לא בשימוש |

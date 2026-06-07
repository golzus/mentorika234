# מסד נתונים — Supabase PostgreSQL

## סטטוס

**Phase 1:** פעיל — טבלאות נוצרו ב-Supabase (bexzrpenlcbuxkjsqeyd), RLS פעיל, client מוגדר.
**Phase 2:** תכנון בלבד — אין ליצור טבלאות.

## Phase 1 — טבלאות פעילות

### `profiles`

| עמודה | סוג | הערות |
|--------|-----|--------|
| `id` | uuid PK | = `auth.users.id` |
| `first_name` | text | |
| `last_name` | text | |
| `business_field` | text | תחום עסקי |
| `business_name` | text | |
| `slogan` | text | |
| `golden_circle` | jsonb | מעגלי זהב |
| `monthly_salary_target` | numeric | |
| `new_clients_target` | integer | |
| `created_at` | timestamptz | חובה |
| `updated_at` | timestamptz | חובה |

**RLS:** `auth.uid() = id`

### `marketing_goals`

| עמודה | סוג | הערות |
|--------|-----|--------|
| `id` | uuid PK | |
| `user_id` | uuid FK → profiles | |
| `category` | text | מכירות/חשיפה/שתפ"ם/שימור/המלצות/בניית תשתיות |
| `title` | text | |
| `description` | text | |
| `measurable_target` | text | |
| `target_date` | date | |
| `actions` | jsonb | checklist [{text, done}] |
| `weekly_task` | text | |
| `status` | text | active/completed |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |
| `created_by` | uuid | |
| `updated_by` | uuid | |

**RLS:** `auth.uid() = user_id`
**Index:** `(user_id, category)`, `(user_id, target_date)`

### `leads`

| עמודה | סוג | הערות |
|--------|-----|--------|
| `id` | uuid PK | |
| `user_id` | uuid FK → profiles | |
| `name` | text | |
| `phone` | text | |
| `email` | text | |
| `source` | text | מקור הגעה |
| `interested_in` | text | |
| `proposed_price` | text | |
| `notes` | text | |
| `status` | text | new/in_progress/closed |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |
| `created_by` | uuid | |
| `updated_by` | uuid | |

**RLS:** `auth.uid() = user_id`
**Index:** `(user_id, status)`, `(user_id, created_at DESC)`

## Phase 2 — תכנון בלבד (אסור ליצור)

| טבלה | קשר |
|------|-----|
| `projects` | profiles → many |
| `payments` | projects → many |
| `retention_clients` | projects → many / ידני |

## קשרים

```
profiles → marketing_goals
profiles → leads
profiles → projects (Phase 2)
projects → payments (Phase 2)
projects → retention_clients (Phase 2)
```

## Audit Fields

**חובה:** `created_at`, `updated_at`
**רלוונטי:** `created_by`, `updated_by`

## Migration Rules

- כל שינוי Schema → Supabase Migration
- אין שינוי ידני ב-Production
- כל Migration → תיעוד כאן + שם ברור
- אין מחיקת עמודות/טבלאות ללא אישור

### Migration Log

| שם | תאריך | תיאור |
|-----|--------|--------|
| 001_initial_schema | 2026-06-07 | יצירת profiles, marketing_goals, leads + RLS + indexes + triggers |

## גיבויים

- גיבוי לפני Migration משמעותי
- אין מחיקת נתונים ללא תיעוד
- אסטרטגיה: ראה `docs/DECISIONS.md` ADR-016

## דרישות כל Schema

- TypeScript Types
- Zod Validation
- Foreign Keys
- Indexes רלוונטיים
- RLS פעיל

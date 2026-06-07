# UI — הנחיות עיצוב

## עקרונות

- **עברית בלבד** בכל טקסט UI
- **RTL** — `dir="rtl"` ב-shell
- **shadcn/ui לפני** קומפוננטות מותאמות
- **Figma** כמקור עיצוב

## Design Tokens

מוגדרים ב-`src/styles.css`:

| Token | ערך | שימוש |
|-------|-----|--------|
| `--teal` | `#18b5b6` | רקע, sidebar |
| `--coral` | `#ff6b57` | accent, CTA |
| `--page` | `#fffbf7` | רקע פנימי |
| `--foreground` | `#222222` | טקסט |
| Font | Heebo | כל האפליקציה |

## Layout

- `DashboardShell` — wrapper לכל דף Phase 1
- Figma stage: 1650×870
- Sidebar ימין: 120px
- Header: לוגו + שם משתמש + תאריך

## דפוס UI חוזר

1. מאזן עליון (סטטיסטיקות)
2. טאבים / סינון
3. רשימה + חיפוש
4. Modal הוספה/עריכה

## 4 States חובה (Performance)

| State | מתי |
|-------|-----|
| Loading | טעינת נתונים |
| Error | שגיאת שרת/רשת |
| Empty | אין נתונים |
| Validation | שגיאות טופס |

## Responsive

- בדיקה במסך קטן חובה לפני DONE
- Grid Figma — לשקול breakpoints ל-mobile

## קומפוננטות

- shadcn: `Dialog`, `Tabs`, `Form`, `Input`, `Button`, `Select`
- Icons: `lucide-react`
- Forms: `react-hook-form` + `zod`

## Phase 2 Sidebar

פריטים קיימים ב-`DashboardShell` — **disabled/placeholder בלבד**.
אין לפתח UI ל-Phase 2.

## Assets חסרים

- `src/assets/logo-mentorika.png`
- `src/assets/logo-zahavi.png`

## Figma

[עיצוב מנטוריקה](https://www.figma.com/design/GzsYaIEqIDCuXtVcnloYsc/) · node `3430:2`

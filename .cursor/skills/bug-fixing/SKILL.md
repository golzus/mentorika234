---
name: bug-fixing
description: Fixes bugs in מרחב מנטוריקה with minimal scope, root cause analysis, and re-testing security when auth/data is touched. Use when fixing bugs, regressions, or errors.
disable-model-invocation: true
---

# Bug Fixing — מנטוריקה

## Workflow

1. **Reproduce** — תיאור צעדים + expected vs actual
2. **Root cause** — מצא סיבה, לא תסמין
3. **Scope check** — וודא Phase 1 בלבד
4. **Fix מינימלי** — שינוי קטן בלבד
5. **Verify** — lint + בדיקה ידנית

## אם נגע ב-Auth/Data

הרץ מחדש:
- Unauthorized user test
- User isolation test
- Security Review אם שינוי משמעותי

## Docs

עדכן TODO/API/DB אם ההתנהגות השתנתה.

## אסור

- Refactor לא קשור
- מחיקת קבצים
- שינוי Phase 2

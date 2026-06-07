---
name: refactor-safe
description: Safe refactoring for מרחב מנטוריקה without behavior changes or file deletion. Use when refactoring, extracting components, or reorganizing code.
disable-model-invocation: true
---

# Refactor Safe — מנטוריקה

## כללים

- **אין** שינוי behavior
- **אין** מחיקת קבצים ללא אישור
- שלבים קטנים — commit/commit-ready per step
- שמור RTL + עברית

## לפני

1. קרא docs/TODO — וודא לא כפילות
2. Scope check — Phase 1 בלבד

## במהלך

- Extract → test → next step
- shadcn לפני custom
- TanStack Start conventions

## אחרי

- lint
- בדיקה ידנית regression
- docs sync אם structure השתנה

## אסור

- שינוי API contracts ללא docs
- Phase 2 routes/components

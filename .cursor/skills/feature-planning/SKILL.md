---
name: feature-planning
description: Plans new features for מרחב מנטוריקה with Scope check, docs review, and DONE criteria. Use when starting a new feature, page, module, or planning work in Profile/Marketing/Leads/Dashboard.
disable-model-invocation: true
---

# Feature Planning — מנטוריקה

## שלב 1: Scope Check

וודא שהמשימה שייכת ל-Phase 1:
- Profile · Marketing · Leads · Dashboard

**לא ב-Scope?** עצור + בקש אישור. אל תפתח קוד.

## שלב 2: קריאת Docs

קרא: PRODUCT, SCOPE, ARCHITECTURE, DB, API, DECISIONS, TODO

## שלב 3: בדיקת קיים

- Routes ב-`src/routes/`
- Server Functions ב-`src/lib/api/`
- DB schema ב-docs/DB.md
- מנע כפילויות

## שלב 4: תכנון

1. הסבר מה מתכוונים לבצע
2. רשימת קבצים שיושפעו
3. עדכן TODO → IN_PROGRESS

## שלב 5: Development Flow

```
UI → Types → Zod → Server Functions → React Query → Integration
→ Testing Gate → Security Gate → Documentation Update
```

## DONE Checklist (10/10)

- [ ] Scope מאושר
- [ ] UI
- [ ] Types + Zod
- [ ] Server Functions
- [ ] React Query
- [ ] Testing Gate
- [ ] Security Approved
- [ ] Docs עודכנו
- [ ] TODO → DONE

Not Approved → IN_PROGRESS

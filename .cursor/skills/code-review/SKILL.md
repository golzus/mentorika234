---
name: code-review
description: Reviews code for מרחב מנטוריקה against Scope, Security, Testing gates, and docs sync. Returns Approved/Not Approved verdict. Use for PR review, pre-DONE checks, or code review requests.
disable-model-invocation: true
---

# Code Review — מנטוריקה

## Checklist

### Scope
- [ ] Phase 1 בלבד (Profile/Marketing/Leads/Dashboard)

### Architecture
- [ ] TanStack Start conventions
- [ ] Development flow נשמר

### Security
- [ ] RLS + Auth
- [ ] Zod validation
- [ ] user_id בכל query
- [ ] אין secrets ב-client
- [ ] Frontend checks ≠ security

### Frontend
- [ ] עברית + RTL
- [ ] shadcn לפני custom
- [ ] 4 states (Loading/Error/Empty/Validation)

### Testing
- [ ] CRUD + states + isolation

### Docs
- [ ] TODO, DB, API, DECISIONS מסונכרנים

## Output

```
## Critical Issues
## High Risk
## Medium Risk
## Low Risk
## Recommended Fixes
## Files To Check
## Final Verdict: Approved / Not Approved
```

Not Approved → IN_PROGRESS, לא DONE.

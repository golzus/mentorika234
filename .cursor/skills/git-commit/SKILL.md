---
name: git-commit
description: Analyzes git diff and unstaged/staged changes, writes conventional commit messages for מרחב מנטוריקה, stages files, commits, and pushes. Use when the user asks to commit, push changes, save work to git, or auto-generate a commit from the current diff.
disable-model-invocation: true
---

# Git Commit — מנטוריקה

## Custom Mode (Composer dropdown)

להוספת **Git Commit** ליד Plan/Debug/Ask — עקוב אחר `.cursor/modes/SETUP.md`.
תבניות: `.cursor/modes/git-commit/instructions.md` + `prompt.md`.

## Quick Start

1. `git status` + `git diff` + `git log -5 --oneline` (parallel)
2. Classify changes → conventional commit message
3. Safety check (no secrets, no node_modules)
4. `git add` relevant paths
5. `git commit` with tailored message
6. `git push` (or `git push -u origin HEAD` if no upstream)
7. Verify with `git status` + `git log -1 --stat`

## Commit Message Rules

From `.cursor/rules/60-git.mdc`:

- Types: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `chore:`, `test:`
- Subject describes **why**, not just what changed
- Scope examples: `profile`, `marketing`, `leads`, `dashboard`, `ui`, `deps`

### Classification Guide

| Diff pattern | Type |
|--------------|------|
| New route/page/feature | `feat` |
| Bug fix | `fix` |
| docs/ only | `docs` |
| Restructure, no behavior change | `refactor` |
| CSS/layout only | `style` |
| package-lock, tooling | `chore` |
| Tests only | `test` |

## Files — Include / Exclude

**Include:**
- `src/**` changes
- `docs/**` when docs sync is part of the feature
- `.cursor/**` when agent/skill/rule work is intentional
- `routeTree.gen.ts` when routes changed
- `package-lock.json` when dependencies changed

**Exclude:**
- `.env`, `*.pem`, credentials
- `node_modules/`
- Build artifacts unless intentional

## Split Commits

When changes span unrelated areas, prefer separate commits:

```powershell
git add src/routes/profile.tsx src/hooks/use-avatar.ts
git commit -m "feat(profile): add avatar upload"

git add docs/DB.md docs/API.md
git commit -m "docs(profile): document avatar storage schema"
```

## Safety (never)

- Force push to main/master
- Commit secrets
- `git config` changes
- `--no-verify` unless user explicitly asks
- Empty commits when nothing changed

## PowerShell Commit Template

```powershell
git commit -m "feat(marketing): improve hero CTA visibility" -m "Increase contrast and spacing so the primary action stands out in RTL layout."
git push
```

## After Feature Commits

If the change completes a feature, remind to sync docs (TODO, DB, API, DECISIONS) per project rules.

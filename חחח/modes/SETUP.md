# הוספת Git Commit לתפריט Composer (ליד Plan)

Cursor מאפשר **Custom Modes** — מצבים מותאמים שמופיעים באותו dropdown כמו Agent / Plan / Debug / Ask.

## שלב 1 — הפעל Custom Modes (פעם אחת)

1. `Ctrl+Shift+J` → **Cursor Settings**
2. **Features** → **Chat**
3. הפעל **Custom modes**

## שלב 2 — צור את המצב

1. פתח **Composer** (`Ctrl+I`)
2. לחץ על ה-dropdown (Agent / Plan / …)
3. בחר **Add custom mode**

## שלב 3 — מלא את הטופס

| שדה | מה לשים |
|-----|---------|
| Name | `Git Commit` |
| Icon | 🚀 |
| Shortcut | `Ctrl+Shift+G` |
| Model | Composer 2.5 Fast |

**Tools:** רק Search, Read, Grep, List directory, Terminal. **בלי Edit.**

**Automation:**
- ✅ Auto-run
- ❌ Auto-apply edits

**Custom instructions:** העתק את כל התוכן מ:
`.cursor/modes/git-commit/instructions.md`

**Advanced → Starting prompt:** העתק מ:
`.cursor/modes/git-commit/prompt.md`

שמור.

## שלב 4 — שימוש (קליק אחד)

1. פתח Composer
2. בחר **Git Commit** מה-dropdown (ליד Plan)
3. Enter — המצב יתחיל מיד עם ה-starting prompt
4. הסוכן ינתח diff, יעשה commit ו-push

## קיצור דרך

`Ctrl+Shift+G` — קופץ ישר למצב Git Commit.

## הערות

- Custom modes נשמרים ב-Cursor (לא ב-git) — צריך להגדיר פעם אחת למכונה
- קבצי `.cursor/modes/` בפרויקט = תבנית להעתקה, לשיתוף עם הצוות
- Agent נפרד קיים גם ב-`.cursor/agents/git-committer.md` לשימוש מ-Agent panel

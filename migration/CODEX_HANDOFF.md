# DonNaGa Handoff

## Project
- Path: `/Users/jw3520/Workspace/donnaga`
- Branch: `main`
- Current version: `ver 26.05.16.00`

## Core Rules
- User-visible changes should also bump the app version using `YY.MM.DD.NN`.
- Same tag should use the same color across all tabs and dialogs.
- Push to `main` after finishing requested changes unless blocked.
- `planning/` is intentionally ignored in `.gitignore`.

## Recent Changes
- Fixed month picker year selection state.
- Reset calendar selection to today on app boot.
- Extended wrong PIN lockout from 1 minute to 3 minutes.
- Diversified budget tag colors and aligned legacy fallback colors with the same palette.
- Guest sandbox uses `철수/영희`, refreshes dummy seed when `guest/dummy-data.js` changes.

## Important Files
- `app.js`
- `styles.css`
- `index.html`
- `guest/dummy-data.js`
- `functions/api/verify-pin.js`

## Known Git Note
- In this environment, `git commit` sometimes briefly reports `.git/index.lock` contention.
- Usually the lock file disappears immediately and retrying the commit/push succeeds.

## Useful Commands
```bash
git -C /Users/jw3520/Workspace/donnaga status -sb
git -C /Users/jw3520/Workspace/donnaga log --oneline -5
```

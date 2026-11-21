# Team Workflow

This is the process every team member follows, from first clone to merged change. For conventions (branch names, commit format, code style), see [`CONTRIBUTING.md`](../CONTRIBUTING.md).

Written for: developers joining the FocusFlow team, including those who will use Claude Code.

## 0. One-time setup

- Install the tools in the [Prerequisites](../README.md#prerequisites) table.
- Log in to GitHub: `gh auth login` (or configure SSH keys).
- Install Expo Go on your phone.

## 1. Clone the repository

```bash
git clone https://github.com/JunCodera1/focus-flow.git
cd focus-flow
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start Expo

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android emulator) or `i` (iOS simulator, macOS only). Confirm the placeholder tabs appear before you change anything.

## 4. Check your assignment

- Open the issue you were assigned. Confirm it is labelled `in progress` and assigned to you.
- Identify the feature folder (for example `src/features/tasks/`) and the route files named in the issue.
- If the issue has no clear scope or acceptance criteria, ask before coding.

## 5. Create a feature branch

Start from an up-to-date `main`:

```bash
git checkout main
git pull origin main
git checkout -b feature/task-management
```

Use `fix/<issue-name>` for bugs and `docs/<description>` for documentation.

## 6. Work only within your assigned files and features

- Change files inside your feature folder and the route files for your feature.
- Changes to shared files (`src/components/ui/`, `src/constants/theme.ts`, `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `package.json`, `app.json`) need a note in the issue first. See [CONTRIBUTING §8](../CONTRIBUTING.md#8-avoiding-conflicts).
- Do not reformat or refactor code outside your change.
- If you are using Claude Code, start it from the project root so it reads `CLAUDE.md` and `AGENTS.md`. For a feature that has a spec, use the Spec Kit flow (`/speckit-specify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-implement`).

While you work, run the checks often:

```bash
npm run typecheck
npm run lint
npm run format:check      # run `npm run format` to fix
npm test
```

## 7. Commit changes

Review what you are about to commit, then commit:

```bash
git status
git diff
git add <files you changed>
git commit -m "feat(tasks): add task creation form"
```

Avoid `git add .` unless `git status` shows only files you meant to change. Never commit `.env*.local`, keys, tokens, or `node_modules/`.

Commit message format: [CONTRIBUTING §2](../CONTRIBUTING.md#2-commit-messages).

## 8. Push the branch

```bash
git push -u origin feature/task-management
```

Later pushes on the same branch only need `git push`.

## 9. Create a pull request

Open a draft PR early if you want feedback:

```bash
gh pr create --draft --base main --title "feat(tasks): task management" --body-file .github/pull_request_template.md
```

Fill in every section of the PR template. Link the issue with `Closes #<number>`. Attach screenshots or a screen recording for any UI change. When everything is ready:

```bash
gh pr ready
```

## 10. Review

- Request review from at least one teammate. Reviews are required before merge.
- Reviewers check: the change matches the issue, tests cover the new behavior, the checks pass, conventions are followed, and nothing unrelated changed.
- Respond to each comment: make the change, or explain why not. Push new commits; do not rewrite history while a review is in progress.
- Keep your branch current with `main`:

  ```bash
  git fetch origin
  git rebase origin/main
  git push --force-with-lease   # only after a rebase
  ```

## 11. Merge

When the PR is approved and all checks pass:

- Use **Squash and merge**.
- Confirm the commit message is in Conventional Commits format.
- Delete the remote branch (GitHub offers a button after merge).
- Clean up locally:

  ```bash
  git checkout main
  git pull origin main
  git branch -d feature/task-management
  ```

- Move the issue to done (it closes automatically when the PR uses `Closes #<n>`).

## Quick reference

```bash
# Start of day
git checkout main && git pull origin main
git checkout -b feature/<name>      # or: git checkout feature/<name> && git rebase origin/main

# During work
npm run typecheck && npm run lint && npm test
git add <files> && git commit -m "feat(<scope>): <summary>"
git push -u origin feature/<name>

# Opening the PR
gh pr create --draft --base main
```

## Getting unstuck

- **Expo will not start or shows stale code:** `npx expo start --clear`.
- **Dependency error after pulling:** `npm install`, then `npx expo install --fix` if it still fails.
- **Merge conflict:** see [CONTRIBUTING §8](../CONTRIBUTING.md#8-avoiding-conflicts). For `package-lock.json`, regenerate it with `npm install`.
- **Unsure about scope:** comment on the issue and wait for an answer before continuing.

# Contributing to FocusFlow

Thanks for contributing. This guide defines how we branch, commit, review, and write code so that several people (and their AI coding agents) can work on the same codebase without stepping on each other.

Read [`README.md`](README.md) first for setup, and [`docs/TEAM_WORKFLOW.md`](docs/TEAM_WORKFLOW.md) for the step-by-step process.

## 1. Branches

`main` is always stable and runnable. Never commit directly to `main`.

| Prefix     | Use for            | Example                                          |
| ---------- | ------------------ | ------------------------------------------------ |
| `feature/` | New functionality  | `feature/task-management`, `feature/focus-timer` |
| `fix/`     | Bug fixes          | `fix/timer-drift-on-resume`                      |
| `docs/`    | Documentation only | `docs/contributing-guide`                        |

Rules:

- Use lowercase kebab-case after the prefix. Keep names short and specific.
- Name a branch after one purpose. Do not create branches you do not need (no `dev`, `staging`, or personal long-lived branches).
- Delete the branch after its PR is merged.
- Chores such as dependency upgrades use `fix/` or `docs/` only if they match; otherwise ask in the issue before creating a new prefix.

## 2. Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<optional scope>): <short imperative summary>

<optional body: why the change is needed, and anything non-obvious>
```

Types:

| Type       | When                                                    |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new user-visible feature or capability                |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only                                      |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or correcting tests                              |
| `style`    | Formatting only; no logic change                        |
| `chore`    | Tooling, configuration, dependency updates              |
| `perf`     | Performance improvement                                 |

Rules:

- Summary in the imperative mood, lowercase after the colon, no trailing period, 72 characters or fewer.
- One logical change per commit. Commit early and often on your branch; the PR is squashed on merge.
- Use the scope for the area touched, for example `feat(tasks): add task list screen`.
- Reference issues in the body or PR: `Closes #12`.

Examples:

```
feat(tasks): add task creation form
fix(focus): keep timer running after app returns from background
docs: add team workflow guide
```

## 3. Pull request workflow

1. **Open or claim an issue** (see section 5).
2. **Branch** from an up-to-date `main`.
3. **Implement** the change in your feature folder and add tests.
4. **Run the checks** locally:
   ```bash
   npm run typecheck && npm run lint && npm run format:check && npm test
   ```
5. **Push** your branch and open a **draft** PR early if you want feedback.
6. **Fill in the PR template** completely. Include screenshots or a screen recording for any UI change, and link the issue with `Closes #<number>`.
7. **Mark ready for review** when the checks pass and the PR is complete.
8. **Review:** at least **one approving review** from another team member is required before merge. Reviewers check correctness, tests, scope, and conventions in this file.
9. **Address feedback** with new commits, then re-request review. Do not force-push over a review someone is actively reading unless they agree.
10. **Merge** using **Squash and merge** and delete the branch.

PR guidelines:

- Keep PRs small and focused. Aim for under ~400 changed lines excluding lock files and generated files. Split larger work into a sequence of PRs.
- One PR should not mix a feature with unrelated refactors or formatting changes.
- Do not merge a PR with failing checks or unresolved review threads.

## 4. Coding conventions

### Project structure

- `app/` contains **routes only** (screens and layouts). Route files stay thin: they compose components and hooks from `src/`.
- Feature code lives in `src/features/<feature>/` with `components/`, `hooks/`, `services/`, and `types/` as needed. Do not put business logic inside route files.
- Shared, feature-agnostic UI goes in `src/components/ui/` (presentational) or `src/components/layout/` (screen structure).
- Design tokens (colors, spacing) live in `src/constants/theme.ts`. Do not hard-code colors or spacing values in components.
- Use the `@/` import alias for anything under `src/` (for example `import { ThemedText } from '@/components/ui/themed-text'`).

### Naming

- Files: `kebab-case.ts` / `kebab-case.tsx` (for example `task-list.tsx`, `use-timer.ts`).
- React components: `PascalCase` exported names.
- Hooks: `useSomething`, in files named `use-something.ts`.
- Constants: `UPPER_SNAKE_CASE` only for true module-level constants; otherwise `camelCase`.
- Boolean names read as questions: `isLoading`, `hasPermission`.

### React and React Native

- Function components only. Keep components small; extract hooks for logic.
- Use `StyleSheet.create` for styles. Do not add inline style objects in lists.
- Use Expo and React Native APIs; check the docs for the installed SDK version (`expo` in `package.json`) before writing code that touches an Expo API.
- Accessibility: interactive elements need an `accessibilityRole` and a meaningful `accessibilityLabel` when the visible text is not enough.
- Respect safe areas and both light and dark color schemes.

### Dependencies

- Add packages with `npx expo install <package>` for Expo and React Native packages, so versions match the SDK. Use `npm install <package>` for other packages.
- **Do not add a dependency without team agreement** in the issue. Prefer Expo modules and what the platform provides.
- Never edit `package-lock.json` by hand.

## 5. TypeScript rules

- `strict` mode is on. Do not disable strict checks or add `// @ts-ignore`. If you truly must, use `// @ts-expect-error` with a one-line reason.
- Do not use `any`. Use `unknown` and narrow it, or write a proper type.
- Avoid non-null assertions (`!`) unless the reason is obvious from the code; prefer a guard.
- Prefer `type` for object shapes and unions; use `interface` only when declaration merging is needed.
- Put feature types in `src/features/<feature>/types/`. Shared types go in `src/types/` when more than one feature needs them.
- Exported functions and hooks have explicit parameter types. Return types are inferred unless they clarify the API.
- Route files (`app/**`) export a default component, as Expo Router requires.

## 6. Testing expectations

- Test runner: Jest with `jest-expo`. UI tests use React Native Testing Library.
- Run `npm test` before every push.
- Every feature PR includes tests for its new behavior:
  - **Logic** (services, utilities, reducers, pure functions): unit tests. These are required.
  - **Hooks:** test with RNTL's `renderHook`.
  - **Components:** test user-visible behavior (text, presses, states), not implementation details.
- Name tests `<name>.test.ts(x)` next to the file they test.
- Do not add snapshot tests for whole screens; they become noise.
- Bug fixes include a regression test that fails before the fix.
- Tests must not depend on the network, real time (use fake timers), or other tests' order.

## 7. Claiming and working on tasks

1. Pick an open issue labelled `ready` that has no assignee.
2. **Assign yourself** and add the `in progress` label. Comment with your planned approach if the issue is not already specific enough.
3. If the work needs a spec, use Spec Kit first (see the Spec-Driven Development section of [`README.md`](README.md)). Specs are merged through their own PR (`docs/` branch) before implementation starts.
4. Stay inside the feature folder and files listed in the issue. If you need a change outside your area, comment on the issue before making it.
5. If you are blocked or will not finish, unassign yourself and comment so someone else can pick it up.
6. When the PR is merged, the issue closes automatically via `Closes #<n>`.

Use the issue templates in `.github/ISSUE_TEMPLATE/` (feature request, bug report, task).

## 8. Avoiding conflicts

- **Work in your feature folder.** Most merge conflicts come from several people editing the same file.
- **Shared files need coordination.** Before editing one of these, mention it in the issue or team chat:
  - `app/_layout.tsx`, `app/(tabs)/_layout.tsx` (navigation)
  - `src/constants/theme.ts` (design tokens)
  - `package.json` and `package-lock.json` (dependencies)
  - `app.json` (Expo configuration)
  - `src/components/ui/*` (shared components; changing them affects every screen)
- **Pull `main` often.** Run `git fetch origin && git rebase origin/main` (or merge `origin/main`) at least daily while the branch lives.
- **Keep the branch short-lived.** Merge small pieces instead of one large branch.
- **Lock file conflicts:** do not resolve `package-lock.json` by hand. Accept either side, then run `npm install` to regenerate it, and commit the result.
- **No drive-by formatting.** Run `npm run format` only on files you changed. Do not reformat unrelated code.

## 9. Native code and development builds

The project uses Continuous Native Generation: `ios/` and `android/` are generated and are **not committed**. Configure native behavior in `app.json` and config plugins only.

- Expo Go includes only the native modules bundled with it. Pure JavaScript libraries and bundled Expo modules work in Expo Go.
- If you add a library with native code that Expo Go does not include, you must build a **development build**:
  ```bash
  npx expo install <package>
  npx expo run:android   # or: npx expo run:ios (macOS)
  ```
  Or build in the cloud with EAS: `npx eas-cli@latest build --profile development`.
- Mention in the PR when a development build is required.

## 10. Secrets and sensitive data

- Never commit API keys, tokens, passwords, service-account files, keystores, or signing certificates. The `.gitignore` covers common patterns, but **check your staged files** with `git status` and `git diff --staged` before committing.
- Local values go in `.env.local`. Commit only `.env.example`, containing placeholder values.
- If a secret is committed by accident, rotate it immediately and tell the team leader. Removing it from the latest commit is not enough.

## 11. Questions

Ask in the issue or PR. Prefer asking early over guessing.

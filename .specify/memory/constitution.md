# FocusFlow Constitution

## Core Principles

### I. Mobile-First, Cross-Platform
FocusFlow ships on Android and iOS and must run in Expo Go wherever possible. Every feature is designed for touch, small screens, and both light and dark color schemes. Native-only code requires a justified need and a documented development-build step.

### II. Spec Before Code
Non-trivial features start with a spec (`/speckit-specify`) and a plan (`/speckit-plan`). Implementation follows the approved tasks. Changes to a spec go through its PR, not through silent drift in code.

### III. Strict TypeScript
`strict` mode stays on. `any` is not allowed; `unknown` must be narrowed. Suppressions require a written reason. Types for a feature live in that feature's `types/` folder.

### IV. Test What Carries Logic
Services, utilities, and hooks that hold behavior ship with unit tests in the same PR. Bug fixes ship with a regression test. Tests are deterministic: no network, no real timers, no order dependence.

### V. Clear Ownership Boundaries
Each feature lives in `src/features/<feature>/` and is owned by one assignee at a time. Routes in `app/` stay thin. Changes to shared files (design tokens, shared UI, navigation layouts, dependencies) are announced in the issue before they are made.

### VI. Small, Reviewed Changes
Work lands through Pull Requests into `main` with at least one approving review and passing checks. PRs are small and single-purpose. `main` is always runnable.

### VII. Simplicity and Minimal Dependencies
Start with the simplest working solution. Add a dependency only after agreement, preferring Expo modules and platform APIs. Structure is created when needed, not in advance.

## Additional Constraints

- Package manager: npm. Expo and React Native packages are installed with `npx expo install`.
- Routing: Expo Router. Navigation uses file-based routes only.
- Secrets (API keys, tokens, signing material, `.env.local`) are never committed.
- Accessibility: interactive elements expose a role and label; touch targets and text scale must remain usable.

## Development Workflow

- Branches: `main`, `feature/<name>`, `fix/<name>`, `docs/<name>`.
- Commits follow Conventional Commits.
- Before a PR is marked ready: `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm test` pass.
- Every PR completes the template in `.github/pull_request_template.md`, including screenshots for UI changes.

## Governance

This constitution supersedes other practices in the repository. Amendments are proposed in a `docs/` PR, approved by the team leader and at least one other member, and recorded here with a version bump. Every PR and review verifies compliance with these principles. Use `CLAUDE.md` and `AGENTS.md` for runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2026-11-21 | **Last Amended**: 2026-11-21

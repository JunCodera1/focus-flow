# FocusFlow — Claude Code instructions

@AGENTS.md

## Spec-driven development

This project uses GitHub Spec Kit. Its files (`.specify/`, `.claude/skills/speckit-*`) are local-only and not committed. If they are missing on your machine, run `specify init . --integration claude` first (see `README.md`). Slash commands:

`/speckit-constitution` → `/speckit-specify` → (`/speckit-clarify`) → `/speckit-plan` → `/speckit-tasks` → (`/speckit-analyze`) → `/speckit-implement`

- Project principles: `.specify/memory/constitution.md` (local copy). Follow them; propose changes to the team rather than editing them silently.
- Before implementing a feature, check for its spec under `specs/` (or the path given in the issue).

## Scope rules for agents

- Work inside the feature folder assigned to the task (`src/features/<feature>/`). Ask before touching shared files listed in `CONTRIBUTING.md` §8.
- Do not implement features that the current task does not request.
- Before declaring work done, run `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm test`.
- Never commit secrets or `.env.local` files.

# FocusFlow — Claude Code instructions

@AGENTS.md

## Spec-driven development

This project uses GitHub Spec Kit. Slash commands are installed as skills in `.claude/skills/speckit-*`:

`/speckit-constitution` → `/speckit-specify` → (`/speckit-clarify`) → `/speckit-plan` → `/speckit-tasks` → (`/speckit-analyze`) → `/speckit-implement`

- Project principles: `.specify/memory/constitution.md`. Follow them; propose changes to the team rather than editing them silently.
- Before implementing a feature, check for its spec under `specs/` (or the path given in the issue).

## Scope rules for agents

- Work inside the feature folder assigned to the task (`src/features/<feature>/`). Ask before touching shared files listed in `CONTRIBUTING.md` §8.
- Do not implement features that the current task does not request.
- Before declaring work done, run `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm test`.
- Never commit secrets or `.env.local` files.

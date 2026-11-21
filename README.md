# FocusFlow

FocusFlow is a mobile productivity app for Android and iOS that combines task management, focus sessions, statistics, and review.

> **Status:** project initialization. Screens are placeholders; features are built one at a time through Spec-Driven Development (see [Spec-Driven Development](#spec-driven-development)).

## Main features (planned)

- **Tasks** — create, organize, and complete tasks.
- **Focus** — timed focus sessions tied to tasks.
- **Statistics** — progress and focus-time overview.
- **Review** — periodic reflection on completed work.
- **Settings** — preferences, including notifications.

## Technology stack

- [Expo](https://expo.dev) SDK 58 + React Native 0.88
- [Expo Router](https://docs.expo.dev/router/introduction/) (file-based routing)
- TypeScript (strict mode)
- ESLint (`eslint-config-expo`) and Prettier
- Jest + `jest-expo` + React Native Testing Library
- npm
- GitHub Spec Kit for spec-driven development

## Prerequisites

| Tool              | Version                           | Notes                                                   |
| ----------------- | --------------------------------- | ------------------------------------------------------- |
| Node.js           | 22.13+ or 24.3+ (LTS recommended) | Required by Expo SDK 58                                 |
| npm               | Bundled with Node.js              | This project uses npm, not yarn or pnpm                 |
| Git               | 2.30+                             |                                                         |
| GitHub CLI (`gh`) | Optional                          | Simplifies creating PRs                                 |
| Expo Go           | Latest                            | Install on your phone from the App Store or Google Play |
| Android Studio    | Latest                            | Only for running on an Android emulator                 |
| Xcode             | Latest                            | Only for the iOS simulator; **macOS only**              |

You do **not** need an Expo account to run the app locally.

## Installation

```bash
git clone https://github.com/JunCodera1/focus-flow.git
cd focus-flow
npm install
```

## Running the app

Start the development server:

```bash
npm start
# equivalent to: npx expo start
```

Then choose a target from the terminal menu:

| Key | Action                                                  |
| --- | ------------------------------------------------------- |
| `a` | Open on an Android emulator or connected Android device |
| `i` | Open on the iOS simulator (macOS only)                  |
| `s` | Switch between development build and Expo Go            |
| `r` | Reload the app                                          |
| `m` | Open the developer menu                                 |

### Run with Expo Go (fastest)

1. Install **Expo Go** on your phone.
2. Run `npm start`.
3. Scan the QR code shown in the terminal:
   - **Android:** scan with the Expo Go app.
   - **iOS:** scan with the Camera app, then open in Expo Go.
4. Your phone and computer must be on the same network. If scanning fails, run `npx expo start --tunnel`.

### Run on Android

Option A — **Expo Go on a device**: follow the steps above.

Option B — **Android emulator**:

1. Install Android Studio and create a virtual device (AVD) from _Device Manager_.
2. Start the emulator, then run:

   ```bash
   npm run android
   ```

### Run on iOS

Option A — **Expo Go on an iPhone**: follow the steps above (works from any OS).

Option B — **iOS simulator (macOS only)**:

1. Install Xcode and open _Xcode → Settings → Platforms_ to install the iOS simulator.
2. Run:

   ```bash
   npm run ios
   ```

> Native modules that Expo Go does not include require a development build. When one is added, follow the instructions in [`CONTRIBUTING.md`](CONTRIBUTING.md#native-code-and-development-builds).

## Quality checks

```bash
npm run typecheck      # TypeScript, strict mode
npm run lint           # ESLint
npm run format:check   # Prettier (use `npm run format` to fix)
npm test               # Jest unit tests
```

Run all four before opening a pull request. CI is not configured yet; the reviewer checks these locally.

## Git workflow

- `main` is the stable branch. Never push to it directly.
- Work on a branch named after its purpose:
  - `feature/<feature-name>` — new features
  - `fix/<issue-name>` — bug fixes
  - `docs/<description>` — documentation only
- Merge into `main` through a Pull Request.

Full details are in [`CONTRIBUTING.md`](CONTRIBUTING.md). Step-by-step instructions for each team member are in [`docs/TEAM_WORKFLOW.md`](docs/TEAM_WORKFLOW.md).

## Project structure

```
focus-flow/
├── app/                        # Expo Router routes only (screens and navigators)
│   ├── _layout.tsx             # Root layout: theme provider and navigator
│   └── (tabs)/                 # Bottom tab navigator; one file per tab
│       ├── _layout.tsx         # Tab definitions
│       ├── index.tsx           # Home
│       ├── tasks.tsx           # Tasks
│       ├── focus.tsx           # Focus
│       ├── statistics.tsx      # Statistics
│       └── settings.tsx        # Settings
├── src/                        # Everything that is not a route
│   ├── components/
│   │   ├── ui/                 # Reusable, presentational building blocks
│   │   └── layout/             # Screen-level layout helpers
│   ├── constants/              # Design tokens (colors, spacing, fonts)
│   ├── hooks/                  # Shared hooks (for example useTheme)
│   └── features/               # One folder per feature; the unit of ownership
│       ├── tasks/              # components/, hooks/, services/, types/
│       ├── focus/              # components/, hooks/, services/, types/
│       ├── statistics/         # components/, hooks/, services/, types/
│       └── review/             # components/, hooks/, services/, types/
├── docs/                       # Team documentation
├── .github/                    # PR and issue templates
├── assets/                     # Icons and splash images
├── app.json                    # Expo configuration
├── eslint.config.js
├── jest.config.js
└── tsconfig.json
```

Subfolders such as `services/` or `utils/` are created when first needed; they are not added empty.

Route files in `app/` should stay thin: they import components and hooks from `src/`.

## Spec-Driven Development

New features are specified before they are built, using [GitHub Spec Kit](https://github.com/github/spec-kit). Spec Kit's working files (`.specify/`) and Claude Code configuration (`.claude/`) are **not committed** to this repository; each developer sets them up locally.

Typical flow inside Claude Code:

| Step | Command                                  | Output                                                                                           |
| ---- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| 1    | `/speckit-constitution`                  | Project principles in `.specify/memory/constitution.md` (local; update only with team agreement) |
| 2    | `/speckit-specify <feature description>` | Feature spec                                                                                     |
| 3    | `/speckit-clarify` _(optional)_          | Resolves ambiguities in the spec                                                                 |
| 4    | `/speckit-plan`                          | Implementation plan                                                                              |
| 5    | `/speckit-tasks`                         | Ordered task list                                                                                |
| 6    | `/speckit-analyze` _(optional)_          | Consistency check across spec, plan, and tasks                                                   |
| 7    | `/speckit-implement`                     | Implements the tasks                                                                             |

Other optional commands: `/speckit-checklist` (requirement quality checklist) and `/speckit-converge` (assess the codebase and append remaining work as tasks).

Set up Spec Kit once on your machine, from the project root:

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init . --integration claude --force
specify check
```

Use `--force` only in this project folder; it does not change committed files.

## Team collaboration

- Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before your first change.
- Read [`docs/TEAM_WORKFLOW.md`](docs/TEAM_WORKFLOW.md) for the day-to-day process.
- Pick a task from the issue tracker, assign yourself, and work only inside that feature's folder.
- Open an issue from the templates in `.github/ISSUE_TEMPLATE/`; fill out the PR template in `.github/pull_request_template.md`.

## Environment and secrets

- Never commit API keys, tokens, passwords, or signing keys.
- Put local values in `.env.local` (ignored by Git). Public values that the app must read go in `app.json` or in a file named `.env.example` with placeholders only.

## Troubleshooting

- **QR code does not connect:** use `npx expo start --tunnel`, or check that phone and computer share the same Wi-Fi.
- **Stale cache or odd errors after a dependency change:** run `npx expo start --clear`.
- **Dependency version warnings:** run `npx expo install --fix`. Use `npx expo install <package>` instead of `npm install <package>` for Expo and React Native packages.
- **`npx expo-doctor` reports issues:** run it and follow its output.

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router documentation](https://docs.expo.dev/router/introduction/)
- [React Native documentation](https://reactnative.dev/docs/getting-started)

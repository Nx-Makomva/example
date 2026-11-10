<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Brightside — rules for AI assistants

Brightside is a fictional student-wellbeing product for schools. Teachers use it to see how their class is feeling. Students use it to check in each morning. Most people who change this repo are **designers**, not engineers. Explain what you are doing in plain language.

## Where things live

| What | Where |
| --- | --- |
| Design tokens (colours, radii, shadows, font) | `src/app/globals.css` |
| Design-system primitives | `src/components/ui/` |
| Product-specific components | `src/components/features/` |
| Pages (routes) | `src/app/**/page.tsx` |
| Copy for moods | `src/lib/mood.ts` |
| Sample data (there is no backend) | `src/lib/students.ts` |
| Visual-test baselines | `tests/visual/__screenshots__/` |

## Design-system, accessibility and copy rules

Each rule has an ID. The full rule, the reason for it and what checks it are in [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md#rules). When you review or explain a change, cite the ID and link to the rule (for example, `DESIGN-SYSTEM.md#ds-04-status-labels-use-badge`).

Before you build UI, look at what already exists. If the Storybook MCP server is running (`pnpm storybook`), call `docs-list` and `docs-show`. Each component's docs say when to use it and when not to. The **Design system/Tokens** docs entry lists every token and its meaning.

- **DS-01** Use tokens only. Tailwind's default palette is switched off (`bg-red-500` does nothing). Use `bg-concern`, `text-text-muted`, `border-border` and so on. No arbitrary values (`bg-[#fff]`, `p-[13px]`) and no `style={{}}`.
- **DS-02** Name a new token by meaning (`--color-concern`), not by look (`--color-red`), and say why in the PR.
- **DS-03** Reuse, then extend (add a prop), then create. Look in `src/components/ui/` first.
- **DS-04** Every status label is a `Badge`. Never a hand-built rounded `span`.
- **DS-05** Actions use `Button`. Navigation uses a link.
- **DS-06** `src/components/ui/` contains no product logic (moods, students, check-ins).
- **DS-07** Every component has a story next to it (`Button.tsx` → `Button.stories.tsx`), covering default, empty, error, disabled and long text where they apply.
- **A11Y-01** Text has enough contrast. Story tests fail on violations. Fix the token or the component. Never turn off the check.
- **A11Y-02** Meaning is never shown by colour alone.
- **A11Y-03** Use native controls (`<button>`, `<input type="radio">`, `<fieldset>`), not `div`s with click handlers.
- **A11Y-04** Everything works with a keyboard, and the focus is always visible.
- **A11Y-05** Every control has an accessible name.
- **COPY-01** Students are 11–16. Write warm, plain and short. No clinical words such as "at risk" or "depressed" in student-facing UI.
- **COPY-02** Teacher copy is calm and practical. Suggest an action ("might want a quiet word"), not an alarm.
- **COPY-03** Sentence case for headings and buttons.
- **COPY-04** British English for UI text (en-GB). American English for code identifiers.

## Workflow rules

- Never commit to `main`. Create a branch, make the change, and open a pull request. `main` is protected and deploys to **production**.
- Keep each PR to one change.
- Before you say a change is done, run `pnpm lint && pnpm typecheck && pnpm test:stories`. The pre-push hook runs these too.
- If the change is visual, run `pnpm test:visual:docker`. It will fail on purpose and show what changed. Walk the user through the diff report, and run `pnpm test:visual:update` only after they confirm that every change is intended (see `CONTRIBUTING.md`).
- Never suggest `git push --no-verify` to get past a failing hook. Fix the failure.
- Never force-push, rewrite history, delete branches, or disable a check without the user explicitly asking you to.

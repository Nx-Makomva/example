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

## Design-system rules (enforced by lint and CI)

1. **Use tokens only.** Tailwind's default palette is switched off. `bg-red-500` does nothing. Use `bg-concern`, `text-text-muted`, `border-border` and so on. Do not use arbitrary values (`bg-[#fff]`, `p-[13px]`) or `style={{}}`.
2. **Reuse before you create.** Look in `src/components/ui/` first. If the Storybook MCP server is running (`pnpm storybook`), use it to list components and their props.
3. **A new token needs a reason.** Add it to `globals.css`, name it by meaning (`--color-concern`), not by look (`--color-red`), and say why in the PR.
4. **Every component has a story** next to it (`Button.tsx` → `Button.stories.tsx`). Cover the states that matter: default, empty, error, disabled, long text. Each story becomes an accessibility test and a visual-regression screenshot.
5. **Accessibility is a blocker.** Stories fail CI on WCAG violations such as low colour contrast. Fix the token or component. Do not turn off the check.
6. **Prefer native HTML** (`<button>`, `<input type="radio">`, `<fieldset>`) over `div`s with click handlers.

## Copy rules

- Students are 11–16. Write warm, plain and short. Never use clinical words such as "at risk" or "depressed" in student-facing UI.
- Teacher-facing copy is calm and practical. Suggest an action ("might want a quiet word"), not an alarm.
- Use sentence case for headings and buttons. Use British English for UI text (en-GB). Use American English for code identifiers.

## Workflow rules

- Never commit to `main`. Create a branch, make the change, and open a pull request. `main` is protected and deploys to **production**.
- Keep each PR to one change.
- Before you say a change is done, run `pnpm lint && pnpm typecheck && pnpm test:stories`. The pre-push hook runs these too.
- If the change is visual, run `pnpm test:visual:docker`. It will fail on purpose and show what changed. Walk the user through the diff report, and run `pnpm test:visual:update` only after they confirm that every change is intended (see `CONTRIBUTING.md`).
- Never suggest `git push --no-verify` to get past a failing hook. Fix the failure.
- Never force-push, rewrite history, delete branches, or disable a check without the user explicitly asking you to.

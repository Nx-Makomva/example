<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Brightside: guide for AI agents

Brightside is a student-wellbeing web app for UK schools. Students (aged 11–16) do a ten-second morning check-in, and teachers see how their class is feeling. The students and data are fictional, and there is no backend. But treat this repo as production: `main` deploys to the live site.

## Who you are working with

Most people who change this repo are **designers with no coding background**. They cannot check your code, so they rely on what you tell them and show them.

- **Explain before and after.** Before you edit, say which files you will change and why. After, say what changed, in visual terms ("the badge now shows the mood name next to the dot").
- **Show, don't just tell.** For any visual change, give them a URL to look at, or a screenshot (see `preview-locally`).
- **Ask, don't assume.** If the audience (student or teacher), the screen, or the states are unclear, ask before you build.
- **Say what you did beyond the request.** Name every change that they did not ask for, and let them decide whether it stays.
- **Teach the vocabulary.** Define a term (*prop*, *token*, *story*, *baseline*) in a few words the first time you use it.

## Stack

| Tool | Version | What to know |
| --- | --- | --- |
| Next.js | 16 (App Router) | Read `node_modules/next/dist/docs/` before you write Next code (see the block above). Server components are the default. `cacheComponents` is on in `next.config.ts`. |
| React | 19 | Add `"use client"` only to components that need state or event handlers. |
| TypeScript | 5, `strict` | Import from `src/` with `@/`, for example `@/components/ui/Button`. |
| Tailwind CSS | 4 | There is no `tailwind.config.js`. Tokens are CSS variables in `@theme` in `src/app/globals.css`. The default colour palette is switched off. |
| Storybook | 10 (`@storybook/nextjs-vite`) | Addons: a11y, docs (autodocs), vitest, MCP. |
| Vitest | 4, browser mode | Runs every story as a test in headless Chromium (`pnpm test:stories`). |
| Playwright | 1.65 | Screenshot tests of every story, always inside Docker. |
| pnpm / Node | pnpm 12 / Node 24 or newer | Use `pnpm`, never `npm` or `yarn`. |

## Commands

| Command | What it does |
| --- | --- |
| `pnpm install` | Install packages. This also switches on the pre-push hook. |
| `pnpm dev` | The app at http://localhost:3000 (`/` is the teacher view, `/check-in` is the student view) |
| `pnpm storybook` | Storybook at http://localhost:6006, and its MCP server at `/mcp` |
| `pnpm lint` | ESLint, including the design-system guardrails |
| `pnpm typecheck` | TypeScript |
| `pnpm test:stories` | Renders every story, and fails on errors and accessibility violations |
| `pnpm test:visual:docker` | Compares every story with its approved screenshot. It needs Docker. It fails on purpose when something looks different. |
| `pnpm test:visual:update` | Accepts new screenshots. Run it **only** after the user approves every diff. |
| `pnpm build` | Production build (Vercel runs `pnpm lint && pnpm typecheck && pnpm build`) |

## Where things live

| Path | What | Who reviews a change |
| --- | --- | --- |
| `src/app/globals.css` | Design tokens. A change here changes **every screen**. | Design-system owners |
| `src/components/ui/` | Design-system primitives, each with a story | Design-system owners |
| `src/components/features/` | Brightside-specific components built from primitives | Default reviewers |
| `src/app/**/page.tsx`, `layout.tsx` | Pages. `layout.tsx` is on every page. | Default reviewers |
| `src/lib/mood.ts` | Mood labels, descriptions and tones (student-facing copy) | Default reviewers |
| `src/lib/students.ts` | Fictional sample data | Default reviewers |
| `src/lib/cn.ts` | Joins class names. It does **not** resolve Tailwind conflicts. | |
| `src/docs/*.mdx` | Storybook docs pages, such as **Design system/Tokens** | |
| `tests/visual/` | The screenshot test and its approved images (`__screenshots__/`) | |
| `.storybook/` | Storybook config, including the a11y test level | Ask first |
| `.claude/skills/` | Step-by-step instructions for each contribution step | |
| `.githooks/`, `.github/`, `vercel.json`, `scripts/` | The pipeline to production | Ask first |

Reviewers are requested automatically from `.github/CODEOWNERS`.

## How to make a change

Every change follows the same steps. Each step has a skill. In Claude Code, run it as `/<name>`. Other agents should read `.claude/skills/<name>/SKILL.md` and follow it.

| Step | Skill | When |
| --- | --- | --- |
| 1 | `start-change` | The user asks for a change. Always start here if the branch is `main`. |
| 2 | `preview-locally` | After an edit, so the user can see it |
| 3 | `design-review` | Before the PR, to review against the rules below, with screenshots |
| 4 | `explain-diff` | Before you commit, so the user confirms that the change matches their request |
| 5 | `finish-work` | Before you call anything done, or push |
| 6 | `create-pr` | To push and open a draft PR |
| 7 | `address-review` | When the PR has review comments or conflicts |

The rules for every change:

- **Never commit to `main`.** It is protected and deploys to production. Work on a branch named after the outcome, such as `add-empty-state-to-class-list`.
- **One change for each PR.** If a request has an "and also", suggest two PRs.
- **Commit messages say why.** Write a short subject in the imperative ("Show empty state when nobody needs a follow-up"), then a body if the reason is not obvious.
- **Agree a plan before you edit:** the files, what you reuse, what is new, and who sees it in production.

## Code conventions

Follow the patterns that are already here. Do not invent new ones.

**Components**
- One component for each file, with a PascalCase name and a **named** export (`export function Badge`). Only pages and layouts use default exports.
- Map variants to classes with a `Record<Variant, string>` constant above the component (see `Button.tsx`). Do not build class strings in conditionals.
- Each component has a `Props` interface. **Every prop has a JSDoc comment** that explains its options by meaning. The component itself has a JSDoc comment with **Use for** and **Don't use for**. Storybook's Docs pages and the MCP `docs-show` tool read these comments, so they are the component's documentation.
- Combine classes with `cn()`. Pass `className` into a primitive only for placement in a layout (grid position, margin). Do not use it to restyle the primitive. `cn()` does not resolve conflicting Tailwind classes, so an override can silently lose.
- Explain *why* in comments, never *what*.

**Stories**
- Each component has a story file next to it: `Badge.tsx` → `Badge.stories.tsx`. The title is `UI/<Name>` or `Features/<Name>`, and the meta uses `satisfies Meta<typeof Component>`.
- Prefer `args` to custom `render` functions, so that the Controls panel works.
- **Every story is also a screenshot test.** A story's ID is its file name in `tests/visual/__screenshots__/`. If you rename or remove a story, an approved screenshot is orphaned, and a new one is needed. Tell the user before you do it.

**Styling:** follow rule DS-01 below. Spacing and type sizes use Tailwind's standard scale (`gap-4`, `text-sm`).

## Design-system, accessibility and copy rules

Each rule has an ID. The full rule, the reason for it and what checks it are in [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md#rules). When you review or explain a change, cite the ID and link to the rule (for example, `DESIGN-SYSTEM.md#ds-04-status-labels-use-badge`). Lint enforces only DS-01, and the story tests enforce only A11Y-01 and part of A11Y-05. Review covers everything else, so check those rules yourself.

Before you build UI, look at what already exists. With Storybook running, call the MCP tools `docs-list` and `docs-show`. Each component's docs say when to use it and when not to. The **Design system/Tokens** entry lists every token and its meaning. Without Storybook, read `src/components/` and `DESIGN-SYSTEM.md`.

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

## Definition of done

Do not say that a change is done until all of these are true:

1. `pnpm lint`, `pnpm typecheck` and `pnpm test:stories` pass. The pre-push hook runs the same three.
2. For any change to a `.tsx` file or `globals.css`: you have run `pnpm test:visual:docker`, walked the user through every diff, and updated the baselines only after they approved each one.
3. The user has seen the change at desktop and phone width (390 px).
4. New or changed components have JSDoc on the component and its props, and stories for their real states.
5. The user has confirmed that the diff matches what they asked for.

## Boundaries

**Always**
- Use existing components and tokens. Cite rule IDs when you explain a choice.
- Keep sample data fictional, and inside `src/lib/students.ts`.

**Ask first**
- Adding, removing or upgrading a dependency.
- Adding, renaming or removing a token, or changing a component in `src/components/ui/`. These reach every screen.
- Editing config or the pipeline: `.storybook/`, `eslint.config.mjs`, `next.config.ts`, `playwright.config.ts`, `vitest.config.ts`, `tsconfig.json`, `vercel.json`, `.githooks/`, `.github/`, `scripts/`.
- Deleting files, or renaming or removing a story.
- Running `pnpm test:visual:update`.
- Posting anything on GitHub (PR comments, replies), or pushing.

**Never**
- Commit or push to `main`. Force-push, rewrite pushed history, or delete branches.
- Skip or weaken a check: `--no-verify`, `eslint-disable`, `@ts-ignore`, `as any`, lowering the a11y test level, or editing a test so that it passes.
- Add real names, real student data, analytics, tracking or network calls. This is a product about children's wellbeing. Any data or backend work goes to engineering first.
- Use clinical or alarming words in student-facing UI (COPY-01).
- Add secrets or credentials to the repo.
- Add an AI co-author line or AI attribution to commits or PRs.

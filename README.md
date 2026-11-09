# Brightside

A small, fictional student-wellbeing app for schools. Teachers see how their class is feeling. Students do a ten-second morning check-in.

It exists to **practise contributing to a production codebase as a designer**: you build front-end changes with an AI coding assistant, check them against a design system, and ship them through code review and automated checks to a live production site.

> Brightside is made up. The students and data are fictional, and there is no backend.

## Quick start

You need [Node.js](https://nodejs.org) 24+, [pnpm](https://pnpm.io/installation) and [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for visual tests).

```bash
pnpm install                             # also switches on the pre-push hook
pnpm exec playwright install chromium    # browser for the story tests (once)
pnpm dev          # the app            → http://localhost:3000
pnpm storybook    # the design system  → http://localhost:6006
```

For the full setup, how to check a change yourself and troubleshooting, see **[RUNNING-LOCALLY.md](RUNNING-LOCALLY.md)**. Then read **[CONTRIBUTING.md](CONTRIBUTING.md)** before you make your first change.

## What's in the box

| Piece | What it does for a designer |
| --- | --- |
| **Design tokens** (`src/app/globals.css`) | One file holds every colour, radius and shadow. Tailwind's default palette is off, so only these tokens exist. |
| **Storybook** | Shows every component and state in isolation. Each story is automatically tested for accessibility and screenshotted. |
| **Visual regression tests** | Every story is compared, pixel by pixel, against an approved screenshot. You see exactly what your change altered. |
| **Lint guardrails** | Blocks raw hex colours, arbitrary values (`p-[13px]`) and inline styles. |
| **AI context** (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`, `.mcp.json`) | Gives Claude Code and Cursor the design-system and copy rules, plus live component docs through the Storybook MCP server. |
| **Contribution skills** (`.claude/skills/`) | One Claude Code skill for each step of a contribution: `/start-change`, `/preview-locally`, `/design-review`, `/explain-diff`, `/finish-work`, `/create-pr` and `/address-review`. See [CONTRIBUTING.md](CONTRIBUTING.md) for when to use each one. |
| **Pre-push hook** (`.githooks/pre-push`) | Runs lint, typecheck and the story/accessibility tests before your code leaves your laptop. |
| **Vercel** | Every PR gets a preview URL and a required check (lint, typecheck, build). Merging to `main` deploys to production. |
| **Branch protection** | `main` only accepts changes through a pull request. |

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Run the app locally |
| `pnpm storybook` | Run Storybook locally (also starts the MCP server for AI tools) |
| `pnpm lint` / `pnpm typecheck` | Static checks |
| `pnpm test:stories` | Render every story and check accessibility |
| `pnpm test:visual:docker` | Compare every story against its approved screenshot (needs Docker) |
| `pnpm test:visual:update` | Accept new screenshots after an intentional visual change (needs Docker) |
| `pnpm build` | Production build |

## Project structure

```
src/
  app/                  pages (routes) and globals.css (tokens)
  components/ui/        design-system primitives + stories
  components/features/  product components + stories
  lib/                  mood copy, sample data, helpers
tests/visual/           visual-regression test + approved screenshots
.githooks/              pre-push checks
.github/                PR template, CODEOWNERS
vercel.json             what Vercel runs before it builds
```

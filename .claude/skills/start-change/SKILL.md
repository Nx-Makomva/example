---
name: start-change
description: Start a new change the safe way — get the latest main, create a well-named branch, find the components and tokens to reuse, and agree a short plan with the designer before any file is edited. Use when the user describes something they want to change, says "I want to…", "can we make…", "start a new change", or begins work while on main.
---

# Start a change

This is the first step of every contribution. The designer describes an outcome. Your job is to get them onto a fresh branch and agree on what will change, before you touch a file. Explain each step in one plain sentence. They are learning the process as well as making the change.

## 1. Understand the outcome

Restate what the user wants in one sentence, in terms of what a teacher or student will see. For example: "When nobody needs a follow-up, the class overview shows a friendly message instead of an empty card."

If any of these are unclear, ask before you go on:

- **Who sees it:** students (11–16), teachers, or both? The two audiences have different copy rules (`COPY-01` and `COPY-02` in `DESIGN-SYSTEM.md`).
- **Where:** which screen or component?
- **Which states:** what happens when the content is empty, very long, or has an error?

## 2. Start from the latest main

```bash
git status --short
git switch main
git pull --ff-only
```

- If there are uncommitted changes, stop. Ask the user whether they belong to an earlier piece of work. Do not discard them. If the user wants to keep them aside, explain `git stash` and use it only after they agree.
- If `git pull --ff-only` fails, the local `main` has commits that are not on GitHub. Stop, explain this in plain language, and ask a teammate. Never reset or force anything.

## 3. Create the branch

```bash
git switch -c <branch-name>
```

Name the branch after the outcome: short, lowercase, with hyphens. For example: `add-empty-state-to-class-list` or `soften-struggling-copy`. Tell the user the name, and say why: it tells reviewers what the branch is for before they open it.

If the request is really two changes (for example, "new copy, and also move the button"), suggest two branches, one after the other. `AGENTS.md` asks for one change for each PR, because a small PR is easier to review and to roll back.

## 4. Find what already exists

Read the **Rules** section of `DESIGN-SYSTEM.md`. Then look for what to reuse (rule `DS-03`). Do not create something new until you have done this:

- **Components:** if Storybook is running (`curl -sf http://localhost:6006 >/dev/null`), use the Storybook MCP server to list components and their props. If it is not running, read `src/components/ui/` and `src/components/features/`, and their stories.
- **Tokens:** read `src/app/globals.css`. Find the semantic token for each colour, radius and shadow that you plan to use.
- **Copy:** mood labels and descriptions are in `src/lib/mood.ts`. Sample students are in `src/lib/students.ts`.

## 5. Agree the plan

Before you edit anything, show the user a short plan:

1. **Files** that will change, and why each one changes.
2. **What you reuse:** components and tokens.
3. **Anything new:** a new component, story or token, and why nothing that exists fits. A new token needs a reason that goes in the PR (`DS-02`).
4. **Stories** that you will add or update, and their states (default, empty, error, disabled, long text).
5. **Risk:** who sees it in production. A change to `globals.css` or to a `ui/` primitive reaches every screen. Say so.

Wait for the user to agree. Then make the change.

## 6. After the change

Suggest the next steps in order. Each one has its own skill:

1. `preview-locally`: see it in the app and in Storybook.
2. `design-review`: review against the rules, with screenshots.
3. `explain-diff`: walk through what changed, in plain English.
4. `finish-work`: run the checks and the visual diff.
5. `create-pr`: push and open a draft PR.

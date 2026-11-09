---
name: finish-work
description: Run Brightside's checks before a change is called done — lint, typecheck, story and accessibility tests, and for visual changes the screenshot comparison, with a plain-language walkthrough of every image diff. Use when finishing a change, before committing or pushing, when the pre-push hook failed, or when asked to "run the checks" or "is this done".
---

# Finish work

Run this before you tell the user that a change is done, and before every push. The reader is a designer. Explain each failure in plain language: what broke, who it would affect in production, and the fix.

The order and commands come from the workflow rules in `AGENTS.md`. Read that section again if this file and `AGENTS.md` ever disagree. `AGENTS.md` wins.

## 1. Check where you are

```bash
git branch --show-current
git status --short
git diff main...HEAD --stat
```

If the branch is `main`, stop. `main` is production and is protected. Offer to move the work to a new branch.

## 2. Run the checks

```bash
pnpm lint
pnpm typecheck
pnpm test:stories
```

These are the same checks that the pre-push hook runs, so a pass here means the push will not be blocked. Run them in this order. A lint failure often causes a typecheck failure as well, so fix lint first.

### Fix loop

If a check fails, fix the cause and run that check again. Do not go on to the next check while one is still failing.

| Failure | What it usually means | Fix |
| --- | --- | --- |
| Lint: arbitrary value, raw colour, `style={{}}` | A style that is not from the design system | Use the matching token from `src/app/globals.css`. If no token fits, stop and ask the user, because a new token needs a reason (see `AGENTS.md`). |
| Typecheck | A prop name or type that does not fit the component | Fix the call or the prop. Never use `@ts-ignore` or `as any`. |
| Story test: accessibility violation | For example, low colour contrast or a control without a name | Fix the token or the component. Never switch off the check or the rule. |
| Story test: story crashed | The component throws with the story's args | Fix the component or the story's args. |

Never disable a lint rule, an accessibility check or the pre-push hook to get a green result. Never suggest `git push --no-verify`. A failing check is information about what production would get.

## 3. Visual changes

If the branch changes any `.tsx` file or `src/app/globals.css`, run the screenshot comparison. Docker must be running first:

```bash
docker info >/dev/null 2>&1 || echo "Start Docker Desktop, then try again."
pnpm test:visual:docker
```

For a visual change, this command **fails on purpose**. The failure is how you find out what changed. Tell the user this before you run it, so that a red result does not alarm them.

### Walk the user through every diff

For each failed test, Playwright writes three images into a folder under `test-results/` that is named after the story. Find them with `find test-results -name '*-diff.png' -o -name '*-actual.png'`. The three images are:

- `*-expected.png`: the approved screenshot, from `tests/visual/__screenshots__/`
- `*-actual.png`: what the story looks like now
- `*-diff.png`: the changed pixels, highlighted

Open all three for each failed story with the Read tool, and look at them. Then, for each story, tell the user:

1. **What changed**, in visual terms ("the badge's corners are rounder, and its text moved 2 px to the right").
2. **Whether it looks intended**, given what the user asked for.
3. **Whether it is a side effect.** Flag any story whose component the user did not mean to touch. A token change in `globals.css` can change every component.

A **new story** has no approved screenshot yet. Playwright reports it as missing and writes only the actual image. Show that image, and ask the user to approve it as the first baseline.

### Accept the new screenshots

Ask the user to confirm, story by story, that every change is intended. Only after they confirm all of them:

```bash
pnpm test:visual:update
```

Then include the updated files from `tests/visual/__screenshots__/` in the commit. On GitHub, the PR shows each image before and after, and that is the record the reviewer approves.

If any change is not intended, do not update. Fix the cause and run `pnpm test:visual:docker` again.

## 4. Report

Finish with one line for each check: ✅ pass, ❌ fail (with the reason), or ➖ not needed (with the reason, for example "no visual change"). Then say one of:

- **Done.** All checks pass. Offer to commit, and then run `create-pr`.
- **Not done.** List what is still failing and what you need from the user.

Do not call a change done while any check is still failing.

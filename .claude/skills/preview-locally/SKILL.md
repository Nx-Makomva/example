---
name: preview-locally
description: Start the Brightside app and/or Storybook on the designer's laptop, point them at exactly the screens and stories their change affects, and tell them what to check. Use when the user asks to "run it", "see it", "preview", "open the app", "start Storybook", "show me my change", or after a change has been made.
---

# Preview locally

Get the designer looking at their change in a real browser, quickly. The human version of this skill is `RUNNING-LOCALLY.md`. Point the user to it if they want to do it themselves, and keep this skill consistent with it.

## 1. Check the machine is ready

Run these in order, and stop at the first one that fails. Use the fix from the troubleshooting table in `RUNNING-LOCALLY.md`, and explain it in one sentence.

```bash
node -v                           # needs v26 (see .nvmrc)
pnpm -v
test -d node_modules || pnpm install
```

If the branch's `pnpm-lock.yaml` differs from what was installed (for example, after a `git pull`), run `pnpm install` again.

## 2. Work out what to show

```bash
git branch --show-current
git diff main...HEAD --name-only
git status --short
```

Map the changed files to what the user should look at:

| Changed file | Show |
| --- | --- |
| `src/app/**/page.tsx` | That page in the app |
| `src/components/**/X.tsx` or its story | The stories for `X` in Storybook, and every page that imports `X` |
| `src/app/globals.css` or `src/components/ui/*` | Every page, and Storybook in general. It affects everything. |
| `src/app/layout.tsx` | Every page. The header is on all of them. |
| `src/lib/*` | Every page that imports the changed file |

If nothing has changed yet, ask what they want to see.

## 3. Start only what is needed

Check first, so that you never start a second copy:

```bash
curl -sf http://localhost:3000 >/dev/null && echo "app already running"
curl -sf http://localhost:6006 >/dev/null && echo "storybook already running"
```

Start what is missing in the background: `pnpm dev` for the app, and `pnpm storybook` for Storybook. Wait until the URL responds before you give it to the user.

## 4. Hand over the links

Give the user exact, clickable URLs, not only `localhost:3000`:

- App pages: `http://localhost:3000/<route>`.
- Stories: `http://localhost:6006/?path=/story/<story-id>`. Get the story IDs from `curl -s http://localhost:6006/index.json`.

For each link, say in one line what to look for, based on what changed. Then give them the short checklist from *How to check a change yourself* in `RUNNING-LOCALLY.md`: phone size, keyboard only, the awkward states, zoom, and side effects. Point at the item that matters most for this change. For example, a new list needs its empty state checked, and a header change needs the phone width checked.

If the user wants you to look as well, take screenshots in the same way that `design-review` does, and describe what you see.

## 5. Leave it running

Tell the user that the app updates by itself when a file is saved, and that **Ctrl + C** stops it. Leave the servers running while they work. Stop them only if they ask, and only the ones that you started.

When they are happy with what they see, suggest `design-review` as the next step.

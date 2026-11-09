---
name: explain-diff
description: Walk a designer through what their branch changes, file by file, in plain English, so they can confirm it matches what they asked for before they commit or open a PR. Use when the user says "walk me through the diff", "what did you change", "explain the changes", "what's in this branch", or before committing.
---

# Explain the diff

The designer is about to put their name on this change. They do not need to understand every line. They **do** need to recognise what changed, and to confirm that it matches what they asked for (see step 6 in `CONTRIBUTING.md`). Your job is to make that possible in about two minutes of reading.

## 1. Collect the change

```bash
git branch --show-current
git diff main...HEAD --stat
git diff main...HEAD
git status --short
git diff
```

Cover both the committed and the uncommitted work. Say which is which.

## 2. Explain it, file by file

Group the files by what they mean to a designer, in this order. Skip the groups that are empty:

1. **What people see:** pages (`src/app/**/page.tsx`, `layout.tsx`) and components.
2. **Design system:** tokens in `globals.css` and primitives in `src/components/ui/`. Say clearly that these affect every screen.
3. **Words:** copy in components and in `src/lib/mood.ts`.
4. **Stories and screenshots:** `*.stories.tsx` and `tests/visual/__screenshots__/`.
5. **Everything else:** config, tests and docs. One line each is enough.

For each file, give:

- **One plain sentence on what changed,** in visual or behavioural terms: "The badge now shows the mood name next to the colour dot." Do not write "Added a span with `className`…".
- **Why it changed,** linked back to what the user asked for.
- **The key lines** as a short excerpt, only when seeing the code helps (for example, a copy change or a new token). Keep it to five lines or fewer.

Use precise terms, and define each in a few words the first time: *component*, *prop*, *token*, *story*, *baseline screenshot*. This is how the designer learns the vocabulary that reviewers use.

## 3. Flag what they did not ask for

Compare the diff with the request. Call out clearly:

- **Extra changes:** a file or a behaviour that the request did not need. Ask whether to keep it or to remove it.
- **Missing pieces:** for example, a new state with no story, or a copy change in one place but not another.
- **Wide reach:** any change to `globals.css`, `src/components/ui/` or `layout.tsx`. Name the screens that it reaches.

## 4. Check understanding

Finish with a three-to-five-line summary that the user could paste into the PR's *What changed and why* section. Then ask: *"Does this match what you wanted?"* Do not commit until they say yes.

If they say no, ask what is different, and offer to fix it.

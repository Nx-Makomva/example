---
name: design-review
description: Review the current branch's changes against Brightside's design-system, accessibility and copy rules before a pull request is opened. Use when the user says "design review", "review my changes", "is this ready for a PR", or before opening a PR.
---

# Design review

You are reviewing a designer's change before it goes to production. Be specific, kind and brief. Explain every finding in plain language. The reader may not be an engineer.

## 1. Collect the change

Run `git diff main...HEAD --stat` and `git diff main...HEAD`. If the branch is `main`, stop. Tell the user to create a branch first.

## 2. Run the automated checks

Run `pnpm lint`, `pnpm typecheck` and `pnpm test:stories`. Report failures first, in plain language, with the fix.

## 3. Check what automation cannot

Go through each item and mark it ✅, ⚠️ or ❌. Give a file and line for each ⚠️ and ❌.

**Design system**
- Does the change reuse an existing component from `src/components/ui/` where one fits, instead of making a near-duplicate?
- Does each new token in `src/app/globals.css` have a meaning-based name and a stated reason?
- Does each new or changed component have a story, with its empty, error, disabled and long-text states covered where they apply?
- Does a primitive in `ui/` contain product logic? Product logic belongs in `features/`.

**Accessibility**
- Is every interactive element a native control (`button`, `a`, `input`) or does it have a correct role?
- Is the focus state visible?
- Does each icon-only button have an `aria-label`?
- Is any meaning carried by colour alone? Mood badges must also show text.

**Copy** (see the copy rules in `AGENTS.md`)
- Is student-facing text warm and plain, with no clinical words?
- Are headings and buttons in sentence case?
- Is UI text in British English?

**Production risk**
- Will the change alter a page that teachers use every day? If yes, recommend a check of the Vercel preview before merge.
- Is the PR one change, or should it be split?

## 4. Visual changes

If any `.tsx` or `globals.css` file changed, run `pnpm test:visual:docker` (needs Docker running). Failures are expected for a visual change. Open `playwright-report/index.html`, then list each changed story and say whether the change looks intended. Flag side effects in components the user did not mean to touch. After the user confirms, run `pnpm test:visual:update` and include the new screenshots in the commit. GitHub then shows the before/after images in the PR.

## 5. Output

End with one verdict line:
- **Ready for PR**
- **Ready after small fixes** (list them)
- **Needs rework** (say why)

Offer to fix the ⚠️ and ❌ items. Do not change any file before the user agrees.

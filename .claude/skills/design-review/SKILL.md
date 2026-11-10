---
name: design-review
description: Review the current branch's changes against Brightside's design-system, accessibility and copy rules before a pull request is opened, by reading the diff and looking at the changed screens in a real browser. Use when the user says "design review", "review my changes", "is this ready for a PR", or before opening a PR.
---

# Design review

You are reviewing a designer's change before it goes to production, where teachers and students will see it. The designer is learning. Each finding must teach the rule behind it, so that next time they catch it themselves. Be specific, kind and brief.

This review is for judgement calls that automation cannot make. The pre-push hook runs `pnpm lint`, `pnpm typecheck` and `pnpm test:stories`, and the `finish-work` skill runs them together with the visual diff. Do not run those commands here, and do not report what they would catch.

## 1. Read the rules fresh

Read `AGENTS.md` and the **Rules** section of `DESIGN-SYSTEM.md` in full on every run. Together they are the source of truth for the design-system, accessibility, copy and workflow rules. Every rule has an ID (`DS-04`, `A11Y-02`, `COPY-01`), and you cite it in each finding. Do not work from memory or from this file. This skill says *how* to review, and `AGENTS.md` says *what* the rules are. If the two ever disagree, `AGENTS.md` wins, and you tell the user about the conflict.

## 2. Collect the change

```bash
git branch --show-current
git diff main...HEAD --stat
git diff main...HEAD
```

- If the branch is `main`, stop. Explain that `main` is production, and offer to create a branch.
- If the diff is empty, say so and stop.
- If there are uncommitted changes (`git status --short`), include them as well, and tell the user the review covers work that is not yet committed.

## 3. Look at the changed screens

The code is half of the review. The other half is what a teacher or student will actually see. Take screenshots and look at them with the Read tool.

**Decide what to look at** from the changed files:

| Changed file | Look at |
| --- | --- |
| `src/app/**/page.tsx` | That route in the app |
| `src/components/**/X.tsx` or `X.stories.tsx` | Every story of `X`, and every page that imports `X` (`grep -rl "components/.*/X\"" src/app`) |
| `src/app/globals.css` | Every page, and one story of each `ui/` component. A token change affects everything. |
| `src/lib/mood.ts`, `src/lib/students.ts` | Every page that imports the changed file |

**Start what you need.** First check whether it is already running, so that you do not start a second copy:

- App: `curl -sf http://localhost:3000 >/dev/null`. If it is not running, start `pnpm dev` in the background.
- Storybook: `curl -sf http://localhost:6006 >/dev/null`. If it is not running, start `pnpm storybook` in the background. While Storybook runs, its MCP server also works, and you can use it to list components and props.

**Take the screenshots.** Save them under `test-results/design-review/`, which git ignores. Take each page at desktop size (`1280, 800`) and at phone size (`390, 844`), because students often check in on a phone:

```bash
pnpm exec playwright screenshot --full-page --lang en-GB --viewport-size "1280, 800" \
  http://localhost:3000/check-in test-results/design-review/check-in-desktop.png
```

For a story, use its iframe URL. Get the story IDs from Storybook's index, not by guessing (`curl -s http://localhost:6006/index.json`):

```bash
pnpm exec playwright screenshot --full-page --wait-for-selector "#storybook-root" \
  "http://localhost:6006/iframe.html?id=ui-button--primary&viewMode=story" \
  test-results/design-review/ui-button--primary.png
```

**Look at every screenshot.** Check:

- Does it match what the user asked for?
- Does anything look broken: overflow, clipped or wrapped text, misaligned spacing, an empty area with no empty state?
- At phone size, does the layout still work, and are the tap targets big enough to hit?
- Is there a side effect in a part of the screen the user did not mean to change?

When you are done, stop only the servers that you started.

## 4. Check what automation cannot

Apply every rule in the **Rules** section of `DESIGN-SYSTEM.md` to the diff and the screenshots. Focus on the rules marked **Checked by: review**, because lint and the story tests already cover the others. These need the most judgement:

- **DS-03 Reuse.** Does a new component duplicate one that is already in `src/components/ui/`? Compare their props and their look, not only their names. When Storybook is running, use `docs-show` to read each candidate component's "use for / don't use for" guidance.
- **DS-04 Hand-built badges.** Look for a rounded `span` or `div` with a coloured fill used as a label.
- **DS-02 Token naming.** Is a new token named by meaning, and does the change or the PR give a reason for it?
- **DS-07 Story coverage.** Do the stories cover the states that this component can really get into? A list needs an empty state. A form needs an error state. Anything with a name needs long text.
- **DS-06 Layering.** Product logic (moods, students, check-ins) belongs in `features/`, not in a `ui/` primitive.
- **A11Y-02, A11Y-04** Look at the screenshots. Is any meaning shown by colour alone? Is the focus state visible?
- **COPY-01 to COPY-04** Decide who reads each string: a student (11–16) or a teacher. Then check it against that audience's rules. Read the text in the screenshots, not only in the diff, because copy can come from `src/lib/`.

Two checks have no rule ID, because they are about the PR rather than the design:

- **One change.** Is this one change, or should it be split into separate PRs?
- **Production reach.** Which screens and which users does this reach? A `globals.css` change or a change to the class overview reaches every teacher, every day.

## 5. Report

Lead with the verdict on one line:

- **Ready for PR**
- **Ready after small fixes**
- **Needs rework**, with one sentence saying why

Then list the findings, the most important first. A finding that a student or teacher would notice comes before a code-only one. For each finding, give:

1. **Rule and what:** the rule ID linked to its section, for example [`DS-04`](DESIGN-SYSTEM.md#ds-04-status-labels-use-badge), then one sentence with `file:line` or the screenshot path. The link anchor is the rule's heading in lowercase, with spaces turned into hyphens and punctuation removed.
2. **Why it matters:** the person the rule protects and what would go wrong for them. For example: "A student who is colour-blind cannot tell 'struggling' from 'okay' if the badge is only a colour." This part is what teaches the rule, so do not skip it.
3. **Fix:** the specific change, using the repo's own tokens and components.

Then show the screenshots that you looked at, so that the designer can see what you saw.

End with a one-line tally of the broken rules, for example: `Rules broken: DS-04 ×2, COPY-02 ×1`. The tally lets the design-system team see which rules break most often across PRs, and which docs or components need work as a result.

**If a finding matches no rule,** report it with `no rule` in place of the ID, and say so plainly. A problem that keeps coming up without a rule shows a gap in the rules. Suggest that the designer mention it to the design-system owners.

If nothing survives, say **Ready for PR** and stop. Do not invent a minor issue to show that you did the review.

Offer to fix the findings. Do not change any file until the user agrees.

## Out of scope

- Anything that `pnpm lint`, `pnpm typecheck` or `pnpm test:stories` catches. Those run in the pre-push hook and in `finish-work`.
- Comparing screenshots against the visual-test baselines. That is `finish-work`'s job.
- Files that the branch did not change, unless the change breaks them (a side effect).
- Opening the PR. That is `create-pr`'s job.

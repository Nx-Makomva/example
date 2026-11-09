---
name: create-pr
description: Push the current branch and open a draft pull request against main, with a title and body that follow Brightside's PR template, written from the real diff in plain language. Use when the user asks to open a PR, create a pull request, write a PR description, or "send this for review".
---

# Create PR

Open a **draft** pull request for the current branch. A draft cannot be merged by accident. The designer marks it ready after they have checked the Vercel preview and added screenshots.

## 1. Check that the branch is ready

```bash
git branch --show-current
git status --short
git log main..HEAD --oneline
```

- On `main`: stop. `main` is production, and GitHub rejects direct pushes to it. Offer to move the work to a new branch.
- Uncommitted changes: ask whether they belong in this PR. If they do, commit them with a message that says *why*.
- No commits ahead of `main`: there is nothing to open. Say so and stop.
- If `finish-work` or `design-review` has not run on this branch in this session, offer to run them first. If the user declines, continue, and leave those checklist boxes unticked.

## 2. Read the change

Write from the real change, not from what the user said they meant to do:

```bash
git log main..HEAD --format='%s%n%b'
git diff main...HEAD --stat
```

Read the full diff only for the files you need, to describe the change accurately.

## 3. Write the title

Write a short, plain sentence in sentence case that says what the user gets. For example: "Show a friendly empty state when nobody needs a follow-up". Do not write "Update StudentList.tsx".

## 4. Write the body

Read `.github/pull_request_template.md` and fill in each of its sections. The template is the source of truth for the structure, so do not reproduce it here. These notes cover only what the template cannot say:

- **What changed and why:** lead with the problem for the teacher or student, then the change. One or two sentences.
- **Screenshots:** you cannot attach images to a PR from the command line. If the change is visual, take before and after screenshots of the changed screens. Take "before" from `main` and "after" from the branch, in the same way that `design-review` does. Save them under `test-results/pr-screenshots/`, and tell the user to drag them into the table on GitHub. Leave `<!-- paste -->` in the table until they do. If the change is not visual, write "Not a UI change."
- **Vercel preview:** leave the template's comment in place. The Vercel bot posts the link after the PR opens.
- **Checklist:** tick only the boxes that you know are true from this session. Leave the others for the user. Never tick "I checked the change on the Vercel preview", because the preview does not exist yet.
- **Risk:** name who sees the change in production (students, teachers or both), which screens it changes, and what happens if it is wrong. A change to `globals.css` or to the class overview is never low risk.

Use British English in the title and body, because they are read by the team, like UI text. Do not add a `Co-Authored-By` line, and do not mention Claude in the commits or the PR.

## 5. Push and open

```bash
git push -u origin HEAD
gh pr create --draft --base main --title "<title>" --body-file <file>
```

Write the body to a file under `test-results/`, which git ignores, and pass the file. Do not put the body inline in the shell command.

The push runs the pre-push hook. If it fails, do not retry with `--no-verify`. Run `finish-work`, fix the failure, and push again.

## 6. Hand over

Give the user the PR link and their next steps, in this order:

1. Drag the screenshots into the PR (if there are any).
2. Wait for the Vercel bot's preview link. Click through the changed screens on it.
3. Tick the remaining checklist boxes.
4. Select **Ready for review**, and ask a teammate to review.

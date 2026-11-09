---
name: address-review
description: Help a designer respond to review on their pull request — read every reviewer comment, explain each in plain English, agree what to change, make the fixes, reply to each thread, and bring the branch up to date with main if it has fallen behind. Use when the user says "I got review comments", "address the feedback", "what did the reviewer say", "my PR has conflicts", or "update my PR".
---

# Address review

A review is a conversation, not a list of orders. The designer decides what to change. You explain, and then you carry out what they agree to. Never post a reply on GitHub or push without their go-ahead, because both are visible to the whole team.

## 1. Find the PR

```bash
git branch --show-current
gh pr view --json number,url,title,isDraft,reviewDecision,mergeable,mergeStateStatus
```

If there is no PR for this branch, say so, and offer `create-pr`.

## 2. Read all the feedback

```bash
gh pr view --json reviews,comments
gh api "repos/{owner}/{repo}/pulls/<number>/comments"
```

The first command gets review summaries and general comments. The second gets the inline comments on specific lines. Ignore bot comments (such as the Vercel preview link) unless they report a failure.

## 3. Explain each comment

List each unresolved comment as:

1. **Who and where:** the reviewer, and `file:line`.
2. **What they are asking for,** in one plain sentence. If they used a technical term, explain it.
3. **Why it probably matters:** link it to a rule in `AGENTS.md` where you can ("This is the 'meaning not carried by colour alone' rule").
4. **Your suggestion:** do it, or discuss it. Some comments are questions or opinions. It is fine to reply instead of changing code.

Then ask the user which ones to act on. Wait for their answer.

## 4. Make the agreed changes

- Make only the changes that the user agreed to. Keep each fix small and on-system (see `AGENTS.md`).
- After the fixes, run `finish-work`. A visual fix means new screenshots, and the user must approve them as usual.
- Commit with a message that says what the feedback was about. For example: "Show mood text next to the badge colour, from review". Add new commits. Do not amend or rewrite the earlier ones, because the reviewer has already seen them.

## 5. If the branch is behind main or has conflicts

If `mergeStateStatus` is `BEHIND` or `DIRTY`, bring `main` into the branch:

```bash
git fetch origin
git merge origin/main
```

Use a merge, not a rebase. A rebase rewrites history and would need a force-push, which this repo does not allow (see `AGENTS.md`).

If there are conflicts, do not resolve them silently. For each conflicted file, explain in plain language what *your* branch changed, what *main* changed, and what the combined result should be. Then ask the user to confirm before you resolve it. If you are not sure what the other change was for, find its PR (`git log origin/main -- <file>`), and suggest asking its author.

After a merge, run `finish-work` again, because the combined code has not been checked yet.

## 6. Push and reply

Show the user a draft reply for each thread you dealt with. Keep it short: what changed and where, or why you did not change it. After they agree:

```bash
git push
gh api -X POST "repos/{owner}/{repo}/pulls/<number>/comments/<comment-id>/replies" -f body="<reply>"
```

Send general (non-inline) replies with `gh pr comment <number> --body-file <file>`.

Then tell the user to ask the reviewer for another look. Point them to the **Re-request review** button next to the reviewer's name on the PR. Do not resolve conversations for the reviewer. Leave that to the reviewer, because the repo requires every conversation to be resolved before a merge.

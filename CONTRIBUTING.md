# Contributing as a designer

This repo is set up so that designers ship front-end changes themselves. You describe the change in plain English to an AI coding assistant (**Claude Code** or **Cursor**). The assistant edits the files. You check the result, then you take it through review to **production**.

Production is real. When your change merges into `main`, teachers and students see it within minutes. The steps below exist so that this is safe, not scary.

---

## The golden rule

**Never change `main` directly.** Always make your change on a separate *branch*, then propose it with a *pull request* (PR).

- `main` is **protected**. GitHub will not accept a direct push, even from an admin.
- `main` **is** production. Every merge deploys.
- A PR gives you a private **preview URL** and runs the automated checks, so you can see and test the change before anyone else does.

Your assistant understands this. Say: *"Create a new branch, make this change, and open a pull request."*

---

## How a change gets to production

```
your laptop ──► git push ──► pull request ──► Vercel check + preview ──► review ──► merge ──► production
 (pre-push hook)                              (automatic)                (a person)          (automatic)
```

1. **You push.** The **pre-push hook** runs lint, typecheck and the story/accessibility tests on your machine first. If any of them fails, the push stops.
2. **You open a PR.** **Vercel** runs lint and typecheck again, then builds a **preview deployment** and posts its link on the PR. The preview is a full copy of the site with your change, at its own URL. If anything fails, the **Vercel** check goes red and GitHub blocks the merge.
3. **A reviewer** looks at the diff, the screenshots and the preview.
4. **You merge.** Vercel deploys `main` to production.

---

## A typical contribution, step by step

Each step names the Claude Code skill that does it for you. In Cursor, ask it to *"follow `.claude/skills/<name>/SKILL.md`"*.

1. **Start fresh on a new branch** (`/start-change`). Your assistant gets the latest `main` and creates a branch with a short name that says what it does, for example `soften-struggling-copy` or `add-empty-state-to-class-list`.
2. **Describe the outcome, not the code.** For example: *"On the class overview, when nobody needs a follow-up, show a friendly empty state instead of an empty card."* The assistant reads `AGENTS.md`, finds components to reuse and agrees a plan with you before editing.
3. **Look at it yourself** (`/preview-locally`). See **[RUNNING-LOCALLY.md](RUNNING-LOCALLY.md)** for how to run the app and Storybook, and a five-point self-check.
4. **Run the AI design review** (`/design-review`). It screenshots what you changed and checks it against the rules. Fix what it finds, or decide on purpose not to.
5. **Read the diff** (`/explain-diff`). You don't need to understand every line. You **do** need to recognise what changed and confirm it matches what you asked for.
6. **Run the checks** (`/finish-work`). Lint, typecheck, story tests and, for a visual change, the screenshot comparison (see *Visual changes* below).
7. **Commit with a message that says why.** For example, "Show empty state when no students need follow-up", not "changes". Your assistant writes good commit messages if you ask.
8. **Push and open a draft PR** (`/create-pr`). The pre-push hook runs first. Drag your before/after screenshots into the PR.
9. **Check the Vercel preview.** Click through the screens you changed on the preview link, not only on your laptop. Then mark the PR **Ready for review**.
10. **Respond to review** (`/address-review`). Your assistant explains each comment, makes the changes you agree to and drafts replies.
11. **Make sure the Vercel check is green** and every conversation is resolved.
12. **Merge.** Then open the production site and check your change is live.

---

## The checks

| Check | Where it runs | What it catches | If it fails |
| --- | --- | --- | --- |
| Lint | Pre-push hook, then Vercel | Off-system styles (raw hex, `p-[13px]`, `style={{}}`) and code errors | Paste the error to your assistant. Ask it to fix the error **without** disabling the rule. |
| Typecheck | Pre-push hook, then Vercel | Code that doesn't fit together, such as a wrong prop name | Paste the error to your assistant. |
| Story tests | Pre-push hook | A story crashes, or an **accessibility** problem such as low colour contrast | Fix the token or component. Never switch the check off. |
| Build | Vercel | The site wouldn't build, so production would break | Open the Vercel check's details and paste the log to your assistant. |
| Visual tests | You, before committing a visual change | Something looks different from the approved screenshots | Read the next section. A visual change is often what you wanted. |

Only the **Vercel** check is enforced by GitHub. The pre-push hook can be skipped with `git push --no-verify`. Don't do that. If you really must (for example in an emergency), say so in the PR.

---

## Visual changes: approving new screenshots

Every Storybook story has an approved screenshot in `tests/visual/__screenshots__/`. They're the "this is how it should look" record. When you change how something looks:

1. **Run the comparison.** Start Docker Desktop, then run `pnpm test:visual:docker`. For a visual change it **fails, and that is expected**. The failure shows you exactly what changed.
2. **See the diff.** Open `playwright-report/index.html` in your browser. For each changed story it shows *expected*, *actual* and a *diff* image.
3. **Decide.** Did everything that changed change on purpose? Watch for side effects. A token change can alter components you never touched.
4. **Accept.** Run `pnpm test:visual:update`, then commit the updated images with your change.
5. **Review the images on GitHub.** In the PR's **Files changed** tab, GitHub shows each changed screenshot side by side, as a swipe or as an onion-skin overlay. This is the record of the visual change your reviewer approves.

> Screenshots are always taken inside the same Linux Docker container. Fonts render slightly differently on macOS and Windows, so screenshots taken directly on a laptop would never match anyone else's.

---

## When something goes wrong in production

- **Undo first, investigate second.** In Vercel, open **Deployments**, choose the previous production deployment, and select **Instant Rollback**. This takes seconds and does not touch git.
- **Then fix it properly.** Ask your assistant to *"revert the PR that caused this"*. That creates a new PR that reverses the change, and it goes through the same checks. Never rewrite `main`'s history to "undo" a change.
- **Tell people.** Post in the team channel what broke, who it affected and that it's rolled back.

---

## Safety habits

- **Small, frequent PRs beat one giant PR.** They are easier to review, easier to preview and easier to roll back.
- **Never force-push** or rewrite history you don't fully understand. If your assistant suggests `--force`, `reset --hard`, or "discard changes", stop and ask a teammate.
- **Never disable a check to get a PR green.** That includes lint rules, accessibility tests, the pre-push hook and branch protection. A failing check is information.
- **Treat `globals.css` with care.** One token change affects every screen. Expect many visual diffs, and look at all of them.
- **Merge conflicts:** ask your assistant to *"explain this conflict in plain language"* before you accept a resolution.
- **Get a second pair of eyes** for anything beyond a small copy change, even when GitHub would let you merge alone.

---

## Learning the vocabulary

You don't need to memorise git. Your assistant runs the commands. It helps to recognise the words:

- [Git Handbook](https://docs.github.com/en/get-started/using-git/about-git): what git is
- [GitHub Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world): a first walkthrough of branches and pull requests
- [About pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)
- [Vercel preview deployments](https://vercel.com/docs/deployments/environments#preview-environment-pre-production)
- [GitHub Desktop](https://desktop.github.com/): a visual app if you'd rather click than type

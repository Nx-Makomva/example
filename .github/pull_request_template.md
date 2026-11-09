## What changed and why

<!-- One or two sentences. Lead with the user problem, not the code. -->

## Screenshots

| Before | After |
| --- | --- |
| <!-- paste --> | <!-- paste --> |

**Vercel preview:** <!-- The Vercel bot comments a preview link on this PR. Click through the changed screens there. -->

## Checklist

- [ ] I checked the change on the Vercel preview, not only on my laptop
- [ ] New or changed components have stories (default, empty, error, disabled, long text where relevant)
- [ ] Only design tokens are used (lint enforces this)
- [ ] Copy follows the copy rules in `AGENTS.md`
- [ ] I ran the `/design-review` skill (Claude Code), or asked my assistant to review against `AGENTS.md`
- [ ] I ran `pnpm test:visual:docker`, looked at every image diff, and updated only the screenshots I meant to change

## Risk

<!-- Who sees this in production? What happens if it's wrong? A copy tweak is low risk; a change to globals.css touches every screen. -->

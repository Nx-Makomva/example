**Ticket:** <!-- link, or N/A -->

## What changed and why

<!-- One or two sentences. Lead with the user problem, not the code. -->

## Screenshots

| Before | After |
| --- | --- |
| <!-- paste --> | <!-- paste --> |

**Vercel preview:** <!-- The Vercel bot comments a preview link on this PR. Click through the changed screens there. -->

## Checklist

- [ ] I checked the change on the Vercel preview, not only on my laptop
- [ ] I checked it at phone width (390 px) and with the keyboard only
- [ ] New or changed components have stories for their real states, and JSDoc on their props (`DS-07`)
- [ ] Only design tokens are used (`DS-01`, lint enforces this)
- [ ] Copy follows `COPY-01` to `COPY-04` in `DESIGN-SYSTEM.md`
- [ ] I ran `/design-review` (Claude Code), or asked my assistant to review against the rules in `DESIGN-SYSTEM.md`
- [ ] I ran `pnpm test:visual:docker`, looked at every image diff, and updated only the screenshots I meant to change

## Risk

<!-- Who sees this in production? What happens if it's wrong? A copy tweak is low risk; a change to globals.css touches every screen. -->

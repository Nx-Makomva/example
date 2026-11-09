# The Brightside design system

This guide is for designers. It explains what the design system contains, how its rules work, and how to propose something new. You do not need to read code to use it.

The AI assistant follows the same rules from `AGENTS.md`. Lint and the accessibility tests enforce them, so a change that breaks them cannot be pushed.

> **Where to see it:** run `pnpm storybook` and open http://localhost:6006. Every component and every state is there. See [RUNNING-LOCALLY.md](RUNNING-LOCALLY.md).

---

## The three layers

| Layer | Where | What it is | Who it affects |
| --- | --- | --- | --- |
| **Tokens** | `src/app/globals.css` | Named design decisions: colours, radii, shadows, font | **Every screen** |
| **Primitives** | `src/components/ui/` | Generic building blocks with no product knowledge: `Button`, `Card`, `Badge`, `Avatar`, `StatTile` | Every screen that uses them |
| **Features** | `src/components/features/` | Brightside-specific pieces built from primitives: `CheckInForm`, `MoodPicker`, `StudentList` | The screens that use them |

The higher the layer, the further a change reaches. A change to a feature component is usually safe. A change to a token changes the whole product.

---

## Tokens

A **token** is a named design decision. Code never says "this red". It says "the concern colour". If the concern colour changes, it changes everywhere at once.

Tokens are named by **meaning**, never by **look**. `concern` keeps its meaning when the brand colour changes, but `red` would not.

### Colours

| Token | Meaning | Use it for |
| --- | --- | --- |
| `surface` | The page background | Page background |
| `surface-raised` | Something that sits above the page | Cards, the header |
| `surface-sunken` | Something set into the page | Neutral badges, wells |
| `border` / `border-strong` | Dividers and outlines | Default outlines / outlines that need more emphasis |
| `text` / `text-muted` | Main text / supporting text | Body copy / hints, descriptions, secondary nav |
| `text-inverse` | Text on a dark fill | Text on a primary button |
| `brand` / `brand-strong` / `brand-subtle` | Brightside's identity and primary actions | Primary button / its hover / light brand fills |
| `positive` (+ `-subtle`) | Things are good | "Great" and "Good" moods |
| `caution` (+ `-subtle`) | Worth keeping an eye on | The "Low" mood |
| `concern` (+ `-subtle`) | Needs attention | The "Struggling" mood, follow-up counts |
| `focus` | Keyboard focus ring | Focus outlines, and only those |

The `-subtle` version is a pale fill to use behind text in the full colour. For example, a `concern` badge uses `concern` text on a `concern-subtle` fill.

### Shape and depth

| Token | Use it for |
| --- | --- |
| `radius-control` | Buttons, inputs, selectable options |
| `radius-card` | Cards and tiles |
| `radius-pill` | Badges, avatars |
| `shadow-card` | The single elevation level: cards and tiles |

### Spacing and type size

These use Tailwind's standard scale. Spacing goes in steps of 4 px (`gap-4` is 16 px, `p-5` is 20 px). Type sizes are `text-sm`, `text-base`, `text-lg`, `text-3xl` and so on. Only colours are restricted to the tokens above.

### What is blocked

Lint rejects anything that goes around the system:

- Tailwind's built-in colours (`bg-red-500`). They are switched off, so they do nothing.
- Exact values in square brackets (`bg-[#ff0000]`, `p-[13px]`).
- Inline styles (`style={{ … }}`).

If a design needs a value that does not exist, that is a design-system question, not a reason to work around the system (see *Proposing something new* below).

### From Figma

When you hand over a Figma design, name your Figma variables the same as the tokens above (`concern`, `text-muted`). The assistant can then map them one to one. If your design uses a colour that has no token, the assistant will stop and ask you, instead of inventing one.

---

## Components

Look in Storybook before you design something new. The **Controls** panel shows every option (prop) for each component.

| Component | What it is | Main options |
| --- | --- | --- |
| `Button` | Every clickable action | `variant`: primary, secondary, ghost. `size`: sm, md. Disabled. |
| `Card` | A raised container with an optional title, description and action | `title`, `description`, `action` |
| `Badge` | A short status label | `tone`: neutral, positive, caution, concern |
| `Avatar` | A student's initials in a circle | `size`: sm, md |
| `StatTile` | One big number with a label | `tone`: neutral, concern. An optional `hint` |
| `MoodPicker` | The five mood options at check-in | Uses the moods in `src/lib/mood.ts` |
| `StudentList` | The class list with mood badges and follow-up buttons | An empty-state message |
| `CheckInForm` | The full student check-in, including its "sent" state | — |

### Reuse, extend or create?

Work through these questions in order:

1. **Does a component already do this?** Use it.
2. **Does one *nearly* do it?** Propose a new option (prop) on it. For example, a new `tone` on `Badge` is better than a second badge component. Two components that look nearly the same will drift apart over time.
3. **Is it new, and specific to Brightside?** Create it in `features/`, built from primitives.
4. **Is it new, and generic** (another product could use it)? Create it in `ui/`. It must not contain anything about moods, students or check-ins.

---

## Stories: every state, tested

A **story** is one saved state of a component, shown in Storybook. Every component has a story file next to it (`Button.tsx` → `Button.stories.tsx`).

Each story is used three times:

1. As **documentation** in Storybook.
2. As an **accessibility test**. If a story has low contrast or a control without a name, the push is blocked.
3. As a **screenshot test**. It is compared pixel by pixel with its approved image.

That makes the stories your quality net. **A state without a story is not tested.** Cover the states that can really happen:

| State | When it applies | Example |
| --- | --- | --- |
| Default | Always | A button with a normal label |
| Empty | Anything that shows a list or data | No students need a follow-up |
| Error | Anything that can fail | A message for when sending fails. There is no backend yet, but a real check-in could fail. |
| Disabled | Anything you can switch off | "Send check-in" before a mood is picked |
| Long text | Anything that shows names or user content | A student with a 40-character name |

---

## Accessibility: the non-negotiables

The tests catch some of these. You catch the rest by looking.

- **Contrast:** text must stand out from its background. The tests check this.
- **Meaning is never colour alone:** a mood badge shows its name as well as its colour, so a colour-blind teacher can still read it.
- **Keyboard:** every action can be reached with Tab and used with Enter or Space, and you can always see where the focus is.
- **Names:** an icon-only button has a label that a screen reader can say ("Follow up with Ben Hartley").
- **Native controls:** a button is a real `<button>`, and a choice is a real radio input. The browser then provides keyboard and screen-reader support for free.

---

## Proposing something new

A new token or a new primitive is a decision for the whole product, so it needs a reason.

**A new token:**

1. Check that no existing token has the meaning you need. If one has the right meaning but the wrong look, the question is whether to change that token. That changes every screen, so ask first.
2. Name it by meaning: `--color-info`, not `--color-blue`.
3. Make sure it passes contrast with the colours it will sit on.
4. In the PR, say why it is needed and where it will be used.

**A new primitive:** say in the PR why the existing primitives cannot be extended, and include stories for all of its states.

A change to `globals.css` or `src/components/ui/` automatically requests a review from the design-system owners (see `.github/CODEOWNERS`).

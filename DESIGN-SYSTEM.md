# The Brightside design system

This guide is for designers. It explains what the design system contains, how its rules work, and how to propose something new. You do not need to read code to use it.

AI assistants follow the same rules: `AGENTS.md` points them to the [Rules](#rules) below. Lint and the accessibility tests enforce a few of the rules, and a change that breaks those cannot be pushed. Review catches the rest. Each rule says which applies.

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

## Rules

Every rule has an ID. Reviews cite it (for example, "DS-04"), so the same mistake gets the same name each time. If one rule keeps breaking, that tells the design-system team where the docs, the components or the rule itself need work. It is not a problem with the people who broke it.

**Checked by** says what catches a break: **lint** and **story tests** run before every push, and **review** means `/design-review` and the reviewer. IDs never change. A retired rule keeps its ID, and a new rule gets the next free number.

### Design system

#### DS-01: Use tokens only

Colours, radii and shadows come from the [tokens](#tokens). No Tailwind palette colours, no exact values in square brackets, no inline styles.

**Why:** a rebrand or a contrast fix changes one token, not a hundred files. **Checked by:** lint.

#### DS-02: Name new tokens by meaning, and give a reason

`--color-info`, not `--color-blue`. The PR says why no existing token fits. See [Proposing something new](#proposing-something-new).

**Why:** names by meaning survive a rebrand, and every new token adds to what everyone must learn. **Checked by:** review.

#### DS-03: Reuse, then extend, then create

Use an existing component. If one nearly fits, add an option to it. Create a new component only when neither works. See [Reuse, extend or create?](#reuse-extend-or-create).

**Why:** two near-identical components drift apart, and then the product looks inconsistent. **Checked by:** review.

#### DS-04: Status labels use `Badge`

Every status, state or category label is a `Badge`. Never a hand-built rounded `span` with a coloured background.

**Why:** `Badge` brings the right tones, contrast and shape. A hand-built copy drifts the first time `Badge` changes. **Checked by:** review.

#### DS-05: Actions use `Button`, and navigation uses a link

Anything that does something on click is a `Button`. Anything that goes to another page is a link.

**Why:** screen readers announce buttons and links differently, and users expect different keys to work on each. **Checked by:** review.

#### DS-06: Primitives contain no product logic

Components in `src/components/ui/` know nothing about moods, students or check-ins. That belongs in `src/components/features/`.

**Why:** a primitive must work anywhere. Product logic inside one makes it impossible to reuse. **Checked by:** review.

#### DS-07: Every component has a story for each real state

Default, plus empty, error, disabled and long text where they can happen. See [Stories](#stories-every-state-tested).

**Why:** a state without a story is not tested for accessibility and has no screenshot. **Checked by:** review.

### Accessibility

#### A11Y-01: Text has enough contrast

Text must stand out from its background (WCAG AA).

**Why:** low contrast makes text unreadable for many people, and on a phone in sunlight for everyone. **Checked by:** story tests.

#### A11Y-02: Meaning is never colour alone

A status shows text (or an icon) as well as colour. A mood badge says "Struggling". It is not only red.

**Why:** about 1 in 12 men are colour-blind. A teacher must be able to read the class list. **Checked by:** review.

#### A11Y-03: Use native controls

A button is a real `<button>`, and a choice is a real radio input inside a `<fieldset>`. Never a `div` with a click handler.

**Why:** native controls get keyboard and screen-reader support from the browser for free. **Checked by:** review.

#### A11Y-04: Everything works with a keyboard, with visible focus

Every action can be reached with Tab and used with Enter or Space. The focus ring (`focus` token) is always visible.

**Why:** some people cannot use a mouse or a touch screen. **Checked by:** review.

#### A11Y-05: Every control has a name

An icon-only control has an `aria-label` that says what it does, such as "Follow up with Ben Hartley".

**Why:** without a name, a screen reader says only "button". **Checked by:** story tests, then review.

### Copy

#### COPY-01: Student copy is warm, plain and short

Students are 11–16. Never use clinical words such as "at risk" or "depressed" in student-facing UI.

**Why:** a check-in has to feel safe, or students stop answering honestly. **Checked by:** review.

#### COPY-02: Teacher copy suggests an action, not an alarm

"Might want a quiet word", not "Alert: at-risk student".

**Why:** calm, practical prompts lead to better conversations than alarms do. **Checked by:** review.

#### COPY-03: Sentence case for headings and buttons

"Send check-in", not "Send Check-In".

**Why:** sentence case is easier to read and keeps the tone friendly. **Checked by:** review.

#### COPY-04: British English in the UI

UI text is en-GB ("colour", "recognise"). Code names stay in American English.

**Why:** Brightside is for UK schools. **Checked by:** review.

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

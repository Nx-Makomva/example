import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "positive" | "caution" | "concern";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-surface-sunken text-text-muted",
  positive: "bg-positive-subtle text-positive",
  caution: "bg-caution-subtle text-caution",
  concern: "bg-concern-subtle text-concern",
};

export interface BadgeProps {
  /**
   * What the status means. Pick by meaning, never by colour.
   * - `neutral`: no judgement, such as "No check-in".
   * - `positive`: things are good.
   * - `caution`: worth keeping an eye on.
   * - `concern`: needs attention.
   *
   * For a mood, use `MOOD_DETAILS[mood].tone` from `src/lib/mood.ts` instead of picking a tone by hand.
   */
  tone?: BadgeTone;
  /** The status in one or two words, in sentence case. It must make sense without its colour. */
  children: ReactNode;
}

/**
 * A short status label, such as a student's mood.
 *
 * **Use for:** every status, state or category label. Don't build one by hand
 * from a rounded `span` with a coloured background: that bypasses the tones
 * and drifts from the system.
 *
 * **Don't use for:** anything clickable (use `Button`), or a count or metric (use `StatTile`).
 *
 * The text carries the meaning, and the colour only supports it, so the badge
 * still works for colour-blind users.
 */
export function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-0.5 text-sm font-medium",
        TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}

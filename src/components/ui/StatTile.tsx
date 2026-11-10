import { cn } from "@/lib/cn";

export type StatTone = "neutral" | "concern";

const VALUE_TONE_CLASSES: Record<StatTone, string> = {
  neutral: "text-text",
  concern: "text-concern",
};

export interface StatTileProps {
  /** What the number counts, in sentence case, such as "Checked in today". */
  label: string;
  /** The number itself. Keep it short, such as `12` or `"18/24"`. */
  value: string | number;
  /** Optional context under the number, such as where it comes from or what to do about it. */
  hint?: string;
  /**
   * `concern` colours the number to draw attention. Use it only when the number
   * needs action now (for example, students who need a follow-up), and only while it is above zero.
   */
  tone?: StatTone;
}

/**
 * One key number with a label, for a summary at the top of a page.
 *
 * **Use for:** a small set (usually three) of at-a-glance numbers side by side.
 *
 * **Don't use for:** a status (use `Badge`), or a number inside running text.
 * Don't use a `StatTile` on its own as a card: use `Card` for content that is more than one number.
 */
export function StatTile({ label, value, hint, tone = "neutral" }: StatTileProps) {
  return (
    <div className="rounded-card border border-border bg-surface-raised p-4 shadow-card">
      <p className="text-sm text-text-muted">{label}</p>
      <p className={cn("mt-1 text-3xl font-semibold tabular-nums", VALUE_TONE_CLASSES[tone])}>
        {value}
      </p>
      {hint && <p className="mt-1 text-sm text-text-muted">{hint}</p>}
    </div>
  );
}

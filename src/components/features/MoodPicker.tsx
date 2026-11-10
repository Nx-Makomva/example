"use client";

import { cn } from "@/lib/cn";
import { MOOD_DETAILS, MOODS, type Mood } from "@/lib/mood";

export interface MoodPickerProps {
  /** The selected mood, or `null` before the student has picked one. */
  value: Mood | null;
  /** Called with the mood that the student picks. */
  onChange: (mood: Mood) => void;
}

/**
 * The five mood options that a student picks from at check-in.
 *
 * The labels and descriptions come from `src/lib/mood.ts`. Change the copy
 * there, not here.
 *
 * It is built from native radio inputs, restyled. That gives keyboard
 * (arrow-key) and screen-reader support for free. A row of buttons would need
 * all of that rebuilt by hand.
 */
export function MoodPicker({ value, onChange }: MoodPickerProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-lg font-semibold">How are you feeling today?</legend>
      <div className="grid gap-2 sm:grid-cols-5">
        {MOODS.map((mood) => {
          const details = MOOD_DETAILS[mood];
          const isSelected = value === mood;

          return (
            <label
              key={mood}
              className={cn(
                "flex cursor-pointer flex-col rounded-control border p-3 transition-colors",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                isSelected
                  ? "border-brand bg-brand-subtle"
                  : "border-border bg-surface-raised hover:bg-surface-sunken",
              )}
            >
              <input
                type="radio"
                name="mood"
                value={mood}
                checked={isSelected}
                onChange={() => onChange(mood)}
                className="sr-only"
              />
              <span className="font-medium">{details.label}</span>
              <span className="text-sm text-text-muted">{details.description}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

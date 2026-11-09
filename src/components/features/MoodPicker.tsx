"use client";

import { cn } from "@/lib/cn";
import { MOOD_DETAILS, MOODS, type Mood } from "@/lib/mood";

export interface MoodPickerProps {
  value: Mood | null;
  onChange: (mood: Mood) => void;
}

// Native radio inputs (visually restyled) give keyboard and screen-reader
// support for free; a row of buttons would need all of that rebuilt by hand.
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

import type { BadgeTone } from "@/components/ui/Badge";

export const MOODS = ["great", "good", "okay", "low", "struggling"] as const;
export type Mood = (typeof MOODS)[number];

interface MoodDetails {
  label: string;
  description: string;
  tone: BadgeTone;
  needsFollowUp: boolean;
}

// Copy is written for 11–16 year olds: plain, warm, no clinical language.
export const MOOD_DETAILS: Record<Mood, MoodDetails> = {
  great: { label: "Great", description: "Feeling really good", tone: "positive", needsFollowUp: false },
  good: { label: "Good", description: "Things are fine", tone: "positive", needsFollowUp: false },
  okay: { label: "Okay", description: "Not bad, not great", tone: "neutral", needsFollowUp: false },
  low: { label: "Low", description: "A bit down today", tone: "caution", needsFollowUp: true },
  struggling: {
    label: "Struggling",
    description: "Finding things hard",
    tone: "concern",
    needsFollowUp: true,
  },
};

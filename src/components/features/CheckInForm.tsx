"use client";

import { useState, type FormEvent } from "react";

import { MoodPicker } from "@/components/features/MoodPicker";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MOOD_DETAILS, type Mood } from "@/lib/mood";

export function CheckInForm() {
  const [mood, setMood] = useState<Mood | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  if (isSubmitted && mood) {
    return (
      <Card title="Thanks for checking in">
        <p className="text-text-muted">
          {MOOD_DETAILS[mood].needsFollowUp
            ? "Your teacher will see this and may check in with you today. You can also talk to them any time."
            : "See you tomorrow."}
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <MoodPicker value={mood} onChange={setMood} />
        <div>
          <Button type="submit" disabled={mood === null}>
            Send check-in
          </Button>
        </div>
      </form>
    </Card>
  );
}

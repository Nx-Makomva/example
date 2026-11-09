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
  tone?: BadgeTone;
  children: ReactNode;
}

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

import { cn } from "@/lib/cn";

export type StatTone = "neutral" | "concern";

const VALUE_TONE_CLASSES: Record<StatTone, string> = {
  neutral: "text-text",
  concern: "text-concern",
};

export interface StatTileProps {
  label: string;
  value: string | number;
  hint?: string;
  tone?: StatTone;
}

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

import { cn } from "@/lib/cn";

export type AvatarSize = "sm" | "md";

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
};

const MAX_INITIALS = 2;

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, MAX_INITIALS)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export interface AvatarProps {
  name: string;
  size?: AvatarSize;
}

export function Avatar({ name, size = "md" }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-pill bg-brand-subtle font-semibold text-brand-strong",
        SIZE_CLASSES[size],
      )}
    >
      {getInitials(name)}
    </span>
  );
}

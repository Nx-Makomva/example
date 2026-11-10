import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-brand text-text-inverse hover:bg-brand-strong",
  secondary:
    "bg-surface-raised text-text border border-border-strong hover:bg-surface-sunken",
  ghost: "bg-transparent text-brand hover:bg-brand-subtle",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * How much attention the action needs.
   * - `primary`: the one main action in a view, such as "Send check-in". Use at most one per view.
   * - `secondary`: other actions next to it, or an action repeated in a list, such as "Follow up".
   * - `ghost`: quiet, low-priority actions, such as "View history".
   */
  variant?: ButtonVariant;
  /** `md` by default. Use `sm` inside dense layouts such as list rows. */
  size?: ButtonSize;
}

/**
 * Every clickable action in Brightside.
 *
 * **Use for:** anything that *does* something when clicked: submit, follow up, open, dismiss.
 *
 * **Don't use for:** going to another page. Use a link (`next/link`) for that.
 * Don't make a clickable `div` or `span` either. A real `<button>` gives keyboard
 * and screen-reader support for free.
 *
 * An icon-only button needs an `aria-label` that says what it does.
 */
export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    />
  );
}

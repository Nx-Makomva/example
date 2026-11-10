import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CardProps {
  /** A short heading in sentence case, such as "Needs attention". Shown as an `h2`. */
  title?: string;
  /** One line under the title that explains the card's purpose. */
  description?: string;
  /** One optional control in the top-right corner, usually a `ghost` or `secondary` `Button`. */
  action?: ReactNode;
  /** Only for placement in a layout (for example, grid position). Never use it to restyle the card. */
  className?: string;
  /** The card's content. */
  children: ReactNode;
}

/**
 * A raised container that groups related content into one section of a page.
 *
 * **Use for:** a distinct block of content on a page, such as a list, a form, or a summary.
 *
 * **Don't use for:** a single number with a label (use `StatTile`), or a short
 * status (use `Badge`). Don't put a card inside another card: use spacing or a divider instead.
 */
export function Card({ title, description, action, className, children }: CardProps) {
  const hasHeader = Boolean(title || description || action);

  return (
    <section
      className={cn(
        "rounded-card border border-border bg-surface-raised p-5 shadow-card",
        className,
      )}
    >
      {hasHeader && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && <p className="mt-1 text-sm text-text-muted">{description}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

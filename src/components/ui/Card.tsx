import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

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

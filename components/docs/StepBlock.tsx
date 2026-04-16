import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StepBlock({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "my-5 rounded-lg border border-notifyy-border bg-notifyy-card p-4 shadow-notifyy dark:border-notifyy-borderDark dark:bg-notifyy-cardDark/50",
        className,
      )}
    >
      <div className="prose prose-sm prose-slate max-w-none dark:prose-invert prose-ol:my-2 prose-li:my-0.5">
        {children}
      </div>
    </div>
  );
}

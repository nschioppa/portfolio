import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-[2px] border border-line px-2.5 py-1 font-mono text-micro text-muted", className)}>
      {children}
    </span>
  );
}

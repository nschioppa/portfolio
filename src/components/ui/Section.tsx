import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface SectionProps {
  id: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
  tone?: "base" | "band";
  intro?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function Section({ id, eyebrow, heading, children, tone = "base", intro, className, bodyClassName }: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("section-y relative", tone === "band" && "border-y border-line bg-surface", className)}>
      <div className="shell relative">
        <header className="mb-9 md:mb-12">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-7 shrink-0 bg-accent/60" />
            {eyebrow}
          </p>
          <div className="mt-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-12">
            <h2 id={headingId} className="max-w-[22ch] font-serif text-display font-normal text-ink">{heading}</h2>
            {intro ? <p className="max-w-[44ch] text-body text-muted md:max-w-[39ch]">{intro}</p> : null}
          </div>
        </header>
        <div className={bodyClassName}>{children}</div>
      </div>
    </section>
  );
}

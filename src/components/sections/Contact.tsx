"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type ContactContent } from "@/content/types";
import { cn } from "@/lib/cn";

export function Contact({ content }: { content: ContactContent }) {
  return (
    <Section id={SECTION_IDS.contact} eyebrow={content.eyebrow} heading={content.heading} className="contact-section overflow-hidden">
      <Reveal>
        <p className="max-w-measure text-lead text-muted">{content.blurb}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line pb-7 md:mt-10 md:pb-10">
          <a href={`mailto:${content.email}`} className="group inline-flex min-h-11 max-w-full items-center gap-4 text-[clamp(1.05rem,4vw,2.6rem)] tracking-[-.035em] text-ink transition-colors hover:text-accent motion-reduce:transition-none">
            <span className="min-w-0 break-all">{content.email}</span>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-5 shrink-0 sm:size-8">
              <path d="M6 26 26 6M6 6h20v20" />
            </svg>
          </a>
          <CopyButton value={content.email} copyLabel={content.copyLabel} copiedLabel={content.copiedLabel} />
        </div>
        <div className="mt-7 flex flex-col justify-between gap-7 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-micro uppercase tracking-[.1em] text-faint">{content.phoneLabel}</span>
            <a href={`tel:${content.phone.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center text-small text-muted transition-colors hover:text-ink motion-reduce:transition-none">{content.phone}</a>
            <CopyButton value={content.phone} copyLabel={content.copyLabel} copiedLabel={content.copiedLabel} />
          </div>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {content.links.filter((link) => link.href && link.href !== "#").map((link) => (
              <li key={link.label}>
                <a href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="link-underline inline-flex min-h-11 items-center gap-2 text-small text-ink transition-colors hover:text-accent motion-reduce:transition-none">
                  {link.label}
                  {link.external ? <span aria-hidden="true">↗</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

function CopyButton({ value, copyLabel, copiedLabel }: { value: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current); }, []);

  const copy = useCallback(async () => {
    if (!navigator.clipboard) return;
    try { await navigator.clipboard.writeText(value); } catch { return; }
    setCopied(true);
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }, [value]);

  return (
    <>
      <button type="button" onClick={copy} aria-label={copyLabel + " " + value} className={cn("inline-flex min-h-11 items-center gap-2 rounded-[2px] border px-3 font-mono text-micro transition-colors motion-reduce:transition-none", copied ? "border-accent text-accent" : "border-line text-muted hover:border-line-hi hover:text-ink")}>
        <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-4">
          {copied ? <path d="m4 10 4 4 8-8" /> : <><rect x="7" y="7" width="9" height="9" rx="1.5" /><path d="M12.5 4H5.5A1.5 1.5 0 0 0 4 5.5v7" /></>}
        </svg>
        <span aria-hidden="true">{copied ? copiedLabel : copyLabel}</span>
      </button>
      <span aria-live="polite" className="sr-only">{copied ? copiedLabel : ""}</span>
    </>
  );
}

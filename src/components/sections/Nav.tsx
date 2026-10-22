"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import { LANG_LABELS, otherLang } from "@/content";
import { LANGS, type Lang, type NavContent } from "@/content/types";
import { cn } from "@/lib/cn";

const MENU_ID = "nav-menu";
const DESKTOP_QUERY = "(min-width: 48rem)";

/** Read document order: the navigation need not mirror every section. */
function documentSections(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
}

function sectionInView(): string | null {
  const sections = documentSections();
  const readingLine = window.innerHeight * 0.45;
  const section = sections.find((node) => {
    const { top, bottom } = node.getBoundingClientRect();
    return top <= readingLine && bottom >= readingLine;
  });

  if (section) return section.id;
  const last = sections.at(-1);
  if (last && last.getBoundingClientRect().bottom < readingLine) return last.id;
  return null;
}

export function Nav({ content, lang }: { content: NavContent; lang: Lang }) {
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const closeMenu = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, closeMenu]);

  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [closeMenu]);

  // Correct a deep link after layout and font loading, unless the reader moves.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !document.getElementById(id)) return;
    let cancelled = false;
    const cancel = () => { cancelled = true; };
    const events = ["wheel", "touchstart", "keydown"] as const;
    events.forEach((event) => window.addEventListener(event, cancel, { once: true, passive: true }));
    const jump = () => {
      if (!cancelled) document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    jump();
    const retry = setTimeout(jump, 250);
    return () => {
      clearTimeout(retry);
      events.forEach((event) => window.removeEventListener(event, cancel));
    };
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const nodes = documentSections();
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActiveId(nodes.find((node) => visible.has(node.id))?.id ?? null);
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const target = otherLang(lang);
  const handleLangClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      const section = sectionInView();
      // A full navigation avoids Next preserving a stale anchor or scroll.
      window.location.assign(section ? `/${target}#${section}` : `/${target}`);
    },
    [target],
  );

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-base/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 motion-reduce:transition-none",
        scrolled || open ? "border-line shadow-[0_4px_24px_-20px_var(--color-ink)]" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-pill focus:border focus:border-accent focus:bg-base focus:px-4 focus:py-3 focus:text-small focus:text-accent"
      >
        {content.skipToContent}
      </a>

      <div className="shell flex h-20 items-center justify-between gap-3">
        <Link href={`/${lang}`} className="inline-flex min-h-11 items-center gap-2.5 text-ink transition-colors hover:text-accent motion-reduce:transition-none">
          <svg aria-hidden="true" viewBox="0 0 28 32" fill="none" className="h-8 w-7 text-accent" focusable="false">
            <path d="M13 2v23M10 6 2 23h8V6ZM16 9v14h10L16 9Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M2 27c4 0 4 3 8 3s4-3 8-3 4 3 8 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-lg font-semibold tracking-[-0.04em]">NS<span className="text-accent">.</span></span>
        </Link>

        <nav className="flex items-center gap-2 md:gap-5">
          <div
            id={MENU_ID}
            className={cn(
              "absolute inset-x-0 top-full border-b border-line bg-base/98 shadow-sm md:static md:border-0 md:bg-transparent md:shadow-none",
              open ? "block" : "hidden md:block",
            )}
          >
            <ul className="flex flex-col gap-1 px-gutter py-4 md:flex-row md:items-center md:gap-1 md:p-0">
              {content.items.map((item) => {
                const active = item.href === `#${activeId}`;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "location" : undefined}
                      className={cn(
                        "flex min-h-11 items-center rounded-pill px-3 text-small transition-colors duration-200 motion-reduce:transition-none",
                        active ? "bg-accent/5 text-accent" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div role="group" aria-label={content.languageLabel} className="flex items-center font-mono text-[11px] uppercase tracking-wide">
            {LANGS.map((code, index) => (
              <Fragment key={code}>
                {index > 0 ? <span aria-hidden="true" className="h-3 w-px bg-line-hi" /> : null}
                {code === lang ? (
                  <span lang={code} aria-current="true" className="inline-flex min-h-11 min-w-11 items-center justify-center font-semibold text-accent">{code}</span>
                ) : (
                  <a
                    href={`/${target}`}
                    lang={code}
                    hrefLang={code}
                    aria-label={LANG_LABELS[code]}
                    onClick={handleLangClick}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-pill text-muted transition-colors hover:text-ink motion-reduce:transition-none"
                  >
                    {code}
                  </a>
                )}
              </Fragment>
            ))}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? content.closeMenu : content.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-hi hover:bg-surface-2 md:hidden motion-reduce:transition-none"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="size-5" focusable="false">
              {open ? <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></> : <><path d="M4 9h16" /><path d="M4 15h16" /></>}
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

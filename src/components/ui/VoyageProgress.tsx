"use client";

import { useEffect, useRef } from "react";

/** A small decorative voyage alongside the document, never a scroll control. */
export function VoyageProgress() {
  const railRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const boat = boatRef.current;
    if (!rail || !boat) return;

    const enabled = window.matchMedia(
      "(min-width: 80rem) and (prefers-reduced-motion: no-preference)",
    );
    let frame: number | null = null;
    let scrollRange = 0;
    let travel = 0;

    const draw = () => {
      frame = null;
      const progress = scrollRange > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollRange)) : 0;
      boat.style.transform = `translate3d(0, ${progress * travel}px, 0)`;
    };

    const schedule = () => {
      if (!enabled.matches || frame !== null) return;
      frame = window.requestAnimationFrame(draw);
    };

    const measure = () => {
      if (!enabled.matches) {
        if (frame !== null) window.cancelAnimationFrame(frame);
        frame = null;
        return;
      }

      scrollRange = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      travel = Math.max(0, rail.clientHeight - boat.offsetHeight);
      schedule();
    };

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    resizeObserver?.observe(document.body);
    resizeObserver?.observe(rail);
    enabled.addEventListener("change", measure);
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    measure();

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      enabled.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="pointer-events-none fixed right-3 top-1/2 z-40 hidden h-60 w-7 -translate-y-1/2 text-accent xl:block motion-reduce:hidden 2xl:right-6"
    >
      <div className="absolute inset-y-3.5 left-1/2 border-l border-dashed border-accent/25">
        {[0, 25, 50, 75, 100].map((position) => (
          <span
            key={position}
            className="absolute left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/35 bg-base"
            style={{ top: `${position}%` }}
          />
        ))}
      </div>
      <div ref={boatRef} className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full bg-base">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" className="size-6" focusable="false">
          <path d="M12 3v13M10 5 4 14h6V5ZM14 7v7h5l-5-7Z" />
          <path d="M3 17h18l-3 3H6l-3-3Z" fill="currentColor" fillOpacity=".14" />
        </svg>
      </div>
    </div>
  );
}

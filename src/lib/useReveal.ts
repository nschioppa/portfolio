"use client";

import { useEffect, useRef, type RefObject } from "react";

export interface UseRevealOptions {
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}

/** Content stays visible in server HTML and if animation is unavailable. */
export function useReveal<T extends HTMLElement = HTMLElement>({
  delay = 0,
  threshold = 0.08,
  rootMargin = "0px 0px -5% 0px",
}: UseRevealOptions = {}): { ref: RefObject<T | null> } {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Never replay an entrance on content the reader can already see.
    if (
      !node ||
      motion.matches ||
      typeof IntersectionObserver === "undefined" ||
      typeof node.animate !== "function" ||
      node.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (motion.matches) return;

        animation = node.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 620,
            delay: Math.min(Math.max(delay, 0), 180),
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "backwards",
          },
        );
      },
      { threshold, rootMargin },
    );

    const onMotionChange = () => {
      if (!motion.matches) return;
      observer.disconnect();
      animation?.cancel();
    };

    observer.observe(node);
    motion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motion.removeEventListener("change", onMotionChange);
    };
  }, [delay, threshold, rootMargin]);

  return { ref };
}

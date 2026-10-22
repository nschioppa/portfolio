"use client";

import { useCallback, type ElementType, type ReactNode } from "react";

import { useReveal } from "@/lib/useReveal";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "article" | "section" | "figure";
  className?: string;
}

/** Progressive enhancement: readable first, a brief entrance when available. */
export function Reveal({ children, delay = 0, as = "div", className }: RevealProps) {
  const { ref } = useReveal<HTMLElement>({ delay });
  const Tag: ElementType = as;
  const setNode = useCallback(
    (node: HTMLElement | null) => {
      ref.current = node;
    },
    [ref],
  );

  return (
    <Tag ref={setNode} className={className}>
      {children}
    </Tag>
  );
}

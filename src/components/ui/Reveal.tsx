"use client";

import { useCallback, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/useReveal";

export interface RevealProps {
  children: ReactNode;
  /** Retardo en ms para escalonar los elementos de una misma lista. */
  delay?: number;
  /** Etiqueta a renderizar. `li` para elementos dentro de un <ul>. */
  as?: "div" | "li" | "article" | "section" | "figure";
  className?: string;
}

/**
 * Aparece al entrar en pantalla: sube 1rem y se funde. Una sola vez.
 *
 * Con `prefers-reduced-motion: reduce` no anima nada. La garantia esta puesta
 * dos veces a proposito: el hook devuelve `visible: true` de entrada, y ademas
 * las clases `motion-reduce:` fuerzan el estado final en CSS. Lo segundo es lo
 * que evita el fotograma en blanco antes de que corra el efecto.
 */
export function Reveal({ children, delay = 0, as = "div", className }: RevealProps) {
  const { ref, visible } = useReveal<HTMLElement>();
  const Tag: ElementType = as;

  // Ref de callback en vez del objeto: como `Tag` puede ser div, li, article...
  // TypeScript exige una ref valida para TODAS a la vez, y un objeto
  // `RefObject<HTMLElement>` no lo es. Una funcion si, por contravarianza.
  // `ref` tiene identidad estable, asi que el callback tambien.
  const setNode = useCallback(
    (node: HTMLElement | null) => {
      ref.current = node;
    },
    [ref],
  );

  return (
    <Tag
      ref={setNode}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transition-[opacity,transform,translate] duration-700 ease-out-soft",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

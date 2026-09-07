"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export interface UseRevealOptions {
  /** Fraccion del elemento que tiene que entrar para disparar. */
  threshold?: number;
  /** Margen del observer. El -12% de abajo dispara justo antes del borde. */
  rootMargin?: string;
}

export interface UseRevealResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  /** Pasa a true la primera vez que entra en pantalla y ya no vuelve atras. */
  visible: boolean;
}

/**
 * Anima al entrar en viewport, una sola vez.
 *
 * - Con `prefers-reduced-motion: reduce` devuelve `visible: true` de entrada y
 *   ni siquiera crea el observer.
 * - Seguro en servidor: no toca `window` fuera del efecto.
 */
export function useReveal<T extends HTMLElement = HTMLElement>(
  options: UseRevealOptions = {},
): UseRevealResult<T> {
  const { threshold = 0.15, rootMargin = "0px 0px -12% 0px" } = options;

  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Si el sistema pide menos movimiento, o el navegador no trae observer,
    // se muestra tal cual: nunca se deja contenido escondido por no poder animar.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          observer.disconnect(); // ya no hace falta: la animacion es de ida
          return;
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

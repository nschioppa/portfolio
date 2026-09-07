"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";

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

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Se salta la animacion si el sistema pide menos movimiento o si el navegador
 * no trae IntersectionObserver. Lo segundo importa: sin el, el contenido se
 * quedaria escondido para siempre esperando un disparo que no llega.
 *
 * Va por `useSyncExternalStore` y no por un `setState` dentro de un efecto
 * porque eso ultimo encadena renders (y React 19 lo marca como error de lint).
 * Ademas resuelve el desajuste de hidratacion el solo: en servidor no hay
 * media query, asi que se sirve el mismo HTML para todos y se corrige al
 * hidratar.
 */
function subscribeSkip(onChange: () => void): () => void {
  const media = window.matchMedia(REDUCED_MOTION);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSkip(): boolean {
  return (
    typeof IntersectionObserver === "undefined" ||
    window.matchMedia(REDUCED_MOTION).matches
  );
}

function getSkipOnServer(): boolean {
  return false;
}

export function useReveal<T extends HTMLElement = HTMLElement>(
  options: UseRevealOptions = {},
): UseRevealResult<T> {
  const { threshold = 0.15, rootMargin = "0px 0px -12% 0px" } = options;

  const ref = useRef<T | null>(null);
  const [entered, setEntered] = useState(false);
  const skip = useSyncExternalStore(subscribeSkip, getSkip, getSkipOnServer);

  useEffect(() => {
    if (skip) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setEntered(true);
          observer.disconnect(); // ya no hace falta: la animacion es de ida
          return;
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [skip, threshold, rootMargin]);

  return { ref, visible: skip || entered };
}

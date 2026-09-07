import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/**
 * Pastilla para los tags de stack. Texto mono y pequeno: es metadato, no
 * contenido, y tiene que leerse como una etiqueta de terminal.
 *
 * El fondo va un punto MAS OSCURO que la tarjeta a proposito: hunde la pastilla
 * en la superficie en vez de levantarla, que es lo que hace que un muro de
 * badges no compita con el titulo.
 */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-line bg-base/70 px-2.5 py-1",
        "font-mono text-micro text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

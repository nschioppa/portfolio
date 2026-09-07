import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface CardProps {
  children: ReactNode;
  /** Etiqueta a renderizar. `li` para tarjetas dentro de un <ul>. */
  as?: "article" | "div" | "li";
  className?: string;
}

/**
 * Tarjeta de borde sutil que se ilumina en celeste al pasar por encima y al
 * recibir el foco cualquier cosa de dentro (`focus-within`), para que con
 * teclado se vea lo mismo que con raton. Sin sombras: la jerarquia la da la
 * superficie, no el drama.
 *
 * Expone `group/card`, asi que desde dentro se puede reaccionar al hover de la
 * tarjeta entera con `group-hover/card:...`.
 */
export function Card({ children, as = "article", className }: CardProps) {
  const Tag: ElementType = as;

  return (
    <Tag
      className={cn(
        "group/card relative flex flex-col rounded-card border border-line bg-surface-2 p-6 md:p-7",
        "transition-colors duration-300 ease-out-soft",
        "hover:border-accent/50 hover:bg-surface-3",
        "focus-within:border-accent/70 focus-within:bg-surface-3",
        "motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

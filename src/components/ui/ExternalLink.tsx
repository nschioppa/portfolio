import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  /** El icono se puede quitar cuando el enlace ya se entiende por contexto. */
  showIcon?: boolean;
  className?: string;
  /** Etiqueta accesible alternativa, si el texto visible no basta por si solo. */
  "aria-label"?: string;
}

/**
 * Enlace a otro sitio. Siempre en pestana nueva y siempre con
 * `rel="noopener noreferrer"`: sin `noopener` la pagina de destino recibe un
 * `window.opener` con el que puede redirigir esta.
 *
 * El icono es un SVG en linea, sin libreria de iconos.
 */
export function ExternalLink({
  href,
  children,
  showIcon = true,
  className,
  "aria-label": ariaLabel,
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        // min-h-6 son los 24px de area pulsable de WCAG 2.5.8. Estos enlaces
        // van sueltos en filas y tarjetas, no dentro de una frase, asi que no
        // les vale la excepcion de enlace en linea.
        "group/link inline-flex min-h-6 items-baseline gap-1.5",
        "text-ink transition-colors duration-200 ease-out-soft hover:text-accent focus-visible:text-accent",
        "motion-reduce:transition-none",
        className,
      )}
    >
      <span className="link-underline">{children}</span>

      {showIcon ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          // 0.75rem: el icono queda por debajo de la altura de la x, que es
          // donde deja de competir con el texto y solo lo acompana.
          className={cn(
            "size-3 shrink-0 self-center text-muted",
            "transition-[transform,color] duration-200 ease-out-soft",
            "group-hover/link:text-accent group-hover/link:-translate-y-px group-hover/link:translate-x-px",
            "group-focus-visible/link:text-accent",
            "motion-reduce:transition-none motion-reduce:group-hover/link:translate-x-0 motion-reduce:group-hover/link:translate-y-0",
          )}
        >
          {/* Caja abierta por la esquina + flecha que sale de ella. */}
          <path d="M8.75 3H3.75A.75.75 0 0 0 3 3.75v8.5c0 .41.34.75.75.75h8.5c.41 0 .75-.34.75-.75v-5" />
          <path d="M9.75 2.5h3.75v3.75" />
          <path d="M13.5 2.5 7.5 8.5" />
        </svg>
      ) : null}
    </a>
  );
}

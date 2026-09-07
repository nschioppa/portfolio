import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export interface SectionProps {
  /** Ancla de la seccion. Es la misma en los dos idiomas (ver SECTION_IDS). */
  id: string;
  /** Linea corta en mono y en el acento, encima del titulo. */
  eyebrow: string;
  /** El h2 de la seccion. */
  heading: string;
  children: ReactNode;
  /** "band" pinta la franja con la superficie un punto mas clara. */
  tone?: "base" | "band";
  /** Entradilla opcional bajo el titulo, ya limitada al ancho de lectura. */
  intro?: ReactNode;
  className?: string;
  /** Clases para el bloque de contenido, por debajo de la cabecera. */
  bodyClassName?: string;
}

/**
 * Envoltorio de seccion: ancla, aire vertical, contenedor y cabecera.
 *
 * Es `relative` a proposito: asi una <NauticalChart /> puesta dentro se
 * posiciona contra la seccion y no contra la pagina.
 */
export function Section({
  id,
  eyebrow,
  heading,
  children,
  tone = "base",
  intro,
  className,
  bodyClassName,
}: SectionProps) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        "section-y relative",
        tone === "band" && "border-line border-y bg-surface",
        className,
      )}
    >
      <div className="shell relative">
        <header className="mb-10 md:mb-14">
          <p className="eyebrow flex items-center gap-3">
            {/* Guion de acento: da el aire de indice tecnico sin escribir texto. */}
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent/60" />
            {eyebrow}
          </p>

          <h2 id={headingId} className="mt-5 max-w-measure text-display font-semibold text-ink">
            {heading}
          </h2>

          {intro ? (
            <p className="mt-5 max-w-measure text-lead text-muted">{intro}</p>
          ) : null}
        </header>

        <div className={bodyClassName}>{children}</div>
      </div>
    </section>
  );
}

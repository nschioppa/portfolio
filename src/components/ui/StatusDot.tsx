import type { StatusTone } from "@/content/types";
import { cn } from "@/lib/cn";

export interface StatusDotProps {
  tone: StatusTone;
  /**
   * Texto accesible del estado. Si la etiqueta ya se lee al lado del punto,
   * dejalo vacio: el punto pasa a ser decorativo y no se anuncia dos veces.
   */
  label?: string;
  className?: string;
}

/**
 * Punto de estado de un proyecto.
 *
 * "live" es el acento del sitio; los otros tres son senales de croma bajo,
 * no colores de marca: solo aparecen en un punto de 8px y siempre junto a su
 * etiqueta escrita, que es quien lleva el significado. Asi el estado se
 * distingue de un vistazo sin que la pagina se llene de colores.
 */
const TONE_FILL: Record<StatusTone, string> = {
  live: "bg-tone-live",
  building: "bg-tone-building",
  exploring: "bg-tone-exploring",
  done: "bg-tone-done",
};

export function StatusDot({ tone, label, className }: StatusDotProps) {
  const a11y = label
    ? ({ role: "img", "aria-label": label } as const)
    : ({ "aria-hidden": true } as const);

  return (
    <span
      {...a11y}
      className={cn("relative inline-flex size-2 shrink-0 items-center justify-center", className)}
    >
      {/* Solo "live" late: un halo que se abre y se apaga. El punto no se mueve,
          para que no distraiga en una lista de tarjetas. */}
      {tone === "live" ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-accent animate-beacon motion-reduce:hidden"
        />
      ) : null}

      <span className={cn("relative size-2 rounded-full", TONE_FILL[tone])} />
    </span>
  );
}

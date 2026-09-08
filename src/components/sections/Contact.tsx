"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { NauticalChart } from "@/components/NauticalChart";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type ContactContent, type Link } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Cierre del sitio.
 *
 * Es un componente de cliente por los botones de copiar: necesitan estado y
 * `navigator.clipboard`. Todo lo demas (Section, NauticalChart, ExternalLink)
 * es marcado estatico y viaja igual de bien en el bundle de cliente.
 */

/** Cuanto se queda el boton diciendo "Copiado" antes de volver a su sitio.
 *  2s da tiempo a leerlo sin que el boton se quede clavado en un estado que
 *  ya no describe nada. */
const COPIED_MS = 2000;

/** Un enlace sin destino todavia. No se pinta como enlace: prometer un
 *  destino que no existe es peor que no ponerlo. */
const NO_HREF = "#";

export function Contact({ content }: { content: ContactContent }) {
  return (
    <Section
      id={SECTION_IDS.contact}
      eyebrow={content.eyebrow}
      heading={content.heading}
      tone="band"
      // La cabecera de Section viene alineada a la izquierda como en el resto
      // del sitio; aqui, que es el cierre, se centra. El eyebrow es un flex
      // (lleva el guion de acento delante), asi que se centra con
      // justify-content y no con text-align.
      className="text-center [&_header_h2]:mx-auto [&_header_p]:justify-center"
    >
      {/* El contenedor `relative` mas cercano no es la <section> sino el
          `div.shell` que Section pinta por dentro, asi que la carta queda
          limitada al ancho de pagina. Se estira a mano por arriba y por abajo
          para cubrir tambien el aire vertical de la franja. Nunca desborda: el
          propio componente recorta con overflow-hidden. */}
      <NauticalChart
        variant="contact"
        className="top-[calc(var(--spacing-section)*-1)] bottom-[calc(var(--spacing-section)*-1)]"
      />

      {/* `relative` para pintarse por encima de la carta, que es absoluta. */}
      <Reveal className="relative">
        <p className="mx-auto max-w-measure text-lead text-muted">{content.blurb}</p>

        {/* Correo: el boton protagonista de la seccion. */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
          <a
            href={`mailto:${content.email}`}
            className={cn(
              "group inline-flex max-w-full items-center gap-3 rounded-pill",
              "border border-accent/45 bg-surface-2 px-5 py-3.5 sm:px-7 sm:py-4",
              "text-lead font-medium text-ink",
              "transition-colors duration-300 ease-out-soft",
              "hover:border-accent hover:bg-surface-3 motion-reduce:transition-none",
            )}
          >
            <MailIcon />
            <span className="min-w-0 break-words">{content.email}</span>
          </a>

          <CopyButton
            value={content.email}
            copyLabel={content.copyLabel}
            copiedLabel={content.copiedLabel}
          />
        </div>

        {/* Telefono: mismo dato, un escalon por debajo. Sin enlace `tel:`. */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="mono-label uppercase">{content.phoneLabel}</span>

          {/* `select-all` para poder cogerlo de una pasada si el portapapeles
              no esta disponible y hay que copiarlo a mano. */}
          <span className="select-all font-mono text-small tabular-nums text-muted">
            {content.phone}
          </span>

          <CopyButton
            value={content.phone}
            copyLabel={content.copyLabel}
            copiedLabel={content.copiedLabel}
            size="sm"
          />
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:mt-12">
          {content.links.map((link) => (
            <li key={link.label}>
              <ContactLink link={link} />
            </li>
          ))}
        </ul>

        {content.todos?.length ? (
          <ul className="mt-10 space-y-1">
            {content.todos.map((todo) => (
              <li key={todo} className="text-micro text-faint">
                {todo}
              </li>
            ))}
          </ul>
        ) : null}
      </Reveal>
    </Section>
  );
}

/* -------------------------------------------------------------------------- */

interface ContactLinkProps {
  link: Link;
}

/**
 * Un enlace de la fila de abajo.
 *
 * Instagram y TikTok van deliberadamente en segundo plano (mas pequenos, sin
 * icono y algo apagados): son marca personal, no el motivo por el que alguien
 * abre esta seccion.
 */
function ContactLink({ link }: ContactLinkProps) {
  // Un href "#" no lleva a ninguna parte: se pinta como texto apagado y no
  // como enlace, que seria prometer un destino que no existe. El TODO de la
  // lista de abajo es quien explica por que falta.
  if (link.href === NO_HREF) {
    return (
      <span className="text-faint text-body font-medium">
        {link.label}
      </span>
    );
  }

  // La opacidad, y no un color distinto, para bajar de nivel el enlace: asi no
  // pelea con el `text-ink` y el `hover:text-accent` que ya trae ExternalLink.
  // El min-h-6 es el minimo de area pulsable de WCAG 2.5.8 (24x24). Esta fila
  // es una lista de enlaces suelta, no texto corrido, asi que no esta exenta.
  // El min-h-6 es el minimo de area pulsable de WCAG 2.5.8 (24x24). Esta fila
  // es una lista de enlaces suelta, no texto corrido, asi que no esta exenta.
  const tone = "min-h-6 items-center text-body font-medium";

  if (link.external) {
    return (
      <ExternalLink href={link.href} showIcon className={tone}>
        {link.label}
      </ExternalLink>
    );
  }

  return (
    <a
      href={link.href}
      className={cn(
        "link-underline inline-flex text-ink transition-colors duration-200 ease-out-soft",
        "hover:text-accent focus-visible:text-accent motion-reduce:transition-none",
        tone,
      )}
    >
      {link.label}
    </a>
  );
}

/* -------------------------------------------------------------------------- */

interface CopyButtonProps {
  /** Lo que se copia y, ademas, lo que nombra al boton. */
  value: string;
  copyLabel: string;
  copiedLabel: string;
  /** "sm" para el telefono, que pesa menos que el correo. */
  size?: "md" | "sm";
}

/** Alturas de pulsacion. La grande llega a los 44px que pide un dedo; la
 *  pequena se queda en 36px porque va pegada a una linea de texto pequeno. */
const SIZES: Record<"md" | "sm", string> = {
  md: "min-h-11 gap-2 px-4 text-small",
  sm: "min-h-9 gap-1.5 px-3 text-micro",
};

function CopyButton({ value, copyLabel, copiedLabel, size = "md" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Se limpia al desmontar: si no, el setTimeout sobrevive a la seccion e
  // intenta cambiar el estado de un componente que ya no existe.
  useEffect(
    () => () => {
      if (timer.current !== null) clearTimeout(timer.current);
    },
    [],
  );

  const handleClick = useCallback(async () => {
    // `navigator.clipboard` NO existe fuera de contexto seguro (http plano, o
    // una IP en la red local), y `writeText` puede rechazar si el navegador
    // deniega el permiso. En los dos casos el boton se queda como estaba: el
    // valor sigue a la vista para copiarlo a mano y la etiqueta no miente.
    const clipboard: Clipboard | undefined =
      typeof navigator === "undefined" ? undefined : navigator.clipboard;

    if (!clipboard) return;

    try {
      await clipboard.writeText(value);
    } catch {
      return;
    }

    setCopied(true);

    // Se rearma desde cero en cada clic: dos pulsaciones seguidas no pueden
    // dejar vivo el temporizador de la primera.
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPIED_MS);
  }, [value]);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        // El texto visible dice solo "Copiar": con dos botones iguales en la
        // seccion, el nombre accesible lleva ademas QUE se copia. Se compone
        // con las cadenas que ya vienen del contenido.
        aria-label={`${copyLabel} ${value}`}
        className={cn(
          "inline-flex items-center justify-center rounded-pill border font-mono",
          "transition-colors duration-200 ease-out-soft motion-reduce:transition-none",
          SIZES[size],
          copied
            ? "border-accent/60 bg-surface-3 text-accent"
            : "border-line bg-surface-2 text-muted hover:border-line-hi hover:bg-surface-3 hover:text-ink",
        )}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        {/* Oculto para el lector de pantalla: su nombre ya lo da `aria-label`
            y el cambio de estado lo anuncia la region viva de al lado. */}
        <span aria-hidden="true">{copied ? copiedLabel : copyLabel}</span>
      </button>

      {/* Existe siempre en el DOM, aunque vacia: una region viva creada en el
          mismo momento en que se llena no se anuncia. */}
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Iconos en linea. Sin libreria: son tres trazos.                            */

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0 text-accent"
    >
      <rect x="2.25" y="4.5" width="15.5" height="11" rx="2" />
      <path d="m3.25 6.25 5.9 4.3a1.45 1.45 0 0 0 1.7 0l5.9-4.3" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      {/* Hoja de delante y esquina de la de atras. */}
      <rect x="7.25" y="7.25" width="9" height="9" rx="2" />
      <path d="M12.75 4.75H5.75a1.5 1.5 0 0 0-1.5 1.5v7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <path d="m4.5 10.5 3.6 3.6L15.5 6.5" />
    </svg>
  );
}

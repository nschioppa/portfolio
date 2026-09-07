import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type Link, type SailingContent } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Seccion de vela, sobre la franja clara para cortar la pagina por la mitad.
 *
 * Tres bloques: cifras, linea de tiempo y un apunte sobre las redes. La linea
 * de tiempo va en UNA columna, sin alternar lados: alternando, en movil se
 * colapsa igualmente a una columna y el orden de lectura queda a merced del
 * ancho de la pantalla.
 *
 * Componente de servidor: la animacion de entrada la pone `Reveal`.
 */

/**
 * La driza: 1px continuo que aparece y se apaga en los 2rem de cada extremo.
 * 2rem es alto de `period` + `title` de una entrada, o sea que el degradado se
 * consume dentro de la primera y de la ultima, y no deja la linea a media luz
 * en los tramos de en medio.
 *
 * Va como valor arbitrario y no con las utilidades de gradiente porque hacen
 * falta cuatro paradas para que el desvanecido sea simetrico.
 */
const HALYARD =
  "bg-[linear-gradient(to_bottom,transparent,var(--color-line)_2rem,var(--color-line)_calc(100%_-_2rem),transparent)]";

/** Marca de un pendiente: una casilla sin marcar, dibujada, no escrita. */
function TodoMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
      // 2px de margen: (16px de linea de `text-micro` - 12px del icono) / 2,
      // que es lo que lo centra con la primera linea del texto.
      className="mt-[2px] size-3 shrink-0"
    >
      <rect x="1.5" y="1.5" width="9" height="9" rx="2" />
    </svg>
  );
}

/** Enlace social. Un "#" es un hueco de contenido, no un destino. */
function SocialLink({ link }: { link: Link }) {
  if (link.href === "#") {
    return <span className="text-faint">{link.label}</span>;
  }

  if (link.external) {
    return <ExternalLink href={link.href}>{link.label}</ExternalLink>;
  }

  return (
    <a
      href={link.href}
      className="link-underline text-ink transition-colors duration-200 ease-out-soft hover:text-accent motion-reduce:transition-none"
    >
      {link.label}
    </a>
  );
}

export function Sailing({ content }: { content: SailingContent }) {
  return (
    <Section
      id={SECTION_IDS.sailing}
      eyebrow={content.eyebrow}
      heading={content.heading}
      intro={content.intro}
      tone="band"
    >
      {/* --- Cifras -----------------------------------------------------------
          2x2 en movil y 4 columnas desde `sm`. Los separadores verticales solo
          existen en la fila de cuatro: en la rejilla de dos partirian la fila
          por la mitad y pareceria una tabla. */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-y-0">
        {content.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 60}
            // `flex-col-reverse`: en el DOM el <dt> va antes que su <dd>, como
            // pide una lista de definiciones, pero en pantalla la cifra manda y
            // la etiqueta va debajo.
            className={cn(
              "flex flex-col-reverse gap-1",
              i > 0 && "sm:border-l sm:border-line sm:pl-6",
            )}
          >
            <dt className="mono-label uppercase">{stat.label}</dt>
            <dd className="text-display font-semibold text-accent">{stat.value}</dd>
          </Reveal>
        ))}
      </dl>

      {/* --- Linea de tiempo -------------------------------------------------- */}
      <ol className="relative mt-14 md:mt-20">
        <span
          aria-hidden="true"
          // Centro del nodo: 5px (la mitad de `size-2.5`). La linea de 1px se
          // centra ahi con el -50%, asi que nodo y driza comparten eje exacto.
          className={cn("absolute inset-y-0 left-[5px] w-px -translate-x-1/2", HALYARD)}
        />

        {content.timeline.map((entry, i) => (
          <Reveal
            as="li"
            key={entry.title}
            delay={i * 70}
            className="relative pb-10 pl-7 last:pb-0 md:pl-12"
          >
            {/* El anillo del color de la franja tapa la driza justo detras del
                nodo, para que el punto se lea posado encima y no atravesado. */}
            <span
              aria-hidden="true"
              // 3px: centra el nodo de 10px con la linea de 16px del `period`.
              className="absolute left-0 top-[3px] size-2.5 rounded-full bg-accent ring-4 ring-surface"
            />

            <p className="mono-label">{entry.period}</p>

            <h3 className="mt-2 max-w-measure text-title font-semibold text-ink">
              {entry.title}
            </h3>

            <p className="mt-2 max-w-measure text-body text-muted">{entry.description}</p>
          </Reveal>
        ))}
      </ol>

      {/* --- Redes ------------------------------------------------------------
          Un apunte al pie, no una llamada a la accion: texto pequeno y enlaces
          en linea, sin pastillas ni botones. */}
      <Reveal className="mt-14 border-t border-line pt-8 md:mt-20">
        <p className="max-w-measure text-small text-muted">{content.socialNote}</p>

        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-small">
          {content.socialLinks.map((link) => (
            <li key={link.label}>
              <SocialLink link={link} />
            </li>
          ))}
        </ul>

        {content.todos && content.todos.length > 0 ? (
          <ul className="mt-8 flex flex-col gap-1.5 text-micro text-faint">
            {content.todos.map((todo) => (
              <li key={todo} className="flex items-start gap-2">
                <TodoMark />
                <span>{todo}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </Reveal>
    </Section>
  );
}

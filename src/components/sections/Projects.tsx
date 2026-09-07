import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { StatusDot } from "@/components/ui/StatusDot";
import { SECTION_IDS, type Link, type ProjectsContent } from "@/content/types";

/**
 * Seccion de proyectos.
 *
 * Una sola columna a ancho completo, no una rejilla: son cuatro fichas con
 * parrafo largo, y en dos columnas el texto se queda en ~34ch, la mitad del
 * ancho de lectura comodo. Apiladas, cada `contribution` cabe en `max-w-measure`.
 *
 * Componente de servidor: la animacion de entrada la pone `Reveal`, que ya es
 * cliente por dentro.
 */

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

/**
 * Un enlace de proyecto.
 *
 * Un `href` de "#" es un hueco de contenido, no un destino: se pinta como texto
 * apagado y NO como <a>, para que no aparezca en el orden de tabulacion ni
 * prometa una navegacion que no existe.
 */
function ProjectLink({ link }: { link: Link }) {
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

export function Projects({ content }: { content: ProjectsContent }) {
  return (
    <Section
      id={SECTION_IDS.projects}
      eyebrow={content.eyebrow}
      heading={content.heading}
      intro={content.intro}
      tone="base"
    >
      <ul className="flex flex-col gap-6 md:gap-8">
        {content.items.map((project, i) => (
          <Reveal as="li" key={project.id} delay={i * 80}>
            <Card as="article" className="gap-5">
              {/* En movil el estado cae debajo del nombre; a partir de `sm`
                  vuelve a la derecha, alineado por la linea de base del h3. */}
              <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 id={project.id} className="text-title font-semibold text-ink">
                  {project.name}
                </h3>

                <p className="flex shrink-0 items-center gap-2">
                  <StatusDot tone={project.status.tone} label={project.status.label} />
                  {/* El punto ya lleva la etiqueta como `aria-label`: aqui se
                      oculta al lector para no anunciar el estado dos veces. */}
                  <span aria-hidden="true" className="mono-label uppercase">
                    {project.status.label}
                  </span>
                </p>
              </header>

              <p className="max-w-measure text-lead text-muted">{project.summary}</p>

              {/* La aportacion es lo que de verdad se lee: se separa del resumen
                  con una driza de acento y subiendo el texto a `ink`. */}
              <p className="max-w-measure border-l-2 border-accent/70 pl-4 text-body text-ink md:pl-5">
                {project.contribution}
              </p>

              <ul className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>

              {project.links.length > 0 ? (
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-small">
                  {project.links.map((link) => (
                    <li key={link.label}>
                      <ProjectLink link={link} />
                    </li>
                  ))}
                </ul>
              ) : null}

              {project.todos && project.todos.length > 0 ? (
                <ul className="flex flex-col gap-1.5 border-t border-line pt-4 text-micro text-faint">
                  {project.todos.map((todo) => (
                    <li key={todo} className="flex items-start gap-2">
                      <TodoMark />
                      <span>{todo}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

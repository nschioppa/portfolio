import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { StatusDot } from "@/components/ui/StatusDot";
import { SECTION_IDS, type EducationContent } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Formacion: estudios a la izquierda, herramientas y certificaciones a la
 * derecha. Dos columnas a partir de `lg` y una sola en movil.
 *
 * Los estudios en curso (`current`) se marcan por DOS vias visuales y ninguna
 * de texto: el punto que late al lado del centro y el filete vertical en el
 * acento que recorre la entrada. Dos senales porque el punto de 8px solo se
 * pierde al mirar por encima, y aqui no hay ninguna etiqueta escrita que
 * pueda decir "en curso" sin inventarsela.
 */
export function Education({ content }: { content: EducationContent }) {
  return (
    <Section
      id={SECTION_IDS.education}
      eyebrow={content.eyebrow}
      heading={content.heading}
      tone="base"
    >
      {/* minmax(0,...) en las dos columnas: sin el, una badge larga (hay una
          con un TODO entero dentro) ensancha la pista y desborda a lo ancho. */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <Reveal>
          <ul>
            {content.studies.map((study, index) => (
              <li key={`${study.institution}-${study.period}`}>
                {/* Separador entre estudios. El primero no lo lleva. */}
                {index > 0 ? <hr className="rule-soft my-8" /> : null}

                <article className="relative pl-5">
                  {/* Filete vertical: en el acento si el estudio sigue abierto,
                      en la hairline de reposo si ya se cerro. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1.5 bottom-1.5 left-0 w-px rounded-pill",
                      study.current ? "bg-accent/55" : "bg-line",
                    )}
                  />

                  <h3 className="text-title font-semibold text-ink">
                    {study.institution}
                    {/* Sin `label`: el punto es decorativo. El dato de que esta
                        en curso ya lo lleva el periodo escrito al lado, y no
                        hay texto en el contenido para nombrarlo dos veces. */}
                    {study.current ? (
                      <StatusDot tone="live" className="ml-2.5 align-middle" />
                    ) : null}
                  </h3>

                  <p className="mt-1.5 text-body text-muted">{study.degree}</p>

                  <p className="mono-label mt-3">{study.period}</p>

                  {study.note ? (
                    <p className="mt-2.5 max-w-narrow text-small text-faint">{study.note}</p>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={90}>
          <div className="rounded-card border border-line bg-surface-2 p-6 md:p-7">
            <ul className="space-y-7">
              {content.skills.map((group) => (
                <li key={group.label}>
                  <h3 className="mono-label uppercase">{group.label}</h3>

                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="max-w-full">
                        {/* `break-words` para que un item largo parta dentro de
                            la pastilla en vez de estirarla mas alla de 360px. */}
                        <Badge className="max-w-full break-words">{item}</Badge>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {content.todos?.length ? (
        <ul className="mt-12 space-y-1">
          {content.todos.map((todo) => (
            <li key={todo} className="text-micro text-faint">
              {todo}
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

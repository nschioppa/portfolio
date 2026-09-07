import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type AboutContent } from "@/content/types";

export function About({ content }: { content: AboutContent }) {
  return (
    <Section
      id={SECTION_IDS.about}
      eyebrow={content.eyebrow}
      heading={content.heading}
      tone="base"
      // 3/5 para el texto y 2/5 para la ficha: la columna de lectura se queda
      // cerca de `measure` a 1152px sin que la ficha se estire de mas.
      bodyClassName="grid gap-12 lg:grid-cols-5 lg:gap-16"
    >
      <Reveal className="lg:col-span-3">
        <div className="space-y-5">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} className="max-w-measure text-lead text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        {content.todos && content.todos.length > 0 ? (
          <>
            <hr className="rule-soft mt-8 max-w-measure" />
            {/* A la vista a proposito: son recordatorios de lo que falta. */}
            <ul className="mt-6 max-w-measure space-y-1.5 border-l border-line pl-4">
              {content.todos.map((todo) => (
                <li key={todo} className="text-micro text-faint">
                  {todo}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </Reveal>

      <Reveal delay={120} className="lg:col-span-2">
        {/* Panel estatico, no <Card>: la tarjeta se ilumina al pasar por encima
            y aqui no hay nada que pulsar, asi que ese brillo mentiria.
            `divide-y` separa las filas SIN meter un <hr> dentro del <dl>, que
            solo admite dt/dd (o divs que los envuelvan). */}
        <dl className="divide-y divide-line rounded-card border border-line bg-surface-2 p-6 md:p-7">
          {content.facts.map((fact) => (
            <div
              key={fact.label}
              // En movil la etiqueta va encima del valor; desde sm, dos
              // columnas con la primera fija para que todas las filas alineen.
              className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-4"
            >
              <dt className="mono-label uppercase sm:pt-1">{fact.label}</dt>
              <dd className="text-small text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type HackathonsContent } from "@/content/types";

/**
 * Seccion de hackathons.
 *
 * Deliberadamente NO son tarjetas como las de proyectos: cuatro tarjetas mas
 * competirian con los proyectos, que es donde esta lo construido. Aqui la
 * unidad de lectura es la fila, con el ano a la izquierda, para que se vea de
 * un vistazo que son cuatro y que hay una continuidad en el tiempo.
 *
 * Componente de servidor: la animacion la pone `Reveal`, que ya es cliente.
 */
export function Hackathons({ content }: { content: HackathonsContent }) {
  return (
    <Section
      id={SECTION_IDS.hackathons}
      eyebrow={content.eyebrow}
      heading={content.heading}
      tone="band"
      intro={content.intro}
    >
      <ol className="mt-4">
        {content.items.map((item, index) => (
          <Reveal
            as="li"
            key={item.id}
            delay={index * 70}
            // La primera fila no lleva linea arriba: la separacion con el
            // encabezado de la seccion ya la marca el margen.
            className="border-t border-line py-8 first:border-t-0 first:pt-0 last:pb-0"
          >
            <div className="grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-8">
              {/* 2px de desplazamiento para que el ano case con la primera
                  linea del titulo, que tiene mas interlineado. */}
              <p className="mono-label md:mt-[2px]">{item.period}</p>

              <div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="text-title text-ink">{item.name}</h3>

                  {item.result ? (
                    <span className="rounded-pill border border-accent/50 px-2.5 py-0.5 font-mono text-micro uppercase tracking-[0.08em] text-accent">
                      {item.result}
                    </span>
                  ) : null}
                </div>

                <p className="mt-1 font-mono text-micro uppercase tracking-[0.08em] text-faint">
                  {item.event}
                </p>

                <p className="mt-3 max-w-measure text-body text-muted">
                  {item.description}
                </p>

                {item.todos?.length ? (
                  <ul className="mt-4 space-y-1">
                    {item.todos.map((todo) => (
                      <li key={todo} className="text-micro text-faint">
                        {todo}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      {content.todos?.length ? (
        <ul className="mt-10 space-y-1">
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

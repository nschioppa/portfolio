import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type EducationContent } from "@/content/types";

export function Education({ content }: { content: EducationContent }) {
  return (
    <Section id={SECTION_IDS.education} eyebrow={content.eyebrow} heading={content.heading} tone="band">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-20">
        <Reveal>
          <ul className="ml-1 border-l border-line">
            {content.studies.map((study) => (
              <li key={study.institution + study.period} className="relative pb-9 pl-7 last:pb-0">
                <span aria-hidden="true" className={study.current ? "absolute -left-[4.5px] top-2 size-2 rounded-full bg-accent" : "absolute -left-[4.5px] top-2 size-2 rounded-full bg-faint"} />
                <article>
                  <p className="mono-label">{study.period}</p>
                  <h3 className="mt-2 text-title font-medium text-ink">{study.institution}</h3>
                  <p className="mt-2 text-body text-muted">{study.degree}</p>
                  {study.note ? <p className="mt-2 max-w-narrow text-small text-faint">{study.note}</p> : null}
                </article>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={90}>
          <ul className="space-y-6">
            {content.skills.map((group) => (
              <li key={group.label} className="border-t border-line pt-4">
                <h3 className="font-mono text-micro uppercase tracking-[.1em] text-faint">{group.label}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => <li key={item} className="max-w-full"><Badge className="max-w-full break-words">{item}</Badge></li>)}
                </ul>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

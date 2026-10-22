import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type AboutContent } from "@/content/types";

export function About({ content }: { content: AboutContent }) {
  return (
    <Section id={SECTION_IDS.about} eyebrow={content.eyebrow} heading={content.heading} tone="band" bodyClassName="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-20">
      <Reveal>
        <div className="space-y-5">
          {content.paragraphs.map((paragraph) => <p key={paragraph} className="max-w-measure text-lead text-muted">{paragraph}</p>)}
        </div>
      </Reveal>
      <Reveal delay={90}>
        <dl className="border-t border-line">
          {content.facts.map((fact) => (
            <div key={fact.label} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
              <dt className="font-mono text-micro uppercase tracking-[.08em] text-faint sm:pt-1">{fact.label}</dt>
              <dd className="text-small text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

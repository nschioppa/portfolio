import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type HackathonsContent } from "@/content/types";

export function Hackathons({ content }: { content: HackathonsContent }) {
  if (content.items.length === 0) return null;

  return (
    <Section id={SECTION_IDS.hackathons} eyebrow={content.eyebrow} heading={content.heading} intro={content.intro} className="border-t border-line">
      <ol className="grid gap-x-12 md:grid-cols-2 lg:gap-x-20">
        {content.items.map((item, index) => (
          <Reveal as="li" key={item.id} delay={index * 50} className="border-t border-line py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="mono-label">{item.period}</p>
              {item.result ? <span className="font-mono text-micro font-medium uppercase tracking-[.06em] text-accent">{item.result}</span> : null}
            </div>
            <h3 className="mt-3 text-title font-medium text-ink">{item.name}</h3>
            <p className="mt-1 text-small text-faint">{item.event}</p>
            <p className="mt-3 max-w-measure text-small text-muted">{item.description}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

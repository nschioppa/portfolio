import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type AboutContent } from "@/content/types";

export function About({ content }: { content: AboutContent }) {
  return (
    <Section id={SECTION_IDS.about} eyebrow={content.eyebrow} heading={content.heading} tone="band" bodyClassName="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:gap-x-20">
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
      <Reveal as="figure" className="grid overflow-hidden rounded-card border border-line bg-deep md:grid-cols-[.9fr_1.1fr] lg:col-span-2">
          <figcaption className="relative z-10 flex flex-col justify-center px-6 py-9 text-[#f7f5ef] sm:px-10 md:py-12">
            <p className="font-mono text-eyebrow uppercase tracking-[.16em] text-[#a9cec6]">{content.photo.eyebrow}</p>
            <h3 className="mt-5 max-w-[17ch] font-serif text-display font-normal">{content.photo.title}</h3>
            <p className="mt-5 max-w-[40ch] text-small text-[#cfdddd]">{content.photo.body}</p>
            <span aria-hidden="true" className="mt-8 h-px w-12 bg-[#a9cec6]/60" />
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[.12em] text-[#a9cec6]">{content.photo.caption}</p>
          </figcaption>
          <div className="sailing-photo relative min-h-72 overflow-hidden sm:min-h-96 md:min-h-[440px]">
            <Image src="/images/nicolas-sailing.webp" alt={content.photo.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1240px) 55vw, 650px" className="object-cover object-[42%_50%]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#102c36]/15 mix-blend-multiply" />
            <svg aria-hidden="true" viewBox="0 0 600 460" fill="none" className="pointer-events-none absolute inset-0 h-full w-full text-white/45" preserveAspectRatio="xMidYMid slice">
              <path d="M456 68C388 122 521 175 461 243s-119 28-161 91" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 7" />
              <circle cx="456" cy="68" r="6" stroke="currentColor" /><circle cx="300" cy="334" r="6" stroke="currentColor" />
              <path d="M533 331v28m-14-14h28" stroke="currentColor" strokeWidth=".8" />
            </svg>
          </div>
      </Reveal>
    </Section>
  );
}

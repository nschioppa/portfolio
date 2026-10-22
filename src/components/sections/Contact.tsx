import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS, type ContactContent } from "@/content/types";

export function Contact({ content }: { content: ContactContent }) {
  const [primaryLink, ...otherLinks] = content.links;

  return (
    <Section id={SECTION_IDS.contact} eyebrow={content.eyebrow} heading={content.heading} className="contact-section overflow-hidden">
      <Reveal>
        <p className="max-w-measure text-lead text-muted">{content.blurb}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href={primaryLink.href} {...(primaryLink.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group inline-flex min-h-14 items-center gap-5 rounded-pill bg-ink px-6 py-4 text-body font-medium text-[color:var(--color-base)] transition-colors hover:bg-accent motion-reduce:transition-none">
            <span>{primaryLink.label}</span>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none">
              <path d="M5 15 15 5M5 5h10v10" />
            </svg>
          </a>
          <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {otherLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="link-underline inline-flex min-h-11 items-center gap-2 text-small text-ink transition-colors hover:text-accent motion-reduce:transition-none">
                  {link.label}
                  {link.external ? <span aria-hidden="true">↗</span> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

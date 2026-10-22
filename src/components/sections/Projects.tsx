import { Badge } from "@/components/ui/Badge";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { StatusDot } from "@/components/ui/StatusDot";
import { SECTION_IDS, type Link, type ProjectsContent } from "@/content/types";

function ProjectLink({ link }: { link: Link }) {
  if (!link.href || link.href === "#") return null;

  if (link.external) {
    return <ExternalLink href={link.href} className="min-h-11 font-medium">{link.label}</ExternalLink>;
  }

  return (
    <a href={link.href} className="link-underline inline-flex min-h-11 items-center font-medium text-ink hover:text-accent">
      {link.label}
    </a>
  );
}

/** Decorative studies of each project's subject, rather than product screenshots. */
function ProjectIllustration({ id }: { id: string }) {
  return (
    <div aria-hidden="true" className="relative flex h-44 items-center justify-center overflow-hidden rounded-[2px] border border-line bg-surface md:h-full md:min-h-60">
      <svg viewBox="0 0 400 260" fill="none" className="h-full w-full text-accent" focusable="false">
        <path d="M0 65H400M0 130H400M0 195H400M100 0V260M200 0V260M300 0V260" stroke="currentColor" opacity=".09" />
        {id === "p2p-sail" ? (
          <>
            <circle cx="200" cy="128" r="91" stroke="currentColor" strokeDasharray="2 7" opacity=".28" />
            <path d="M207 46V180L130 180L207 46Z" fill="currentColor" opacity=".82" />
            <path d="M220 73V180H276L220 73Z" fill="currentColor" opacity=".22" />
            <path d="M119 193H285L270 207H137L119 193Z" fill="currentColor" />
            <path d="M92 224C110 215 129 233 147 224C165 215 184 233 202 224C220 215 239 233 257 224C275 215 294 233 312 224" stroke="currentColor" opacity=".4" />
          </>
        ) : id === "voice-assistant" ? (
          <>
            <circle cx="200" cy="130" r="87" stroke="currentColor" opacity=".15" />
            <circle cx="200" cy="130" r="108" stroke="currentColor" strokeDasharray="2 9" opacity=".23" />
            {[24, 45, 72, 48, 111, 150, 91, 126, 66, 36, 56, 24].map((height, index) => (
              <rect key={index} x={102 + index * 17} y={130 - height / 2} width="5" height={height} rx="2.5" fill="currentColor" opacity={index > 3 && index < 8 ? ".9" : ".38"} />
            ))}
            <circle cx="200" cy="130" r="5" fill="var(--color-base)" />
          </>
        ) : (
          <>
            <path d="M77 66V204H327" stroke="currentColor" opacity=".25" />
            <path d="M102 175V204M145 145V204M188 167V204M231 114V204M274 94V204M317 63V204" stroke="currentColor" strokeWidth="15" opacity=".12" />
            <path d="M93 164C117 164 125 129 148 129C172 129 173 155 197 149C222 143 229 98 255 101C279 104 297 67 318 64" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="318" cy="64" r="5" fill="currentColor" />
            <circle cx="318" cy="64" r="13" stroke="currentColor" opacity=".4" />
          </>
        )}
        <path d="M20 20H32M26 14V26M368 240H380M374 234V246" stroke="currentColor" opacity=".4" />
      </svg>
    </div>
  );
}

export function Projects({ content }: { content: ProjectsContent }) {
  return (
    <Section id={SECTION_IDS.projects} eyebrow={content.eyebrow} heading={content.heading} intro={content.intro}>
      <ol>
        {content.items.map((project, index) => (
          <Reveal as="li" key={project.id} delay={index * 60} className="border-t border-line py-8 first:pt-8 md:py-11">
            <article aria-labelledby={project.id} className="grid gap-6 md:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] md:gap-10 lg:gap-16">
              <ProjectIllustration id={project.id} />
              <div className="min-w-0">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span aria-hidden="true" className="font-mono text-micro tracking-[.14em] text-faint">{String(index + 1).padStart(2, "0")}</span>
                  <p className="flex items-center gap-2 text-micro text-muted">
                    <StatusDot tone={project.status.tone} />
                    {project.status.label}
                  </p>
                </div>
                <h3 id={project.id} className="font-serif text-[clamp(1.6rem,2.5vw,2.15rem)] leading-tight tracking-[-.025em] text-ink">
                  {project.name}
                </h3>
                <p className="mt-3 max-w-measure text-body text-ink">{project.summary}</p>
                <p className="mt-3 max-w-measure text-small text-muted">{project.contribution}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <li key={tag}><Badge>{tag}</Badge></li>)}
                </ul>
                {project.links.some((link) => link.href && link.href !== "#") ? (
                  <ul className="mt-3 flex flex-wrap gap-x-6 text-small">
                    {project.links.map((link) => <li key={link.label}><ProjectLink link={link} /></li>)}
                  </ul>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

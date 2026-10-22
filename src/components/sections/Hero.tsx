import { SoftwareChart } from "@/components/SoftwareChart";
import type { HeroContent, Link } from "@/content/types";

function HeroLink({ link, primary = false }: { link: Link; primary?: boolean }) {
  return (
    <a
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={primary
        ? "group inline-flex min-h-12 items-center justify-center gap-5 rounded-pill bg-ink px-6 py-3 text-small font-medium text-[color:var(--color-base)] transition-colors hover:bg-accent motion-reduce:transition-none"
        : "group inline-flex min-h-12 items-center justify-center gap-3 px-3 py-3 text-small font-medium text-ink transition-colors hover:text-accent motion-reduce:transition-none"}
    >
      {link.label}
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
        <path d={link.external ? "M5 15 15 5M5 5h10v10" : "M3 10h14m-5-5 5 5-5 5"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export function Hero({ content }: { content: HeroContent }) {
  const [firstName, ...lastName] = content.name.split(" ");
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-line pb-6 pt-28 md:pt-36">
      <div className="shell">
        <div className="grid items-center gap-8 pb-10 md:min-h-[620px] md:grid-cols-[1.1fr_1fr] md:gap-10 md:pb-16">
          <div className="relative z-10">
            <p className="eyebrow flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-7 bg-accent" />
              {content.location}
            </p>
            <h1 id="hero-title" className="mt-7 font-serif text-hero font-normal md:mt-8">
              <span className="block">{firstName}{" "}</span>
              <span className="block font-normal">{lastName.join(" ")}</span>
            </h1>
            <p className="mt-7 text-title font-medium tracking-tight">{content.roleLead}</p>
            <p className="mt-1 text-body text-muted">{content.roleAccent}</p>
            <div className="mt-5 max-w-[46ch] space-y-3 text-body text-muted">
              {content.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <HeroLink link={content.ctaPrimary} primary />
              <HeroLink link={content.ctaSecondary} />
              {content.ctaTertiary ? <HeroLink link={content.ctaTertiary} /> : null}
            </div>
          </div>
          <SoftwareChart content={content.chart} />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
          <a href="#projects" className="mono-label inline-flex min-h-11 items-center gap-3 hover:text-accent">
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4"><path d="M8 2v12m-4-4 4 4 4-4" stroke="currentColor" strokeWidth="1.2" /></svg>
            {content.scrollHint}
          </a>
          <span aria-hidden="true" className="mono-label hidden sm:inline">36°43′N 4°25′W&nbsp; ↗ &nbsp;45°28′N 9°11′E</span>
        </div>
      </div>
    </section>
  );
}

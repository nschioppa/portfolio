import type { SoftwareChartContent } from "@/content/types";

const blockClass = "absolute flex aspect-[2.5/1] w-[58%] items-center gap-3 rounded-[3px] border border-ink/65 bg-base px-3 sm:w-[43%] lg:gap-3.5 lg:px-4";
const labelClass = "text-small font-medium leading-tight text-ink lg:text-body";
const detailClass = "mt-1.5 hidden font-mono text-[10px] uppercase tracking-[.08em] text-muted sm:block";

/** Software architecture and the geometry of a racing sail, without client JS. */
export function SoftwareChart({ content }: { content: SoftwareChartContent }) {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mx-auto w-full max-w-[560px] select-none">
      <div className="flex items-center gap-3 border-b border-line pb-4">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-[10px] uppercase tracking-[.16em] text-muted sm:text-[11px]">{content.eyebrow}</span>
      </div>
      <div className="relative aspect-[560/480]">
        <svg viewBox="0 0 560 480" fill="none" focusable="false" className="absolute inset-0 h-full w-full">
          <g stroke="var(--color-line)" strokeWidth=".7" opacity=".45">
            <path d="M60 30v420M160 30v420M260 30v420M360 30v420M460 30v420M20 80h520M20 180h520M20 280h520M20 380h520" />
          </g>
          <g className="hidden sm:block">
            <g stroke="var(--color-ink)" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
              <path d="M241 120h40v86m-5-7 5 7 5-7M106 254H72v87m-5-7 5 7 5-7M30 341V168m-5 7 5-7 5 7" />
            </g>
            <g stroke="var(--color-accent)" strokeWidth=".9" strokeDasharray="4 6" opacity=".65">
              <path d="M241 389c69 1 80-32 88-93S313 148 347 53l184 297-184 65V53" />
              <path d="M241 120c75 0 83-5 106-67M347 415c87-78 139-173 100-262" />
            </g>
            <g fill="var(--color-base)" stroke="var(--color-accent)" strokeWidth="1">
              <circle cx="347" cy="53" r="6" />
              <circle cx="531" cy="350" r="6" />
              <circle cx="347" cy="415" r="6" />
            </g>
            <g fill="var(--color-ink)">
              <circle cx="347" cy="53" r="2" />
              <circle cx="531" cy="350" r="2" />
              <circle cx="347" cy="415" r="2" />
              <circle cx="434" cy="194" r="2.4" />
              <circle cx="347" cy="296" r="2.4" />
            </g>
            <g stroke="var(--color-ink)" strokeWidth="1.05" strokeLinejoin="round">
              <path d="m444 120-17 217 92-51Z" fill="var(--color-ink)" fillOpacity=".025" />
              <path d="m437 159-90 165 82-11Z" />
              <path d="m444 120-22 234" />
            </g>
            <g stroke="var(--color-accent)" strokeWidth=".6" opacity=".5">
              {Array.from({ length: 11 }, (_, i) => (
                <path key={i} d={`M${443 - i * 1.2} ${135 + i * 16} 519 286`} />
              ))}
              <path d="m444 120 24 195m-24-195 45 183m-45-183 63 172M437 159l-11 154m11-154-28 157m11-157-47 160m47-160-65 163" />
            </g>
            <path d="m365 82-5 15 13-8M490 337l11-11-15 2" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M514 56v28m-6-21 6-7 6 7" stroke="var(--color-line-hi)" strokeWidth="1" />
            <path d="M313 446h16m-8-8v16M486 165h14m-7-7v14" stroke="var(--color-line-hi)" strokeWidth=".9" />
          </g>
          <g className="sm:hidden" stroke="var(--color-ink)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M325 137h127v69m-6-8 6 8 6-8M179 271H90v70m-6-8 6 8 6-8" />
            <path d="M30 341V202m-6 8 6-8 6 8" stroke="var(--color-accent)" strokeDasharray="4 5" />
          </g>
        </svg>
        <div className={`${blockClass} left-0 top-[15%]`}>
          <svg viewBox="0 0 32 32" fill="none" className="size-6 shrink-0 text-ink lg:size-7" focusable="false">
            <path d="m16 3 11 6v14l-11 6-11-6V9Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="m5 9 11 6 11-6M16 15v14M11 6l11 6" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <div className="min-w-0">
            <p className={labelClass}>{content.app}</p>
            <p className={detailClass}>{content.appDetail}</p>
          </div>
        </div>
        <div className={`${blockClass} left-[32%] top-[43%] sm:left-[19%]`}>
          <svg viewBox="0 0 32 32" fill="none" className="size-6 shrink-0 text-ink lg:size-7" focusable="false">
            <rect x="5" y="4" width="22" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <rect x="5" y="18" width="22" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 9h1m4 0h7M10 23h1m4 0h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="min-w-0">
            <p className={labelClass}>{content.api}</p>
            <p className={detailClass}>{content.apiDetail}</p>
          </div>
        </div>
        <div className={`${blockClass} left-0 top-[71%]`}>
          <svg viewBox="0 0 32 32" fill="none" className="size-6 shrink-0 text-ink lg:size-7" focusable="false">
            <ellipse cx="16" cy="7" rx="11" ry="4" stroke="currentColor" strokeWidth="1.2" />
            <path d="M5 7v18c0 2.2 4.9 4 11 4s11-1.8 11-4V7M5 13c0 2.2 4.9 4 11 4s11-1.8 11-4M5 19c0 2.2 4.9 4 11 4s11-1.8 11-4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <div className="min-w-0">
            <p className={labelClass}>{content.data}</p>
            <p className={detailClass}>{content.dataDetail}</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[.1em] text-muted sm:text-[11px]">
        <span>{content.caption}</span>
        <span className="hidden whitespace-nowrap sm:inline">36°43′ N · 4°25′ W</span>
      </div>
    </div>
  );
}

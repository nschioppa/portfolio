import type { FooterContent } from "@/content/types";

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="contact-section border-t border-line">
      <div className="shell flex flex-col gap-4 py-7 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="text-small text-muted">{content.rights}</p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="text-micro text-faint">{content.builtWith}</p>
          <p className="font-mono text-micro tracking-[.08em] text-faint">{content.coordinates}</p>
        </div>
      </div>
    </footer>
  );
}

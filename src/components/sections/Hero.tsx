import { NauticalChart } from "@/components/NauticalChart";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Reveal } from "@/components/ui/Reveal";
import { StatusDot } from "@/components/ui/StatusDot";
import { SECTION_IDS, type HeroContent, type Link as ContentLink } from "@/content/types";
import { cn } from "@/lib/cn";

/** Forma comun de los tres botones: pastilla, ancho completo en movil. */
const CTA_SHAPE =
  "w-full justify-center rounded-pill px-6 py-3 text-small font-medium sm:w-auto " +
  "transition-colors duration-200 ease-out-soft motion-reduce:transition-none";

/**
 * Boton de llamada a la accion.
 *
 * El relleno usa `text-[color:var(--color-base)]` y no `text-base`, que en
 * Tailwind es un TAMANO de fuente y no el color de fondo de la pagina.
 *
 * El primario nunca pasa por <ExternalLink>: ese componente fija `text-ink`, y
 * un blanco sobre el acento se queda en 1.75:1. Si algun dia el CTA principal
 * apunta fuera, se abre igual en pestana nueva pero con el color correcto.
 */
function Cta({ link, variant }: { link: ContentLink; variant: "primary" | "ghost" }) {
  if (variant === "ghost" && link.external) {
    return (
      <ExternalLink
        href={link.href}
        className={cn(CTA_SHAPE, "border border-line-hi hover:border-accent/60 hover:bg-surface-2")}
      >
        {link.label}
      </ExternalLink>
    );
  }

  const external = link.external === true;

  return (
    <a
      href={link.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center gap-2",
        CTA_SHAPE,
        variant === "primary"
          ? "bg-accent text-[color:var(--color-base)] font-semibold hover:bg-accent-dim"
          : "border border-line-hi text-ink hover:border-accent/60 hover:bg-surface-2 hover:text-accent",
      )}
    >
      {link.label}
    </a>
  );
}

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      aria-labelledby="hero-title"
      // `min-h-svh` y no `100vh`: en movil el 100vh cuenta con la barra del
      // navegador retraida y el contenido se sale por abajo. Es MINIMO, asi que
      // si la bio y los todos no caben, la seccion crece en vez de cortar.
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-20 pt-28 md:pb-28 md:pt-32"
    >
      <NauticalChart variant="hero" />

      <div className="shell relative">
        <Reveal>
          <p className="inline-flex items-center gap-2.5 rounded-pill border border-line bg-surface/70 px-3.5 py-1.5 text-small text-muted">
            <StatusDot tone="live" />
            {content.location}
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-8 md:mt-10">
          <h1 id="hero-title" className="text-hero text-ink">
            {content.name}
          </h1>

          {/* El rol va FUERA del h1: el titulo de la pagina es el nombre, y la
              linea de rol es un subtitulo. Dentro del h1 el lector de pantalla
              anunciaria las tres lineas como un solo encabezado larguisimo. */}
          <p className="mt-4 text-title font-medium md:mt-5 md:text-display">
            <span className="block text-ink">{content.roleLead}</span>
            <span className="block text-accent">{content.roleAccent}</span>
          </p>
        </Reveal>

        <Reveal delay={160} className="mt-8 space-y-4 md:mt-10">
          {content.bio.map((paragraph) => (
            <p key={paragraph} className="max-w-measure text-lead text-muted">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal
          delay={240}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-12"
        >
          <Cta link={content.ctaPrimary} variant="primary" />
          <Cta link={content.ctaSecondary} variant="ghost" />
          {content.ctaTertiary ? <Cta link={content.ctaTertiary} variant="ghost" /> : null}
        </Reveal>

        {content.todos && content.todos.length > 0 ? (
          <Reveal delay={300} className="mt-10">
            {/* A la vista a proposito: son recordatorios de lo que falta. */}
            <ul className="max-w-measure space-y-1.5 border-l border-line pl-4">
              {content.todos.map((todo) => (
                <li key={todo} className="text-micro text-faint">
                  {todo}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        <Reveal delay={360} className="mt-14 md:mt-20">
          <a
            href={`#${SECTION_IDS.about}`}
            className="mono-label inline-flex items-center gap-2 hover:text-accent focus-visible:text-accent"
          >
            {content.scrollHint}
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              focusable="false"
              // `animate-bounce` sobre 14px de icono son ~3px de recorrido, y a
              // 2.4s por ciclo se lee como una respiracion, no como un rebote.
              className="size-3.5 animate-bounce [animation-duration:2.4s] motion-reduce:animate-none"
            >
              <path d="M8 2.5v11" />
              <path d="M3.75 9.25 8 13.5l4.25-4.25" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

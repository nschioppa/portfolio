import type { FooterContent } from "@/content/types";

/**
 * Pie del sitio: una barra sobria detras de la franja de contacto.
 *
 * Sin Reveal a proposito. El pie no es contenido que se descubra al bajar: es
 * el borde de la pagina, y animarlo solo retrasa lo unico que se busca aqui,
 * que es saber de quien es el sitio.
 */
export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className="border-t border-line bg-base">
      <div className="shell flex flex-col items-center gap-3 py-8 text-center md:flex-row md:items-center md:justify-between md:gap-6 md:py-10 md:text-left">
        <p className="text-small text-muted">{content.rights}</p>

        <div className="flex flex-col items-center gap-1.5 md:flex-row md:gap-5">
          <p className="text-small text-faint">{content.builtWith}</p>

          {/* Las coordenadas en mono: es el guino nautico del pie y se lee como
              un dato de instrumento, no como una frase. */}
          <p className="mono-label">{content.coordinates}</p>
        </div>
      </div>
    </footer>
  );
}

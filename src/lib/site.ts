/**
 * Datos del sitio que no son copy y por tanto no dependen del idioma.
 */

/**
 * URL canonica. En Vercel se resuelve sola:
 *   - produccion con dominio propio -> define NEXT_PUBLIC_SITE_URL en el panel
 *   - despliegues de preview        -> VERCEL_URL, que Vercel inyecta
 *   - local                         -> localhost
 * Hace falta absoluta para las etiquetas Open Graph: un og:image relativo no
 * lo resuelve ni LinkedIn ni WhatsApp.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://nicoschioppa.com";

export const AUTHOR = "Nicolás Schioppa";

export const GITHUB_URL = "https://github.com/nschioppa";

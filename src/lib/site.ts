/**
 * Datos del sitio que no son copy y por tanto no dependen del idioma.
 */

/**
 * Dominio publico para canonicals, sitemap y datos estructurados, incluso en
 * previews. NEXT_PUBLIC_SITE_URL permite sustituirlo al cambiar de dominio.
 * Open Graph tambien necesita una URL absoluta.
 */
export const SITE_URL: string =
  (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nicoschioppa.com").replace(/\/+$/, "");

export const AUTHOR = "Nicolás Schioppa";

export const GITHUB_URL = "https://github.com/nschioppa";

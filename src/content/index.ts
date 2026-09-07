import type { Content, Lang } from "./types";
import { LANGS } from "./types";
import { es } from "./es";
import { en } from "./en";

/** Los dos diccionarios, indexados por idioma. */
export const dictionaries: Record<Lang, Content> = { es, en };

export function getContent(lang: Lang): Content {
  return dictionaries[lang];
}

/** El otro idioma. Con dos, el selector es un simple ida y vuelta. */
export function otherLang(lang: Lang): Lang {
  return lang === "es" ? "en" : "es";
}

/** Valida el segmento de la URL antes de usarlo como idioma. */
export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Como se llama cada idioma en su propio idioma, para el selector. */
export const LANG_LABELS: Record<Lang, string> = {
  es: "Español",
  en: "English",
};

export * from "./types";

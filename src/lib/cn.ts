/** Valores que se aceptan como clase: la cadena, o algo falsy que se descarta. */
export type ClassValue = string | false | null | undefined;

/** Junta clases y tira lo falsy. Tres lineas para no traer clsx por esto. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/**
 * Contrato de contenido del portfolio.
 *
 * Todo el texto visible del sitio vive en `es.ts` y `en.ts` y sale de aqui.
 * Los componentes no llevan texto escrito a mano: si algo se ve en pantalla,
 * esta en este tipo. Asi se edita el copy sin abrir un solo componente, y si
 * falta una clave en un idioma el build no pasa.
 */

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en"; // el publico objetivo son recruiters en Milan

/** Estado de un proyecto. El tono decide el color del punto en la tarjeta. */
export type StatusTone = "live" | "building" | "exploring" | "done";

export interface Link {
  label: string;
  href: string;
  /** Si es true se abre en pestana nueva y lleva el icono de enlace externo. */
  external?: boolean;
}

export interface NavContent {
  /** El href es un ancla del tipo "#proyectos" (mismo id en los dos idiomas). */
  items: Link[];
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  /** Etiqueta accesible del selector de idioma. */
  languageLabel: string;
}

export interface SoftwareChartContent {
  eyebrow: string;
  app: string;
  appDetail: string;
  api: string;
  apiDetail: string;
  data: string;
  dataDetail: string;
  caption: string;
}

export interface HeroContent {
  /** Chip de arriba: "Milan, Italia - Erasmus". */
  location: string;
  name: string;
  /** Primera linea del titulo, en blanco. */
  roleLead: string;
  /** Segunda linea, en el color de acento. */
  roleAccent: string;
  /** 2-3 frases. Cada elemento es un parrafo. */
  bio: string[];
  ctaPrimary: Link;
  ctaSecondary: Link;
  ctaTertiary?: Link;
  scrollHint: string;
  chart: SoftwareChartContent;
  /** Cosas pendientes. Se pintan visibles y en gris para que no se olviden. */
  todos?: string[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  facts: Fact[];
  photo: {
    alt: string;
    eyebrow: string;
    title: string;
    body: string;
    caption: string;
  };
  /** Cosas pendientes. Se pintan visibles y en gris para que no se olviden. */
  todos?: string[];
}

export interface Project {
  /** Identificador estable, igual en los dos idiomas. Sirve de key y de ancla. */
  id: string;
  name: string;
  status: { label: string; tone: StatusTone };
  /** Una frase: que es. */
  summary: string;
  /** Que resolvi / que aprendi. 1-2 frases, es lo que le interesa a un recruiter. */
  contribution: string;
  /** Stack y skills. Se pintan como badges. */
  tags: string[];
  links: Link[];
  /** Cosas que faltan. Se renderizan visibles, en gris, para no olvidarlas. */
  todos?: string[];
}

export interface ProjectsContent {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: Project[];
}

export interface Study {
  institution: string;
  degree: string;
  period: string;
  note?: string;
  /** Marca el estudio en curso con un punto vivo. */
  current?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Hackathon {
  /** Identificador estable, igual en los dos idiomas. */
  id: string;
  name: string;
  /** Quien lo organiza y donde. */
  event: string;
  period: string;
  /** El puesto, si lo hubo. Se pinta destacado: es lo que mira un recruiter. */
  result?: string;
  description: string;
  todos?: string[];
}

export interface HackathonsContent {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: Hackathon[];
  todos?: string[];
}

export interface EducationContent {
  eyebrow: string;
  heading: string;
  studies: Study[];
  skills: SkillGroup[];
  /** Cosas pendientes. Se pintan visibles y en gris para que no se olviden. */
  todos?: string[];
}

export interface ContactContent {
  eyebrow: string;
  heading: string;
  blurb: string;
  /** El primer enlace es el contacto principal; los demas son secundarios. */
  links: [Link, ...Link[]];
  /** Cosas pendientes. Se pintan visibles y en gris para que no se olviden. */
  todos?: string[];
}

export interface FooterContent {
  rights: string;
  builtWith: string;
  /** Guino nautico: las coordenadas de donde estoy. */
  coordinates: string;
}

export interface MetaContent {
  /** <title> de la pagina. */
  title: string;
  description: string;
  /** Linea que aparece en la imagen de Open Graph. */
  ogTagline: string;
  keywords: string[];
  /** Texto alternativo de la imagen social. */
  ogImageAlt: string;
}

export interface Content {
  meta: MetaContent;
  nav: NavContent;
  hero: HeroContent;
  about: AboutContent;
  projects: ProjectsContent;
  hackathons: HackathonsContent;
  education: EducationContent;
  contact: ContactContent;
  footer: FooterContent;
}

/** Ids de las secciones. Son los mismos en los dos idiomas para que el
 *  selector de idioma pueda conservar el ancla al cambiar de ruta. */
export const SECTION_IDS = {
  about: "about",
  projects: "projects",
  hackathons: "hackathons",
  education: "education",
  contact: "contact",
} as const;

"use client";

import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import { LANG_LABELS, otherLang } from "@/content";
import { LANGS, SECTION_IDS, type Lang, type NavContent } from "@/content/types";
import { cn } from "@/lib/cn";

/** Id del panel de enlaces. Lo apunta el boton con aria-controls. */
const MENU_ID = "nav-menu";

/**
 * Desplazamiento a partir del cual la barra deja de ser transparente. 40px es
 * la altura del chip de ubicacion del hero: en cuanto ese chip empieza a
 * meterse debajo de la barra, la barra necesita fondo para no mezclarse.
 */
const SCROLL_THRESHOLD = 40;

/** El breakpoint `md` de Tailwind (48rem), para cerrar el menu en escritorio. */
const DESKTOP_QUERY = "(min-width: 48rem)";

/** Las secciones en orden de documento, para el resaltado del enlace activo. */
const SECTION_ORDER = Object.values(SECTION_IDS);

/**
 * Que seccion cruza la linea de lectura, medido en el momento en que se
 * pregunta. Devuelve null arriba del todo, donde manda el hero y no hay ancla
 * que conservar.
 *
 * El 45% del alto de la ventana es la misma linea que usa el resaltado del
 * enlace activo, para que las dos cosas coincidan siempre.
 */
function sectionInView(): string | null {
  const linea = window.innerHeight * 0.45;

  for (const id of SECTION_ORDER) {
    const node = document.getElementById(id);
    if (!node) continue;

    const { top, bottom } = node.getBoundingClientRect();
    if (top <= linea && bottom >= linea) return id;
  }

  return null;
}

export function Nav({ content, lang }: { content: NavContent; lang: Lang }) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const closeMenu = useCallback(() => setOpen(false), []);

  // Fondo de la barra segun el scroll. Listener pasivo: no llama a
  // preventDefault, asi que el navegador no tiene que esperarlo para desplazar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll(); // por si la pagina carga ya desplazada (recarga sobre un ancla)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape cierra el menu y devuelve el foco al boton que lo abrio: si no, el
  // foco se queda en un panel que ya no esta y se pierde el sitio.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Al pasar a escritorio el panel lo esconde el CSS. Si quedara abierto en el
  // estado, el boton (que tampoco se ve) seguiria diciendo aria-expanded=true.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Al cargar la pagina con un ancla en la URL el navegador se queda arriba:
  // intenta saltar antes de que React hidrate y de que lleguen las fuentes, y
  // para entonces el destino todavia no esta donde va a acabar. Se corrige una
  // sola vez, ya montado. Vale tanto para el cambio de idioma como para un
  // enlace compartido del tipo /en#projects.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !document.getElementById(id)) return;

    // Si el lector ya ha tocado la rueda no se le mueve la pagina por debajo.
    let cancelado = false;
    const rendirse = () => {
      cancelado = true;
    };
    for (const evento of ["wheel", "touchstart", "keydown"] as const) {
      window.addEventListener(evento, rendirse, { once: true, passive: true });
    }

    // `instant` y no el comportamiento por defecto: el `scroll-behavior: smooth`
    // de la hoja de estilos convierte el salto en una animacion, y durante la
    // carga esa animacion se cancela sola y deja la pagina arriba.
    const saltar = () => {
      if (cancelado) return;
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    };

    // Dos pasadas. La primera en cuanto hidrata; la segunda a 250 ms, cuando ya
    // estan las fuentes y las alturas definitivas, porque si el destino se ha
    // movido la primera se queda corta.
    saltar();
    const reintento = setTimeout(saltar, 250);

    return () => {
      clearTimeout(reintento);
      for (const evento of ["wheel", "touchstart", "keydown"] as const) {
        window.removeEventListener(evento, rendirse);
      }
    };
  }, []);

  // Seccion visible, para resaltar su enlace.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const nodes = SECTION_ORDER.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    if (nodes.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Con varias secciones cruzando la banda gana la primera del documento.
        setActiveId(SECTION_ORDER.find((id) => visible.has(id)) ?? null);
      },
      // Banda estrecha en el centro de la pantalla (del 45% al 50% de alto):
      // la seccion activa es la que cruza la mitad del viewport, no la que
      // acaba de asomar por abajo.
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Con dos idiomas, el que no esta activo es siempre el otro.
  const target = otherLang(lang);

  const handleLangClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      // Clic con modificador o con otro boton = "abrir en otra pestana".
      // Ahi no interceptamos nada: es del navegador.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.button !== 0) return;

      // La seccion que se conserva es la que el lector TIENE DELANTE, medida
      // aqui mismo. Ni el hash de la URL ni `activeId` sirven: el hash se queda
      // con la ultima ancla pulsada y no vuelve a cambiar, y `activeId` depende
      // de que el observer haya llegado a disparar. Quien pulsaba "Contacto" y
      // luego subia arriba acababa en el pie de la otra version.
      event.preventDefault();

      const seccion = sectionInView();
      const destino = seccion ? `/${target}#${seccion}` : `/${target}`;

      // Navegacion del navegador y no `router.push`, a proposito. El router de
      // Next mantiene su propia idea de la URL: al empujar "/en" sin ancla le
      // pega el hash que el creia vigente (el de la ultima ancla pulsada) y
      // ademas conserva el desplazamiento entre rutas que comparten layout. El
      // resultado era caer en el pie de la otra version. `assign` produce
      // exactamente la URL que se le da, y ahi se acaba la discusion.
      //
      // El coste es una recarga completa, que aqui es lo correcto: cambiar de
      // idioma reemplaza todo el contenido y el atributo lang del documento.
      window.location.assign(destino);
    },
    [target],
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out-soft motion-reduce:transition-none",
        scrolled || open
          ? "border-b border-line bg-base/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Primer elemento enfocable de la pagina. Invisible hasta que recibe el
          foco, y entonces aparece arriba a la izquierda. */}
      <a
        href="#main"
        className={cn(
          "sr-only",
          "focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10",
          "focus:rounded-pill focus:border focus:border-accent focus:bg-base",
          "focus:px-4 focus:py-2 focus:text-small focus:text-accent",
        )}
      >
        {content.skipToContent}
      </a>

      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        {/* Iniciales, no copy: no dependen del idioma. */}
        {/* El area pulsable llega a 24x24 (WCAG 2.5.8) con padding; los
            margenes negativos lo compensan para que no mueva la barra. */}
        <Link
          href={`/${lang}`}
          className="-mx-2 -my-2 inline-flex items-center px-2 py-2 font-mono text-small font-medium tracking-[0.14em] text-ink transition-colors duration-200 ease-out-soft hover:text-accent motion-reduce:transition-none"
        >
          NS
        </Link>

        <nav className="flex items-center gap-2 md:gap-6">
          <div
            id={MENU_ID}
            className={cn(
              // En movil es un panel bajo la barra; desde md vuelve a la linea.
              "absolute inset-x-0 top-full border-b border-line bg-base/95 backdrop-blur-md",
              "md:static md:border-0 md:bg-transparent md:backdrop-blur-none",
              open ? "block" : "hidden md:block",
            )}
          >
            <ul className="flex flex-col gap-1 px-gutter py-4 md:flex-row md:items-center md:gap-1 md:px-0 md:py-0">
              {content.items.map((item) => {
                const active = item.href === `#${activeId}`;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={active ? "location" : undefined}
                      className={cn(
                        "block rounded-pill px-3 py-2.5 text-small transition-colors duration-200 ease-out-soft md:py-2",
                        "motion-reduce:transition-none",
                        active ? "text-accent" : "text-muted hover:text-ink",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            role="group"
            aria-label={content.languageLabel}
            className="flex items-center gap-1 font-mono text-micro uppercase"
          >
            {LANGS.map((code, index) => (
              <Fragment key={code}>
                {index > 0 ? (
                  // Separador visual, sin texto: la barra no es contenido.
                  <span aria-hidden="true" className="h-3 w-px bg-line-hi" />
                ) : null}

                {code === lang ? (
                  <span
                    lang={code}
                    aria-current="true"
                    className="inline-flex min-h-6 min-w-6 items-center justify-center text-accent"
                  >
                    {code}
                  </span>
                ) : (
                  // Un <a> pelado y no un <Link>: el Link intercepta el clic
                  // por su cuenta y navega con router.push, que arrastra el
                  // hash que tuviera la URL. Aqui hace falta que, cuando no
                  // hay seccion que conservar, mande el navegador y la URL
                  // salga limpia.
                  <a
                    href={`/${target}`}
                    lang={code}
                    hrefLang={code}
                    // El nombre accesible es el idioma escrito en su propio
                    // idioma; el codigo de dos letras se queda como visual.
                    aria-label={LANG_LABELS[code]}
                    onClick={handleLangClick}
                    className="inline-flex min-h-6 min-w-6 items-center justify-center rounded-pill text-faint transition-colors duration-200 ease-out-soft hover:text-ink focus-visible:text-ink motion-reduce:transition-none"
                  >
                    {code}
                  </a>
                )}
              </Fragment>
            ))}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? content.closeMenu : content.openMenu}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-pill border border-line text-ink md:hidden",
              "transition-colors duration-200 ease-out-soft hover:border-line-hi hover:bg-surface-2",
              "motion-reduce:transition-none",
            )}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="size-5"
              focusable="false"
            >
              {open ? (
                <>
                  <path d="M6 6 18 18" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 9h16" />
                  <path d="M4 15h16" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

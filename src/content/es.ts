import type { Content } from "./types";

/**
 * Contenido en castellano.
 *
 * Las cadenas visibles llevan tildes y signos correctos porque se renderizan
 * como HTML UTF-8. Los comentarios van sin tildes: la consola de Windows es
 * cp1252 y revienta.
 *
 * Las marcas de TODO son datos que faltan por confirmar. Se pintan a la vista
 * a proposito, para que no se olviden.
 */
export const es: Content = {
  meta: {
    title: "Nicolás Schioppa — Ingeniería del Software y vela de competición",
    description:
      "Estudiante de Ingeniería del Software en la Universidad de Málaga, ahora de Erasmus en el Politecnico di Milano. Busco prácticas de desarrollo en Milán.",
    ogTagline: "Ingeniería del Software en Málaga y Milán. ILCA 7 el resto del tiempo.",
    keywords: [
      "Nicolás Schioppa",
      "ingeniería del software",
      "desarrollador junior",
      "prácticas Milán",
      "Politecnico di Milano",
      "Universidad de Málaga",
      "Erasmus",
      "Next.js",
      "TypeScript",
      "ILCA 7",
      "vela",
    ],
    ogImageAlt:
      "Nicolás Schioppa — estudiante de Ingeniería del Software y regatista de ILCA 7.",
  },

  nav: {
    // Los anclas son los mismos en los dos idiomas (SECTION_IDS).
    items: [
      { label: "Sobre mí", href: "#about" },
      { label: "Proyectos", href: "#projects" },
      { label: "Vela", href: "#sailing" },
      { label: "Formación", href: "#education" },
      { label: "Contacto", href: "#contact" },
    ],
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageLabel: "Idioma",
  },

  hero: {
    location: "Milán, Italia — Erasmus",
    name: "Nicolás Schioppa",
    roleLead: "Ingeniero de software en formación",
    roleAccent: "y regatista de ILCA",
    bio: [
      "Estudio Ingeniería del Software en la Universidad de Málaga. Este curso lo hago en el Politecnico di Milano, donde llegué en septiembre con una beca Erasmus.",
      "Navego desde los siete años y compito en ILCA 7. Catorce temporadas de regatas y cuatro veranos entrenando a chicos me dejaron una idea que uso todos los días: una regata se gana en la preparación y se pierde en las decisiones pequeñas.",
      "Un proyecto se parece bastante a eso. Leer las condiciones, elegir un rumbo, corregir cuando el viento rola y no soltar la caña hasta el deploy.",
    ],
    ctaPrimary: { label: "Hablemos", href: "#contact" },
    ctaSecondary: {
      label: "GitHub",
      href: "https://github.com/nschioppa",
      external: true,
    },
    ctaTertiary: { label: "Descargar CV", href: "/cv.pdf", external: true },
    scrollHint: "Más abajo",
    todos: ["[TODO: subir el CV en PDF a public/cv.pdf]"],
  },

  about: {
    eyebrow: "Sobre mí",
    heading: "Dónde empecé y dónde estoy",
    paragraphs: [
      "Nací y crecí en Argentina. Tengo también la ciudadanía italiana, por familia, y hace años que vivo y estudio en España. Desde septiembre estoy en Milán.",
      "Mudarse de país es empezar de cero con los trámites, con los amigos y con la forma en la que se hace todo. Lo hice tres veces. La tercera se nota en lo rápido que uno deja de esperar que las cosas funcionen como en el sitio anterior.",
      "Ahora busco prácticas o un primer trabajo de desarrollo en Milán. Me interesan el backend y el diseño de sistemas: entender el problema entero antes de escribir la primera línea.",
    ],
    facts: [
      { label: "País de nacimiento", value: "Argentina" },
      { label: "Ciudadanía", value: "Italiana y argentina" },
      { label: "Base", value: "Málaga, España" },
      { label: "Ahora", value: "Milán, Italia" },
      {
        label: "Idiomas",
        value:
          "Español nativo · Inglés B2 Cambridge · Italiano [TODO: confirmar nivel]",
      },
    ],
  },

  projects: {
    eyebrow: "Proyectos",
    heading: "Lo que estoy construyendo",
    intro:
      "Cuatro cosas en las que trabajé o trabajo. Dos son código, dos son ideas de negocio que llegaron hasta donde llegaron.",
    items: [
      {
        id: "p2p-sail",
        name: "P2P Sail",
        status: { label: "En desarrollo", tone: "building" },
        summary:
          "Marketplace de compraventa de equipamiento náutico de segunda mano: velas, cascos, mástiles, accesorios.",
        contribution:
          "Lo empecé sin experiencia previa en web ni en bases de datos, así que el proyecto terminó siendo el curso: modelado de datos, arquitectura, UX y modelo de negocio. Decidí hacer la web primero y la app móvil después, con el backend, la autenticación y la lógica de negocio escritos para reutilizarse tal cual.",
        tags: [
          "Next.js",
          "TypeScript",
          "Prisma",
          "PostgreSQL",
          "Arquitectura",
          "Modelado de datos",
          "UX",
        ],
        links: [],
        todos: [
          "[TODO: confirmar el stack definitivo]",
          "[TODO: decidir si el repositorio va a ser público]",
          "[TODO: agregar captura de la aplicación]",
        ],
      },
      {
        id: "voice-assistant",
        name: "Asistente de voz local",
        status: { label: "Funcionando", tone: "live" },
        summary:
          "Asistente de voz que corre entero en mi máquina Linux: le hablo, me escucha y me contesta en voz alta.",
        contribution:
          "El audio no sale del equipo: la transcripción y la síntesis de voz son modelos locales, y solo la consulta al modelo de lenguaje viaja por la red. Lo construí íntegramente con asistencia de IA, que es también donde aprendí a revisar código que no escribí línea a línea.",
        tags: ["Python", "Claude Agent SDK", "ONNX", "systemd", "Piper TTS", "Linux"],
        links: [
          {
            label: "GitHub",
            href: "https://github.com/nschioppa/voice-assistant",
            external: true,
          },
        ],
      },
      {
        id: "espet-up",
        name: "Espet-Up Hackathon",
        status: { label: "Terminado", tone: "done" },
        summary:
          "Hackathon en Málaga, julio de 2026, para convertir problemas reales de la ciudad —vivienda, movilidad, turismo, comercio local— en propuestas de negocio.",
        contribution:
          "Un equipo que no conocía, un problema que no elegí y un pitch al final. La mitad del trabajo fue acotar el problema antes de proponer nada.",
        tags: ["Ideación", "Validación de problemas", "Pitch", "Trabajo en equipo"],
        links: [],
      },
      {
        id: "luggage-free",
        name: "Viajar sin equipaje",
        status: { label: "En validación", tone: "exploring" },
        summary:
          "Concepto de servicio, todavía sin lanzar: guardarropa y alquiler de ropa en destino para moverse entre ciudades sin facturar maleta.",
        contribution:
          "Es un ejercicio de ideación e investigación de mercado, no un producto. Escribí un informe de viabilidad centrado en Málaga: quién paga, cuánto y qué tiene que ser cierto para que el modelo cierre. Sigue en validación.",
        tags: [
          "Investigación de mercado",
          "Modelo de negocio",
          "Estudio de viabilidad",
          "Validación",
        ],
        links: [],
      },
    ],
  },

  sailing: {
    eyebrow: "Vela",
    heading: "Catorce temporadas en el agua",
    intro:
      "Compito en ILCA 7 y entreno a los que empiezan. Catorce años, tres clubes y dos países.",
    stats: [
      { value: "14", label: "años navegando" },
      { value: "ILCA 7", label: "clase actual" },
      { value: "4", label: "veranos como instructor" },
      { value: "3", label: "clubes" },
    ],
    timeline: [
      {
        period: "2012",
        title: "Primeros bordos en Optimist",
        description:
          "Empecé a navegar a los siete años. Optimist, viento flojo y muchas volcadas.",
      },
      {
        period: "2017 — 2021",
        title: "Optimist Timonel y Laser en el Yacht Club Argentino",
        description:
          "Los primeros años de competición seria: entrenamiento semanal y regatas de flota en Optimist Timonel, y después el salto al Laser.",
      },
      {
        period: "2021 — actualidad",
        title: "ILCA 6 y después ILCA 7, en Málaga",
        description:
          "Cambio de país y de flota. Entreno y compito entre el Real Club Mediterráneo y el Real Club El Candado.",
      },
      {
        period: "Veranos de 2023 y 2024",
        title: "Entrenador y Técnico Deportivo Inicial en Vela",
        description:
          "Con el título oficial de Técnico Deportivo Inicial en Vela entrené Optimist e ILCA en el Real Club El Candado, y fui instructor cuatro veranos en el campamento náutico del Real Club Mediterráneo. Explicar lo mismo de cinco maneras distintas hasta que una funciona no se aprende en un libro: lo enseña un chico de diez años.",
      },
      {
        period: "Dos veranos",
        title: "Foiling en el Lago di Garda",
        description:
          "Waszp y Birdyfish en el Stickl Sportcamp, dos temporadas seguidas. Volar cambia las escalas: los errores se pagan más rápido y las decisiones hay que tomarlas antes.",
      },
      {
        period: "Ahora",
        title: "Rumbo al Trofeo Princesa Sofía",
        description:
          "Preparación en ILCA 7 para el Trofeo Princesa Sofía. Es el objetivo de esta temporada.",
      },
    ],
    socialNote:
      "También cuento lo que pasa en el agua en Instagram y TikTok. Sobre todo para la gente que está empezando: los errores que cometí y lo que me hubiera gustado que alguien me explicara antes.",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com/nicoschioppa", external: true },
      { label: "TikTok", href: "https://tiktok.com/@nschioppa", external: true },
    ],
    todos: [
      "[TODO: agregar fotos navegando]",
      "[TODO: confirmar el año del título de Técnico Deportivo Inicial en Vela]",
      "[TODO: confirmar si fueron 3 o 4 veranos en el campamento del Real Club Mediterráneo]",
      "[TODO: confirmar los años de los dos veranos de foiling en el Lago di Garda]",
    ],
  },

  education: {
    eyebrow: "Formación",
    heading: "Estudios y herramientas",
    studies: [
      {
        institution: "Politecnico di Milano",
        degree: "Erasmus — Ingeniería del Software",
        period: "Sep 2026 — Feb 2027",
        note: "Posible extensión hasta julio de 2027, todavía sin confirmar.",
        current: true,
      },
      {
        institution: "Universidad de Málaga",
        degree: "Grado en Ingeniería del Software",
        period: "2023 — actualidad",
        note: "Más del 50% de los créditos superados.",
        current: true,
      },
    ],
    skills: [
      {
        label: "Lenguajes",
        items: ["Java", "Scala 3", "SQL", "C", "C++", "TypeScript"],
      },
      {
        label: "Herramientas",
        items: [
          "Git",
          "Linux",
          "PostgreSQL",
          "[TODO: ampliar y confirmar la lista de herramientas]",
        ],
      },
      {
        label: "Certificaciones",
        items: ["Cambridge English B2", "Técnico Deportivo Inicial en Vela"],
      },
    ],
  },

  contact: {
    eyebrow: "Contacto",
    heading: "¿Trabajamos juntos?",
    blurb:
      "Estoy en Milán hasta febrero de 2027, con la posibilidad de quedarme hasta julio, y busco prácticas o un puesto junior de desarrollo. Respondo a todos los correos.",
    email: "nicoschioppa@gmail.com",
    phone: "+34 601 503 339",
    copyLabel: "Copiar",
    copiedLabel: "Copiado",
    phoneLabel: "Teléfono",
    links: [
      { label: "GitHub", href: "https://github.com/nschioppa", external: true },
      // Sin perfil todavia: el href queda en "#" hasta que exista la URL.
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "https://instagram.com/nicoschioppa", external: true },
      { label: "TikTok", href: "https://tiktok.com/@nschioppa", external: true },
    ],
    todos: ["[TODO: falta la URL del perfil de LinkedIn]"],
  },

  footer: {
    rights: "© 2026 Nicolás Schioppa",
    builtWith: "Hecho con Next.js y TypeScript.",
    coordinates: "45°28′N 9°11′E",
  },
};

import type { Content } from "./types";

/**
 * Contenido en castellano.
 *
 * Las cadenas visibles llevan tildes y signos correctos porque se renderizan
 * como HTML UTF-8. Los comentarios van sin tildes: la consola de Windows es
 * cp1252 y revienta.
 *
 * Las marcas de TODO se pintan A LA VISTA del visitante, no en un comentario.
 * Sirven mientras el sitio no esta publicado; en produccion son una nota
 * interna que lee cualquiera, asi que antes de desplegar tienen que estar
 * vacias en los dos idiomas.
 */
export const es: Content = {
  meta: {
    title: "Nicolás Schioppa — Estudiante de Ingeniería del Software en Milán",
    description:
      "Ingeniería del Software en la Universidad de Málaga, ahora de Erasmus en el Politecnico di Milano. Backend, datos y aplicaciones con IA. Busco prácticas en Milán.",
    ogTagline: "Ingeniería del Software en Málaga y Milán. Backend, datos y aplicaciones con IA.",
    keywords: [
      "Nicolás Schioppa",
      "ingeniería del software",
      "desarrollador junior",
      "prácticas Milán",
      "Politecnico di Milano",
      "Universidad de Málaga",
      "Erasmus",
      "backend",
      "TypeScript",
      "Java",
      "Python",
      "PostgreSQL",
      "inteligencia artificial",
    ],
    ogImageAlt:
      "Nicolás Schioppa — estudiante de Ingeniería del Software en Milán.",
  },

  nav: {
    // Los anclas son los mismos en los dos idiomas (SECTION_IDS).
    items: [
      { label: "Sobre mí", href: "#about" },
      { label: "Proyectos", href: "#projects" },
      { label: "Hackathons", href: "#hackathons" },
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
    roleAccent: "Backend, datos y aplicaciones con IA",
    bio: [
      "Estudio Ingeniería del Software en la Universidad de Málaga y este semestre lo hago en el Politecnico di Milano. Busco prácticas o un primer puesto de desarrollo en Milán.",
      "Me interesa la parte que no se ve: cómo se modelan los datos, cómo aguanta una arquitectura cuando el proyecto crece, y qué hace falta para llevar algo desde la idea hasta que funciona de verdad.",
      "Fuera del código navego y compito en vela desde chico. De ahí me viene la costumbre de preparar bien y de no soltar hasta el final.",
    ],
    ctaPrimary: { label: "Hablemos", href: "#contact" },
    ctaSecondary: {
      label: "GitHub",
      href: "https://github.com/nschioppa",
      external: true,
    },
    scrollHint: "Más abajo",
  },

  about: {
    eyebrow: "Sobre mí",
    heading: "Cómo trabajo",
    paragraphs: [
      "Nací en Argentina, tengo la ciudadanía italiana y llevo años estudiando en España. Desde septiembre estoy en Milán, de Erasmus en el Politecnico.",
      "Java es el lenguaje que mejor manejo: es con el que estudio y con el que compito en hackathons, donde el código se escribe a mano y contrarreloj. En los proyectos propios trabajo de otra manera — me apoyo en la IA para escribir, y mi parte es decidir la arquitectura, revisar lo que sale y no dar por bueno nada que no entienda. Las dos formas me parecen necesarias, y no son la misma habilidad.",
      "Empiezo cosas sin saber hacerlas todavía. P2P Sail arrancó sin que yo hubiera tocado una base de datos en serio, y el asistente de voz sin haber escrito nunca un servicio que corriera solo en segundo plano. Aprender sobre la marcha es parte del método, no un accidente.",
    ],
    facts: [
      { label: "Ahora", value: "Milán, Italia — Erasmus hasta feb. 2027" },
      { label: "Base", value: "Málaga, España" },
      { label: "Trabajo en la UE", value: "Ciudadanía italiana" },
      {
        label: "Idiomas",
        value: "Español nativo · Inglés B2 Cambridge · Italiano A1",
      },
      {
        label: "Experiencia",
        value:
          "Monitor de vela en el Real Club El Candado, Málaga — veranos de 2023 a 2026",
      },
      { label: "Busco", value: "Prácticas extracurriculares o primer puesto junior" },
      { label: "Disponibilidad", value: "Desde ya, compatible con las clases" },
    ],
  },

  projects: {
    eyebrow: "Proyectos",
    heading: "En lo que he trabajado",
    intro:
      "Tres cosas: dos por mi cuenta y una en cuarenta y ocho horas, en un hackathon. De la primera existe de momento el diseño; las otras dos están escritas.",
    items: [
      {
        id: "p2p-sail",
        name: "P2P Sail",
        status: { label: "En pausa", tone: "exploring" },
        summary:
          "Marketplace de compraventa de equipamiento náutico de segunda mano: velas, cascos, mástiles, accesorios.",
        contribution:
          "Lo empecé casi sin experiencia en web ni en bases de datos, así que el proyecto terminó siendo el curso. Hoy están escritos el modelo de negocio, el modelo de dominio y el esquema de la base de datos; la aplicación todavía no. Modelar antes de programar fue una decisión y no una demora: el esquema ya separa las familias de producto con sus atributos propios validados, y eso es lo que decide después qué se puede buscar y filtrar.",
        tags: ["Modelado de datos", "PostgreSQL", "Prisma", "Zod", "TypeScript", "Next.js"],
        links: [],
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
        id: "fintech-model",
        name: "Modelo de asignación multiactivo",
        status: { label: "Tercer puesto", tone: "done" },
        summary:
          "Un modelo que decide cómo repartir una cartera entre acciones y criptomonedas, y cuándo pasarse a efectivo.",
        contribution:
          "Lo construimos entre tres en el hackathon de la Cátedra UMA FinTech, en marzo de 2026, y quedamos terceros. Yo diseñé la táctica: cuándo entrar, cuándo quedarse fuera, y que la respuesta del modelo creciera de forma logarítmica y no lineal. Sin machine learning — la decisión sale de reglas que se pueden leer y discutir, que en cuarenta y ocho horas es una ventaja y no una limitación.",
        tags: ["Python", "Reglas de decisión", "Fintech", "Trabajo en equipo"],
        links: [],
      },
    ],
  },

  hackathons: {
    eyebrow: "Hackathons",
    heading: "Construir con el reloj en contra",
    intro:
      "Cuatro competiciones contrarreloj, en equipo y casi siempre con gente que acababa de conocer: en unas se construye un producto y en otras se resuelve un algoritmo. Es lo más parecido a un sprint real que he encontrado fuera de un trabajo.",
    // En orden inverso, de lo más reciente a lo más antiguo.
    items: [
      {
        id: "espet-up",
        name: "Espet-Up",
        event: "Málaga",
        period: "Julio de 2026",
        description:
          "Convertir problemas reales de la ciudad — vivienda, movilidad, turismo, comercio local — en propuestas con un modelo de negocio detrás.",
      },
      {
        id: "ada-byron",
        name: "Concurso Ada Byron",
        event: "UMA y otras universidades públicas andaluzas",
        period: "Abril de 2026",
        description:
          "Fase andaluza del concurso universitario de programación, en equipos de tres. Problemas de algoritmia resueltos en Java contrarreloj: aquí no hay framework que ayude, o sacas el algoritmo o no lo sacas.",
      },
      {
        id: "catedra-fintech",
        name: "Hackathon de la Cátedra UMA FinTech",
        event: "Hackers Week · Universidad de Málaga",
        period: "Marzo de 2026",
        result: "Tercer puesto",
        description:
          "El modelo de asignación multiactivo que aparece más arriba, entre los proyectos.",
      },
      {
        id: "malackathon",
        name: "Malackathon",
        event: "E.T.S.I. Informática · Universidad de Málaga",
        period: "Octubre de 2024",
        description:
          "Un programa para consultar el estado de los embalses de España — cuánta agua tiene cada uno y cuál es el más cercano.",
      },
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
        items: ["Java", "Scala 3", "Python", "SQL", "C", "C++", "TypeScript"],
      },
      { label: "Herramientas", items: ["Git", "Linux", "PostgreSQL"] },
      { label: "Certificaciones", items: ["Cambridge English B2"] },
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
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/nicolas-schioppa-4808a2297/",
        external: true,
      },
    ],
  },

  footer: {
    rights: "© 2026 Nicolás Schioppa",
    builtWith: "Hecho con Next.js y TypeScript.",
    coordinates: "45°28′N 9°11′E",
  },
};

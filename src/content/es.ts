import type { Content } from "./types";

export const es: Content = {
  meta: {
    title: "Nicolás Schioppa · Software, datos y nuevas ideas",
    description:
      "Estudiante de Ingeniería del Software entre Málaga y Milán. Proyectos de backend, datos e IA. Busco prácticas de desarrollo en Milán.",
    ogTagline: "Software, datos y nuevas ideas. De Málaga a Milán.",
    keywords: [
      "Nicolás Schioppa", "ingeniería del software", "desarrollador junior",
      "prácticas Milán", "Politecnico di Milano", "Universidad de Málaga",
      "backend", "Java", "Python", "TypeScript", "PostgreSQL",
    ],
    ogImageAlt: "Nicolás Schioppa · Estudiante de Ingeniería del Software en Milán.",
  },

  nav: {
    items: [
      { label: "Proyectos", href: "#projects" },
      { label: "Sobre mí", href: "#about" },
      { label: "Formación", href: "#education" },
      { label: "Contacto", href: "#contact" },
    ],
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageLabel: "Idioma",
  },

  hero: {
    location: "Milán, Italia · Disponible para prácticas",
    name: "Nicolás Schioppa",
    roleLead: "Ingeniería del Software.",
    roleAccent: "Backend, datos e IA.",
    bio: [
      "Estudio en la Universidad de Málaga y este curso estoy en el Politecnico di Milano. Me interesa construir software, entender sus decisiones y aprender con cada proyecto. Busco prácticas de desarrollo en Milán.",
    ],
    ctaPrimary: { label: "Ver proyectos", href: "#projects" },
    ctaSecondary: { label: "Hablemos", href: "#contact" },
    scrollHint: "Seguí explorando",
    chart: {
      eyebrow: "Arquitectura de software",
      app: "Aplicación",
      appDetail: "Interfaz",
      api: "API",
      apiDetail: "Lógica",
      data: "Datos",
      dataDetail: "Persistencia",
      caption: "De la interfaz a los datos.",
    },
  },

  about: {
    eyebrow: "Sobre mí",
    heading: "Curiosidad dentro y fuera del código.",
    paragraphs: [
      "Soy argentino, con ciudadanía italiana y base en Málaga. Ahora estudio en Milán. Me interesa el backend: organizar los datos, pensar una arquitectura y entender las decisiones que hacen que un proyecto funcione.",
      "Java es mi lenguaje más sólido. En mis proyectos también exploro Python y herramientas de IA, revisando el código y aprendiendo de cada decisión.",
    ],
    facts: [
      { label: "Ahora", value: "Milán · Erasmus hasta julio de 2027" },
      { label: "Trabajo en la UE", value: "Ciudadanía italiana" },
      { label: "Idiomas", value: "Español nativo · Inglés B2 · Italiano A1" },
      {
        label: "También en el agua",
        value: "Monitor de vela en El Candado, Málaga · 2023–2026",
      },
    ],
    photo: {
      alt: "Nicolás Schioppa navegando en un velero de competición, entre salpicaduras.",
      eyebrow: "Fuera de la pantalla",
      title: "También en el agua.",
      body: "Compito en vela desde chico y pasé cuatro veranos enseñando a navegar en El Candado. La concentración, las decisiones y el trabajo en equipo también forman parte de lo que me gusta del deporte.",
      caption: "Vela de competición · Nicolás Schioppa",
    },
  },

  projects: {
    eyebrow: "Proyectos seleccionados",
    heading: "Aprender haciendo.",
    intro: "Un asistente que escucha, un modelo financiero y una idea nacida de la vela.",
    items: [
      {
        id: "voice-assistant",
        name: "Asistente de voz local",
        status: { label: "Funcionando", tone: "live" },
        summary: "Un asistente para Linux con el que hablar y recibir respuestas en voz alta.",
        contribution:
          "Integré transcripción y síntesis de voz locales: el audio se queda en el equipo y solo la consulta de texto viaja al modelo de lenguaje. Desarrollado con asistencia de IA y revisión del código.",
        tags: ["Python", "Claude Agent SDK", "ONNX", "Linux"],
        links: [
          {
            label: "Ver código",
            href: "https://github.com/nschioppa/voice-assistant",
            external: true,
          },
        ],
      },
      {
        id: "fintech-model",
        name: "Modelo de inversión multiactivo",
        status: { label: "3.er puesto · UMA FinTech", tone: "done" },
        summary: "Un modelo para distribuir una cartera entre acciones, criptomonedas y efectivo.",
        contribution:
          "Lo construimos en un equipo de tres durante un hackathon de 48 horas. Diseñé las reglas de entrada y salida y una respuesta logarítmica para ajustar la asignación.",
        tags: ["Python", "Reglas de decisión", "Fintech", "Trabajo en equipo"],
        links: [],
      },
      {
        id: "p2p-sail",
        name: "P2P Sail",
        status: { label: "Diseño · En pausa", tone: "exploring" },
        summary: "Una idea de marketplace para dar una segunda vida al equipamiento de vela.",
        contribution:
          "Definí el modelo de negocio, el dominio y el esquema de datos, con atributos propios para cada familia de producto. La aplicación está pendiente de desarrollo.",
        tags: ["Diseño de producto", "Modelado de datos", "PostgreSQL", "Prisma"],
        links: [],
      },
    ],
  },

  hackathons: {
    eyebrow: "Hackathons",
    heading: "Ideas, equipo y pocas horas.",
    intro: "Cuatro encuentros para resolver problemas, aprender con otros y probar ideas bajo presión.",
    items: [
      {
        id: "espet-up",
        name: "Espet-Up",
        event: "Málaga",
        period: "Julio 2026",
        result: "Tercer puesto",
        description: "Propuestas de negocio para retos de vivienda, movilidad, turismo y comercio local.",
      },
      {
        id: "ada-byron",
        name: "Concurso Ada Byron",
        event: "Universidades públicas andaluzas",
        period: "Abril 2026",
        description: "Resolución de problemas de algoritmia en Java, en equipos de tres.",
      },
      {
        id: "catedra-fintech",
        name: "UMA FinTech",
        event: "Hackers Week · Universidad de Málaga",
        period: "Marzo 2026",
        result: "Tercer puesto",
        description: "Modelo de asignación multiactivo desarrollado en 48 horas.",
      },
      {
        id: "malackathon",
        name: "Malackathon",
        event: "E.T.S.I. Informática · UMA",
        period: "Octubre 2024",
        description: "Una herramienta para consultar el agua de los embalses y encontrar el más cercano.",
      },
    ],
  },

  education: {
    eyebrow: "Formación y herramientas",
    heading: "De Málaga a Milán.",
    studies: [
      {
        institution: "Politecnico di Milano",
        degree: "Erasmus · Ingeniería del Software",
        period: "Sep 2026 – Jul 2027",
        current: true,
      },
      {
        institution: "Universidad de Málaga",
        degree: "Grado en Ingeniería del Software",
        period: "2023 – actualidad",
        note: "Más del 50 % de los créditos superados.",
        current: true,
      },
    ],
    skills: [
      { label: "Lenguajes", items: ["Java", "Python", "SQL", "TypeScript", "Scala 3", "C", "C++"] },
      { label: "Herramientas", items: ["Git", "Linux", "PostgreSQL"] },
      { label: "Certificación", items: ["Cambridge English B2"] },
    ],
  },

  contact: {
    eyebrow: "Contacto",
    heading: "La próxima idea empieza hablando.",
    blurb: "Busco prácticas o un primer puesto de desarrollo en Milán, compatible con mis estudios. Si creés que podemos trabajar juntos, escribime.",
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
    builtWith: "Hecho con curiosidad, Next.js y TypeScript.",
    coordinates: "45°28′N 9°11′E · Milán",
  },
};

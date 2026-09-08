import type { Content } from "./types";

/**
 * Contenido en ingles.
 *
 * Misma estructura que `es.ts`: mismos ids de proyecto y mismo numero de
 * entradas en cada array, para que el selector de idioma no cambie el layout.
 * Los comentarios van sin tildes (consola de Windows en cp1252); las cadenas
 * visibles se renderizan como HTML UTF-8 y llevan los signos correctos.
 */
export const en: Content = {
  meta: {
    title: "Nicolás Schioppa — Software Engineering Student in Milan",
    description:
      "Software engineering at the University of Málaga, now on Erasmus at Politecnico di Milano. Backend, data and AI-powered apps. Looking for an internship in Milan.",
    ogTagline: "Software engineering in Málaga and Milan. Backend, data and AI-powered apps.",
    keywords: [
      "Nicolás Schioppa",
      "software engineering",
      "junior developer",
      "internship Milan",
      "Politecnico di Milano",
      "University of Málaga",
      "Erasmus",
      "backend",
      "TypeScript",
      "Java",
      "Python",
      "PostgreSQL",
      "artificial intelligence",
    ],
    ogImageAlt:
      "Nicolás Schioppa — software engineering student in Milan.",
  },

  nav: {
    // Los anclas son los mismos en los dos idiomas (SECTION_IDS).
    items: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Hackathons", href: "#hackathons" },
      { label: "Education", href: "#education" },
      { label: "Contact", href: "#contact" },
    ],
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
  },

  hero: {
    location: "Milan, Italy — on exchange",
    name: "Nicolás Schioppa",
    roleLead: "Software engineering student",
    roleAccent: "Backend, data and AI-powered apps",
    bio: [
      "I'm reading Software Engineering at the University of Málaga, and I'm spending this academic year at Politecnico di Milano. I'm looking for an internship or a first development role in Milan.",
      "What interests me is the part nobody sees: how the data is modelled, how an architecture holds up as a project grows, and what it takes to carry something from an idea to a thing that actually works.",
      "Away from the keyboard I've raced sailing dinghies since I was a kid. That's where the habit of preparing properly and finishing what I start comes from.",
    ],
    ctaPrimary: { label: "Get in touch", href: "#contact" },
    ctaSecondary: {
      label: "GitHub",
      href: "https://github.com/nschioppa",
      external: true,
    },
    ctaTertiary: { label: "Download CV", href: "/cv.pdf", external: true },
    scrollHint: "Scroll",
    todos: ["[TODO: upload the CV as a PDF to public/cv.pdf]"],
  },

  about: {
    eyebrow: "About",
    heading: "How I work",
    paragraphs: [
      "I was born in Argentina, I hold Italian citizenship, and I've studied in Spain for years. Since September I've been in Milan, on exchange at the Politecnico.",
      "At university I work mostly in Java and Scala 3. On my own projects, in whatever each one calls for: TypeScript and PostgreSQL for P2P Sail, Python for the voice assistant. What repeats isn't the language, it's the order of things — understand the whole problem, model the data before the interface, and leave the project in a state someone can pick up six months later.",
      "I start things I don't yet know how to do. P2P Sail began before I'd touched a database in earnest, and the voice assistant before I'd ever written a service that runs on its own in the background. Learning as I go is part of the method, not an accident.",
    ],
    facts: [
      { label: "Right now", value: "Milan, Italy — on exchange until Feb 2027" },
      { label: "Based in", value: "Málaga, Spain" },
      { label: "EU work rights", value: "Italian citizenship" },
      {
        label: "Languages",
        value:
          "Spanish (native) · English B2 Cambridge · Italian [TODO: confirm level]",
      },
      { label: "Looking for", value: "An internship or a first development role" },
    ],
  },

  projects: {
    eyebrow: "Projects",
    heading: "What I'm building",
    intro:
      "Four things I've worked on. Three are code; the last is a business idea taken as far as it went.",
    items: [
      {
        id: "p2p-sail",
        name: "P2P Sail",
        status: { label: "In development", tone: "building" },
        summary:
          "A marketplace for buying and selling second-hand sailing gear: sails, hulls, spars, fittings.",
        contribution:
          "I started it with almost no web or database experience, so the project became the course: data modelling, architecture, UX and business model. I chose to ship the web app first and the mobile app later, writing the backend, authentication and business logic to be reused as they are.",
        tags: [
          "Next.js",
          "TypeScript",
          "Prisma",
          "PostgreSQL",
          "Architecture",
          "Data modelling",
          "UX",
        ],
        links: [],
        todos: [
          "[TODO: confirm the final stack]",
          "[TODO: decide whether the repository will be public]",
          "[TODO: add a screenshot of the application]",
        ],
      },
      {
        id: "voice-assistant",
        name: "Local voice assistant",
        status: { label: "Live", tone: "live" },
        summary:
          "A voice assistant that runs entirely on my Linux machine: I speak to it, it listens, and it answers out loud.",
        contribution:
          "No audio leaves the machine — transcription and speech synthesis are local models, and only the language-model query travels over the network. I built the whole thing with AI assistance, which is also where I learned to review code I hadn't typed line by line.",
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
        name: "Multi-asset allocation model",
        status: { label: "3rd place", tone: "done" },
        summary:
          "A model that decides how to split a portfolio across equities and crypto, and when to move into cash instead.",
        contribution:
          "Built as a team at the Fintech Chair hackathon at the University of Málaga, where we came third. Picking what to buy was the easy half: the model also had to decide when to sit in fiat because staying exposed wasn't worth it.",
        tags: ["Fintech", "Modelling", "Teamwork"],
        links: [],
        todos: [
          "[TODO: confirm the year of the hackathon]",
          "[TODO: what we built it with: language, libraries, where the data came from]",
          "[TODO: which part you worked on and how big the team was]",
          "[TODO: a link to the repository or the pitch deck, if one exists]",
        ],
      },
      {
        id: "luggage-free",
        name: "Luggage-free travel",
        status: { label: "Validating", tone: "exploring" },
        summary:
          "An unlaunched service concept: luggage storage and clothing rental at the destination, so travellers can move between cities without checking a bag.",
        contribution:
          "It's an ideation and market-research exercise, not a product. I wrote a feasibility study centred on Málaga: who pays, how much, and what has to be true for the model to hold up. Still in validation.",
        tags: [
          "Market research",
          "Business model",
          "Feasibility study",
          "Validation",
        ],
        links: [],
      },
    ],
  },

  hackathons: {
    eyebrow: "Hackathons",
    heading: "Building against the clock",
    intro:
      "Four weekends building something from nothing, in a team and usually with people I'd met that morning. It's the closest thing to a real sprint I've found outside a job.",
    items: [
      {
        id: "catedra-fintech",
        name: "Fintech Chair hackathon",
        event: "University of Málaga",
        period: "[TODO: year]",
        result: "3rd place",
        description:
          "The multi-asset allocation model listed above, under projects.",
      },
      {
        id: "ada-byron",
        name: "Ada Byron hackathon",
        event: "UMA and the public universities of Andalusia",
        period: "[TODO: year]",
        description:
          "A region-wide competition with teams from several universities. [TODO: describe what we built]",
      },
      {
        id: "malacaton",
        name: "Malacatón",
        event: "Hackers Week · University of Málaga",
        period: "2024",
        description: "[TODO: describe what we built at Malacatón]",
      },
      {
        id: "espet-up",
        name: "Espet-Up",
        event: "Málaga",
        period: "July 2026",
        description:
          "Turning real problems of the city — housing, mobility, tourism, local commerce — into proposals with a business model behind them.",
      },
    ],
  },

  education: {
    eyebrow: "Education",
    heading: "Studies and tools",
    studies: [
      {
        institution: "Politecnico di Milano",
        degree: "Erasmus exchange — Software Engineering",
        period: "Sep 2026 — Feb 2027",
        note: "Possibly extended to July 2027; not confirmed yet.",
        current: true,
      },
      {
        institution: "University of Málaga",
        degree: "BSc in Software Engineering",
        period: "2023 — present",
        note: "More than 50% of credits completed.",
        current: true,
      },
    ],
    skills: [
      {
        label: "Programming languages",
        items: ["Java", "Scala 3", "SQL", "C", "C++", "TypeScript"],
      },
      {
        label: "Tools",
        items: [
          "Git",
          "Linux",
          "PostgreSQL",
          "[TODO: expand and confirm the list of tools]",
        ],
      },
      {
        label: "Certifications",
        items: ["Cambridge English B2"],
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    heading: "Let's work together",
    blurb:
      "I'm in Milan until February 2027, possibly through to July, and I'm looking for an internship or a junior developer role. I reply to every email.",
    email: "nicoschioppa@gmail.com",
    phone: "+34 601 503 339",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    phoneLabel: "Phone",
    links: [
      { label: "GitHub", href: "https://github.com/nschioppa", external: true },
      // Sin perfil todavia: el href queda en "#" hasta que exista la URL.
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "https://instagram.com/nicoschioppa", external: true },
      { label: "TikTok", href: "https://tiktok.com/@nschioppa", external: true },
    ],
    todos: ["[TODO: the LinkedIn profile URL is missing]"],
  },

  footer: {
    rights: "© 2026 Nicolás Schioppa",
    builtWith: "Built with Next.js and TypeScript.",
    coordinates: "45°28′N 9°11′E",
  },
};

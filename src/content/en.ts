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
      "I'm studying Software Engineering at the University of Málaga, and I'm spending this semester at Politecnico di Milano. I'm looking for an internship or a first development role in Milan.",
      "What interests me is the part nobody sees: how the data is modelled, how an architecture holds up as a project grows, and what it takes to carry something from an idea to a thing that actually works.",
      "Away from the keyboard I've raced sailing dinghies since I was a kid. That's where the habit of preparing properly and finishing what I start comes from.",
    ],
    ctaPrimary: { label: "Get in touch", href: "#contact" },
    ctaSecondary: {
      label: "GitHub",
      href: "https://github.com/nschioppa",
      external: true,
    },
    scrollHint: "Scroll",
  },

  about: {
    eyebrow: "About",
    heading: "How I work",
    paragraphs: [
      "I was born in Argentina, I hold Italian citizenship, and I've studied in Spain for years. Since September I've been in Milan, on exchange at the Politecnico.",
      "Java is the language I know best: it's the language I study with and the one I compete with at hackathons, where the code is written by hand and against the clock. On my own projects I work differently — I lean on AI to write, and my part is deciding the architecture, reviewing what comes out, and signing off on nothing I don't understand. Both matter, and they aren't the same skill.",
      "I start things I don't yet know how to do. P2P Sail began before I'd touched a database in earnest, and the voice assistant before I'd ever written a service that runs on its own in the background. Learning as I go is part of the method, not an accident.",
    ],
    facts: [
      { label: "Right now", value: "Milan, Italy — on exchange until Feb 2027" },
      { label: "Based in", value: "Málaga, Spain" },
      { label: "EU work rights", value: "Italian citizenship" },
      {
        label: "Languages",
        value: "Spanish (native) · English B2 Cambridge · Italian A1",
      },
      {
        label: "Experience",
        value:
          "Sailing instructor at Real Club El Candado, Málaga — summers 2023 to 2026",
      },
      { label: "Looking for", value: "An extracurricular internship or a junior role" },
      { label: "Availability", value: "Immediately, around class hours" },
    ],
  },

  projects: {
    eyebrow: "Projects",
    heading: "What I've worked on",
    intro:
      "Three things: two on my own, and one in forty-eight hours at a hackathon. Of the first, what exists so far is the design; the other two are written.",
    items: [
      {
        id: "p2p-sail",
        name: "P2P Sail",
        status: { label: "On hold", tone: "exploring" },
        summary:
          "A marketplace for buying and selling second-hand sailing gear: sails, hulls, masts, fittings.",
        contribution:
          "I started it with almost no web or database experience, so the project became the course. What exists today is the business model, the domain model and the database schema; the application itself does not. Modelling before coding was a decision, not a delay: the schema already separates product families with their own validated attributes, and that is what later decides what can be searched and filtered.",
        tags: ["Data modelling", "PostgreSQL", "Prisma", "Zod", "TypeScript", "Next.js"],
        links: [],
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
          "Built by three of us at the UMA FinTech Chair hackathon in March 2026, where we came third. I designed the tactic: when to enter, when to stay out, and having the model's response grow logarithmically rather than linearly. No machine learning — the decision comes from rules you can read and argue with, which over forty-eight hours is an advantage rather than a limitation.",
        tags: ["Python", "Decision rules", "Fintech", "Teamwork"],
        links: [],
      },
    ],
  },

  hackathons: {
    eyebrow: "Hackathons",
    heading: "Building against the clock",
    intro:
      "Four competitions against the clock, in a team and usually with people I'd only just met: some of them are about building a product, others about finding an algorithm. It's the closest thing to a real sprint I've found outside a job.",
    // En orden inverso, de lo mas reciente a lo mas antiguo.
    items: [
      {
        id: "espet-up",
        name: "Espet-Up",
        event: "Málaga",
        period: "July 2026",
        description:
          "Turning real problems of the city — housing, mobility, tourism, local commerce — into proposals with a business model behind them.",
      },
      {
        id: "ada-byron",
        name: "Ada Byron contest",
        event: "UMA and other Andalusian public universities",
        period: "April 2026",
        description:
          "The Andalusian round of the national university programming contest, in teams of three. Algorithm problems solved in Java against the clock: no framework helps here — either you find the algorithm or you don't.",
      },
      {
        id: "catedra-fintech",
        name: "UMA FinTech Chair hackathon",
        event: "Hackers Week · University of Málaga",
        period: "March 2026",
        result: "3rd place",
        description:
          "The multi-asset allocation model listed above, under projects.",
      },
      {
        id: "malackathon",
        name: "Malackathon",
        event: "School of Computer Science · University of Málaga",
        period: "October 2024",
        description:
          "A program for checking the state of Spain's reservoirs — how much water each one holds, and which is the nearest.",
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
        label: "Languages",
        items: ["Java", "Scala 3", "Python", "SQL", "C", "C++", "TypeScript"],
      },
      { label: "Tools", items: ["Git", "Linux", "PostgreSQL"] },
      { label: "Certifications", items: ["Cambridge English B2"] },
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
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/nicolas-schioppa-4808a2297/",
        external: true,
      },
    ],
  },

  footer: {
    rights: "© 2026 Nicolás Schioppa",
    builtWith: "Built with Next.js and TypeScript.",
    coordinates: "45°28′N 9°11′E",
  },
};

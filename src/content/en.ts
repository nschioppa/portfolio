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
    title: "Nicolás Schioppa — Software Engineering Student & ILCA Sailor",
    description:
      "Software engineering student at the University of Málaga, now on Erasmus exchange at Politecnico di Milano. Looking for a development internship in Milan.",
    ogTagline: "Software engineering in Málaga and Milan. ILCA 7 the rest of the time.",
    keywords: [
      "Nicolás Schioppa",
      "software engineering",
      "junior developer",
      "internship Milan",
      "Politecnico di Milano",
      "University of Málaga",
      "Erasmus",
      "Next.js",
      "TypeScript",
      "ILCA 7",
      "sailing",
    ],
    ogImageAlt:
      "Nicolás Schioppa — software engineering student and ILCA 7 racing sailor.",
  },

  nav: {
    // Los anclas son los mismos en los dos idiomas (SECTION_IDS).
    items: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Sailing", href: "#sailing" },
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
    roleAccent: "and ILCA racing sailor",
    bio: [
      "I'm reading Software Engineering at the University of Málaga. This academic year I'm at Politecnico di Milano, where I arrived in September on an Erasmus exchange.",
      "I've been sailing since I was seven and I race an ILCA 7. Fourteen seasons of racing and four summers coaching left me with one idea I use every day: a race is won in the preparation and lost in the small decisions.",
      "A project isn't that different. Read the conditions, commit to a course, adjust when the breeze shifts, and keep a hand on the tiller until it ships.",
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
    heading: "Where I started, where I am",
    paragraphs: [
      "I was born and raised in Argentina. I hold Italian citizenship through family, and I've lived and studied in Spain for years now. Since September I've been in Milan.",
      "Moving country means starting over with the paperwork, the friends and the way everything is done. I've done it three times. By the third you notice how quickly you stop expecting things to work the way they did in the last place.",
      "Right now I'm looking for an internship or a first development job in Milan. Backend work and systems design interest me most: understanding the whole problem before writing the first line.",
    ],
    facts: [
      { label: "Born in", value: "Argentina" },
      { label: "Citizenship", value: "Italian and Argentinian" },
      { label: "Based in", value: "Málaga, Spain" },
      { label: "Right now", value: "Milan, Italy" },
      {
        label: "Languages",
        value:
          "Spanish (native) · English B2 Cambridge · Italian [TODO: confirm level]",
      },
    ],
  },

  projects: {
    eyebrow: "Projects",
    heading: "What I'm building",
    intro:
      "Four things I've worked on. Two are code, two are business ideas taken as far as they went.",
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
        id: "espet-up",
        name: "Espet-Up Hackathon",
        status: { label: "Completed", tone: "done" },
        summary:
          "A hackathon in Málaga, July 2026, turning real city problems — housing, mobility, tourism, local retail — into business proposals.",
        contribution:
          "A team I'd never met, a problem I hadn't picked and a pitch at the end. Half the work was narrowing the problem down before proposing anything.",
        tags: ["Ideation", "Problem validation", "Pitching", "Teamwork"],
        links: [],
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

  sailing: {
    eyebrow: "Sailing",
    heading: "Fourteen seasons on the water",
    intro:
      "I race an ILCA 7 and coach the sailors who are just starting out. Fourteen years, three clubs and two countries.",
    stats: [
      { value: "14", label: "years sailing" },
      { value: "ILCA 7", label: "current class" },
      { value: "4", label: "summers coaching" },
      { value: "3", label: "clubs" },
    ],
    timeline: [
      {
        period: "2012",
        title: "First tacks in an Optimist",
        description:
          "I started sailing at seven, in an Optimist dinghy. Light breeze and plenty of capsizes.",
      },
      {
        period: "2017 — 2021",
        title: "Optimist Timonel and Laser at Yacht Club Argentino",
        description:
          "The first years of proper racing: weekly training and fleet regattas in the Optimist Timonel class, then the step up to the Laser.",
      },
      {
        period: "2021 — present",
        title: "ILCA 6, then ILCA 7, in Málaga",
        description:
          "New country, new fleet. I train and race between Real Club Mediterráneo and Real Club El Candado.",
      },
      {
        period: "Summers of 2023 and 2024",
        title: "Coach, with the Spanish instructor qualification",
        description:
          "With the official Técnico Deportivo Inicial en Vela qualification I coached Optimist and ILCA at Real Club El Candado, and spent four summers as an instructor at the Real Club Mediterráneo sailing camp. Explaining the same thing five different ways until one of them lands isn't something a book teaches you: a ten-year-old does.",
      },
      {
        period: "Two summers",
        title: "Foiling on Lake Garda",
        description:
          "Waszp and Birdyfish at Stickl Sportcamp, two seasons running. Foiling changes the timescales: mistakes cost you faster and every decision has to come earlier.",
      },
      {
        period: "Now",
        title: "Building towards Trofeo Princesa Sofía",
        description:
          "Training in the ILCA 7 for Trofeo Princesa Sofía. That's the target for this season.",
      },
    ],
    socialNote:
      "I also post what happens on the water on Instagram and TikTok. Mostly for people who are just starting: the mistakes I made, and the things I wish someone had explained to me sooner.",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com/nicoschioppa", external: true },
      { label: "TikTok", href: "https://tiktok.com/@nschioppa", external: true },
    ],
    todos: [
      "[TODO: add sailing photos]",
      "[TODO: confirm the year of the Técnico Deportivo Inicial en Vela qualification]",
      "[TODO: confirm whether it was 3 or 4 summers at the Real Club Mediterráneo camp]",
      "[TODO: confirm the years of the two foiling summers on Lake Garda]",
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
        items: [
          "Cambridge English B2",
          "Técnico Deportivo Inicial en Vela (Spanish sailing instructor)",
        ],
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

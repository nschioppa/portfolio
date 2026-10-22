import type { Content } from "./types";

export const en: Content = {
  meta: {
    title: "Nicolás Schioppa | Software Engineering",
    description:
      "Software engineering student at the University of Málaga and Politecnico di Milano. Explore my backend, data and AI projects. Open to internships in Milan.",
    ogTagline: "Software, data & new ideas. From Málaga to Milan.",
    keywords: [
      "Nicolás Schioppa", "software engineering", "junior developer",
      "internship Milan", "Politecnico di Milano", "University of Málaga",
      "backend", "Java", "Python", "TypeScript", "PostgreSQL",
    ],
    ogImageAlt: "Nicolás Schioppa · Software engineering student in Milan.",
  },

  nav: {
    items: [
      { label: "Projects", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Education", href: "#education" },
      { label: "Contact", href: "#contact" },
    ],
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
  },

  hero: {
    location: "Milan, Italy · Open to internships",
    name: "Nicolás Schioppa",
    roleLead: "Software Engineering.",
    roleAccent: "Backend, data & AI.",
    bio: [
      "I study at the University of Málaga and I'm spending this year at Politecnico di Milano. I enjoy building software, understanding the decisions behind it and learning through projects. I'm looking for a development internship in Milan.",
    ],
    ctaPrimary: { label: "Explore my projects", href: "#projects" },
    ctaSecondary: { label: "Get in touch", href: "#contact" },
    scrollHint: "Keep exploring",
    chart: {
      eyebrow: "Software architecture",
      app: "Application",
      appDetail: "Interface",
      api: "API",
      apiDetail: "Logic",
      data: "Data",
      dataDetail: "Persistence",
      caption: "From interface to data.",
    },
  },

  about: {
    eyebrow: "About",
    heading: "Curiosity beyond the code.",
    paragraphs: [
      "I'm from Argentina, hold Italian citizenship and call Málaga home. Right now, I'm studying in Milan. I'm drawn to backend development: organizing data, thinking through architecture and understanding what makes a project work.",
      "Java is my strongest language. My own projects also give me room to explore Python and AI tools, reviewing the code and learning from each decision.",
    ],
    facts: [
      { label: "Currently", value: "Milan · On exchange until July 2027" },
      { label: "EU work rights", value: "Italian citizenship" },
      { label: "Languages", value: "Native Spanish · English B2 · Italian A1" },
      {
        label: "On the water",
        value: "Sailing instructor at El Candado, Málaga · 2023–2026",
      },
    ],
    photo: {
      alt: "Nicolás Schioppa sailing a racing dinghy, surrounded by spray.",
      eyebrow: "Away from the screen",
      title: "Out on the water, too.",
      body: "I've raced sailing dinghies since childhood and spent four summers teaching people to sail at El Candado. The focus, decisions and teamwork are part of what I enjoy about the sport.",
      caption: "Competitive sailing · Nicolás Schioppa",
    },
  },

  projects: {
    eyebrow: "Selected projects",
    heading: "Learning by building.",
    intro: "A voice assistant, a financial model and an idea inspired by sailing.",
    items: [
      {
        id: "voice-assistant",
        name: "Local voice assistant",
        status: { label: "Working", tone: "live" },
        summary: "A Linux assistant you can speak to and hear answers from.",
        contribution:
          "I integrated local speech recognition and synthesis: audio stays on the computer, while only the text query goes to the language model. Built with AI assistance and code review.",
        tags: ["Python", "Claude Agent SDK", "ONNX", "Linux"],
        links: [
          {
            label: "View code",
            href: "https://github.com/nschioppa/voice-assistant",
            external: true,
          },
        ],
      },
      {
        id: "fintech-model",
        name: "Multi-asset investment model",
        status: { label: "3rd place · UMA FinTech", tone: "done" },
        summary: "A model for allocating a portfolio across stocks, cryptocurrency and cash.",
        contribution:
          "Built in a team of three during a 48-hour hackathon. I designed the entry and exit rules and a logarithmic response to adjust the allocation.",
        tags: ["Python", "Decision rules", "Fintech", "Teamwork"],
        links: [],
      },
      {
        id: "p2p-sail",
        name: "P2P Sail",
        status: { label: "Design · On hold", tone: "exploring" },
        summary: "A marketplace concept for giving used sailing equipment a second life.",
        contribution:
          "I defined the business model, domain and database schema, including specific attributes for each product family. The application is yet to be developed.",
        tags: ["Product design", "Data modeling", "PostgreSQL", "Prisma"],
        links: [],
      },
    ],
  },

  hackathons: {
    eyebrow: "Hackathons",
    heading: "Ideas, teamwork and a ticking clock.",
    intro: "Four opportunities to solve problems, learn with others and test ideas under pressure.",
    items: [
      {
        id: "espet-up",
        name: "Espet-Up",
        event: "Málaga",
        period: "July 2026",
        result: "Third place",
        description: "Business proposals tackling housing, mobility, tourism and local commerce.",
      },
      {
        id: "ada-byron",
        name: "Ada Byron contest",
        event: "Andalusian public universities",
        period: "April 2026",
        description: "Solving algorithm problems in Java, working in teams of three.",
      },
      {
        id: "catedra-fintech",
        name: "UMA FinTech",
        event: "Hackers Week · University of Málaga",
        period: "March 2026",
        result: "Third place",
        description: "A multi-asset allocation model built in 48 hours.",
      },
      {
        id: "malackathon",
        name: "Malackathon",
        event: "School of Computer Science · UMA",
        period: "October 2024",
        description: "A tool to check reservoir water levels and find the nearest reservoir.",
      },
    ],
  },

  education: {
    eyebrow: "Education & tools",
    heading: "From Málaga to Milan.",
    studies: [
      {
        institution: "Politecnico di Milano",
        degree: "Erasmus exchange · Software Engineering",
        period: "Sep 2026 – Jul 2027",
        current: true,
      },
      {
        institution: "University of Málaga",
        degree: "BSc in Software Engineering",
        period: "2023 – present",
        note: "More than 50% of credits completed.",
        current: true,
      },
    ],
    skills: [
      { label: "Languages", items: ["Java", "Python", "SQL", "TypeScript", "Scala 3", "C", "C++"] },
      { label: "Tools", items: ["Git", "Linux", "PostgreSQL"] },
      { label: "Certification", items: ["Cambridge English B2"] },
    ],
  },

  contact: {
    eyebrow: "Contact",
    heading: "Good ideas start with a conversation.",
    blurb: "I'm looking for an internship or a first development role in Milan alongside my studies. If you think we could work well together, I'd love to hear from you.",
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
    builtWith: "Made with curiosity, Next.js and TypeScript.",
    coordinates: "45°28′N 9°11′E · Milan",
  },
};

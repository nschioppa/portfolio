# Nicolás Schioppa — Software Engineering Portfolio

[![Website](https://img.shields.io/badge/Website-nicoschioppa.com-24685f?style=flat-square)](https://nicoschioppa.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-102c36?style=flat-square)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-not%20specified-lightgrey?style=flat-square)](#license)

A bilingual, responsive portfolio focused on software engineering, backend, data and AI.

**Live site:** [nicoschioppa.com](https://nicoschioppa.com) · **Languages:** [English](https://nicoschioppa.com/en) / [Español](https://nicoschioppa.com/es)

## Stack

- **Next.js 16** (App Router) and **React 19** — pages and components
- **TypeScript** — typed application and bilingual content
- **Tailwind CSS 4** + custom CSS — styling and design tokens
- **Vercel** — production deployment from `main`

## Getting started

Requirements: a Node.js version supported by Next.js 16 and npm.

```bash
git clone https://github.com/nschioppa/portfolio.git
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to English; language-specific pages live at `/en` and `/es`.

### Project checks

```bash
npm run lint
npm run typecheck
npm run build
```

For environments where Turbopack encounters process/network restrictions, try `npm run build -- --webpack`.

## How the project is organized

| Location | Purpose |
| --- | --- |
| `src/app/` | Next.js routes, layout, global styles, metadata and social previews |
| `src/app/[lang]/page.tsx` | Composes the sections for each language |
| `src/components/sections/` | Header, hero, projects, hackathons, about, education, contact and footer |
| `src/components/ui/` | Reusable visual components and scroll effects |
| `src/content/es.ts`, `en.ts` | Spanish and English copy |
| `src/content/types.ts` | Shared content structure |
| `src/lib/` | Site URL and structured-data helpers |
| `public/` | Public assets |
| `src/app/globals.css` | Colors, type scale, spacing and component utilities |
| `DEPLOY.md` | Deployment and domain notes |

The hero includes a software-architecture illustration. The page uses progressive scroll effects, supports reduced-motion preferences and provides accessible navigation on mobile. Its content is intentionally kept separate from layout components so both languages can evolve together.

## Editing content

1. Update the relevant text in `src/content/es.ts` and `src/content/en.ts`.
2. Keep both language objects aligned with `src/content/types.ts`.
3. Update the relevant component only when its structure or behavior needs to change.
4. Run lint, TypeScript checks and a production build before merging.

To change the canonical domain, set `NEXT_PUBLIC_SITE_URL` in the deployment environment; the default is `https://nicoschioppa.com`.

## Git workflow

- `main` is the stable production branch.
- Make changes in short-lived branches such as `feat/project-card`, `fix/mobile-nav` or `chore/dependency-update`.
- Open a pull request, review the preview deployment and checks, then merge into `main`.
- Remove branches once merged when no longer needed.

Never commit credentials, private tokens, personal contact details or production environment files. Historical commits may still contain previously removed content; cleaning working files does not erase Git history.

## Deployment

The public site is hosted on Vercel. See [DEPLOY.md](DEPLOY.md) for details. Merges/pushes to `main` trigger the production pipeline when the GitHub/Vercel integration is enabled.

## License

No open-source license is currently declared. **Public source code does not automatically grant permission to reuse or redistribute it.**

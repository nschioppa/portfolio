# Nicolás Schioppa — Portfolio

Bilingual portfolio of a software engineering student, featuring projects, education, hackathons and sailing experience.

**Live site:** [nicoschioppa.com](https://nicoschioppa.com) · [English](https://nicoschioppa.com/en) · [Español](https://nicoschioppa.com/es)

## Stack

Next.js 16 App Router, React 19, TypeScript and Tailwind CSS 4. Hosted on Vercel with Vercel Analytics and Speed Insights for traffic and performance measurement. Fonts use the system stack, and the sailing photograph is a local WebP asset.

Both language pages are generated at build time. `/` redirects to `/en`; unsupported languages return 404. Most components render on the server, with client components for navigation, entrance animations and the decorative desktop scroll indicator.

## Development

Use **Node.js 24.x** and npm, matching the Vercel runtime.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No environment variables or service credentials are required to run the portfolio.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npm test
```

`npm test` uses Node's built-in test runner to check the production HTTP responses. Build first: the tests start the built application on an available local port and shut it down afterward. Set `SITE_TEST_URL` to run the same checks against an existing deployment instead.

Some Windows environments prevent Turbopack's internal process communication. If that occurs, build with `npm run build -- --webpack`, then run `npm test`. The default build command remains `next build` for CI and Vercel.

GitHub Actions runs lint, TypeScript, build and smoke tests on pull requests. Also review both languages in desktop and mobile browsers, including keyboard navigation, language switching and reduced motion.

## Project structure

```text
.github/workflows/       Pull request validation
public/                 Public images and other static assets
src/
  app/                  Routes, global styles and SEO endpoints
    [lang]/             Language layout, page and social image
  components/
    sections/           Navigation and portfolio sections
    ui/                 Small shared presentation and animation components
    SoftwareChart.tsx   Decorative software and sailing illustration
  content/              English and Spanish copy, types and section IDs
  lib/                  Site identity, structured data and small utilities
tests/                  Production HTTP smoke tests
```

## Updating content and design

Edit `src/content/en.ts` and `src/content/es.ts` together. They share the `Content` contract in `src/content/types.ts`, so TypeScript catches missing fields. Keep project IDs, section IDs and navigation anchors consistent across languages; the language switch uses these anchors to preserve the current section.

The content files contain page titles, descriptions, social image text and public contact links. Add completed work there without inventing project links or results. Keep contact details limited to the intended public LinkedIn and GitHub profiles.

`src/app/globals.css` defines colors, typography, spacing, focus styles and reduced motion behavior. Section components control layout. The design uses ivory, navy and sea green, with nautical details and the sailing photograph in `public/images/`.

## Deployment and Git workflow

Vercel builds production from `main` and creates previews for pull requests. Canonical URLs, language alternatives and the sitemap use `https://nicoschioppa.com` by default, including in preview builds. `NEXT_PUBLIC_SITE_URL` is an optional public override when the canonical domain changes. See [DEPLOY.md](DEPLOY.md) for release checks and recovery.

Keep `main` as the only permanent branch. Create a temporary branch for each change, open a pull request, and review CI and the Vercel preview before a normal merge. Delete merged branches after confirming they contain no remaining work and are not deployment targets.

## Security and privacy

The site has no contact form or application database. Public contact uses LinkedIn and GitHub. Environment files, private keys and local Vercel configuration are ignored; keep secrets out of source code, public assets and every `NEXT_PUBLIC_*` variable.

Run `npm audit` when reviewing dependencies. If a credential is ever exposed, revoke or rotate it first. Removing a file from the current version does not remove it from Git history, forks or caches; coordinate any history cleanup separately.

A scoped `minimatch` override patches the TypeScript ESLint parser's dependency while its declared range still excludes the security fix. Remove the override when the parser supports a patched version directly.

## License

No license has been declared for this repository. Public availability does not grant a general reuse license; see [GitHub's licensing guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).

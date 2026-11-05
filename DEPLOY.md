# Deployment — nicoschioppa.com

This portfolio is already published at **https://nicoschioppa.com**. Its GitHub repository is [nschioppa/portfolio](https://github.com/nschioppa/portfolio), with **`main`** as the production branch.

## Normal release workflow

1. Create a feature/fix branch from `main`.
2. Make changes locally and run:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```
3. Push the branch and open a pull request.
4. Check the Vercel preview URL, including both languages and mobile navigation.
5. Merge into `main` when ready. With the GitHub integration configured, Vercel deploys the new production version automatically.

Avoid experimenting directly in `main` because it controls the live website.

## Domain and metadata

The canonical site address defaults to `https://nicoschioppa.com` in `src/lib/site.ts`.

Optional Vercel environment variable:

```dotenv
NEXT_PUBLIC_SITE_URL=https://nicoschioppa.com
```

If the domain changes, update the Vercel domain configuration and this variable. Do **not** commit private secrets or `.env` files. Variables prefixed `NEXT_PUBLIC_` are exposed to the browser, so never put credentials in them.

When editing SEO metadata, verify:
- The `/en` and `/es` pages and language links
- Canonical URLs, sitemap and robots directives
- Social preview images and Open Graph metadata
- Google Search Console indexing, if connected
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) for sharing previews

## Rollback

If a release causes a regression, use Vercel's deployment history to restore a previous healthy deployment, then make a corrective commit/PR. Keep Git history and production branches intact until the issue is resolved.

## Security and privacy

Before publishing, check the working tree **and Git history** for emails, personal phone numbers, passwords, API tokens, and mistakenly committed `.env` files. Adding a file to `.gitignore` does not remove a copy already committed. Rotate any credential that was ever publicly exposed.

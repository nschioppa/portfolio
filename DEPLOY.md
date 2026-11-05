# Deployment

The live portfolio is [nicoschioppa.com](https://nicoschioppa.com), deployed through Vercel's GitHub integration from [nschioppa/portfolio](https://github.com/nschioppa/portfolio).

## Configuration

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework | Next.js |
| Node.js | 24.x |
| Install | `npm ci` |
| Build | `npm run build` |
| Output | Next.js default |
| Canonical origin | `https://nicoschioppa.com` |

The canonical origin is defined in `src/lib/site.ts` and remains the production domain in previews. The optional `NEXT_PUBLIC_SITE_URL` override is public and should only change when intentionally changing the canonical domain. No secrets are required by the application.

Keep the existing GitHub integration, domain and DNS configuration. Normal releases require only a reviewed pull request and a merge to `main`.

## Release

1. Create a temporary branch and make the change.
2. Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build` and `npm test`. Tests require a completed build. If local Windows Turbopack fails because of internal process communication, use `npm run build -- --webpack` locally.
3. Push the branch and open a pull request. Wait for GitHub Actions and the Vercel preview to succeed.
4. Review `/en` and `/es` in the preview on desktop and mobile. Check navigation, language switching, the sailing photograph, keyboard focus, reduced motion and the browser console.
5. Merge normally into `main`. Wait for the production deployment to reach Ready, then confirm its source commit matches the merge.
6. Run the production checks below, then delete the merged temporary branch if it has no remaining work or deployment role.

## Production checks

Set `SITE_TEST_URL` to `https://nicoschioppa.com` and run `npm test` to check the deployed site without starting a local server. For example, in PowerShell:

```powershell
$env:SITE_TEST_URL = 'https://nicoschioppa.com'
npm test
Remove-Item Env:SITE_TEST_URL
```

Check the following responses and their contents:

- `/` redirects to `/en`; `/en` and `/es` return the expected language, and unsupported language routes return 404.
- Both pages contain the correct title, description, canonical URL, language alternatives, social image metadata and structured data.
- `/robots.txt` allows the public site and references `/sitemap.xml`, whose language URLs point to the canonical domain.
- `/favicon.ico`, the icon and Apple touch icon URLs linked from the HTML, and both social images return valid images.
- The photograph and intended GitHub and LinkedIn links work, with no private contact details in the rendered pages.

Review the Vercel deployment logs when a build or request fails. Vercel Analytics and Speed Insights are included in the layout for traffic and performance measurement.

## Recovering a release

If a release introduces a regression, use GitHub's Revert action on the merged pull request, or create a temporary branch with a revert commit. For a merge commit, Git requires selecting the mainline parent when reverting. Review and validate the revert pull request, then merge it into `main` so Vercel deploys the recovery as a new version.

Keep the public history intact: recovery uses a new commit, without force pushing or resetting production history. Confirm the recovery deployment and repeat the production checks.

## Search appearance

After relevant metadata or favicon changes, inspect `/en` and `/es` in Google Search Console, submit the sitemap if needed and request indexing for the changed pages. Keep the site and favicon crawlable. Google determines when to crawl and update search results; a request does not guarantee immediate indexing or a favicon appearing.

See Google's guidance on [requesting a recrawl](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl) and [favicons in search results](https://developers.google.com/search/docs/appearance/favicon-in-search).

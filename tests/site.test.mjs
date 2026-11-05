import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:net";
import { after, before, test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";

// Exercise the production output without adding a test framework or browser dependency.
let baseURL = process.env.SITE_TEST_URL?.replace(/\/$/, "");
const canonical = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nicoschioppa.com").replace(/\/+$/, "");
let server;
let serverError;
let serverOutput = "";
const pages = new Map();

function request(path, options = {}) {
  return fetch(new URL(path, baseURL), { ...options, signal: AbortSignal.timeout(10_000) });
}

before(async () => {
  if (!baseURL) {
    const socket = createServer();
    socket.listen(0, "127.0.0.1");
    await once(socket, "listening");
    const { port } = socket.address();
    await new Promise((resolve, reject) => socket.close((error) => error ? reject(error) : resolve()));
    baseURL = `http://127.0.0.1:${port}`;
    server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_ENV: "production" },
    });
    server.on("error", (error) => { serverError = error; });
    for (const stream of [server.stdout, server.stderr]) {
      stream.on("data", (data) => { serverOutput = (serverOutput + data).slice(-10_000); });
    }
  }

  const deadline = Date.now() + 30_000;
  while (true) {
    if (serverError) throw serverError;
    if (server && (server.exitCode !== null || server.signalCode !== null)) throw new Error(`Next.js exited before readiness:\n${serverOutput}`);
    try {
      const response = await fetch(`${baseURL}/en`, { signal: AbortSignal.timeout(2_000) });
      if (response.ok) break;
    } catch { /* The newly started server may not be listening yet. */ }
    if (Date.now() >= deadline) throw new Error(`Site did not become ready:\n${serverOutput}`);
    await delay(100);
  }

  for (const lang of ["en", "es"]) {
    const response = await request(`/${lang}`);
    assert.equal(response.status, 200);
    pages.set(lang, { response, html: await response.text() });
  }
}, { timeout: 60_000 });

after(async () => {
  if (!server || serverError || server.exitCode !== null || server.signalCode !== null) return;
  const exited = once(server, "exit");
  server.kill();
  const timer = setTimeout(() => server.kill("SIGKILL"), 3_000);
  timer.unref();
  await exited;
  clearTimeout(timer);
});

function decode(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#(?:39|x27);/g, "'");
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b([^>]*)>`, "g"))].map(([, attributes]) =>
    Object.fromEntries([...attributes.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), decode(value)])),
  );
}

function metadata(html, key) {
  return tags(html, "meta").find((tag) => tag.name === key || tag.property === key)?.content;
}

test("the root redirects to English and unsupported languages return 404", async () => {
  const root = await request("/", { redirect: "manual" });
  assert.equal(root.status, 307);
  assert.equal(new URL(root.headers.get("location"), baseURL).pathname, "/en");
  for (const path of ["/fr", "/en/missing", "/fr/opengraph-image", "/fr/opengraph-image/profile"]) {
    assert.equal((await request(path)).status, 404, path);
  }
});

for (const lang of ["en", "es"]) {
  test(`${lang}: accessible document structure, navigation and public contact`, () => {
    const { html } = pages.get(lang);
    assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
    assert.equal([...html.matchAll(/<h1\b/g)].length, 1);
    assert.match(html, /<main[^>]*id="main"[^>]*tabindex="-1"/);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
    assert.equal(new Set(ids).size, ids.length, "IDs must be unique");
    for (const id of ["projects", "hackathons", "about", "education", "contact"]) assert.ok(ids.includes(id), id);
    const links = tags(html, "a");
    for (const link of links) {
      assert.ok(link.href && link.href !== "#", "Links must have usable destinations");
      if (link.href.startsWith("#")) assert.ok(ids.includes(link.href.slice(1)), link.href);
      if (link.target === "_blank") assert.match(link.rel, /\bnoopener\b/);
      assert.doesNotMatch(link.href, /^(?:mailto|tel):/i);
    }
    assert.ok(links.some((link) => link.href === `/${lang === "en" ? "es" : "en"}` && link.hreflang));
    assert.ok(links.some((link) => link.href.startsWith("https://www.linkedin.com/in/")));
    assert.ok(links.some((link) => link.href === "https://github.com/nschioppa"));
    for (const image of tags(html, "img")) assert.ok(image.alt, "Content images need alternative text");
    assert.doesNotMatch(html, /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  });

  test(`${lang}: canonical, language alternatives, social cards and private-data-free JSON-LD`, () => {
    const { html } = pages.get(lang);
    const links = tags(html, "link");
    assert.equal(links.find((link) => link.rel === "canonical")?.href, `${canonical}/${lang}`);
    for (const [code, path] of [["en", "en"], ["es", "es"], ["x-default", "en"]]) {
      assert.equal(links.find((link) => link.hreflang === code)?.href, `${canonical}/${path}`);
    }
    assert.ok(metadata(html, "description")?.length > 50);
    assert.equal(metadata(html, "og:url"), `${canonical}/${lang}`);
    const socialImage = new URL(metadata(html, "og:image"));
    assert.equal(socialImage.origin, new URL(canonical).origin);
    assert.ok(socialImage.pathname.startsWith(`/${lang}/opengraph-image`));
    assert.ok(metadata(html, "og:image:alt"));
    assert.equal(metadata(html, "twitter:card"), "summary_large_image");
    assert.equal(metadata(html, "twitter:image"), metadata(html, "og:image"));
    assert.equal(metadata(html, "twitter:image:alt"), metadata(html, "og:image:alt"));
    const robots = metadata(html, "robots").split(/,\s*/);
    assert.ok(robots.includes("index") && robots.includes("follow"));
    assert.ok(!robots.includes("noindex") && !robots.includes("nofollow"));
    const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
    assert.ok(script, "Structured data must be in server HTML");
    const data = JSON.parse(script);
    const person = data["@graph"].find((entry) => entry["@type"] === "Person");
    assert.ok(person);
    assert.ok(person.sameAs.includes("https://github.com/nschioppa"));
    assert.doesNotMatch(script, /"(?:email|telephone)"\s*:/i);
    assert.equal(data["@graph"].find((entry) => entry["@type"] === "ProfilePage").inLanguage, lang);
  });

  test(`${lang}: the generated social image is a 1200 × 630 PNG`, async () => {
    const image = new URL(metadata(pages.get(lang).html, "og:image"));
    const response = await request(`${image.pathname}${image.search}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), /image\/png/);
    const png = Buffer.from(await response.arrayBuffer());
    assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
  });
}

test("translations have distinct search titles and social alternative text", () => {
  const en = pages.get("en").html;
  const es = pages.get("es").html;
  assert.notEqual(en.match(/<title>(.*?)<\/title>/)?.[1], es.match(/<title>(.*?)<\/title>/)?.[1]);
  assert.notEqual(metadata(en, "og:image:alt"), metadata(es, "og:image:alt"));
});

test("robots and sitemap allow the canonical bilingual site to be indexed", async () => {
  const robots = await request("/robots.txt");
  assert.equal(robots.status, 200);
  const directives = await robots.text();
  assert.match(directives, /Allow: \/\s/);
  assert.ok(directives.includes(`Sitemap: ${canonical}/sitemap.xml`));
  const sitemap = await request("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  for (const lang of ["en", "es"]) assert.ok(xml.includes(`<loc>${canonical}/${lang}</loc>`));
  assert.doesNotMatch(xml, /localhost|vercel\.app/);
});

test("native icons are advertised, served and retain the nautical SVG", async () => {
  const links = tags(pages.get("en").html, "link");
  for (const [path, mime] of [["/favicon.ico", /image\/(?:x-icon|vnd.microsoft.icon)/], ["/icon.svg", /image\/svg\+xml/]]) {
    assert.ok(links.some((link) => link.rel === "icon" && new URL(link.href, baseURL).pathname === path));
    const response = await request(path);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type"), mime);
  }
  const apple = links.find((link) => link.rel === "apple-touch-icon");
  assert.ok(apple);
  const response = await request(apple.href);
  assert.equal(response.status, 200);
  const png = Buffer.from(await response.arrayBuffer());
  assert.equal(png.readUInt32BE(16), 180);
  assert.equal(png.readUInt32BE(20), 180);
});

test("security response headers are applied to both languages", () => {
  for (const { response } of pages.values()) {
    assert.equal(response.headers.get("x-powered-by"), null);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert.equal(response.headers.get("permissions-policy"), "camera=(), microphone=(), geolocation=()");
  }
});

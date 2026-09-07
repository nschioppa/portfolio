import type { MetadataRoute } from "next";
import { LANGS } from "@/content/types";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LANGS.map((lang) => ({
    url: `${SITE_URL}/${lang}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
    // Le dice a Google que las dos paginas son la misma en otro idioma, en vez
    // de dos paginas que compiten entre si.
    alternates: {
      languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}/${l}`])),
    },
  }));
}

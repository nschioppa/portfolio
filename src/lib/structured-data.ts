import type { Content, Lang } from "@/content/types";
import { AUTHOR, SITE_URL } from "@/lib/site";

/** Stable identities shared by the two language versions of the portfolio. */
export function getStructuredData(content: Content, lang: Lang) {
  const pageUrl = `${SITE_URL}/${lang}`;
  const websiteId = `${SITE_URL}/#website`;
  const personId = `${SITE_URL}/#person`;
  const pageId = `${pageUrl}#profile`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/`,
        name: AUTHOR,
        alternateName: ["Nico Schioppa", "Nicolas Schioppa"],
        inLanguage: ["es", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: AUTHOR,
        alternateName: ["Nico Schioppa", "Nicolas Schioppa"],
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/images/nicolas-sailing.webp`,
        description: content.meta.description,
        sameAs: content.contact.links.map((link) => link.href),
        mainEntityOfPage: { "@id": pageId },
      },
      {
        "@type": "ProfilePage",
        "@id": pageId,
        url: pageUrl,
        name: content.meta.title,
        description: content.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

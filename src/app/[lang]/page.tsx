import type { Metadata } from "next";
import { getContent, isLang } from "@/content";
import { DEFAULT_LANG } from "@/content/types";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Hackathons } from "@/components/sections/Hackathons";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { VoyageProgress } from "@/components/ui/VoyageProgress";
import { getStructuredData } from "@/lib/structured-data";
import { SITE_URL, AUTHOR } from "@/lib/site";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const segment = (await params).lang;
  const lang = isLang(segment) ? segment : DEFAULT_LANG;
  const { meta } = getContent(lang);
  const url = `${SITE_URL}/${lang}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    applicationName: AUTHOR,
    verification: {
      google: "mPOh3KgpnMZPCMiKyvS7OdgMOp2pXHI6uWquHqDi4QY",
    },
    authors: [{ name: AUTHOR, url: SITE_URL }],
    creator: AUTHOR,
    alternates: {
      canonical: url,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: AUTHOR,
      title: meta.title,
      description: meta.description,
      locale: lang === "es" ? "es_ES" : "en_GB",
      alternateLocale: lang === "es" ? "en_GB" : "es_ES",
      images: [
        {
          url: `${url}/opengraph-image`,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: meta.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Page({ params }: Params) {
  const segment = (await params).lang;
  const lang = isLang(segment) ? segment : DEFAULT_LANG;
  const content = getContent(lang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(content, lang)).replace(/</g, "\\u003c"),
        }}
      />
      <Nav content={content.nav} lang={lang} />
      <main id="main" tabIndex={-1}>
        <Hero content={content.hero} />
        <Projects content={content.projects} />
        <Hackathons content={content.hackathons} />
        <About content={content.about} />
        <Education content={content.education} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.footer} />
      <VoyageProgress />
    </>
  );
}

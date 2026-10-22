import type { Metadata } from "next";
import "../globals.css";
import { LANGS, DEFAULT_LANG, type Lang } from "@/content/types";
import { getContent, isLang } from "@/content";
import { SITE_URL, AUTHOR } from "@/lib/site";

/** Las dos paginas se generan en build. No hay nada dinamico. */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/** Cualquier otro segmento es un 404, sin pasar por el render. */
export const dynamicParams = false;

// Next 16 valida la firma de los layouts contra Promise<{ lang: string }>: el
// segmento de la URL es una cadena cualquiera hasta que la validamos nosotros.
type Params = { params: Promise<{ lang: string }> };

/** Estrecha el segmento a un idioma. Con dynamicParams=false no deberia
 *  llegar nunca otra cosa, pero el tipo no lo sabe. */
function toLang(value: string): Lang {
  return isLang(value) ? value : DEFAULT_LANG;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lang = toLang((await params).lang);
  const { meta } = getContent(lang);
  const url = `${SITE_URL}/${lang}`;

  return {
    metadataBase: new URL(SITE_URL),
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
      // Relaciona las versiones traducidas para mostrar el idioma adecuado.
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

export default async function LangLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const lang = toLang((await params).lang);

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}

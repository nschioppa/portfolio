import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { LANGS, type Lang } from "@/content/types";
import { getContent } from "@/content";
import { SITE_URL, AUTHOR } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Las dos paginas se generan en build. No hay nada dinamico. */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

/** Cualquier otro segmento es un 404, sin pasar por el render. */
export const dynamicParams = false;

type Params = { params: Promise<{ lang: Lang }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  const { meta } = getContent(lang);
  const url = `${SITE_URL}/${lang}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: AUTHOR, url: SITE_URL }],
    creator: AUTHOR,
    alternates: {
      canonical: url,
      // hreflang: le dice a Google que /es y /en son la misma pagina en otro
      // idioma. Sin esto compiten entre si y solo indexa una.
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
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const { lang } = await params;

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { LANGS, DEFAULT_LANG, type Lang } from "@/content/types";
import { isLang } from "@/content";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

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

export default async function LangLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const lang = toLang((await params).lang);

  return (
    <html lang={lang}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

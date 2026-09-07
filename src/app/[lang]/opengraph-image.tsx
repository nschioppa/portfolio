import { ImageResponse } from "next/og";
import { getContent, isLang } from "@/content";
import { LANGS, DEFAULT_LANG } from "@/content/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Sin esto Next deja la imagen como ruta dinamica y la genera en cada
 *  peticion. Son dos imagenes fijas: se hacen en build y se cachean. */
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}
export const alt = "Nicolás Schioppa — software engineering student and ILCA racing sailor";

/**
 * Imagen social generada en build, una por idioma.
 *
 * Se dibuja con `next/og` en vez de con un PNG hecho a mano para que siga al
 * copy: si cambia el titular en `content/`, la imagen cambia sola. Satori (el
 * motor) no admite CSS moderno, asi que todo va con estilos en linea, `flex`
 * explicito en cada contenedor con hijos, y colores en hex y no en oklch.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const segment = (await params).lang;
  const { hero, meta } = getContent(isLang(segment) ? segment : DEFAULT_LANG);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0e14",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Relieve nautico: tres arcos concentricos saliendose por la derecha.
            Es la misma idea que el fondo del sitio, reducida a lo que Satori
            sabe pintar. */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              right: -260 - i * 90,
              top: 120 - i * 90,
              width: 620 + i * 180,
              height: 620 + i * 180,
              borderRadius: "50%",
              border: "2px solid #5cc8f2",
              opacity: 0.14 - i * 0.035,
            }}
          />
        ))}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              color: "#5cc8f2",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            {hero.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              color: "#f2f5f8",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {hero.name}
          </div>
          <div
            style={{
              width: 96,
              height: 3,
              background: "#5cc8f2",
              margin: "30px 0",
            }}
          />
          <div style={{ fontSize: 38, color: "#aab6c4", lineHeight: 1.3, maxWidth: 820 }}>
            {meta.ogTagline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#7d8b9b" }}>
          github.com/nschioppa
        </div>
      </div>
    ),
    size,
  );
}

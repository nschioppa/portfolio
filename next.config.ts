import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // La raiz no tiene contenido propio: cada idioma es una pagina estatica
      // e independiente. Va al ingles porque el publico son recruiters en Milan.
      // Temporal (307) y no permanente, para poder cambiar de idioma por defecto
      // sin pelearse con la cache del navegador de quien ya entro una vez.
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;

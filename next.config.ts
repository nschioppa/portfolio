import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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

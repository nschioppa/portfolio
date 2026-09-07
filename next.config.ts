import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El sitio es contenido estatico: no hay base de datos ni API que dependa
  // de la peticion, asi que todo se puede generar en build.
  reactStrictMode: true,
};

export default nextConfig;

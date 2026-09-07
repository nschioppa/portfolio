/**
 * Tailwind v4: el unico plugin necesario es `@tailwindcss/postcss`.
 * Ya no hay `tailwindcss` como plugin de PostCSS ni `autoprefixer`: v4 usa
 * Lightning CSS por dentro y pone los prefijos el solo.
 *
 * Toda la configuracion del tema esta en CSS, en `src/app/globals.css`
 * (`@import "tailwindcss"` + `@theme`). No hay `tailwind.config.*`.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;

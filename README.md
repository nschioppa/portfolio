# Portfolio de Nicolás Schioppa

Portfolio bilingüe en Next.js, React y TypeScript. Rutas estáticas `/en` y `/es`; la raíz redirige al inglés.

## Desarrollo

```sh
npm install
npm run dev
npm run typecheck
npm run build
```

Si el entorno restringe las conexiones entre procesos de Turbopack, se puede comprobar el build con `npm run build -- --webpack`.

## Contenido y diseño

- Todos los textos están en `src/content/es.ts` y `en.ts`, con un contrato común en `types.ts`.
- El sistema visual está en `src/app/globals.css`: marfil, azul marino, verde mar y tipografía del sistema sin descargas de fuentes.
- `SoftwareChart.tsx` combina un esquema de software con una vela geométrica en el inicio.
- La sección personal usa una fotografía de Nicolás navegando, optimizada como WebP y con carga diferida.
- `VoyageProgress.tsx` dibuja una ruta decorativa que avanza con el scroll en escritorio.
- Las entradas de secciones se activan al aparecer en pantalla. El contenido sigue visible sin JavaScript y las animaciones respetan la preferencia de movimiento reducido.
- La navegación móvil tiene cierre con Escape y clic fuera. El cambio de idioma conserva la sección visible.

## Publicación

GitHub: https://github.com/nschioppa/portfolio

Vercel despliega producción desde `main` y genera vistas previas para otras ramas.

Dominio: https://nicoschioppa.com

`NEXT_PUBLIC_SITE_URL` permite sustituir la URL canónica; por defecto se usa el dominio público.

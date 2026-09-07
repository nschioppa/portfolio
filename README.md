# Portfolio de Nicolas Schioppa

Sitio personal en Next.js (App Router) + TypeScript + Tailwind, pensado para
desplegarse en Vercel. Bilingue (castellano e ingles) con rutas estaticas por
idioma.

## Desarrollo

```sh
npm install
npm run dev     # http://localhost:3000
```

## Como se edita el texto

Todo el copy vive en `src/content/es.ts` y `src/content/en.ts`. Los dos cumplen
el tipo `Content` de `src/content/types.ts`: si falta una clave en un idioma, el
build falla en vez de dejar un hueco en la pagina. **No hay texto escrito dentro
de los componentes**, asi que para cambiar una frase no hace falta tocar JSX.

Lo que queda por completar esta marcado como `[TODO: ...]` dentro de esos mismos
ficheros y se ve en la pagina, para que no se olvide.

## Idiomas

- `/en` y `/es` son paginas estaticas independientes.
- `/` redirige a `/en` (el publico objetivo son recruiters en Milan).
- El selector de idioma conserva la seccion en la que estas.

## Estructura

| Ruta | Que hay |
|---|---|
| `src/content/` | todo el texto y el contrato de tipos |
| `src/app/[lang]/` | la pagina, una por idioma |
| `src/components/` | secciones y primitivas de UI |
| `src/lib/` | utilidades (hooks de scroll, helpers) |

## Despliegue

Conectado a Vercel: cada push a `main` despliega solo.

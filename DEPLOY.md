# Publicar el sitio

Tres pasos: subir el repositorio a GitHub, conectarlo a Vercel, y enganchar el
dominio cuando lo tengas.

---

## 1. Subir a GitHub

`gh` esta instalado (versión 2.100.0) pero **sin autenticar**. El login abre el
navegador, así que hay que hacerlo a mano una vez:

```bash
gh auth login
```

Elegí `GitHub.com` → `HTTPS` → `Login with a web browser`. Cuando termine,
conectá también git para que los `push` no vuelvan a pedir credenciales:

```bash
gh auth setup-git
```

Ya con eso, desde `D:\AI\projects\portfolio`:

```bash
gh repo create portfolio --public --source=. --remote=origin --push
```

Eso crea `github.com/nschioppa/portfolio`, lo enlaza como `origin` y sube la
rama `main` con todo el historial de commits.

Si preferís crearlo desde la web (github.com/new, sin README ni .gitignore, que
ya los tenemos), los comandos equivalentes son:

```bash
git remote add origin https://github.com/nschioppa/portfolio.git
git push -u origin main
```

---

## 2. Conectar Vercel para que despliegue solo

Esto se hace **una vez y desde la web**, no por CLI: lo que querés es la
integración de GitHub, no `vercel deploy` a mano.

1. Entrá a [vercel.com/new](https://vercel.com/new) y logueate **con GitHub**
   (importante: así Vercel ya ve tus repos sin permisos extra).
2. `Import Git Repository` → elegí `nschioppa/portfolio`.
3. Vercel detecta Next.js solo. **No cambies nada**: ni el build command, ni el
   output directory, ni la versión de Node. El proyecto no necesita
   configuración extra.
4. `Deploy`.

A partir de ahí:

| Lo que hacés | Lo que pasa |
|---|---|
| `git push` a `main` | despliega a producción |
| `git push` a otra rama | crea un *preview deployment* con su propia URL |
| abrís un pull request | Vercel comenta el PR con el link del preview |

No hay que volver a tocar nada. `vercel deploy` desde la terminal deja de hacer
falta.

### Variable de entorno (solo cuando tengas dominio)

El sitio calcula su URL canónica solo: en preview usa `VERCEL_URL`, que Vercel
inyecta, y en local `localhost:3000`. **Cuando conectes el dominio propio**,
añadí en Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_SITE_URL = https://tudominio.com
```

Marcala para `Production` y volvé a desplegar. Sin eso, las etiquetas Open Graph
y el `sitemap.xml` apuntarían a la URL `.vercel.app` en vez de a tu dominio.

---

## 3. Enganchar el dominio propio

Una vez comprado el dominio (en Namecheap, Cloudflare, Porkbun, donde sea):

1. Vercel → tu proyecto → **Settings → Domains → Add**.
2. Escribí el dominio. Añadí **las dos formas**, `tudominio.com` y
   `www.tudominio.com`; Vercel te deja elegir cuál es la principal y redirige la
   otra sola. Lo habitual es que la principal sea la de sin `www`.
3. Vercel te muestra **los registros DNS exactos que hay que crear**. Son del
   tipo:
   - un registro `A` para el dominio raíz (`@`)
   - un registro `CNAME` para `www`, apuntando a un host de Vercel

   **Copiá los valores de la pantalla de Vercel, no de esta guía ni de un blog.**
   Las IPs y los hosts de destino cambian cada tanto y un valor viejo te deja el
   dominio sin resolver.
4. Entrá al panel de tu registrador y creá esos registros en la zona DNS.
5. Volvé a Vercel y esperá a que el dominio pase a `Valid Configuration`. Suele
   tardar minutos, pero el DNS puede tardar hasta 48 horas en propagar del todo.
   El certificado HTTPS lo emite Vercel solo, no hay que hacer nada.
6. Cuando esté verde, poné `NEXT_PUBLIC_SITE_URL` (paso 2) y redesplegá.

### Atajo si el dominio lo comprás en Cloudflare

Si usás Cloudflare como DNS, poné los registros en modo **DNS only** (la nube
gris, no la naranja). Con el proxy activado Vercel no puede emitir el
certificado y el dominio se queda a medias.

---

## Comprobación final

Con el dominio ya funcionando, verificá que las meta tags salen bien pegando la
URL en:

- [opengraph.xyz](https://www.opengraph.xyz/) — cómo se ve al compartirlo
- el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/) — el
  que importa, porque es por donde te va a llegar un recruiter

La imagen social se genera sola desde el copy: está en
`src/app/[lang]/opengraph-image.tsx` y cambia si cambiás el titular.

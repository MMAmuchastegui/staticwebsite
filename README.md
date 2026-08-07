# GEDING — sitio web estático

Sitio institucional de GEDING (Automatismos y Control), reconstruido desde
cero como **sitio 100% estático** — sin WordPress, sin PHP, sin base de
datos — usando Next.js con exportación estática.

## Stack

- Next.js 16 (App Router) con `output: "export"`
- TypeScript + Tailwind CSS v4
- Fuentes auto-alojadas (`@fontsource`), sin dependencias externas en runtime

## Desarrollo local

```bash
npm install
npm run dev
```

Abrí http://localhost:3000

## Generar la versión estática

```bash
npm run build
```

Esto genera la carpeta `out/` con HTML/CSS/JS puro — **esa es la carpeta
que se sube a S3**, nada más.

## Deploy a AWS (GitHub → S3 → CloudFront)

1. Subí este repo (tal cual, sin `node_modules` ni `out/`, ya excluidos en
   `.gitignore`) a GitHub.
2. En tu máquina o en un GitHub Action, corré `npm install && npm run build`.
3. Subí el **contenido** de `out/` (no la carpeta en sí) a tu bucket de S3.
4. Poné **CloudFront delante del bucket** (ver sección de seguridad abajo —
   no actives "Static website hosting" directo en S3, es más inseguro que
   usar CloudFront con Origin Access Control).

## Seguridad (importante para un sitio público en S3)

Como el sitio es 100% estático (sin PHP, sin base de datos, sin backend),
ya eliminamos de raíz toda la superficie de ataque típica de WordPress
(inyección SQL, plugins vulnerables, fuerza bruta al `/wp-login.php`,
ejecución remota de código, etc.). Lo que queda por asegurar es la
**infraestructura de AWS** en sí:

### 1. El bucket de S3 nunca debe ser público directamente

No uses "Static website hosting" con el bucket abierto a internet. En su
lugar:

- Dejá **todas** las opciones de "Block Public Access" activadas (bloqueadas) en el bucket.
- Poné **CloudFront** delante, usando **Origin Access Control (OAC)** — así
  el bucket solo le entrega archivos a CloudFront, nunca directo a
  cualquiera que adivine la URL de S3.
- Política de bucket de ejemplo (reemplazá `TU-BUCKET` y `TU-ACCOUNT-ID` /
  `TU-DISTRIBUTION-ID`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontServicePrincipalReadOnly",
      "Effect": "Allow",
      "Principal": { "Service": "cloudfront.amazonaws.com" },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::TU-BUCKET/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::TU-ACCOUNT-ID:distribution/TU-DISTRIBUTION-ID"
        }
      }
    }
  ]
}
```

Con esto, ni siquiera vos con la URL directa de S3 podés listar o escribir
archivos desde afuera — solo lectura, y solo a través de CloudFront.

### 2. Headers de seguridad HTTP (vía CloudFront)

El sitio ya trae una Content-Security-Policy estricta en el propio HTML
(`app/layout.tsx`), pero hay headers que **solo se pueden setear a nivel
HTTP**, no en una etiqueta `<meta>` del HTML: `Strict-Transport-Security`,
`X-Frame-Options`, `X-Content-Type-Options`.

En CloudFront: Distribución → Behaviors → editá el behavior → **Response
headers policy** → elegí la policy administrada por AWS llamada
**`Managed-SecurityHeadersPolicy`**. Sin escribir nada, te agrega HSTS,
X-Content-Type-Options, X-Frame-Options, X-XSS-Protection y
Referrer-Policy a cada respuesta.

### 3. HTTPS obligatorio

En el mismo behavior de CloudFront, poné **"Redirect HTTP to HTTPS"**, y
usá un certificado de AWS Certificate Manager (gratis) para tu dominio.

### 4. Opcional pero recomendado: AWS WAF

Si más adelante te preocupa tráfico malicioso o bots, podés asociar un Web
ACL de AWS WAF a la distribución de CloudFront (tiene un tier gratuito
limitado, y reglas administradas gratuitas contra los ataques más
comunes). No es imprescindible para un sitio institucional sin backend,
pero es la capa extra si alguna vez la necesitás.

### En resumen

| Riesgo típico de WordPress | En este sitio |
|---|---|
| Plugin vulnerable | No existe — no hay plugins |
| Inyección SQL | No existe — no hay base de datos |
| Fuerza bruta a `/wp-login` | No existe — no hay panel de login |
| Ejecución remota de código PHP | No existe — no hay PHP corriendo |
| Bucket S3 mal configurado | Mitigado con Block Public Access + OAC |
| Falta de HTTPS | Mitigado con CloudFront + ACM |
| Headers HTTP débiles | Mitigado con la Response Headers Policy |


## Estructura de contenido

- `app/` — páginas (App Router)
- `components/layout/` — Header, Footer
- `components/ui/` — piezas chicas reutilizables (BusDivider, StatusDot)
- `components/home/` — HeroCarousel, ServiceCard (usados en Home y Servicios)
- `components/nuestro-trabajo/` — el explorador de proyectos (filtros + timeline)
- `lib/data/site.ts` — textos y datos de servicios, navegación, contacto, clientes
- `lib/data/projects.ts` + `lib/data/projects-raw.json` — historial de
  proyectos (91 proyectos, categorizados automáticamente a partir del
  archivo histórico de la empresa)
- `public/images/` — logo e imágenes recuperadas del sitio original
- `public/robots.txt` — indexación para buscadores

## Formulario de contacto

Como el sitio es estático, no hay backend para procesar el formulario.
Actualmente arma un `mailto:` con los datos cargados. Si más adelante
quieren guardar los mensajes en algún lado, se puede reemplazar por un
servicio externo (Formspree, Web3Forms, etc.) sin tocar el resto del sitio.

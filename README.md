# GEDING

Sitio web institucional de **GEDING (Automatismos y Control)** desarrollado con **Next.js** y exportado como un sitio completamente estático. El proyecto reemplaza la implementación anterior basada en WordPress por una solución más simple, segura y fácil de mantener.

## Tecnologías

* Next.js 16 (App Router)
* TypeScript
* Tailwind CSS v4
* `output: "export"` para generar archivos estáticos
* Fuentes locales mediante `@fontsource`

## Desarrollo

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

El sitio estará disponible en:

```
http://localhost:3000
```

## Build

Para generar la versión de producción:

```bash
npm run build
```

El resultado se genera en la carpeta `out/`, que contiene los archivos estáticos listos para publicar.

## Despliegue

El sitio está pensado para publicarse en **AWS S3** utilizando **CloudFront** como CDN.

Flujo recomendado:

1. Clonar el repositorio.
2. Instalar dependencias.
3. Ejecutar `npm run build`.
4. Subir el contenido de `out/` al bucket de S3.
5. Invalidar la caché de CloudFront si corresponde.

## Infraestructura

La arquitectura de publicación es la siguiente:

```
GitHub
   │
   ▼
Build (Next.js)
   │
   ▼
out/
   │
   ▼
Amazon S3
   │
   ▼
CloudFront
   │
   ▼
Dominio
```

## Consideraciones de seguridad

El sitio no utiliza servidor, PHP ni base de datos, por lo que elimina gran parte de los vectores de ataque habituales de aplicaciones dinámicas.

Para la infraestructura de AWS se recomienda:

* Mantener el bucket de S3 privado.
* Acceder al bucket únicamente mediante **CloudFront** usando **Origin Access Control (OAC)**.
* Habilitar HTTPS mediante AWS Certificate Manager.
* Configurar la política administrada **Managed-SecurityHeadersPolicy** de CloudFront.
* Redireccionar todas las peticiones HTTP hacia HTTPS.

## Estructura del proyecto

```
app/                          Páginas (App Router)
components/
├── home/                     Componentes de la página principal
├── layout/                   Header, Footer
├── nuestro-trabajo/          Explorador de proyectos
└── ui/                       Componentes reutilizables

lib/
└── data/                     Datos del sitio y proyectos

public/
├── images/                   Recursos estáticos
└── robots.txt
```

## Contenido

La información del sitio se encuentra centralizada en `lib/data/`.

* `site.ts`: navegación, servicios, clientes y datos de contacto.
* `projects.ts`: estructura de proyectos utilizada por la aplicación.
* `projects-raw.json`: histórico original de proyectos.

## Formulario de contacto

Al tratarse de un sitio estático, el formulario genera un enlace `mailto:` con la información ingresada.

Si en el futuro se requiere almacenar consultas o integrar un CRM, puede reemplazarse por un servicio externo (por ejemplo Formspree o Web3Forms) sin modificar la estructura general del proyecto.

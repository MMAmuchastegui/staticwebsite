async function descargarImagen(url, destDir, baseName, index) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar la imagen: ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "";
  const ext = contentType.includes("png") ? "png"
    : contentType.includes("webp") ? "webp"
    : "jpg";
  fs.mkdirSync(destDir, { recursive: true });
  const filename = `${baseName}-${index}.${ext}`;
  fs.writeFileSync(path.join(destDir, filename), buffer);
  return `/images/novedades/${filename}`;
}

function extractImageUrls(markdown) {
  const regex = /!\[[^\]]*\]\((https:\/\/[^\s)]+)\)/g;
  const urls = [];
  let match;
  while ((match = regex.exec(markdown))) urls.push(match[1]);
  return urls;
}

async function procesarNuevaNovedadEvento(issueBody) {
  const fields = parseIssueBody(issueBody);

  const title = fields["Título"];
  const eventType = fields["Tipo de evento"];
  const description = fields["Descripción"];
  const location = fields["Lugar (opcional)"];
  const fotosRaw = fields["Fotos"] || "";
  const diasRaw = fields["Días que permanece en Novedades (dejar vacío = 30)"];

  if (!title || !eventType || !description) {
    throw new Error("Faltan campos obligatorios en el formulario.");
  }

  const novedades = JSON.parse(fs.readFileSync(NOVEDADES_PATH, "utf-8"));
  const id = uniqueSlug(slugify(title), new Set(novedades.map((n) => n.id)));

  const imageUrls = extractImageUrls(fotosRaw);
  const destDir = path.join(__dirname, "..", "public", "images", "novedades");
  const images = [];
  for (let i = 0; i < imageUrls.length; i++) {
    images.push(await descargarImagen(imageUrls[i], destDir, id, i + 1));
  }

  const parsedDias = parseInt(diasRaw, 10);
  const expiresInDays = Number.isFinite(parsedDias) ? parsedDias : undefined;

  const newNovedad = {
    id,
    type: "evento",
    eventType,
    title,
    description,
    ...(location ? { location } : {}),
    images,
    dateAdded: new Date().toISOString().slice(0, 10),
    ...(expiresInDays ? { expiresInDays } : {}),
  };

  novedades.unshift(newNovedad);
  fs.writeFileSync(NOVEDADES_PATH, JSON.stringify(novedades, null, 2) + "\n");

  return { id, title, images };
}

module.exports = { procesarNuevoProyecto, procesarNuevaNovedadEvento, parseIssueBody, slugify };
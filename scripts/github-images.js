const fs = require("fs");
const path = require("path");

async function descargarImagen(url, destDir, baseName, index) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar la imagen: ${url}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "";
  const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
  fs.mkdirSync(destDir, { recursive: true });
  const filename = `${baseName}-${index}.${ext}`;
  fs.writeFileSync(path.join(destDir, filename), buffer);
  return `/images/${path.basename(destDir)}/${filename}`;
}

function extractImageUrls(markdown) {
  const regex = /!\[[^\]]*\]\((https:\/\/[^\s)]+)\)/g;
  const urls = [];
  let match;
  while ((match = regex.exec(markdown))) urls.push(match[1]);
  return urls;
}

module.exports = { descargarImagen, extractImageUrls };